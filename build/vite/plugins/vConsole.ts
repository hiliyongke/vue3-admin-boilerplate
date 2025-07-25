/**
 * @name ConfigVConsolePlugin
 * @description VConsole 调试工具配置
 */
import { V_CONSOLE } from '../../constant';

export const ConfigVConsolePlugin = (isBuild: boolean) => {
  // vite-plugin-vconsole 插件不存在，暂时禁用
  // 如果需要 VConsole，可以直接在代码中引入 vconsole 包
  return [];
};
