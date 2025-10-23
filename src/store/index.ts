/**
 * @description Pinia 状态管理入口
 */

import { createPinia, type Pinia } from 'pinia';
import { createPersistedState } from 'pinia-plugin-persistedstate';
import type { App } from 'vue';

/**
 * 创建 Pinia 实例
 */
const pinia: Pinia = createPinia();

/**
 * 配置状态持久化插件
 * 支持将 store 状态自动保存到 localStorage
 */
pinia.use(
  createPersistedState({
    storage: typeof window !== 'undefined' ? window.localStorage : undefined,
    serializer: {
      serialize: JSON.stringify,
      deserialize: JSON.parse,
    },
    key: (id: string) => `__persisted__${id}`,
    auto: true,
  })
);

// 导出所有 store 模块
import { useUserStore } from './modules/user';
import { usePermissionStore } from './modules/permission';
import { useSettingStore } from './modules/setting';
import { useLockScreenStore } from './modules/lock-screen';
import { useNotificationStore } from './modules/notification';

export { useUserStore, usePermissionStore, useSettingStore, useLockScreenStore, useNotificationStore };
export { useNavigationTabStore } from '@/features/navigation/tabs';

// 工具：在组件外使用时获取实例化的 store
export function getUserStore() {
  return useUserStore(pinia);
}

export function getPermissionStore() {
  return usePermissionStore(pinia);
}

export function getSettingStore() {
  return useSettingStore(pinia);
}

export function getLockScreenStore() {
  return useLockScreenStore(pinia);
}

export function getNotificationStore() {
  return useNotificationStore(pinia);
}

/**
 * 安装 Pinia 到 Vue 应用
 */
export function setupPinia(app: App<Element>): void {
  app.use(pinia);
}

export default pinia;
