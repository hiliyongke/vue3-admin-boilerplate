import { defineConfig, presetAttributify, presetUno } from 'unocss';

export default defineConfig({
  /** 内容配置 */
  content: {
    pipeline: {
      include: [
        /\.(vue|svelte|[jt]sx?|mdx?|astro|elm|php|phtml|html)($|\?)/,
        'src/**/*.{js,ts,jsx,tsx,vue,html,css,scss,less}',
      ],
      exclude: ['node_modules', 'dist', '.git', '.husky', '.vscode', 'build', 'mock'],
    },
  },
  /** 预设 */
  presets: [
    /** 属性化模式 & 无值的属性模式 - 临时禁用以解决栈溢出问题 */
    // presetAttributify(),
    /** 默认预设 */
    presetUno(),
  ],
  /** 自定义规则 */
  rules: [['uno-padding-20', { padding: '20px' }]],
  /** 自定义快捷方式 */
  shortcuts: {
    'uno-wh-full': 'w-full h-full',
    'uno-flex-center': 'flex justify-center items-center',
    'uno-flex-x-center': 'flex justify-center',
    'uno-flex-y-center': 'flex items-center',
  },
  /** 主题配置 */
  theme: {
    colors: {
      primary: '#1976d2',
      secondary: '#424242',
      accent: '#82b1ff',
      error: '#ff5252',
      info: '#2196f3',
      success: '#4caf50',
      warning: '#fb8c00',
    },
  },
});
