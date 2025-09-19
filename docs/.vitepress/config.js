export default {
  // base:'/docs/',
  base: '/vue3-admin-boilerplate/',
  title: '前端技术指南',
  description: '前端规范', //网站描述
  lang: 'zh-CN', //语言
  ignoreDeadLinks: true,
  themeConfig: {
    // logo: "/logo.png",
    nav: [
      {
        text: '首页',
        link: '/guid/index',
      },
      {
        text: '规范指南',
        link: '/standard/index',
      },
      {
        text: '基础配置',
        link: '/basic/index',
      },
      {
        text: '选型指南',
        link: '/recommend/index',
      },
      {
        text: '其他',
        link: '/other/index',
      },
    ],
    socialLinks: [
      {
        icon: 'github',
        link: 'https://github.com/hiliyongke/vue3-admin-boilerplate',
      },
    ],
    sidebar: {
      '/guid/': [
        {
          text: '首页',
          items: [
            { text: '简介', link: '/guid/index' },
            { text: '详细介绍', link: '/guid/readme' },
          ],
        },
      ],
      '/standard/': [
        {
          text: '编码规范',
          // collapsible: true,
          items: [
            { text: '目录规范', link: '/standard/structure' },
            { text: '命名规范', link: '/standard/name' },
            { text: '编码规范', link: '/standard/code' },
            { text: '注释规范', link: '/standard/comments' },
            { text: '文档规范', link: '/standard/doc' },
            { text: 'Git规范', link: '/standard/git' },
            { text: '格式规范', link: '/standard/format' },
            { text: 'Ignore规范', link: '/standard/ignore' },
          ],
        },
        // {
        //   text: '公司统一规范',
        //   items: [
        //     { text: 'javascript', link: '/standard/javascript' },
        //     { text: 'css', link: '/standard/css' }
        //   ]
        // }
      ],
      '/basic/': [
        {
          text: '基础指南',
          items: [
            { text: '基础指南', link: '/basic/' },
            { text: '样式方案', link: '/basic/style' },
            { text: '编写组件', link: '/basic/component' },
            { text: '数据请求', link: '/basic/request' },
            { text: 'mock数据', link: '/basic/mock' },
            // { text: 'Svg图标', link: '/basic/svg' },
            { text: '版本控制', link: '/basic/version' },
          ],
        },
        {
          text: '基础配置',
          items: [{ text: '样式方案', link: '/basic/style' }],
        },
      ],

      '/recommend/': [
        {
          text: '技术选型',
          items: [
            { text: 'VScode插件', link: '/recommend/vscode' },
            { text: '技术选型', link: '/recommend/technology_stack' },
          ],
        },
      ],
      '/other/': [
        {
          text: '引言',
          items: [
            // { text: '为什么要规范', link: '/other/前端规范是什么' },
            { text: '怎么落实规范', link: '/other/前端技术规范' },
          ],
        },
      ],
    },
    docFooter: {
      prev: '上一篇',
      next: '下一篇',
    },
    footer: {
      message: '',
      copyright: 'Copyright @ 2021-2022 xxx. All Rights Reserved',
    },
  },
};
