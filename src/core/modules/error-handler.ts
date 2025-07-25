/**
 * @description 错误处理模块
 * @author 现代化架构
 */

import type { App } from 'vue';
import { setupErrorHandle } from '@/utils/error-handler';

/**
 * 设置错误处理器
 */
export async function setupErrorHandler(app: App): Promise<void> {
  setupErrorHandle(app);
  console.log('✅ 错误处理模块初始化完成');
}
