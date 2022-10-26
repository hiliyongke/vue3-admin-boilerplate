/**
 * @name ConfigVConsolePlugin
 * @description VConsole 调试工具配置
 */
import { viteVConsole } from 'vite-plugin-vconsole';
import * as path from 'path';
import { V_CONSOLE } from '../../constant';
export const ConfigVConsolePlugin = (isBuild: boolean) => {
  return V_CONSOLE
    ? viteVConsole({
        entry: [path.resolve('./src/main.ts')], // 每个页面的入口文件，和上面不一样的地方，这里是一个数组
        localEnabled: true,
        enabled: !isBuild,
        config: {
          // maxLogNumber: 1000,
          theme: 'light'
        }
      })
    : [];
};
