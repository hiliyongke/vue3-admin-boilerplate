/**
 * @description Prettier配置 - 基于Airbnb规范
 * @author 优化版本
 */
const config = {
  // 基础格式化选项
  printWidth: 120, // 每行最大字符数，与ESLint max-len保持一致
  tabWidth: 2, // 缩进空格数
  useTabs: false, // 使用空格而不是tab
  semi: true, // 语句末尾添加分号
  singleQuote: true, // 使用单引号
  quoteProps: 'as-needed', // 对象属性引号：仅在需要时添加

  // JSX配置
  jsxSingleQuote: true, // JSX中使用单引号

  // 尾随逗号配置（Airbnb规范）
  trailingComma: 'es5', // 在ES5支持的地方添加尾随逗号

  // 空格配置
  bracketSpacing: true, // 对象字面量的括号间添加空格 { foo: bar }
  bracketSameLine: false, // 多行JSX元素的>放在下一行

  // 箭头函数参数括号
  arrowParens: 'always', // 箭头函数参数始终使用括号 (x) => x

  // 换行符配置
  endOfLine: 'lf', // 使用LF换行符（Unix风格）

  // HTML配置
  htmlWhitespaceSensitivity: 'css', // HTML空白敏感性

  // Vue文件配置
  vueIndentScriptAndStyle: false, // Vue文件中script和style标签不缩进

  // 嵌入式语言格式化
  embeddedLanguageFormatting: 'auto',

  // 单行属性配置
  singleAttributePerLine: false, // 不强制单行属性

  // 特定文件类型覆盖配置
  overrides: [
    {
      files: '*.html',
      options: {
        parser: 'html',
        printWidth: 120,
      },
    },
    {
      files: '*.vue',
      options: {
        parser: 'vue',
        printWidth: 120,
      },
    },
    {
      files: ['*.json', '*.jsonc'],
      options: {
        parser: 'json',
        printWidth: 120,
        trailingComma: 'none',
      },
    },
    {
      files: '*.md',
      options: {
        parser: 'markdown',
        printWidth: 80,
        proseWrap: 'preserve',
      },
    },
    {
      files: '*.{css,scss,less}',
      options: {
        printWidth: 120,
        singleQuote: false,
      },
    },
  ],
};

export default config;
