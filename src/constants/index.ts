/**
 * @description 常量定义统一导出
 * @author 优化版本
 */

// API相关常量
export * from './api';

// 业务相关常量
export * from './business';

// 通用常量
export * from './common';

/**
 * 应用基础常量
 */
export const APP_CONFIG = {
  /** 应用名称 */
  APP_NAME: 'Vue3 Admin',
  /** 应用版本 */
  APP_VERSION: '0.0.4',
  /** 应用描述 */
  APP_DESCRIPTION: '基于 Vue3 的现代化管理后台模板',
  /** 默认语言 */
  DEFAULT_LANGUAGE: 'zh-cn',
  /** 默认主题 */
  DEFAULT_THEME: 'light'
} as const;

/**
 * 路由常量
 */
export const ROUTE_CONFIG = {
  /** 登录页路径 */
  LOGIN_PATH: '/login',
  /** 首页路径 */
  HOME_PATH: '/dashboard',
  /** 404页面路径 */
  NOT_FOUND_PATH: '/404',
  /** 403页面路径 */
  FORBIDDEN_PATH: '/403'
} as const;

/**
 * 存储键名常量
 */
export const STORAGE_KEYS = {
  /** 用户信息 */
  USER_INFO: 'user_info',
  /** 访问令牌 */
  ACCESS_TOKEN: 'access_token',
  /** 刷新令牌 */
  REFRESH_TOKEN: 'refresh_token',
  /** 主题设置 */
  THEME_SETTING: 'theme_setting',
  /** 语言设置 */
  LANGUAGE_SETTING: 'language_setting',
  /** 标签页路由 */
  TAB_ROUTER: 'tab_router'
} as const;
