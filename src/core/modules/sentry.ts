/**
 * @description Sentry 错误追踪配置
 */

import * as Sentry from '@sentry/vue';
import type { App } from 'vue';
import type { Router } from 'vue-router';

/**
 * 初始化 Sentry
 */
export async function setupSentry(app: App, router: Router): Promise<void> {
  // 只在生产环境启用
  if (import.meta.env.PROD && import.meta.env.VITE_SENTRY_DSN) {
    Sentry.init({
      app,
      dsn: import.meta.env.VITE_SENTRY_DSN,

      // 集成
      integrations: [
        // 浏览器追踪
        Sentry.browserTracingIntegration({ router }),

        // Session Replay
        Sentry.replayIntegration({
          maskAllText: false,
          blockAllMedia: false,
        }),

        // 面包屑
        Sentry.breadcrumbsIntegration({
          console: true,
          dom: true,
          fetch: true,
          history: true,
          sentry: true,
          xhr: true,
        }),
      ],

      // 性能监控采样率（1.0 = 100%）
      tracesSampleRate: 1.0,

      // Session Replay 采样率
      replaysSessionSampleRate: 0.1, // 10% 的正常会话
      replaysOnErrorSampleRate: 1.0, // 100% 的错误会话

      // 环境
      environment: import.meta.env.MODE,

      // 版本
      release: import.meta.env.VITE_APP_VERSION || '1.0.0',

      // 忽略的错误
      ignoreErrors: [
        // 浏览器扩展错误
        'top.GLOBALS',
        'originalCreateNotification',
        'canvas.contentDocument',
        'MyApp_RemoveAllHighlights',
        'http://tt.epicplay.com',
        "Can't find variable: ZiteReader",
        'jigsaw is not defined',
        'ComboSearch is not defined',
        'http://loading.retry.widdit.com/',
        'atomicFindClose',
        // Facebook 相关
        'fb_xd_fragment',
        // ISP 优化
        'bmi_SafeAddOnload',
        'EBCallBackMessageReceived',
        // Chrome 扩展
        'conduitPage',
        // 网络错误
        'NetworkError',
        'Network request failed',
        // 取消的请求
        'Request aborted',
        'canceled',
      ],

      // 忽略的 URL
      denyUrls: [
        // Chrome 扩展
        /extensions\//i,
        /^chrome:\/\//i,
        /^chrome-extension:\/\//i,
        // Firefox 扩展
        /^resource:\/\//i,
        // Safari 扩展
        /^safari-extension:\/\//i,
      ],

      // 在发送前处理事件
      beforeSend(event, hint) {
        // 过滤敏感信息
        if (event.request) {
          delete event.request.cookies;
          delete event.request.headers;
        }

        // 添加自定义上下文
        event.contexts = {
          ...event.contexts,
          app: {
            name: 'Vue3 Admin',
            version: import.meta.env.VITE_APP_VERSION || '1.0.0',
          },
        };

        return event;
      },

      // 在发送面包屑前处理
      beforeBreadcrumb(breadcrumb) {
        // 过滤敏感的面包屑
        if (breadcrumb.category === 'console' && breadcrumb.level === 'log') {
          return null;
        }
        return breadcrumb;
      },
    });

    console.log('✅ Sentry 初始化完成');
  } else {
    console.log('⚠️ Sentry 未启用（开发环境或未配置 DSN）');
  }
}

/**
 * 手动捕获错误
 */
export function captureError(error: Error, context?: Record<string, any>): void {
  if (import.meta.env.PROD) {
    Sentry.captureException(error, {
      contexts: context,
    });
  } else {
    console.error('Error:', error, context);
  }
}

/**
 * 手动捕获消息
 */
export function captureMessage(message: string, level: Sentry.SeverityLevel = 'info'): void {
  if (import.meta.env.PROD) {
    Sentry.captureMessage(message, level);
  } else {
    console.log(`[${level}]`, message);
  }
}

/**
 * 设置用户信息
 */
export function setUser(user: { id: string; username?: string; email?: string }): void {
  if (import.meta.env.PROD) {
    Sentry.setUser(user);
  }
}

/**
 * 清除用户信息
 */
export function clearUser(): void {
  if (import.meta.env.PROD) {
    Sentry.setUser(null);
  }
}

/**
 * 添加面包屑
 */
export function addBreadcrumb(breadcrumb: Sentry.Breadcrumb): void {
  if (import.meta.env.PROD) {
    Sentry.addBreadcrumb(breadcrumb);
  }
}

/**
 * 设置标签
 */
export function setTag(key: string, value: string): void {
  if (import.meta.env.PROD) {
    Sentry.setTag(key, value);
  }
}

/**
 * 设置上下文
 */
export function setContext(name: string, context: Record<string, any>): void {
  if (import.meta.env.PROD) {
    Sentry.setContext(name, context);
  }
}
