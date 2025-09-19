/**
 * @description 现代化错误边界处理
 * @author 现代化架构
 */

/**
 * 错误类型枚举
 */
export enum ErrorType {
  /** JavaScript错误 */
  JS_ERROR = 'js_error',
  /** 资源加载错误 */
  RESOURCE_ERROR = 'resource_error',
  /** Promise未捕获错误 */
  PROMISE_ERROR = 'promise_error',
  /** 网络请求错误 */
  HTTP_ERROR = 'http_error',
  /** 业务逻辑错误 */
  BUSINESS_ERROR = 'business_error',
  /** 用户操作错误 */
  USER_ERROR = 'user_error',
}

/**
 * 错误信息接口
 */
export interface ErrorInfo {
  /** 错误类型 */
  type: ErrorType;
  /** 错误消息 */
  message: string;
  /** 错误堆栈 */
  stack?: string;
  /** 错误发生的URL */
  url?: string;
  /** 错误发生的行号 */
  line?: number;
  /** 错误发生的列号 */
  column?: number;
  /** 错误发生的时间 */
  timestamp: number;
  /** 用户代理信息 */
  userAgent: string;
  /** 页面URL */
  pageUrl: string;
  /** 用户ID */
  userId?: string;
  /** 额外信息 */
  extra?: Record<string, any>;
}

/**
 * 错误处理器接口
 */
export interface ErrorHandler {
  /** 处理错误 */
  handle(error: ErrorInfo): void;
}

/**
 * 控制台错误处理器
 */
export class ConsoleErrorHandler implements ErrorHandler {
  handle(error: ErrorInfo): void {
    console.group(`🚨 ${error.type} 错误`);
    console.error('错误消息:', error.message);
    console.error('错误堆栈:', error.stack);
    console.error('发生时间:', new Date(error.timestamp).toLocaleString());
    console.error('页面URL:', error.pageUrl);
    if (error.extra) {
      console.error('额外信息:', error.extra);
    }
    console.groupEnd();
  }
}

/**
 * 远程错误处理器
 */
export class RemoteErrorHandler implements ErrorHandler {
  private reportUrl: string;
  private maxRetries: number;
  private retryDelay: number;

  constructor(reportUrl: string, maxRetries = 3, retryDelay = 1000) {
    this.reportUrl = reportUrl;
    this.maxRetries = maxRetries;
    this.retryDelay = retryDelay;
  }

  async handle(error: ErrorInfo): Promise<void> {
    let retries = 0;

    while (retries < this.maxRetries) {
      try {
        await fetch(this.reportUrl, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(error),
        });
        break;
      } catch (err) {
        retries++;
        if (retries < this.maxRetries) {
          await new Promise((resolve) => setTimeout(resolve, this.retryDelay));
        } else {
          console.error('错误上报失败:', err);
        }
      }
    }
  }
}

/**
 * 错误边界管理器
 */
export class ErrorBoundary {
  private handlers: ErrorHandler[] = [];
  private errorQueue: ErrorInfo[] = [];
  private isProcessing = false;

  constructor() {
    this.init();
  }

  /**
   * 初始化错误监听
   */
  private init(): void {
    // 监听JavaScript错误
    window.addEventListener('error', (event) => {
      this.captureError({
        type: ErrorType.JS_ERROR,
        message: event.message,
        stack: event.error?.stack,
        url: event.filename,
        line: event.lineno,
        column: event.colno,
        timestamp: Date.now(),
        userAgent: navigator.userAgent,
        pageUrl: window.location.href,
      });
    });

    // 监听资源加载错误
    window.addEventListener(
      'error',
      (event) => {
        const { target } = event;
        if (target && target instanceof HTMLElement) {
          this.captureError({
            type: ErrorType.RESOURCE_ERROR,
            message: `资源加载失败: ${(target as any).src || (target as any).href}`,
            timestamp: Date.now(),
            userAgent: navigator.userAgent,
            pageUrl: window.location.href,
            extra: {
              tagName: target.tagName,
              src: (target as any).src,
              href: (target as any).href,
            },
          });
        }
      },
      true
    );

    // 监听Promise未捕获错误
    window.addEventListener('unhandledrejection', (event) => {
      this.captureError({
        type: ErrorType.PROMISE_ERROR,
        message: event.reason?.message || String(event.reason),
        stack: event.reason?.stack,
        timestamp: Date.now(),
        userAgent: navigator.userAgent,
        pageUrl: window.location.href,
      });
    });
  }

  /**
   * 添加错误处理器
   */
  addHandler(handler: ErrorHandler): void {
    this.handlers.push(handler);
  }

  /**
   * 移除错误处理器
   */
  removeHandler(handler: ErrorHandler): void {
    const index = this.handlers.indexOf(handler);
    if (index > -1) {
      this.handlers.splice(index, 1);
    }
  }

  /**
   * 捕获错误
   */
  captureError(error: Partial<ErrorInfo>): void {
    const errorInfo: ErrorInfo = {
      type: ErrorType.JS_ERROR,
      message: '',
      timestamp: Date.now(),
      userAgent: navigator.userAgent,
      pageUrl: window.location.href,
      ...error,
    };

    this.errorQueue.push(errorInfo);
    this.processQueue();
  }

  /**
   * 处理错误队列
   */
  private async processQueue(): Promise<void> {
    if (this.isProcessing || this.errorQueue.length === 0) {
      return;
    }

    this.isProcessing = true;

    while (this.errorQueue.length > 0) {
      const error = this.errorQueue.shift()!;

      for (const handler of this.handlers) {
        try {
          await handler.handle(error);
        } catch (err) {
          console.error('错误处理器执行失败:', err);
        }
      }
    }

    this.isProcessing = false;
  }

  /**
   * 手动报告错误
   */
  reportError(message: string, type: ErrorType = ErrorType.BUSINESS_ERROR, extra?: Record<string, any>): void {
    this.captureError({
      type,
      message,
      extra,
      timestamp: Date.now(),
      userAgent: navigator.userAgent,
      pageUrl: window.location.href,
    });
  }
}

/**
 * 创建错误边界实例
 */
export function createErrorBoundary(): ErrorBoundary {
  const errorBoundary = new ErrorBoundary();

  // 添加默认的控制台处理器
  errorBoundary.addHandler(new ConsoleErrorHandler());

  return errorBoundary;
}

/**
 * 全局错误边界实例
 */
export const globalErrorBoundary = createErrorBoundary();
