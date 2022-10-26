/**
 * @name ConfigRestartPlugin
 * @description 监听配置文件修改自动重启Vite
 */
import ViteRestart from 'vite-plugin-restart';
export const ConfigRestartPlugin = () => {
  return ViteRestart({
    restart: ['.env*', '*.config.[jt]s', '**/config/*.[jt]s']
  });
};
