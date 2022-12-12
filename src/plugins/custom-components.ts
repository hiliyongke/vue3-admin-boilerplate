/*
 * @Description: 全局注册自定义组件
 */
import type { App } from 'vue';

import JsonSchemaEditor from '@/components/json-schema-editor/index.vue';
import SvgIcon from '@/components/svg-icon/index.vue';
import BackTop from '@/components/back-top/index.vue';
export function setupCustomComponents(app: App) {
  app.component('JsonSchemaEditor', JsonSchemaEditor);
  app.component('SvgIcons', SvgIcon);
  app.component('BackTop', BackTop);
}
