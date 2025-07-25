/**
 * @description 国际化模块设置
 * @author 现代化架构
 */

import type { App } from 'vue';
import { setupI18n as setupI18nPlugin } from '@/i18n';

/**
 * 设置国际化
 */
export async function setupI18n(app: App): Promise<void> {
  setupI18nPlugin(app);
  console.log('✅ 国际化模块初始化完成');
}
