/**
 * @description Vue3应用程序入口文件
 * @author 优化版本
 *
 * 主要功能：
 * 1. 创建Vue应用实例
 * 2. 配置全局插件和中间件
 * 3. 设置路由守卫和错误处理
 * 4. 初始化国际化和状态管理
 * 5. 配置性能监控
 */

import { type App, createApp } from 'vue';
import AppPage from '@/app.vue';
import router, { setupRouter } from '@/router';
import { setupPinia } from '@/store';
import { setupErrorHandle } from './utils/error-handler';
import { setupRouterGuard } from './router/guards';
import { setupI18n } from '@/i18n';
import {
  setupGlobDirectives,
  setupGlobalProperties,
  setupLogger,
  setupConsole,
  setupCustomComponents,
} from '@/plugins';
import MiniMonitor from '@/utils/mini-monitor/index';

// 解决移动端滚动穿透问题
import 'default-passive-events';
// 注册SVG图标
import 'virtual:svg-icons-register';

// 样式文件导入
import 'uno.css';
import '@/style/index.less';

/**
 * 创建Vue应用实例
 */
const app = createApp(AppPage);

/**
 * 应用程序启动配置函数
 * @param app Vue应用实例
 */
function bootstrap(app: App<Element>): void {
  // 开启性能追踪 - 在开发环境下启用组件性能监控
  if (import.meta.env.DEV) {
    app.config.performance = true;
  }

  // 注册全局指令 - 包括权限、防抖、拖拽等指令
  setupGlobDirectives(app);

  // 注册全局组件 - 注册常用的业务组件
  setupCustomComponents(app);

  // 注册全局属性 - 挂载全局方法和属性到Vue实例
  setupGlobalProperties(app);

  // 配置全局错误处理器 - 统一处理应用程序错误
  setupErrorHandle(app);

  // 配置状态管理 - 初始化Pinia状态管理
  setupPinia(app);

  // 配置路由系统 - 注册Vue Router
  setupRouter(app);

  // 配置路由守卫 - 设置权限验证、页面跳转拦截等
  setupRouterGuard(router);

  // 配置国际化 - 初始化多语言支持
  setupI18n(app);

  // 配置日志系统 - 初始化应用日志记录
  setupLogger();

  // 配置开发控制台 - 美化开发环境控制台输出
  setupConsole();

  // 初始化性能监控系统
  if (import.meta.env.PROD) {
    new MiniMonitor({
      url: import.meta.env.VITE_MONITOR_URL || '', // 监控数据收集接口
      baseParams: {
        appName: import.meta.env.VITE_APP_TITLE || 'Vue3-Admin',
        version: import.meta.env.VITE_APP_VERSION || '1.0.0',
      },
      // 监控域名白名单
      whiteName: [location.hostname, 'localhost', '127.0.0.1'],
      // 首屏渲染时间阈值，超过此值不进行数据收集
      fpLimit: 4000,
      // 生产环境关闭控制台输出
      showConsole: import.meta.env.DEV,
    });
  }

  // 等待路由准备完成后挂载应用
  // 这确保了所有异步路由都已加载完成
  router.isReady().then(() => {
    app.mount('#app');
    console.log('🚀 应用启动成功');
  });

  // 配置路由错误处理
  router.onError((error: Error) => {
    console.error('🚨 路由错误:', error);
    // 可以在这里添加错误上报逻辑
  });
}

// 启动应用程序
void bootstrap(app);
