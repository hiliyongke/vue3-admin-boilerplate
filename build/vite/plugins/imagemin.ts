/**
 * @name ConfigImageminPlugin
 * @description 图片压缩优化插件
 */
import type { Plugin } from 'vite';
import viteImagemin from 'vite-plugin-imagemin';

export const ConfigImageminPlugin = (isBuild: boolean): Plugin | Plugin[] => {
  if (!isBuild) return [];

  return viteImagemin({
    // 图片压缩配置
    gifsicle: {
      optimizationLevel: 7,
      interlaced: false,
    },
    optipng: {
      optimizationLevel: 7,
    },
    mozjpeg: {
      quality: 80,
    },
    pngquant: {
      quality: [0.8, 0.9],
      speed: 4,
    },
    svgo: {
      plugins: [
        {
          name: 'removeViewBox',
          active: false,
        },
        {
          name: 'removeEmptyAttrs',
          active: false,
        },
      ],
    },
  });
};
