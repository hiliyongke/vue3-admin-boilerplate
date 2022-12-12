> ## 一个开箱即用，快速搭建大型 web 应用的 pnpm + vue3 + vite3 + typescript+ pinia + tdesign + EsLint + Prettier + Husky + Commitlint + Lint-staged + Cz-customizable + Conventional Changelog ...中后台模板框架。集成了主流插件，丰富的 demo，并进行了模块化和按需加载的优化，可以放心使用

# 功能亮点

## 🪂 团队协作-代码规范

- [功能亮点](#功能亮点)

  - [🪂 团队协作-代码规范](#-团队协作-代码规范)

  - [💕 支持 JSX 语法](#-支持-jsx-语法)
  - [🎸UI 组件按需加载，自动导入](#ui-组件按需加载自动导入)
  - [🧩Vite 插件模块化](#vite-插件模块化)
  - [📱 支持`Pinia` ,下一代`Vuex5`](#-支持pinia-下一代vuex5)
  - [🤖 支持`Plop`自动生成文件](#-支持plop自动生成文件)
  - [🖼️ 支持`SVG`图标](#️-支持svg图标)
  - [📦 支持`axios(ts版)`](#-支持axiosts版)
  - [🧬 支持 Mock 数据](#-支持-mock-数据)
  - [🎎Proxy 代理](#proxy-代理)
  - [🎉 其他](#-其他)

- [使用](#使用)
- [工具库](#工具库)
  - [JS 库](#js-库)
- [资料](#资料)
- [注意事项](#注意事项)
- [package 说明](#package-说明)

> ## 如何规范团队代码 ESLint+Prettier+lint-staged+commit+changelog+standard-version 自动规范实践

## 简介以及优势

### ESLint

[ESLint 中文官网](https://eslint.bootcss.com/)

ESLint 是在 ECMAScript/JavaScript 代码中识别和报告模式匹配的工具，它的目标是保证代码的一致性和避免错误。  
相较于 Prettier 更为自由，并且更为严苛，也可以发现 JS 当中的错误。

### Prettier

[Prettier 官网](https://prettier.io/)

Prettier 能够解析代码，使用你自己设定的规则来重新打印出格式规范的代码。正因为 Prettier Opinionated 的特性，所以我们不需要配置过多的规则，并且它能够支持更多编辑器的插件以及对于 html、css 等文件的格式化。

### husky + lint-staged

[husky Github 仓库](https://github.com/typicode/husky)

[lint-staged Github 仓库](https://github.com/okonet/lint-staged)

husky 让 Git 钩子变得容易，把 git 钩子的功能加到了 package 的 script 里面，使我们有能力直接调用其他命令而不用把钩子脚本写在项目的 .git/hook 里面, 方便团队间 git 钩子命令的共享.

lint-staged 检查所有被 git add 加入的文件，对这些文件执行你需要的命令。

由于每次在提交代码之前，对整个项目进行 eslint 处理耗时长且容易对老项目产生致命的 bug。为了解决这个问题，我们引入 husky + lint-staged 可以只对我们本次 commit 修改的代码进行 eslint 处理，让 linting 更有意义。这样，您可以确保没有错误进入存储库并强制执行代码样式。

### commitizen

[commitizen Github 仓库](https://github.com/commitizen/cz-cli)

Commitizen 是一个撰写合格 Commit message 的工具，当您使用 Commitizen 进行提交时，系统将提示您在提交时填写所有必填的提交字段。

### commitlint

[commitlint GitHub 仓库](https://github.com/conventional-changelog/commitlint)

commitlint 检查您的提交消息是否符合常规的提交格式。

### conventional-changelog

[conventional-changelog GitHub 仓库](https://github.com/conventional-changelog/conventional-changelog/tree/master/packages/conventional-changelog-cli)

如果你的所有 Commit 都符合 Angular 格式，那么发布新版本时， Change log 就可以用脚本自动生成。

生成的文档包括以下三个部分。

> **New features**
>
> **Bug fixes**
>
> **Breaking changes**.

每个部分都会罗列相关的 commit ，并且有指向这些 commit 的链接。当然，生成的文档允许手动修改，所以发布前，你还可以添加其他内容。

### standard-version

[standard-version GitHub 仓库](https://github.com/conventional-changelog/standard-version)

利用 standard-version 进行版本控制，可以省去 git tag 手动打标签以及手动生成 changelog 的过程。

## ESLint 引入

### 安装

NPM

```
npm install eslint --save-dev

```

### 配置使用规则

在 root 文件夹下创建文件 .eslintrc.js 和 .editorconfig

```
module.exports = {
    env: {
        browser: true,
        node: true,
        commonjs: true,
        es6: true,
        amd: true,
    },
    extends: ['eslint:recommended'],
    parserOptions: {
        ecmaVersion: 12,
        sourceType: 'module',
    },
    globals: {
     // 全局变量
        __DEV__: true,
        getCurrentPages: true,
    },
    rules: {
     // 大家可以参考官方团队的配置
    },
};


```

.editorconfig

```
root = true

[*]
charset = utf-8
indent_style = space
indent_size = 2
end_of_line = lf
insert_final_newline = true
trim_trailing_whitespace = true


```

### 使用方法

终端中输入以下代码即可修复代码文件

```
// 全局安装eslint
eslint --fix index.js // fix后接文件名
// 没有全局安装eslint
npx eslint --fix index.js // fix后接文件名

```

在 package.json 中配置以下代码

```
"scripts": {
    "lint": "eslint src --fix --ext .ts,.tsx,.vue,.js,.jsx",
  },

```

这样就可以在终端中输入以下代码就可以实现整个项目的 eslint 格式化

```
npm run lint

```

## Prettier 引入

### 安装

NPM

```
npm install prettier --save-dev

```

### 配置使用规则

在 root 文件夹下创建文件 .prettierrc.js， 由于 prettier 是 Opinionated code formatter，所以配置项相对较少。

```
module.exports = {
    // 使用 4 个空格缩进
    tabWidth: 2,
    // 不使用缩进符，而使用空格
    useTabs: false,
    semi: true,
    singleQuote: true,
    overrides: [
    // 使用css/html的规则格式化wxss/wxml
        {
            files: '*.wxss',
            options: {
                parser: 'css',
            },
        },
        {
            files: '*.wxml',
            options: {
                parser: 'html',
            },
        },
    ],
};

```

### 使用方法

终端中输入以下代码即可修复代码文件

```
// 全局安装prettier
prettier --fix index.js // fix后接文件名
// 没有全局安装prettier
npx prettier --write index.js // fix后接文件名

```

在 package.json 中配置以下代码

```
"scripts": {
    "prettier": "npx prettier--write **/*.js",
  },

```

这样就可以在终端中输入以下代码就可以实现整个项目的 eslint 格式化

```
npm run prettier

```

## ESLint 和 Prettier 结合使用

由于两者都会进行代码的格式化，我们并不希望代码的重复格式化以及发生不必要的冲突，所以我们要安装中间件来保证两者和谐运行

### 安装

```
npm install --save-dev eslint-config-prettier
npm install --save-dev eslint-plugin-prettier

```

### 配置使用方法

修改 .eslintrc.js 中的部分配置项

```
module.exports = {
 extends: ['eslint:recommended', 'plugin:prettier/recommended'],
    plugins: ['prettier'],
}

```

## husky + lint-staged 引入

### 安装

NPM

```
npm install husky --save-dev
npm install lint-staged --save-dev

```

### 配置使用规则

在 package.json 中配置

```
{
  "husky": {
    "hooks": {
      "pre-commit": "lint-staged"
    }
  },
  "lint-staged": {
    "miniprogram/**/*.js": [
      "npx eslint --fix",
      "prettier --write",
      "git add"
    ]
  },
}

```

## Commitizen

### 安装

```
npm install commitizen --save-dev
// 使用npx初始化常规更新日志适配器
npx commitizen init cz-conventional-changelog --save-dev --save-exact

```

### 配置使用规则

在 package.json 中配置

```
{
 "scripts": {
  "commit": "cz"
 }
}

```

### 使用方法

在 git add 提交代码后，可以使用 npm run commit 或者 npx cz 来提示填写 commit 信息

```
git add .
npm run commit
// npx cz

```

### 踩坑

虽然 GitHub 仓库中提到 commitizen 可以结合 husky 使用，从而达到在 git commit 的钩子中执行 commitizen，但是至少 Windows 环境下使用这一方法会导致 commitizen 每次输入都会重复呈现提示信息，给人不友好的交互，因此并不建议在 Windows 环境下结合 husky 使用。

这个问题在其 GitHub 仓库的 issue 中有提及，不过暂时没有解决办法。[issue 网址](https://github.com/commitizen/cz-cli/issues/709)

## Commitlint

### 安装

```
npm install --save-dev @ commitlint / config-conventional @ commitlint / cli

```

### 配置使用规则

在 package.json 中配置

```
{
 "husky": {
     "hooks": {
        "pre-commit": "lint-staged", // 这个是之前配置的内容
        "commit-msg": "commitlint -E HUSKY_GIT_PARAMS"
     }
   },
}

```

新建 commitlint.config.js

```
module.exports = {
  extends: ['@commitlint/config-conventional'],
  rules: {
    'body-leading-blank': [1, 'always'],
    'footer-leading-blank': [1, 'always'],
    'header-max-length': [2, 'always', 72],
    'scope-case': [2, 'always', 'lower-case'],
    'subject-case': [
      2,
      'never',
      ['sentence-case', 'start-case', 'pascal-case', 'upper-case'],
    ],
    'subject-empty': [2, 'never'],
    'subject-full-stop': [2, 'never', '.'],
    'type-case': [2, 'always', 'lower-case'],
    'type-empty': [2, 'never'],
    'type-enum': [
      2,
      'always',
      [
        'build',
        'chore',
        'ci',
        'docs',
        'feat',
        'fix',
        'improvement',
        'perf',
        'refactor',
        'revert',
        'style',
        'test',
      ],
    ],
  },
};


```

### 使用方法

在你 git commit 提交代码的时候会自动检查你的 commit 信息是否符合规范

### 踩坑

虽然 GitHub 仓库中的初始步骤中使用的方法是借助以下代码生成 commitlint.config.js 文件，但是在 Windows 环境下生成的文件解码方式是 UTF-16，所以在自动运行时会报错。因此建议自己手动创建一个 commitlint.config.js，输入以上代码进行配置。

## conventional-changelog

### 安装

```
 npm install --save-dev conventional-changelog-cli

```

### 配置使用规则

在 package.json 中配置

```
{
 "scripts": {
  "version": "npx conventional-changelog -p angular -i CHANGELOG.md -s"
 }
}

```

### 使用方法

```
npm run version
// 或者不进行配置，直接使用以下代码
npx conventional-changelog -p angular -i CHANGELOG.md -s
// 假如希望生成至今所有的改动
npx conventional-changelog -p angular -i CHANGELOG.md -s -r 0

```

## standard-version

### 安装

```
npm install --save-dev standard-version

```

## 配置使用规则

在 package.json 中配置

```
{
    "scripts": {
        "release": "npx standard-version"
    }
}

```

## 使用方法

```
npm run release
## 或者不进行配置，直接使用以下代码
npx standard-version
## 使用以上两种方式，默认是生成下一个大版本，假如希望手动规定版本号
npm run release -- -r 1.1.0

```

## Git 操作规范汇总

1. 提交代码

```
git add .
npm run commit
git pull origin master
git push origin master

```

2. 版本更新

提交所有上线前代码后

```
npm run release -- -r 1.0.0 ## 输入本次版本号
git push --follow-tags origin master

```

## 项目目录结构

以下是项目的目录结构

```
├── config
│   ├── env              // 环境变量配置
│   ├── vite             // vite插件配置
│   ├── constant         // 系统常量
├── docs                 // 文档相关
├── mock                 // mock数据
├── plop-tpls            // plop模板
├── src
│    ├── api             // api请求
│    ├── assets          // 静态文件
│    ├── components      // 业务通用组件
│    ├── config          // 系统配置
│    ├── directives      // vue指令集
│    ├── enum            // 项目中使用到的枚举定义
│    ├── hooks           // hooks定义
│    ├── i18n            // 国际化翻译
│    ├── layouts         // 应用布局模板
│    ├── components      // 业务通用组件
│    ├── components      // 业务通用组件
│    ├── pages           // 业务页面
│    ├── plugins         // vue plugins配置
│    ├── router          // 路由
│    ├── store           // 状态管理
│    ├── style           // 全局样式
│    ├── utils           // 工具类
│    ├── app.vue         // vue模板入口
│    ├── main.ts         // vue模板js
├── types                // 类型定义
├── wind.config.js       // windicss全局配置
├── tsconfig.json        // ts配置
└── vite.config.ts       // vite全局配置
└── *.config.ts          // 脚手架配置

```

## 💕 支持 JSX 语法

```json
{
    ...
    "@vitejs/plugin-vue-jsx": "^1.3.3"
    ...
}
```

## 🎸UI 组件按需加载，自动导入

```typescript
//模块化写法
import Components from 'unplugin-vue-components/vite';
export const AutoRegistryComponents = () => {
  return Components({
    extensions: ['vue', 'md'],
    deep: true,
    dts: 'types/components.d.ts',
    directoryAsNamespace: false,
    globalNamespaces: [],
    directives: true,
    include: [/\.vue$/, /\.vue\?vue/, /\.md$/],
    exclude: [/[\\/]node_modules[\\/]/, /[\\/]\.git[\\/]/, /[\\/]\.nuxt[\\/]/],
    resolvers: [
      IconsResolver({
        componentPrefix: ''
      }),
      TDesignResolver({ importStyle: 'less' }), //根据你需要增加UI框架
      VueUseComponentsResolver() //默认使用VueUse组件
    ]
  });
};
```

## 🧩Vite 插件模块化

为了方便管理插件，将所有的`config`统一放入`config/vite/plugins`里面，未来还会有更多插件直接分文件夹管理十分干净。值得一提的是，`Vue3-Boilerplate`增加了统一环境变量管理，来区分动态开启某些插件。

```typescript
// vite/plugins/index.ts
/**
 * @name createVitePlugins
 * @description 封装plugins数组统一调用
 */
import type { Plugin } from 'vite';
import vue from '@vitejs/plugin-vue';
import vueJsx from '@vitejs/plugin-vue-jsx';
import { ConfigSvgIconsPlugin } from './svgIcons';
import { AutoRegistryComponents } from './component';
import { AutoImportDeps } from './autoImport';
import { ConfigMockPlugin } from './mock';
import { ConfigVisualizerConfig } from './visualizer';
import { ConfigCompressPlugin } from './compress';
import { ConfigPagesPlugin } from './pages';
import { ConfigMarkDownPlugin } from './markdown';
import { ConfigRestartPlugin } from './restart';

export function createVitePlugins(isBuild: boolean) {
  const vitePlugins: (Plugin | Plugin[])[] = [
    // vue支持
    vue(),
    // JSX支持
    vueJsx(),
    // 自动按需引入组件
    AutoRegistryComponents(),
    // 自动按需引入依赖
    AutoImportDeps(),
    // 自动生成路由
    ConfigPagesPlugin(),
    // 开启.gz压缩  rollup-plugin-gzip
    ConfigCompressPlugin(),
    //支持markdown
    ConfigMarkDownPlugin(),
    // 监听配置文件改动重启
    ConfigRestartPlugin()
  ];
  // vite-plugin-svg-icons
  vitePlugins.push(ConfigSvgIconsPlugin(isBuild));
  // vite-plugin-mock
  vitePlugins.push(ConfigMockPlugin(isBuild));
  // rollup-plugin-visualizer
  vitePlugins.push(ConfigVisualizerConfig());
  return vitePlugins;
}
```

而`vite.config.ts`便干净多了

```typescript
import { createVitePlugins } from './build/vite/plugins'
...
return {
    resolve: {
      alias: {
        "@": path.resolve(__dirname, './src'),
        '@api': path.resolve(__dirname, './src/api'),
      }
    },
    // plugins
    plugins: createVitePlugins(isBuild)
}
...
```

## 📱 支持`Pinia` ,下一代`Vuex5`

创建文件`src/store/index.ts`

```typescript
// 支持模块化，配合plop可以通过命令行一键生成
import { createPinia } from 'pinia';
import { useAppStore } from './modules/app';
import { useUserStore } from './modules/user';
const pinia = createPinia();
export { useAppStore, useUserStore };
export default pinia;
```

创建文件`src/store/modules/user/index.ts`

```typescript
import { defineStore } from 'pinia';
import piniaStore from '@/store';
export const useUserStore = defineStore(
  // 唯一ID
  'user',
  {
    state: () => ({}),
    getters: {},
    actions: {}
  }
);
```

## 🤖 支持`Plop`自动生成文件

⚙️ 代码文件自动生成，提供三种预设模板`pages`,`components`,`store`，也可以根据自己需要设计更多自动生成脚本。一般后端同学惯用此形式，十分高效。

```shell
# 安装plop
pnpm add plop
```

根目录创建`plopfile.ts`

```typescript
import { NodePlopAPI } from 'plop';
export default function (plop: NodePlopAPI) {
  plop.setWelcomeMessage('请选择需要创建的模式：');
  plop.setGenerator('page', require('./plop-tpls/page/prompt'));
  plop.setGenerator('component', require('./plop-tpls/component/prompt'));
  plop.setGenerator('store', require('./plop-tpls/store/prompt'));
}
```

```shell
# 启动命令
pnpm run plop
```

## 🖼️ 支持`SVG`图标

随着浏览器兼容性的提升，SVG 的性能逐渐凸显，很多大厂团队都在创建自己的 SVG 管理库，后面工具库会有推荐。

```shell
# 安装svg依赖
pnpm add vite-plugin-svg-icons
```

配置`vite.config.ts`

```typescript
import viteSvgIcons from 'vite-plugin-svg-icons';
export default defineConfig({
plugins:[
...
 viteSvgIcons({
    // 指定需要缓存的图标文件夹
    iconDirs: [path.resolve(process.cwd(), 'src/assets/svg')],
    // 指定symbolId格式
    symbolId: 'icon-[dir]-[name]',
  }),
]
...
})
```

已封装一个简单的`SvgIcon`组件，可以直接读取文件下的`svg`，可以根据文件夹目录自动查找文件。

```html
<template>
  <svg
    aria-hidden="true"
    class="svg-icon-spin"
    :class="calsses"
  >
    <use
      :xlink:href="symbolId"
      :fill="color"
    />
  </svg>
</template>

<script
  lang="ts"
  setup
>
  const props = defineProps({
    prefix: {
      type: String,
      default: 'icon'
    },
    name: {
      type: String,
      required: true
    },
    color: {
      type: String,
      default: '#333'
    },
    size: {
      type: String,
      default: 'default'
    }
  });
  const symbolId = computed(() => `#${props.prefix}-${props.name}`);
  const calsses = computed(() => {
    return {
      [`sdms-size-${props.size}`]: props.size
    };
  });
  const fontSize = reactive({ default: '32px', small: '20px', large: '48px' });
</script>
```

## 📦 支持`axios(ts版)`

已封装了主流的拦截器，请求调用等方法，区分了模块`index.ts`/`status.ts`/`type.ts`

## 🧬 支持 Mock 数据

使用`vite-plugin-mock`插件，支持自动区分和启停的环境配置

```javascript
// vite config
viteMockServe({
  ignore: /^\_/,
  mockPath: 'mock',
  localEnabled: !isBuild,
  prodEnabled: false,
  // https://github.com/anncwb/vite-plugin-mock/issues/9
  injectCode: `
       import { setupProdMockServer } from '../mock/_createProdMockServer';
       setupProdMockServer();
       `
});
```

根目录下创建 `_createProductionServer.ts`文件,非`_`开头文件会被自动加载成 mock 文件

```typescript
import { createProdMockServer } from 'vite-plugin-mock/es/createProdMockServer';
// 批量加载
const modules = import.meta.globEager('./mock/*.ts');

const mockModules: Array<string> = [];
Object.keys(modules).forEach(key => {
  if (key.includes('/_')) {
    return;
  }
  mockModules.push(...modules[key].default);
});
export function setupProdMockServer() {
  createProdMockServer(mockModules);
}
```

## 🎎Proxy 代理

```typescript
// vite config
import proxy from '@config/vite/proxy';
export default defineConfig({
    ...
    server: {
        hmr: { overlay: false }, // 禁用或配置 HMR 连接 设置 server.hmr.overlay 为 false 可以禁用服务器错误遮罩层
        // 服务配置
        port: VITE_PORT, // 类型： number 指定服务器端口;
        open: false, // 类型： boolean | string在服务器启动时自动在浏览器中打开应用程序；
        cors: false, // 类型： boolean | CorsOptions 为开发服务器配置 CORS。默认启用并允许任何源
        host: '0.0.0.0', // IP配置，支持从IP启动
        proxy,
    }
    ...
})
```

```typescript
// proxy.ts
import {
  API_BASE_URL,
  API_TARGET_URL,
  MOCK_API_BASE_URL,
  MOCK_API_TARGET_URL
} from '@config/constant';
import { ProxyOptions } from 'vite';
type ProxyTargetList = Record<string, ProxyOptions>;

const init: ProxyTargetList = {
  // test
  [API_BASE_URL]: {
    target: API_TARGET_URL,
    changeOrigin: true,
    rewrite: path => path.replace(new RegExp(`^${API_BASE_URL}`), '')
  },
  // mock
  [MOCK_API_BASE_URL]: {
    target: MOCK_API_TARGET_URL,
    changeOrigin: true,
    rewrite: path => path.replace(new RegExp(`^${MOCK_API_BASE_URL}`), '/api')
  }
};

export default init;
```

## 🎉 其他

- 🏗 支持`vw/vh`移动端布局兼容，也可以使用`plop`自己配置生成文件
- 还有更多新功能增在`commiting`,如果你有更好的方案欢迎`PR`

# 使用

一键三连: Star 或 Fork

```shell
# 拉取仓库代码
git clone  https://github.com/hiliyongke/vue3-boilerplate.git

# 进入项目文件夹
cd Vue3-Boilerplate

# 安装项目依赖
pnpm install

# 运行
pnpm run dev
```

如果不报错，恭喜你点火成功。否则，请看下面常见问题。

# 工具库

学会使用适当的工具库，让`coding`事半功倍。尤其是开源的工具库，值得每个人学习，因为这本身就是你应该达到的层次。这里推荐一些大厂常用的类库，因为我喜新...，以下工具均可直接引入。

## JS 库

- [pnpm](https://pnpm.io/)，一个依赖包全局管理的工具，老板再也不用担心我的 C 盘不够用。Vite 官方推荐

- [mitt 全局事件监听库](https://github.com/developit/mitt)，Vue3 官方推荐
- [Hammer](http://hammerjs.github.io/)，可以识别由触摸、鼠标和指针事件做出的手势,只有 7.34kb
- [outils](https://github.com/proYang/outils)，开发中常用的函数集，也可以使用`lodash`

- [windicss](https://tailwindcss.com/)，艾玛香的一塌糊涂，一行 css 不写，3 分钟出一个页面。不适合初中级前端，建议还是先踏实学基础再用框架。

- [Vue I18n](https://vue-i18n.intlify.dev/) 是 Vue.js 的国际化插件，如果你想做开源框架，国际化首选插件。

- [ViteSSG](https://github.com/antfu/vite-ssg)，SEO 优化，这个项目有点意思，大家可以玩玩这个方案，之前我都是通过服务端渲染搞 SEO，后来了解到这个可以直接在 Vue3 的服务器上生成。

- [Vitest](https://github.com/vitest-dev/vitest),基于 Vite 的单元测试工具，目前迭代比较快，尤大金牌赞助。可以持续关注，不建议使用在小项目中。

# 资料

- 官方配置文档入口[vite](https://vitejs.cn/config/)、[pinia](https://pinia.vuejs.org/introduction.html)、[vue-router4](https://next.router.vuejs.org/zh/introduction.html)、[plop](https://github.com/plopjs/plop)...

# 注意事项

- git cz 报错的原因，需要全局安装 commitizen
  npm install -g commitizen

# package 说明

> 该模板不限定大家使用某一特定的包管理器，npm，yarn 和 pnpm 都行。同时注意 npm 的版本应该尽量的新。

强烈推荐大家使用更快更合理的 `pnpm` 包管理器 👉 [安装教程](https://pnpm.io/zh/installation)

1. 安装依赖

```shell
pnpm install

# 或者 npm install
# 或者 yarn
```

2. 开发

```shell
pnpm dev

# 或者 npm run dev
# 或者 yarn dev

# 自动打开浏览器
pnpm dev:open

# 或者 npm run dev:open
# 或者 yarn dev:open
```

3. 预览

````shell
pnpm preview

# 或者 npm run preview
# 或者 yarn preview



4. 打包

```shell
pnpm build

# 或者 npm run build
# 或者 yarn build

# 打包开发环境
pnpm build:dev

# 或者 npm run build:dev
# 或者 yarn build:dev
````

5. 单元测试

```shell
pnpm test

# 或者 npm run test
# 或者 yarn test
```

6. 单元测试报告生成

```shell
pnpm coverage

# 或者 npm run coverage
# 或者 yarn coverage
```

7. 类型检查

```shell
pnpm typecheck

# 或者 npm run typecheck
# 或者 yarn typecheck
```

8. 自动创建组件

```shell
pnpm plop

# 或者 npm run plop
# 或者 yarn plop
```

9. 依赖更新

```shell
# 安全版本更新
pnpm deps:update

# 或者 npm run deps:update
# 或者 yarn deps:update

# 主版本更新，可能是破坏性更新，谨慎使用，做好测试
pnpm deps:update:major

# 或者 npm run deps:update:major
# 或者 yarn deps:update:major

# 次版本更新，可能是破坏性更新，谨慎使用，做好测试
pnpm deps:update:minor

# 或者 npm run deps:update:minor
# 或者 yarn deps:update:minor

# 补丁版本更新
pnpm deps:update:patch

# 或者 npm run deps:fresh:patch
# 或者 yarn deps:fresh:patch
```

```shell
# 以上命令仅对包信息 package.json 进行写入，需要重新执行包安装命令
pnpm i

# 或者 npm i
# 或者 yarn
```

10. 代码规范校验修复

```shell
pnpm lint

# 或者 npm run lint
# 或者 yarn lint

# css规范校验修复

pnpm lint:css

# 或者 npm run lint:css
# 或者 yarn lint:css
```
