/**
 * @name SvgLoader
 * @description 导入svg 自动转 vue组件
 */
import SvgLoader from 'vite-svg-loader';

export const ConfigSvgLoaderPlugin = () => {
  return SvgLoader({ defaultImport: 'component' });
};
