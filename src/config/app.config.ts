/**
 * 统一应用配置
 */

export interface AppConfig {
  /** 应用基础信息 */
  app: {
    title: string;
    version: string;
    shortName: string;
    company: string;
    description: string;
    defaultLanguage: string;
    lockTime: number;
  };

  /** API配置 */
  api: {
    prefix: string;
    baseUrl: string;
    targetUrl: string;
    mockBaseUrl: string;
    mockTargetUrl: string;
    mockEnabled: boolean;
  };

  /** 构建配置 */
  build: {
    outputDir: string;
    publicPath: string;
    dropConsole: boolean;
    dropDebugger: boolean;
    compression: boolean;
    compressionAlgorithm: 'gzip' | 'brotli' | 'deflate';
    analysis: boolean;
    progress: boolean;
  };

  /** 开发配置 */
  dev: {
    port: number;
    open: boolean;
    https: boolean;
    proxy: Record<string, any>;
  };
}

/**
 * 应用配置
 */
export const appConfig: AppConfig = {
  app: {
    title: 'Admin',
    version: '2.0.0',
    shortName: 'Admin',
    company: '冲向大佬',
    description: '基于Vue3 + TypeScript + Vite的现代化管理后台模板',
    defaultLanguage: 'zh-CN',
    lockTime: 600,
  },

  api: {
    prefix: '/api',
    baseUrl: '/api',
    targetUrl: 'http://localhost:3000',
    mockBaseUrl: '/mock/api',
    mockTargetUrl: 'http://localhost:3000',
    mockEnabled: false,
  },

  build: {
    outputDir: 'dist',
    publicPath: './',
    dropConsole: true,
    dropDebugger: true,
    compression: true,
    compressionAlgorithm: 'gzip',
    analysis: true,
    progress: true,
  },

  dev: {
    port: 3000,
    open: false,
    https: false,
    proxy: {},
  },
};

/**
 * 获取环境配置
 */
export function getEnvConfig() {
  return {
    isDev: import.meta.env.DEV,
    isProd: import.meta.env.PROD,
    mode: import.meta.env.MODE,
  };
}
