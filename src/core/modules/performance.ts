/**
 * @description 性能监控模块
 * @author 现代化架构
 */

import type { App } from 'vue';
import MiniMonitor from '@/utils/mini-monitor/index';

/**
 * 设置性能监控
 */
export async function setupPerformanceMonitor(app: App): Promise<void> {
  // 开发环境启用性能追踪
  if (import.meta.env.DEV) {
    app.config.performance = true;
  }

  // 生产环境启用性能监控
  if (import.meta.env.PROD && import.meta.env.VITE_MONITOR_URL) {
    new MiniMonitor({
      url: import.meta.env.VITE_MONITOR_URL,
      baseParams: {
        appName: import.meta.env.VITE_APP_TITLE || 'Vue3-Admin',
        version: import.meta.env.VITE_APP_VERSION || '1.0.0',
      },
      whiteName: [location.hostname, 'localhost', '127.0.0.1'],
      fpLimit: 4000,
      showConsole: import.meta.env.DEV,
    });
  }

  console.log('✅ 性能监控模块初始化完成');
}
