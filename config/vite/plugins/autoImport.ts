/**
 * @name AutoImport
 * @description setup语法让我们不用再一个一个的把变量和方法都 return 出去就能在模板上使用，大大的解放了我们的双手。然而对于一些常用的VueAPI，比如 ref、computed、watch 等，还是每次都需要我们在页面上手动进行 import。我们可以通过 unplugin-auto-import 实现自动导入，无需 import 即可在文件里使用Vue的API
 */

import AutoImport from 'unplugin-auto-import/vite';
export const AutoImportDeps = () => {
  return AutoImport({
    dts: 'types/auto-imports.d.ts', // 声明文件生成位置和文件名称
    imports: ['vue', 'pinia', 'vue-router', '@vueuse/core', 'vue-i18n'],
    // 目标文件
    include: [
      /\.[tj]sx?$/, // .ts, .tsx, .js, .jsx
      /\.vue$/,
      /\.vue\?vue/, // .vue
      /\.md$/ // .md
    ],

    // eslint报错解决
    eslintrc: {
      enabled: false, // Default `false` 生成配置文件，如果是ts项目，通常我们会把声明文件放在根目录/types中，注意，这个文件夹需要先建好，否则可能导致等下无法往里生成auto-imports.d.ts文件
      filepath: './.eslintrc-auto-import.json', // Default `./.eslintrc-auto-import.json` 生成json文件,可以不配置该项，默认就是将生成在根目录
      globalsPropValue: true // Default `true`, (true | false | 'readonly' | 'readable' | 'writable' | 'writeable')
    },
    // custom resolvers
    // 可以在这自定义自己的东西，比如接口api的引入，工具函数等等
    // see https://github.com/antfu/unplugin-auto-import/pull/23/
    resolvers: [
      /* ... */
    ]
  });
};
