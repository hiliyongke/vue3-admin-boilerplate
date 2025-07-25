/**
 * @name ConfigMockPlugin
 * @description 引入mockjs，本地模拟接口
 */
import { viteMockServe } from 'vite-plugin-mock';
import { MOCK } from '../../constant';
export const ConfigMockPlugin = (isBuild: boolean) => {
  return MOCK
    ? viteMockServe({
        ignore: /^\_/,
        mockPath: 'mock',
        enable: !isBuild,
        logger: false,
        // https://github.com/anncwb/vite-plugin-mock/issues/9
        injectCode: `
       import { setupProdMockServer } from '../mock/_createProdMockServer';
       setupProdMockServer();
       `
      })
    : [];
};
