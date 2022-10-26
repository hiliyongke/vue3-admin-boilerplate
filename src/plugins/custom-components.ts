/*
 * @Description: 全局注册自定义组件
 */
import type { App } from 'vue';

import JsonSchemaEditor from '@/components/basic/json-schema-editor/index.vue';
import SvgIcon from '@/components/basic/svg-icon/index.vue';
export function setupCustomComponents(app: App) {
  app.component('JsonSchemaEditor', JsonSchemaEditor);
  app.component('SvgIcons', SvgIcon);
}
