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
  setupConsole,
  setupCustomComponents
} from '@/plugins';
import i18n from '@/i18n';
import './router/guards';
import 'default-passive-events'; //解决滚动背景的问题
import '@/style/index.less';
import 'virtual:windi.css';

const app = createApp(App);

// 设置此项为 true 可以在浏览器开发工具的“性能/时间线”页中启用对组件初始化、编译、渲染和修补的性能表现追踪。
app.config.performance = true;

// logger
setupLogger();

// Register global directive
setupGlobDirectives(app);

// Register global component
setupCustomComponents(app);

// Register global properties
setupGlobalProperties(app);

// 个性化控制台
setupConsole();

app.use(i18n);
app.use(pinia);
app.use(router);

// 现在所有的导航都是异步的，等路由ready以后再进行挂载组件；
// router.isReady().then(() => app.mount('#app'));
app.mount('#app');
// 在导航期间每次发生未捕获的错误时都会调用该处理程序
// eslint-disable-next-line no-console
router.onError(err => {
  console.error(err);
});
