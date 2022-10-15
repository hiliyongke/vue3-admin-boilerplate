/*
 * @Description:国际化配置
 */

import { createI18n } from 'vue-i18n';

const messages: { [x: string]: any } = {};
// 注意这里使用locales文件名 是有原因的 不然插件不识别
const languages: any = import.meta.glob('./locales/*.json', { eager: true });
Object.keys(languages).forEach(key => {
  messages[key.replace(/(locales\/|\.\/|\.json)/g, '')] =
    languages[key].default;
});
const language = navigator.language || 'zh-CN'; // 这是获取浏览器的语言
const i18n = createI18n({
  locale: localStorage.getItem('language') || language || 'zh-CN', // 首先从缓存里拿，没有的话就用浏览器语言，
  fallbackLocale: 'zh-CN', // 设置备用语言
  messages,
  legacy: false
});

export default i18n;
