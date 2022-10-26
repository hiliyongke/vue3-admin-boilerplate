# 编码规范

## JS 规范约束

**Eslint**

1. 安装依赖
   使用公司内部的[`@tencent/eslint-config-tencent`]依赖插件，规范 JavaScript 编码

```bash
tnpm install eslint @tencent/eslint-config-tencent --save-dev
```

1. 配置`.eslintrc.js`文件，例如`vue`项目

```js
module.exports = {
  root: true,
  env: {
    node: true,
  },
  extends: [
    // 'plugin:vue/vue3-essential',
    // 'eslint:recommended',
    // '@vue/typescript/recommended',
    // '@vue/prettier',
    // '@vue/prettier/@typescript-eslint',
    '@tencent/eslint-config-tencent', // 使用腾讯Eslint
    '@tencent/eslint-config-tencent/ts',
    'prettier',
  ],
};
```

## CSS 规范约束

**Stylelint**
[`StyleLint`](https://stylelint.io/) 是一个强大的、现代化的 `CSS` 检测工具, 是通过定义一系列的编码风格规则帮助我们避免在样式表中出现错误。

1. 安装依赖
   [stylelint-config-standard](https://github.com/stylelint/stylelint-config-standard)： 官网提供的 css 标准
   [stylelint-config-recess-order](https://github.com/stormwarning/stylelint-config-recess-order)： 属性排列顺序
   [stylelint-prettier](https://github.com/prettier/stylelint-prettier)： 基于 `prettier` 代码风格的 `Stylelint` 规则
   [stylelint-config-prettier](https://github.com/prettier/stylelint-config-prettier)：禁用所有与格式相关的 `Stylelint` 规则，解决 `prettier` 与 `stylelint` 规则冲突，确保将其放在 `extends` 队列最后，这样它将覆盖其他配置。

```bash
npm install -D stylelint stylelint-config-html stylelint-config-prettier  stylelint-config-recommended stylelint-config-standard stylelint-order stylelint-prettier postcss-html
```

2. 创建并配置`.stylelintrc.js`配置文件

```js
module.exports = {
  extends: [
    'stylelint-config-standard',
    'stylelint-config-prettier',
  ],
  plugins: ['stylelint-prettier'],
  rules: {
    'prettier/prettier': true,
    'rule-empty-line-before': [
      'always-multi-line',
      {
        except: ['after-single-line-comment', 'first-nested'],
      },
    ],
    'no-invalid-double-slash-comments': null,
    'number-leading-zero': null,
    'font-family-no-missing-generic-family-keyword': null,
    'no-descending-specificity': null,
    'declaration-empty-line-before': null,
    'color-no-invalid-hex': true,
    'at-rule-no-unknown': [
      true,
      {
        ignoreAtRules: ['function', 'if', 'each', 'include', 'mixin'],
      },
    ],
    'selector-pseudo-class-no-unknown': [
      true,
      {
        ignorePseudoClasses: ['global', 'export', 'import', 'local', 'deep', 'mixin'],
      },
    ],
    'property-no-unknown': [
      true,
      {
        ignoreProperties: [],
        ignoreSelectors: [':export', /^:import/],
      },
    ],
  },
};

```

2. 在`package.json`添加`npm run lint:css`命令

```bash
{
  "scripts": {
    "lint:css": "stylelint **/*.{html,vue,css,sass,scss} --fix"
  }
}
```

3. 预提交检查执行修复样式错误

```bash
"lint-staged": {
  "**/*.{html,vue,css,sass,scss}": [
    "stylelint --fix",
    "git add"
  ]
}
```

## 公司代码规范

- [js 代码规范](./language/javascript.md)
- [css 代码规范](./language/css.md)
