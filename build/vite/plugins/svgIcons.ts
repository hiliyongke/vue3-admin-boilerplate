/**
 * 用于快速创建 SVG 精灵的 Vite 插件。
 * @param isBuild 是否为生产环境
 */
import { createSvgIconsPlugin } from 'vite-plugin-svg-icons';
import path from 'path';
export const configSvgIconsPlugin = (isBuild: boolean) => {
  const svgIconsPlugin = createSvgIconsPlugin({
    iconDirs: [path.resolve(process.cwd(), 'src/assets/svg')],
    svgoOptions: isBuild,
    // default
    symbolId: '[name]'
  });
  return svgIconsPlugin;
};
