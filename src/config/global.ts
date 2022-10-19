export const prefix = 'tdesign-starter';
export const TOKEN_NAME = 'tdesign-starter';

import enUs from 'tdesign-vue-next/es/locale/en_US';
import zhCn from 'tdesign-vue-next/es/locale/zh_CN';
// Tdesign全局特性配置
export const globalConfig = Object.assign(
  localStorage.getItem('language') === 'zh-CN' ? zhCn : enUs,
  {
    // 可以在此处定义更多自定义配置，具体可配置内容参看 API 文档 https://tdesign.tencent.com/vue-next/config
    calendar: {},
    table: {},
    pagination: {}
  }
);
