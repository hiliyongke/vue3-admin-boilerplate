# 目录结构

目录结构足够清晰的话，能够让开发者一目了然，知道什么文件夹是存在什么内容，做的是什么功能，也便于维护者的对代码的良好阅读，也能让开发者快速了解项目的基础架构的情况。

目前默认应用目录架构提供了良好的代码分层结构，适用于开发或大或小的应用，约定的目录结构如下：

```
.
├── .browserslistrc       # 指定项目的目标浏览器范围
├── .commitlintrc.js      # Git Commit提交规则配置
├── .editorconfig         # 编辑器设置
├── .env                  # 所有的环境中被载入
├── .env.development      # 开发环境模式
├── .env.productiont      # 正式环境模式
├── .eslintignore         # Eslint 忽略规则
├── .eslintrc.js          # Eslint 规则配置
├── .gitignore            # Git 忽略规则
├── .prettierignore       # Prettier 忽略规则
├── .prettierrc.js        # Prettier 格式规则配置
├── .stylelintignore      # 样式忽略规则
├── .stylelintrc.js       # 样式格式规则配置
├── .vscode               # vscode 配置
├── babel.config.js       # babel 配置文件
├── jest.config.js        # 单元测试配置文件
├── package.json          # 项目依赖配置文件
├── mock                  # 数据模拟
├── public                # 项目静态资源，不经过编译，适合存放第三方的资源
├── plop-templates        # plop 快速生成模板文件夹
├── plopfile.js           # 模板配置文件
├── docs                  # 项目文档
├── src
│   ├── app.vue           # vue根组件
│   ├── api               # 网络请求层
│   ├── assets            # 静态资源
│   ├── directives        # 指令
│   ├── components        # 公共组件 (基础/业务)
│   ├── config            # 配置 (样式/组件/其他)
│   ├── directives        # 指令
│   ├── enums             # 公共枚举值
│   ├── hooks             # hooks方法
│   ├── i18n              # 国际化
│   ├── layouts           # 页面布局
│   ├── plugins           # 插件
│   ├── main.ts           # vue入口主文件
│   ├── router            # 路由目录
│   ├── shims-vue.d.ts    # vue 文件类型的 type
│   ├── store             # 数据流状态管理层
│   ├── style             # 公共样式
│   ├── types             # 公共ts类型
│   ├── utils             # 工具函数集合
│   └── pages             # 视图层页面
├── tests                 # 测试用例
├── types                 # 公共ts类型
├── tsconfig.json         # typescript 配置文件
└── vite.config.js        # vite 脚手架配置文件
```

**mock/**

本地模拟数据的目录。

**public/**

静态资源目录，默认包含 `index.html` 和 `favicon.png`

**plop-templates**

基于 [`plop`](https://github.com/plopjs/plop) 生成器框架，快速生成模板文件

**src/**

源码目录

**assets/**

项目的静态资源目录，通常包括图片、`Svg` 图标、`Font` 字体三部分，目录形式如下：

```bash
assets
  ├── fonts       # 字体文件
  ├── icons       # 图标
  └── statics     # 其他静态文件
```

**layouts/**

项目的布局文件目录，布局通常包含导航配置，布局组件，样式三部分，推荐的目录形式如下：

**components/**

项目通用的组件目录，其中如基础类型的组件，命名`x-[component-name]`，目录推荐形式如下：

```bash
XIcon
  ├── demo           # 测试案例
  ├── tests          # 测试用例
  ├── x-icon.vue
  ├── index.ts       # 组件入口
  └── README.md      # 使用文档
```

**views/**

项目的页面文件目录，页面通常包页面、业务组件，目录形式推荐如下:

```bash
user                     # uer 页面
  ├── components         # 业务组件
  └── index.vue          # 页面
```

**store/**

基于`Pinia(Vuex5)`的数据状态管理层，目录形式推荐如下:

```bash
store
  ├── modules           # 数据模块
  └── index.ts          # 入口
```

**style/**

全局样式目录。[详见]

**api/**

数据请求，基于`axios`强大的请求库封装`request`。 [详见]

**directives/**

公共的指令函数

**hooks/**

基于 Vue 组合式 API 编写的`Hooks`工具函数目录，具体编写规则和使用。[详见]

**plugins/**

第三方插件

**router/**

应用的路由配置文件。[详见]

**utils/**

工具函数集合

**main.ts**

**.vscode/**

`vscode` 编辑器配置

**package.json**

应用所需要的各种模块，以及配置信息（比如名称、版本、许可证等元数据）。

**tsconfig.json**

TypeScript 编译所需的配置文件。
