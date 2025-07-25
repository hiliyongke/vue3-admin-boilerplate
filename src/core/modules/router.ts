/**
 * @description 路由模块设置
 * @author 现代化架构
 */

import type { App } from 'vue';
import router from '@/router';
import { setupRouterGuard } from '@/router/guards';

/**
 * 设置路由
 */
export async function setupRouter(app: App): Promise<void> {
  // 注册路由
  app.use(router);

  // 设置路由守卫
  setupRouterGuard(router);

  // 等待路由准备就绪
  await router.isReady();

  console.log('✅ 路由模块初始化完成');
}
