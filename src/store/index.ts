/**
 * @description Pinia状态管理配置
 * @author 优化版本
 *
 * 主要功能：
 * 1. 创建Pinia实例
 * 2. 配置状态持久化插件
 * 3. 导出所有store模块
 * 4. 提供store安装函数
 */

import { createPinia, type Pinia } from 'pinia';
import { createPersistedState } from 'pinia-plugin-persistedstate';
import type { App } from 'vue';

/**
 * 创建Pinia实例
 */
const pinia: Pinia = createPinia();

/**
 * 配置状态持久化插件
 * 支持将store状态自动保存到localStorage
 */
pinia.use(
  createPersistedState({
    // 默认使用localStorage存储
    storage: localStorage,
    // 数据序列化配置
    serializer: {
      serialize: JSON.stringify,
      deserialize: JSON.parse,
    },
    // 可以通过key函数自定义存储键名
    key: (id: string) => `__persisted__${id}`,
    // 默认持久化所有状态，可在具体store中配置
    auto: true,
  })
);

// 导出所有store模块
export * from './modules/lock-screen';
export * from './modules/notification';
export * from './modules/permission';
export * from './modules/user';
export * from './modules/setting';
export * from './modules/tabs-router';

// 确保所有store都被正确导出
export { useUserStore } from './modules/user';
export { usePermissionStore } from './modules/permission';
export { useSettingStore } from './modules/setting';
export { useLockScreenStore } from './modules/lock-screen';
export { useNotificationStore } from './modules/notification';
export { useTabsRouterStore } from './modules/tabs-router';

/**
 * 安装Pinia到Vue应用
 * @param app Vue应用实例
 */
export function setupPinia(app: App<Element>): void {
  app.use(pinia);
}

export default pinia;
