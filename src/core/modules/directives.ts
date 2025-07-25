/**
 * @description 指令模块设置
 * @author 现代化架构
 */

import type { App } from 'vue';
import { setupGlobDirectives } from '@/plugins';

/**
 * 设置指令
 */
export async function setupDirectives(app: App): Promise<void> {
  setupGlobDirectives(app);
  console.log('✅ 指令模块初始化完成');
}
