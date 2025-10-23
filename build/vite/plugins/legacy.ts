/**
 * @name ConfigLegacyPlugin
 * @description 为旧版浏览器提供支持（可选）
 */
import legacy from '@vitejs/plugin-legacy';

export const ConfigLegacyPlugin = (isBuild: boolean) => {
  if (!isBuild) return [];

  return legacy({
    targets: ['defaults', 'not IE 11'], // 支持主流浏览器，不支持 IE11
    modernPolyfills: true,
    renderLegacyChunks: false, // 不生成 legacy chunk，只 polyfill
  });
};
