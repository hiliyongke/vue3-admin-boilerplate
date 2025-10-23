/**
 * @description 标签页导航工具方法
 */

import type { RouteLocationNormalizedLoaded } from 'vue-router';
import type { NavigationRouteSnapshot, NavigationTab, TabOperationResult, CloseTabOperator } from './tab-route.types';

/**
 * 创建标签页对象
 */
export function createNavigationTab(partial: Partial<NavigationTab>): NavigationTab {
  if (!partial.path) {
    throw new Error('导航标签必须包含 path');
  }

  return {
    path: partial.path,
    title: partial.title ?? (partial.meta?.title ? String(partial.meta.title) : '未命名'),
    name: partial.name,
    query: partial.query,
    hash: partial.hash ?? '',
    fullPath: partial.fullPath ?? partial.path,
    meta: partial.meta,
    index: partial.index ?? 0,
    isHome: partial.isHome ?? false,
    isAlive: partial.isAlive ?? true,
    closable: partial.closable ?? !partial.isHome,
  };
}

/**
 * 将路由对象转换为标签快照
 */
export function toNavigationRouteSnapshot(
  route: NavigationRouteSnapshot | RouteLocationNormalizedLoaded
): NavigationRouteSnapshot {
  return {
    path: route.path,
    name: route.name,
    title: route.meta?.title ? String(route.meta.title) : String(route.name ?? '未命名'),
    query: route.query,
    hash: route.hash ?? '',
    fullPath: route.fullPath ?? route.path,
    meta: route.meta,
  };
}

/**
 * 将路由/快照转换为标签数据
 */
export function toNavigationTab(
  route: NavigationRouteSnapshot,
  index: number,
  options: { isHome: boolean; isAlive: boolean; closable: boolean }
): NavigationTab {
  return createNavigationTab({
    path: route.path,
    name: route.name,
    title: route.title ?? String(route.name ?? '未命名'),
    query: route.query,
    hash: route.hash,
    fullPath: route.fullPath ?? route.path,
    meta: route.meta,
    index,
    isHome: options.isHome,
    isAlive: options.isAlive,
    closable: options.closable,
  });
}

/**
 * 判断标签是否可缓存
 */
export function isTabCacheable(tab: NavigationTab, uncacheableRouteNames: Set<string>): boolean {
  if (!tab.name) return false;
  if (tab.isHome) return true;
  if (uncacheableRouteNames.has(String(tab.name))) return false;
  if (tab.meta?.keepAlive === false) return false;
  return tab.isAlive;
}

/**
 * 查找标签索引
 */
export function findTabIndex(tabs: NavigationTab[], path: string): number {
  return tabs.findIndex((tab) => tab.path === path);
}

/**
 * 根据操作类型执行标签关闭策略
 */
export function closeTabs(tabs: NavigationTab[], currentIndex: number, operator: CloseTabOperator): TabOperationResult {
  if (tabs.length === 0) {
    return { tabs: [] };
  }

  switch (operator) {
    case 'self': {
      const nextTabs = [...tabs.slice(0, currentIndex), ...tabs.slice(currentIndex + 1)];
      const target = nextTabs[currentIndex] ?? nextTabs[currentIndex - 1] ?? nextTabs[0];
      return { tabs: nextTabs, target };
    }
    case 'left':
      return {
        tabs: [tabs[0], ...tabs.slice(currentIndex)],
        target: tabs[currentIndex],
      };
    case 'right':
      return {
        tabs: tabs.slice(0, currentIndex + 1),
        target: tabs[currentIndex],
      };
    case 'others':
      return {
        tabs: [tabs[0], tabs[currentIndex]].filter(Boolean),
        target: tabs[currentIndex],
      };
    case 'all':
    default:
      return {
        tabs: [tabs[0]],
        target: tabs[0],
      };
  }
}

/**
 * 计算 keep-alive include 列表
 */
export function calcIncludeNames(tabs: NavigationTab[], uncacheableRouteNames: Set<string>): string[] {
  return tabs
    .filter((tab) => isTabCacheable(tab, uncacheableRouteNames))
    .map((tab) => String(tab.name))
    .filter(Boolean);
}
