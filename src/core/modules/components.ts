/**
 * @description 组件模块设置
 * @author 现代化架构
 */

import type { App } from 'vue';
import { setupCustomComponents } from '@/plugins';

/**
 * 设置全局组件
 */
export async function setupComponents(app: App): Promise<void> {
  setupCustomComponents(app);
  console.log('✅ 组件模块初始化完成');
}
