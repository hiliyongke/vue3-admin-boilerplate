/**
 * @description 应用核心启动器
 * @author 现代化架构
 */

import type { App } from 'vue';
import { createApp } from 'vue';
import AppComponent from '@/app.vue';

// 核心模块
import { setupRouter } from './modules/router';
import { setupStore } from './modules/store';
import { setupI18n } from './modules/i18n';
import { setupDirectives } from './modules/directives';
import { setupComponents } from './modules/components';
import { setupPlugins } from './modules/plugins';
import { setupErrorHandler } from './modules/error-handler';
import { setupPerformanceMonitor } from './modules/performance';
import { setupSentry } from './modules/sentry';
import { setupWebVitals, setupCustomPerformance } from './modules/web-vitals';

/**
 * 应用启动器类
 */
export class AppBootstrap {
  private app: App;

  constructor() {
    this.app = createApp(AppComponent);
  }

  /**
   * 初始化应用
   */
  async initialize(): Promise<App> {
    try {
      // 设置错误处理器（优先级最高）
      await this.setupErrorHandler();

      // 设置性能监控
      await this.setupPerformanceMonitor();

      // 设置状态管理
      await this.setupStore();

      // 设置路由
      await this.setupRouter();

      // 设置 Sentry（需要 router）
      await this.setupSentry();

      // 设置 Web Vitals
      await this.setupWebVitals();

      // 设置国际化
      await this.setupI18n();

      // 设置指令
      await this.setupDirectives();

      // 设置全局组件
      await this.setupComponents();

      // 设置插件
      await this.setupPlugins();

      console.log('🚀 应用初始化完成');
      return this.app;
    } catch (error) {
      console.error('❌ 应用初始化失败:', error);
      throw error;
    }
  }

  /**
   * 挂载应用
   */
  mount(selector: string = '#app'): void {
    this.app.mount(selector);
    console.log('✅ 应用挂载成功');
  }

  /**
   * 设置错误处理器
   */
  private async setupErrorHandler(): Promise<void> {
    await setupErrorHandler(this.app);
  }

  /**
   * 设置性能监控
   */
  private async setupPerformanceMonitor(): Promise<void> {
    await setupPerformanceMonitor(this.app);
  }

  /**
   * 设置状态管理
   */
  private async setupStore(): Promise<void> {
    await setupStore(this.app);
  }

  /**
   * 设置路由
   */
  private async setupRouter(): Promise<void> {
    await setupRouter(this.app);
  }

  /**
   * 设置国际化
   */
  private async setupI18n(): Promise<void> {
    await setupI18n(this.app);
  }

  /**
   * 设置指令
   */
  private async setupDirectives(): Promise<void> {
    await setupDirectives(this.app);
  }

  /**
   * 设置全局组件
   */
  private async setupComponents(): Promise<void> {
    await setupComponents(this.app);
  }

  /**
   * 设置插件
   */
  private async setupPlugins(): Promise<void> {
    await setupPlugins(this.app);
  }

  /**
   * 设置 Sentry
   */
  private async setupSentry(): Promise<void> {
    const router = (this.app.config.globalProperties as any).$router;
    if (router) {
      await setupSentry(this.app, router);
    }
  }

  /**
   * 设置 Web Vitals
   */
  private async setupWebVitals(): Promise<void> {
    setupWebVitals();
    setupCustomPerformance();
  }
}

/**
 * 创建应用实例
 */
export async function createAppInstance(): Promise<App> {
  const bootstrap = new AppBootstrap();
  return await bootstrap.initialize();
}

/**
 * 启动应用
 */
export async function startApp(): Promise<void> {
  try {
    const bootstrap = new AppBootstrap();
    const app = await bootstrap.initialize();
    bootstrap.mount();
  } catch (error) {
    console.error('应用启动失败:', error);
    // 可以在这里添加错误上报逻辑
  }
}
