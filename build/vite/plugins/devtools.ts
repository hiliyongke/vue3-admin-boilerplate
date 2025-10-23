/**
 * @name ConfigDevtoolsPlugin
 * @description Vue DevTools 集成插件，提供更好的开发体验
 */
import VueDevTools from 'vite-plugin-vue-devtools';

export const ConfigDevtoolsPlugin = () => {
  return VueDevTools({
    // 自定义配置
    launchEditor: 'code', // 使用 VS Code 打开文件
  });
};
