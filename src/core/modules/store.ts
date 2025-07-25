/**
 * @description 状态管理模块设置
 * @author 现代化架构
 */

import type { App } from 'vue';
import { setupPinia } from '@/store';

/**
 * 设置状态管理
 */
export async function setupStore(app: App): Promise<void> {
  setupPinia(app);
  console.log('✅ 状态管理模块初始化完成');
}
