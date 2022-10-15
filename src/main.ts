/*
 * @Description: vue实例入口
 */
import { createApp } from 'vue';
import App from '@/app.vue';
import router from '@/router';
import pinia from '@/store';
import {
  setupGlobDirectives,
  setupGlobalProperties,
  setupLogger,
  setupConsole
} from '@/plugins';
import i18n from '@/i18n';
import './router/guards';
import 'default-passive-events'; //解决滚动背景的问题
import '@/style/index.less';
import 'virtual:windi.css';
import JsonSchemaEditor from '@/components/basic/json-schema-editor/index.vue';

const app = createApp(App);

// 设置此项为 true 可以在浏览器开发工具的“性能/时间线”页中启用对组件初始化、编译、渲染和修补的性能表现追踪。
app.config.performance = true;

// logger
setupLogger();

// Register global directive
setupGlobDirectives(app);

// Register global properties
setupGlobalProperties(app);

// 个性化控制台
setupConsole();

app.use(i18n);
app.use(pinia);
app.use(router);

app.component('JsonSchemaEditor', JsonSchemaEditor);
app.mount('#app');
