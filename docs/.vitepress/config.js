import { defineConfig } from 'vitepress';
const sidebar = [
  {
    text: '引言',
    items: [
      { text: '为什么要规范', link: '/other/前端规范是什么' },
      { text: '怎么落实规范', link: '/other/前端技术规范' }
    ]
  },
  {
    text: '规范指南',
    items: [
      { text: '目录规范', link: '/standard/structure' },
      { text: '命名规范', link: '/standard/name' },
      { text: '编码规范', link: '/standard/code' },
      { text: '注释规范', link: '/standard/comments' },
      { text: '文档规范', link: '/standard/doc' },
      { text: 'Git规范', link: '/standard/git' },
      { text: '格式规范', link: '/standard/format' },
      { text: 'Ignore规范', link: '/standard/ignore' },
      // { text: '安全规范', link: '/standard/security' },
      { text: 'VScode插件', link: '/standard/vscode' },
      { text: '技术选型', link: '/standard/技术选型' }
    ]
  },

  {
    text: '基础指南',
    items: [
      { text: '样式方案', link: '/basic/style' },
      { text: '编写组件', link: '/basic/component' },
      { text: '数据请求', link: '/basic/request' },
      { text: 'mock数据模拟', link: '/basic/mock' },
      { text: 'Svg图标', link: '/basic/svg' },
      { text: '版本控制', link: '/basic/version' }
    ]
  },
  {
    text: '基础配置',
    items: [{ text: '样式方案', link: '/basic/style' }]
  },
  {
    text: '公司统一规范',
    items: [
      { text: 'javascript', link: '/standard/language/javascript' },
      { text: 'css', link: '/standard/language/css' }
    ]
  }
];

const footer = {
  message: '.',
  copyright: 'Copyright @ 2021-2022 xxx. All Rights Reserved'
};
export default defineConfig({
  title: '前端技术指南',
  description: '前端规范', //网站描述
  lang: 'zh-CN', //语言
  head: [
    // 改变title的图标
    // [
    //     'link',
    //     {
    //         rel: 'icon',
    //         href: '/img/linktolink.png',//图片放在public文件夹下
    //     },
    // ],
  ],
  lastUpdated: true,
  markdown: {
    theme: 'material-palenight',
    lineNumbers: true
  },
  outDir: './.vitepress/dist',
  ignoreDeadLinks: true,
  themeConfig: {
    // logo: '/logo.svg',
    nav: [
      { text: 'Guide', link: '/', activeMatch: '^/$|^/guide/' },
      {
        text: 'Git Code',
        link: 'https://git.com/xxx.git'
      },
      {
        text: 'Dropdown Menu',
        items: [
          { text: 'Item A', link: '/item-1' },
          { text: 'Item B', link: '/item-2' },
          { text: 'Item C', link: '/item-3' }
        ]
      }
    ],
    docFooter: {
      prev: '上一篇',
      next: '下一篇'
    },
    sidebar,
    footer,
    lastUpdatedText: '2022-10-26'
  }
});
