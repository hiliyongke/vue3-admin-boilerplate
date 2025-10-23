/**
 * @description 标签页导航领域类型定义
 */

import type { RouteLocationNormalizedLoaded, RouteRecordName } from 'vue-router';

/**
 * 标签页导航路由快照（用于在 Store 中存储精简后的路由信息）
 */
export interface NavigationRouteSnapshot {
  path: string;
  name?: RouteRecordName;
  title?: string;
  meta?: RouteLocationNormalizedLoaded['meta'];
  query?: RouteLocationNormalizedLoaded['query'];
  hash?: string;
  fullPath?: string;
}

/**
 * 标签页导航项
 */
export interface NavigationTab {
  /** 路由路径 */
  path: string;
  /** 路由名称 */
  name?: RouteRecordName;
  /** 标签标题 */
  title: string;
  /** 路由排序索引（内部使用） */
  index: number;
  /** 是否为系统首页 */
  isHome: boolean;
  /** 是否处于激活状态（用于 keep-alive include） */
  isAlive: boolean;
  /** 是否允许关闭 */
  closable: boolean;
  /** 路由查询参数 */
  query?: RouteLocationNormalizedLoaded['query'];
  /** 路由哈希 */
  hash?: string;
  /** 路由完整路径 */
  fullPath?: string;
  /** 原始路由记录元信息 */
  meta?: RouteLocationNormalizedLoaded['meta'];
}

/**
 * 标签页导航状态
 */
export interface NavigationTabState {
  /** 已打开的标签页 */
  tabs: NavigationTab[];
  /** 当前激活标签路径 */
  activePath: string;
  /** 是否处于刷新状态 */
  refreshing: boolean;
  /** 未缓存路由名称列表 */
  uncacheableRouteNames: Set<string>;
}

/**
 * 新增标签页载荷
 */
export interface AppendTabPayload {
  route: NavigationRouteSnapshot | RouteLocationNormalizedLoaded;
  isHome?: boolean;
}

/**
 * 标签页关闭操作渠道
 */
export type CloseTabOperator = 'self' | 'left' | 'right' | 'others' | 'all';

/**
 * 标签页操作结果
 */
export interface TabOperationResult {
  /** 最新的标签页集合 */
  tabs: NavigationTab[];
  /** 需要跳转的目标标签 */
  target?: NavigationTab;
}
