/**
 * @name ConfigCompressionPlugin
 * @description 生产环境资源压缩插件，支持 gzip 和 brotli
 */
import type { Plugin } from 'vite';
import compression from 'vite-plugin-compression2';

export const ConfigCompressionPlugin = (isBuild: boolean): Plugin | Plugin[] => {
  if (!isBuild) return [];

  return [
    // gzip 压缩
    compression({
      algorithm: 'gzip',
      exclude: [/\.(br)$/, /\.(gz)$/],
      threshold: 10240, // 10KB 以上才压缩
      deleteOriginFile: false,
    }),
    // brotli 压缩（压缩率更高）
    compression({
      algorithm: 'brotliCompress',
      exclude: [/\.(br)$/, /\.(gz)$/],
      threshold: 10240,
      deleteOriginFile: false,
    }),
  ];
};
