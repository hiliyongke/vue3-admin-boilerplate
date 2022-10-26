# 格式规范

## Prettier

[`Prettier`](https://prettier.io/) - Code formatter 是一款强大的代码格式化工具，可以根据自己设定的规则来格式规范的代码。

1. 安装依赖

```bash
npm install prettier eslint-config-prettier @vue/eslint-config-prettier --save-dev
```

2. 配置 `.prettierrc.js` 文件

```js
module.exports = {
  // ES5中有效的结尾逗号（对象，数组等）
  trailingComma: 'es5',
  // 不使用缩进符，而使用空格
  useTabs: false,
  // tab 用两个空格代替
  tabWidth: 2,
  // 添加分号
  semi: true,
  // 使用单引号
  singleQuote: true,
  // 一行最多 100 字符
  printWidth: 100,
  // 对象的 key 仅在必要时用引号
  quoteProps: 'as-needed',
  // jsx 不使用单引号，而使用双引号
  jsxSingleQuote: false,
  // 大括号内的首尾需要空格
  bracketSpacing: true,
  // jsx 标签的反尖括号需要换行
  jsxBracketSameLine: false,
  // 箭头函数，只有一个参数的时候，也需要括号
  arrowParens: 'always',
  // 每个文件格式化的范围是文件的全部内容
  rangeStart: 0,
  rangeEnd: Infinity,
  // 不需要写文件开头的 @prettier
  requirePragma: false,
  // 不需要自动在文件开头插入 @prettier
  insertPragma: false,
  // 使用默认的折行标准
  proseWrap: 'preserve',
  // 换行符使用 lf
  endOfLine: 'lf',
  /* 优化html闭合标签不换行的问题 */
  htmlWhitespaceSensitivity: 'ignore',
};
```

3. 配合编辑器自动格式化代码
   以`VScode`编辑器为例，在项目中创建`.vscode`文件夹, 此文件是项目中工作区 `VScode` 配置。
   之后创建`settings.json`

```json
{
  // 保存时格式化文件
  "editor.formatOnSave": true,
  "editor.codeActionsOnSave": {
    "source.fixAll.eslint": true,
    "source.fixAll.stylelint": true,
    "source.fixAll.markdownlint": true
  }
}
```
