/**
 * @description 插件模块设置
 * @author 现代化架构
 */

import type { App } from 'vue';
import { setupGlobalProperties, setupLogger, setupConsole } from '@/plugins';

/**
 * 设置插件
 */
export async function setupPlugins(app: App): Promise<void> {
  // 设置全局属性
  setupGlobalProperties(app);

  // 设置日志系统
  setupLogger();

  // 设置开发控制台
  setupConsole();

  console.log('✅ 插件模块初始化完成');
}
