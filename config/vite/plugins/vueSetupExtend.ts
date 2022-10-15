/**
 * @name VueSetupExtend
 * @description 在使用 Vue3.2 的 setup 语法糖后，无法优雅的定义组件的 name 值，虽然 vite 会根据组件的文件名自动生成组件名，但是需要自定义的组件名时，就很不方便。
 */

// 使用说明
// <script lang="ts" setup name="demo">

import VueSetupExtend from 'vite-plugin-vue-setup-extend';

export const ConfigVueSetupExtendPlugin = () => {
  return VueSetupExtend({});
};
