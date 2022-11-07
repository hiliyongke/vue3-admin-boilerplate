/**
 * vite pwa 0 配置插件
 * https://github.com/antfu/vite-plugin-pwa
 */

import {
  APP_TITLE,
  PWA,
  VITE_GLOB_APP_SHORT_NAME
} from '../../../build/constant';
import { VitePWA } from 'vite-plugin-pwa';

export const configPwa = () => {
  if (PWA) {
    // vite-plugin-pwa
    const pwaPlugin = VitePWA({
      manifest: {
        name: APP_TITLE,
        short_name: VITE_GLOB_APP_SHORT_NAME,
        icons: [
          {
            src: './resource/images/logo-192x192.png',
            sizes: '192x192',
            type: 'image/png'
          },
          {
            src: './resource/images/logo-512x512.png',
            sizes: '512x512',
            type: 'image/png'
          }
        ]
      }
    });
    return pwaPlugin;
  }
  return [];
};
