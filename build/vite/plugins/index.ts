/**
 * @name createVitePlugins
 * @description 封装plugins数组统一调用
 */
import type { Plugin } from 'vite';
import vue from '@vitejs/plugin-vue';
import vueJsx from '@vitejs/plugin-vue-jsx';
import { ConfigVueSetupExtendPlugin } from './vueSetupExtend';
import { AutoRegistryComponents } from './autoRegistryComponents';
import { AutoImportDeps } from './autoImport';
import { ConfigMockPlugin } from './mock';
import { ConfigVisualizerPlugin } from './visualizer';
import { ConfigCompressPlugin } from './compress';
import { ConfigRestartPlugin } from './restart';
import { ConfigSvgLoaderPlugin } from './svgLoader';
import { ConfigProgressPlugin } from './progress';
import { ConfigVConsolePlugin } from './vConsole';
import { ConfigWindicssPlugin } from './windicss';
import { configHtmlPlugin } from './html';
import { configPwa } from './pwa';
import { configSvgIconsPlugin } from './svgIcons';

export function createVitePlugins(isBuild: boolean) {
  const vitePlugins: (Plugin | Plugin[])[] = [
    // vue支持
    vue(),
    // JSX支持
    vueJsx(),
    configPwa(),
    // vue3 setup语法糖扩展
    ConfigVueSetupExtendPlugin(),
    // 自动按需引入组件
    AutoRegistryComponents(),
    // 自动按需引入依赖
    AutoImportDeps(),
    // 开启.gz压缩  rollup-plugin-gzip
    ConfigCompressPlugin(),
    // 导入svg 自动转 vue组件
    ConfigSvgLoaderPlugin(),
    // vite-plugin-mock
    ConfigMockPlugin(isBuild),
    // 在 index.html 中最小化和使用 ejs 模板语法的插件。
    configHtmlPlugin(isBuild),
    // VConsole 调试工具
    ConfigVConsolePlugin(isBuild),
    // rollup-plugin-visualizer
    ConfigVisualizerPlugin(isBuild),
    // 支持 windicss
    ConfigWindicssPlugin(),
    // 支持svgicons
    configSvgIconsPlugin(isBuild),
    // 构建时显示进度条
    ConfigProgressPlugin(),
    // 监听配置文件改动重启
    ConfigRestartPlugin()
  ];

  return vitePlugins;
}
