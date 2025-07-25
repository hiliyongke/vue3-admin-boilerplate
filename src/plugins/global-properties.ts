/*
 * @Description: 注册全局属性
 */

import type { App } from 'vue';
import api from '@/api/index';
import itools from '../../packages/itools/src/index.js';
import mitt from 'mitt';

export function setupGlobalProperties(app: App) {
  app.config.globalProperties.$api = api;
  app.config.globalProperties.$itools = itools;
  app.config.globalProperties.mittBus = mitt();
}
