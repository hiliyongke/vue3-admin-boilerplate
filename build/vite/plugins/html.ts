/**
 * 在 index.html 中最小化和使用 ejs 模板语法的插件。
 * https://github.com/anncwb/vite-plugin-html
 */

import { createHtmlPlugin } from 'vite-plugin-html';
import pkg from '../../../package.json';
import { GLOB_CONFIG_FILE_NAME, APP_TITLE, PUBLIC_PATH } from '../../constant';

export const configHtmlPlugin = (isBuild: boolean) => {
  const path = PUBLIC_PATH.endsWith('/') ? PUBLIC_PATH : `${PUBLIC_PATH}/`;

  const getAppConfigSrc = () =>
    `${path || '/'}${GLOB_CONFIG_FILE_NAME}?v=${
      pkg.version
    }-${new Date().getTime()}`;

  const htmlPlugin = createHtmlPlugin({
    minify: isBuild,
    inject: {
      // Inject data into ejs template
      data: {
        title: APP_TITLE
      },
      // Embed the generated app.config.js file
      tags: isBuild
        ? [
            {
              tag: 'script',
              attrs: {
                src: getAppConfigSrc()
              }
            }
          ]
        : []
    }
  });
  return htmlPlugin;
};
