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
import { ConfigVisualizerConfig } from './visualizer';
import { ConfigCompressPlugin } from './compress';
import { ConfigRestartPlugin } from './restart';
import { ConfigSvgLoaderPlugin } from './svgLoader';
import { ConfigMarkDownPlugin } from './markdown';
import { ConfigProgressPlugin } from './progress';
import { ConfigVConsolePlugin } from './vConsole';
import { ConfigInspectPlugin } from './inspect';
import { ConfigWindicssPlugin } from './windicss';

export function createVitePlugins(isBuild: boolean) {
  const vitePlugins: (Plugin | Plugin[])[] = [
    // vue支持
    vue(),
    // JSX支持
    vueJsx(),
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
    // inspect 调试工具
    ConfigInspectPlugin(),
    // VConsole 调试工具
    ConfigVConsolePlugin(isBuild),
    // rollup-plugin-visualizer
    ConfigVisualizerConfig(),
    // 支持 markdown 转 vue 组件
    ConfigMarkDownPlugin(),
    // 支持 windicss
    ConfigWindicssPlugin(),
    // 构建时显示进度条
    ConfigProgressPlugin(),
    // 监听配置文件改动重启
    ConfigRestartPlugin()
  ];

  return vitePlugins;
}
