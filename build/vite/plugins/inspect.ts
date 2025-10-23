/**
 * @name ConfigInspectPlugin
 * @description Vite 插件检查工具，用于调试和查看插件转换过程
 */
import Inspect from 'vite-plugin-inspect';

export const ConfigInspectPlugin = () => {
  return Inspect({
    // 启用后可以访问 http://localhost:5173/__inspect/ 查看插件转换过程
    enabled: true,
  });
};
