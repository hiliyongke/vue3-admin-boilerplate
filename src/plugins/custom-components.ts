/*
 * @Description: 全局注册自定义组件
 */
import type { App } from 'vue';

// TDesign 组件库
import TDesign from 'tdesign-vue-next';
import 'tdesign-vue-next/es/style/index.css';

// 自定义组件
import JsonSchemaEditor from '@/components/json-schema-editor/index.vue';
import SvgIcon from '@/components/svg-icon/index.vue';
import BackTop from '@/components/back-top/index.vue';

export function setupCustomComponents(app: App) {
  // 注册 TDesign 组件库
  app.use(TDesign);

  // 注册自定义组件
  app.component('JsonSchemaEditor', JsonSchemaEditor);
  app.component('SvgIcons', SvgIcon);
  app.component('BackTop', BackTop);
}
