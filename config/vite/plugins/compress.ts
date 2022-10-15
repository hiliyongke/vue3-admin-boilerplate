/**
 * @name ConfigCompressPlugin
 * @description 开启.gz压缩
 */

// 介绍
// 应用 gzip 或者 brotli 来压缩资源。能够让我的项目在构建时间接生成压缩文件

// nginx 支持 gzip
// 开启模块之前可以查看是否有模块：--with-http_gunzip_module --with-http_gzip_static_module
// nginx -V
// https://nginx.org/en/docs/
// 配置作用域 在 http, server, location 都可以

// #开启gzip功能
// gzip on;
// #开启gzip静态压缩功能
// gzip_static on;
// #gzip缓存大小
// gzip_buffers 4 16k;
// #gzip http版本
// gzip_http_version 1.1;
// #gzip 压缩级别 1-10
// gzip_comp_level 5;
// #gzip 压缩类型
// gzip_types text/plain application/javascript text/css application/xml text/javascript application/x-httpd-php image/jpeg image/gif image/png;
// # 是否在http header中添加Vary: Accept-Encoding，建议开启
// gzip_vary on;

import { Console } from 'console';
import viteCompression from 'vite-plugin-compression';
import { COMPRESSION, COMPRESSION_ALGORITHM } from '../../constant';

export const ConfigCompressPlugin = () => {
  if (COMPRESSION) {
    return viteCompression({
      verbose: true,
      disable: false, // 不禁用压缩
      deleteOriginFile: false, // 是否删除原文件，最好不删除，服务器会自动优先返回同名的.gzip资源，如果找不到还可以拿原始文件
      algorithm: COMPRESSION_ALGORITHM, // 压缩算法
      ext: '.gz', // 文件类型
      threshold: 10240, // 压缩前最小文件大小,
      success: () => {
        console.log('压缩成功啦！');
      }
    });
  }
  return [];
};
