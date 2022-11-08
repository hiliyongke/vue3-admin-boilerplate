/**
 * 用于配置全局错误处理功能，可以监控vue错误、脚本错误、静态资源错误和Promise错误
 */

import { App } from 'vue';

import { ErrorTypeEnum } from '@/enums/exception-enum';
/**
 * process stack handler
 * @param error
 */
function processStackMsg(error: Error) {
  if (!error.stack) {
    return '';
  }
  let stack = error.stack
    .replace(/\n/gi, '') // Remove line breaks to save the size of the transmitted content
    .replace(/\bat\b/gi, '@') // At in chrome, @ in ff
    .split('@') // Split information with @
    .slice(0, 9) // The maximum stack length (Error.stackTraceLimit = 10), so only take the first 10
    .map(v => v.replace(/^\s*|\s*$/g, '')) // Remove extra spaces
    .join('~') // Manually add separators for later display
    .replace(/\?[^:]+/gi, ''); // Remove redundant parameters of js file links (?x=1 and the like)
  const msg = error.toString();
  if (stack.indexOf(msg) < 0) {
    stack = `${msg}@${stack}`;
  }
  return stack;
}

/**
 * get component name
 * @param vm
 */
function formatComponentName(vm: any) {
  if (vm.$root === vm) {
    return {
      name: 'root',
      path: 'root'
    };
  }

  const options = vm.$options as any;
  if (!options) {
    return {
      name: 'anonymous',
      path: 'anonymous'
    };
  }
  const name = options.name || options._componentTag;
  return {
    name,
    path: options.__file
  };
}

/**
 * Vue error handler
 */

function vueErrorHandler(err: Error, vm: any, info: string) {
  const { name, path } = formatComponentName(vm);
  const logInfo = {
    type: ErrorTypeEnum.VUE,
    name,
    file: path,
    message: err.message,
    stack: processStackMsg(err),
    detail: info,
    url: window.location.href
  };
  console.error('logInfo', logInfo);
}

/**
 * script error handler
 */
export function scriptErrorHandler(
  event: Event | string,
  source?: string,
  lineno?: number,
  colno?: number,
  error?: Error
) {
  if (event === 'Script error.' && !source) {
    return false;
  }
  const errorInfo: Partial<ErrorLogInfo> = {};
  const colNo: number =
    colno || (window.event && (window.event as any).errorCharacter) || 0;
  errorInfo.message = event as string;
  if (error?.stack) {
    errorInfo.stack = error.stack;
  } else {
    errorInfo.stack = '';
  }
  const name = source ? source.substr(source.lastIndexOf('/') + 1) : 'script';
  const errorLogInfo = {
    type: ErrorTypeEnum.SCRIPT,
    name,
    file: source as string,
    detail: `lineno: ${lineno};colno: ${colNo}`,
    url: window.location.href,
    ...(errorInfo as Pick<ErrorLogInfo, 'message' | 'stack'>)
  };
  console.error('errorLogInfo', errorLogInfo);
  return true;
}

/**
 * Promise error handler
 */
function registerPromiseErrorHandler() {
  window.addEventListener(
    'unhandledrejection',
    event => {
      const errorLogInfo = {
        type: ErrorTypeEnum.PROMISE,
        originType: event.type,
        name: 'Promise Error!',
        file: 'none',
        detail: 'promise error!',
        url: window.location.href,
        stack: 'promise error!',
        message: event.reason
      };
      console.error('errorLogInfo', errorLogInfo);
    },
    true
  );
}

/**
 * monitoring resource loading error handler
 */
function registerResourceErrorHandler() {
  // Monitoring resource loading error(img,script,css,and jsonp)
  window.addEventListener(
    'error',
    (e: Event) => {
      const target = e.target ? e.target : (e.srcElement as any);
      const errorLogInfo = {
        type: ErrorTypeEnum.RESOURCE,
        name: 'Resource Error!',
        file: (e.target || ({} as any)).currentSrc,
        detail: JSON.stringify({
          tagName: target.localName,
          html: target.outerHTML,
          type: e.type
        }),
        url: window.location.href,
        stack: 'resource is not found',
        message: `${(e.target || ({} as any)).localName} is load error`
      };
      console.error('errorLogInfo', errorLogInfo);
    },
    true
  );
}

/**
 * global vue setup error handler
 * @param app
 */
export function setupErrorHandle(app: App) {
  // Vue error monitoring;
  app.config.errorHandler = vueErrorHandler;

  // script error
  window.onerror = scriptErrorHandler;

  //  promise error
  registerPromiseErrorHandler();

  // Static resource error
  registerResourceErrorHandler();
}
