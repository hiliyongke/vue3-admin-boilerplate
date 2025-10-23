/*
 * @Description: 注册全局属性
 */

import type { App } from 'vue';
import api from '@/api/index';
import mitt from 'mitt';

export function setupGlobalProperties(app: App) {
  app.config.globalProperties.$api = api;
  app.config.globalProperties.mittBus = mitt();
}
