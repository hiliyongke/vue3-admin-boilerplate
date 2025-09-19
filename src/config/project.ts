/**
 * @description 项目配置文件
 * @author 优化版本
 */

/**
 * 项目基础信息
 */
export const PROJECT_CONFIG = {
  /** 项目名称 */
  name: 'Vue3 Admin Boilerplate',
  /** 项目版本 */
  version: '2.0.0',
  /** 项目描述 */
  description: '基于Vue3 + TypeScript + Vite的现代化管理后台模板',
  /** 项目作者 */
  author: '优化版本',
  /** 项目仓库地址 */
  repository: 'https://github.com/your-username/vue3-admin-boilerplate',
  /** 项目主页 */
  homepage: 'https://your-domain.com',
  /** 项目许可证 */
  license: 'MIT',
} as const;

/**
 * 开发环境配置
 */
export const DEV_CONFIG = {
  /** 开发服务器端口 */
  port: 3000,
  /** 是否自动打开浏览器 */
  open: true,
  /** 是否启用热更新 */
  hmr: true,
  /** 是否启用HTTPS */
  https: false,
  /** 代理配置 */
  proxy: {
    '/api': {
      target: 'http://localhost:8080',
      changeOrigin: true,
      rewrite: (path: string) => path.replace(/^\/api/, ''),
    },
  },
} as const;

/**
 * 构建配置
 */
export const BUILD_CONFIG = {
  /** 构建输出目录 */
  outDir: 'dist',
  /** 静态资源目录 */
  assetsDir: 'assets',
  /** 是否生成sourcemap */
  sourcemap: false,
  /** 是否压缩代码 */
  minify: true,
  /** 是否删除console */
  dropConsole: true,
  /** 是否删除debugger */
  dropDebugger: true,
  /** 包大小警告阈值(KB) */
  chunkSizeWarningLimit: 1000,
} as const;

/**
 * 路由配置
 */
export const ROUTER_CONFIG = {
  /** 路由模式 */
  mode: 'hash' as 'hash' | 'history',
  /** 路由基础路径 */
  base: '/',
  /** 是否启用路由懒加载 */
  lazy: true,
  /** 路由切换动画 */
  transition: 'fade',
} as const;

/**
 * 主题配置
 */
export const THEME_CONFIG = {
  /** 默认主题 */
  defaultTheme: 'light' as 'light' | 'dark',
  /** 主题色 */
  primaryColor: '#1890ff',
  /** 是否启用主题切换 */
  enableThemeSwitch: true,
  /** 是否跟随系统主题 */
  followSystem: false,
} as const;

/**
 * 国际化配置
 */
export const I18N_CONFIG = {
  /** 默认语言 */
  defaultLocale: 'zh-CN',
  /** 支持的语言列表 */
  supportedLocales: ['zh-CN', 'en-US'],
  /** 是否启用国际化 */
  enabled: true,
  /** 语言切换策略 */
  strategy: 'cookie' as 'cookie' | 'localStorage',
} as const;

/**
 * 缓存配置
 */
export const CACHE_CONFIG = {
  /** 默认缓存时间(秒) */
  defaultTTL: 3600,
  /** 最大缓存数量 */
  maxSize: 100,
  /** 缓存键前缀 */
  keyPrefix: 'vue3-admin',
  /** 是否启用缓存 */
  enabled: true,
} as const;

/**
 * 安全配置
 */
export const SECURITY_CONFIG = {
  /** Token过期时间(秒) */
  tokenExpiry: 7200,
  /** 刷新Token过期时间(秒) */
  refreshTokenExpiry: 86400,
  /** 是否启用CSRF保护 */
  enableCSRF: true,
  /** 是否启用XSS保护 */
  enableXSS: true,
  /** 密码最小长度 */
  passwordMinLength: 8,
  /** 密码复杂度要求 */
  passwordComplexity: {
    requireUppercase: true,
    requireLowercase: true,
    requireNumbers: true,
    requireSpecialChars: false,
  },
} as const;

/**
 * 性能配置
 */
export const PERFORMANCE_CONFIG = {
  /** 是否启用虚拟滚动 */
  enableVirtualScroll: true,
  /** 表格分页大小 */
  tablePageSize: 20,
  /** 图片懒加载 */
  enableImageLazyLoad: true,
  /** 组件懒加载 */
  enableComponentLazyLoad: true,
  /** 预加载策略 */
  preloadStrategy: 'hover' as 'hover' | 'visible' | 'none',
} as const;

/**
 * 监控配置
 */
export const MONITOR_CONFIG = {
  /** 是否启用性能监控 */
  enablePerformance: true,
  /** 是否启用错误监控 */
  enableError: true,
  /** 是否启用用户行为监控 */
  enableBehavior: false,
  /** 监控数据上报地址 */
  reportUrl: '',
  /** 采样率(0-1) */
  sampleRate: 0.1,
} as const;

/**
 * 功能开关配置
 */
export const FEATURE_CONFIG = {
  /** 是否启用PWA */
  enablePWA: false,
  /** 是否启用Mock数据 */
  enableMock: true,
  /** 是否启用水印 */
  enableWatermark: false,
  /** 是否启用全屏功能 */
  enableFullscreen: true,
  /** 是否启用锁屏功能 */
  enableLockScreen: true,
  /** 是否启用标签页 */
  enableTabs: true,
  /** 是否启用面包屑 */
  enableBreadcrumb: true,
} as const;

export const deprecatedDirs = {
  app: true, // 标记为待删除
};

/**
 * 导出所有配置
 */
export const APP_CONFIG = {
  project: PROJECT_CONFIG,
  dev: DEV_CONFIG,
  build: BUILD_CONFIG,
  router: ROUTER_CONFIG,
  theme: THEME_CONFIG,
  i18n: I18N_CONFIG,
  cache: CACHE_CONFIG,
  security: SECURITY_CONFIG,
  performance: PERFORMANCE_CONFIG,
  monitor: MONITOR_CONFIG,
  feature: FEATURE_CONFIG,
} as const;

/**
 * 获取环境配置
 */
export function getEnvConfig() {
  const env = import.meta.env.MODE || 'development';

  return {
    isDev: env === 'development',
    isProd: env === 'production',
    isTest: env === 'test',
    env,
  };
}

/**
 * 获取应用配置
 */
export function getAppConfig() {
  const envConfig = getEnvConfig();

  return {
    ...APP_CONFIG,
    env: envConfig,
  };
}
