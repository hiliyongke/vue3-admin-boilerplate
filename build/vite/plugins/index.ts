/**
 * @name createVitePlugins
 * @description 封装plugins数组统一调用
 */
import type { Plugin } from 'vite';
import vue from '@vitejs/plugin-vue';
import vueJsx from '@vitejs/plugin-vue-jsx';
import { ConfigVueSetupExtendPlugin } from './vueSetupExtend';
import { ConfigMockPlugin } from './mock';
import { ConfigVisualizerPlugin } from './visualizer';
import { ConfigSvgLoaderPlugin } from './svgLoader';
import { ConfigProgressPlugin } from './progress';
import { ConfigVConsolePlugin } from './vConsole';
import { configHtmlPlugin } from './html';
import { configPwa } from './pwa';
import { configSvgIconsPlugin } from './svgIcons';
// 新增主流插件
import { ConfigDevtoolsPlugin } from './devtools';
import { ConfigInspectPlugin } from './inspect';
import { ConfigCompressionPlugin } from './compression';
import { ConfigLegacyPlugin } from './legacy';
import { ConfigImageminPlugin } from './imagemin';

export function createVitePlugins(isBuild: boolean) {
  const vitePlugins: (Plugin | Plugin[])[] = [
    // vue支持
    vue(),
    // JSX支持
    vueJsx(),
    // PWA 支持
    configPwa(),
    // vue3 setup语法糖扩展
    ConfigVueSetupExtendPlugin(),
    // 导入svg 自动转 vue组件
    ConfigSvgLoaderPlugin(),
    // vite-plugin-mock
    ConfigMockPlugin(isBuild),
    // 在 index.html 中最小化和使用 ejs 模板语法的插件
    configHtmlPlugin(isBuild),
    // VConsole 调试工具
    ConfigVConsolePlugin(isBuild),
    // rollup-plugin-visualizer
    ConfigVisualizerPlugin(isBuild),
    // 支持svgicons
    configSvgIconsPlugin(isBuild),
    // 构建时显示进度条
    ConfigProgressPlugin(),

    // ========== 新增主流插件 ==========
    // Vue DevTools 集成（仅开发环境）
    !isBuild && ConfigDevtoolsPlugin(),
    // Vite 插件检查工具（仅开发环境）
    !isBuild && ConfigInspectPlugin(),
    // 资源压缩（gzip + brotli）
    ConfigCompressionPlugin(isBuild),
    // 旧浏览器支持（可选）
    // ConfigLegacyPlugin(isBuild),
    // 图片压缩优化
    ConfigImageminPlugin(isBuild),
  ];

  return vitePlugins;
}
