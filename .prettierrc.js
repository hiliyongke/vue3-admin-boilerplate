module.exports = {
  jsxSingleQuote: true,
  printWidth: 80, // 超过最大值换行
  tabWidth: 2, // 缩进字节数 使用 4 个空格缩进
  useTabs: false, // 缩进不使用tab，使用空格
  semi: true, // 句尾添加分号
  singleQuote: true, // 使用单引号代替双引号
  proseWrap: 'preserve', // 默认值。因为使用了一些折行敏感型的渲染器(如GitHub comment)而按照markdown文本样式进行折行
  arrowParens: 'avoid', // (x) => {} 箭头函数参数只有一个时是否要有小括号。avoid：省略括号
  bracketSpacing: true, // 在对象，数组括号与文字之间加空格 "{ foo: bar }"
  endOfLine: 'auto', // 结尾是 \n \r \n\r auto
  htmlWhitespaceSensitivity: 'ignore',
  jsxSingleQuote: false, // 在jsx中使用单引号代替双引号
  trailingComma: 'none', // 在对象或数组最后一个元素后面是否加逗号(在ES5中加尾逗号)
  singleAttributePerLine: true, // 属性换行,
  overrides: [
    {
      files: '*.html',
      options: {
        parser: 'html'
      }
    }
  ]
};
