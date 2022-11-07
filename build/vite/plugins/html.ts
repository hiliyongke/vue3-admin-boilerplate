/**
 * 在 index.html 中最小化和使用 ejs 模板语法的插件。
 * https://github.com/anncwb/vite-plugin-html
 */

import { createHtmlPlugin } from 'vite-plugin-html';
import pkg from '../../../package.json';
import { GLOB_CONFIG_FILE_NAME, APP_TITLE, PUBLIC_PATH } from '../../constant';

export const configHtmlPlugin = (isBuild: boolean) => {
  const path = PUBLIC_PATH.endsWith('/') ? PUBLIC_PATH : `${PUBLIC_PATH}/`;

  const htmlPlugin = createHtmlPlugin({
    minify: isBuild,
    inject: {
      // Inject data into ejs template
      data: {
        title: '欢迎使用' + APP_TITLE
      },
      // Embed the generated app.config.js file
      tags: []
    }
  });
  return htmlPlugin;
};
