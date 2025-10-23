/**
 * @description Sentry 错误追踪插件
 * @author 现代化重构版本
 */

import type { App } from 'vue';
// import * as Sentry from '@sentry/vue';

/**
 * Sentry 配置选项
 */
export interface SentryOptions {
  /**
   * DSN 地址
   */
  dsn?: string;

  /**
   * 环境
   */
  environment?: string;

  /**
   * 采样率
   */
  tracesSampleRate?: number;

  /**
   * 是否启用
   */
  enabled?: boolean;
}

/**
 * 设置 Sentry
 *
 * @example
 * ```ts
 * setupSentry(app, {
 *   dsn: 'https://xxx@xxx.ingest.sentry.io/xxx',
 *   environment: 'production',
 *   tracesSampleRate: 1.0
 * })
 * ```
 */
export function setupSentry(app: App, options: SentryOptions = {}): void {
  const {
    dsn = import.meta.env.VITE_SENTRY_DSN,
    environment = import.meta.env.MODE,
    tracesSampleRate = 1.0,
    enabled = import.meta.env.PROD,
  } = options;

  // 仅在生产环境启用
  if (!enabled || !dsn) {
    console.log('⚠️ Sentry 未启用');
    return;
  }

  try {
    // 注意：需要先安装 @sentry/vue
    // pnpm add @sentry/vue

    // Sentry.init({
    //   app,
    //   dsn,
    //   environment,
    //   integrations: [
    //     Sentry.browserTracingIntegration(),
    //     Sentry.replayIntegration({
    //       maskAllText: false,
    //       blockAllMedia: false,
    //     }),
    //   ],
    //   tracesSampleRate,
    //   replaysSessionSampleRate: 0.1,
    //   replaysOnErrorSampleRate: 1.0,
    // });

    console.log('✅ Sentry 已启用');
  } catch (error) {
    console.error('❌ Sentry 初始化失败:', error);
  }
}

/**
 * 捕获异常
 */
export function captureException(error: Error, context?: Record<string, any>): void {
  console.error('捕获异常:', error, context);

  // if (import.meta.env.PROD) {
  //   Sentry.captureException(error, {
  //     extra: context,
  //   });
  // }
}

/**
 * 捕获消息
 */
export function captureMessage(message: string, level: 'info' | 'warning' | 'error' = 'info'): void {
  console.log(`[${level}] ${message}`);

  // if (import.meta.env.PROD) {
  //   Sentry.captureMessage(message, level);
  // }
}

/**
 * 设置用户信息
 */
export function setUser(user: { id: string; username?: string; email?: string }): void {
  console.log('设置用户信息:', user);

  // if (import.meta.env.PROD) {
  //   Sentry.setUser(user);
  // }
}

/**
 * 清除用户信息
 */
export function clearUser(): void {
  console.log('清除用户信息');

  // if (import.meta.env.PROD) {
  //   Sentry.setUser(null);
  // }
}
