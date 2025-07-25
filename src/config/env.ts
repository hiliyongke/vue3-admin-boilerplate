/**
 * @description 环境配置管理
 * @author 现代化架构
 */

/**
 * 环境类型
 */
export type EnvType = 'development' | 'production' | 'test';

/**
 * 环境配置接口
 */
export interface EnvConfig {
  /** 应用标题 */
  VITE_APP_TITLE: string;
  /** 应用版本 */
  VITE_APP_VERSION: string;
  /** API基础URL */
  VITE_API_BASE_URL: string;
  /** 监控URL */
  VITE_MONITOR_URL: string;
  /** 是否启用Mock */
  VITE_USE_MOCK: boolean;
  /** 是否启用PWA */
  VITE_USE_PWA: boolean;
  /** 是否启用压缩 */
  VITE_BUILD_COMPRESS: boolean;
  /** 是否删除console */
  VITE_DROP_CONSOLE: boolean;
  /** 是否删除debugger */
  VITE_DROP_DEBUGGER: boolean;
}

/**
 * 获取环境变量
 */
export function getEnvConfig(): EnvConfig {
  const env = import.meta.env;

  return {
    VITE_APP_TITLE: env.VITE_APP_TITLE || 'Vue3 Admin',
    VITE_APP_VERSION: env.VITE_APP_VERSION || '1.0.0',
    VITE_API_BASE_URL: env.VITE_API_BASE_URL || '',
    VITE_MONITOR_URL: env.VITE_MONITOR_URL || '',
    VITE_USE_MOCK: env.VITE_USE_MOCK === 'true',
    VITE_USE_PWA: env.VITE_USE_PWA === 'true',
    VITE_BUILD_COMPRESS: env.VITE_BUILD_COMPRESS === 'true',
    VITE_DROP_CONSOLE: env.VITE_DROP_CONSOLE === 'true',
    VITE_DROP_DEBUGGER: env.VITE_DROP_DEBUGGER === 'true'
  };
}

/**
 * 获取当前环境
 */
export function getEnv(): EnvType {
  return import.meta.env.MODE as EnvType;
}

/**
 * 是否为开发环境
 */
export function isDev(): boolean {
  return import.meta.env.DEV;
}

/**
 * 是否为生产环境
 */
export function isProd(): boolean {
  return import.meta.env.PROD;
}

/**
 * 是否为测试环境
 */
export function isTest(): boolean {
  return import.meta.env.MODE === 'test';
}

/**
 * 环境配置实例
 */
export const envConfig = getEnvConfig();
