/**
 * @description 旧版 tabs-router 数据迁移工具
 */

import { createNavigationTab } from './tab-route.utils';
import type { NavigationTab } from './tab-route.types';

const LEGACY_PERSIST_KEY = '__persisted__tabsRouter';

interface LegacyTabRouter {
  path: string;
  name?: string;
  title?: string;
  isHome?: boolean;
  isAlive?: boolean;
  query?: Record<string, unknown>;
  meta?: Record<string, unknown>;
}

export function migrateLegacyTabState(): NavigationTab[] | null {
  try {
    const raw = localStorage.getItem(LEGACY_PERSIST_KEY);
    if (!raw) return null;

    const parsed = JSON.parse(raw) as {
      tabRouterList: LegacyTabRouter[];
      isRefreshing?: boolean;
    };

    if (!Array.isArray(parsed?.tabRouterList)) {
      localStorage.removeItem(LEGACY_PERSIST_KEY);
      return null;
    }

    const tabs = parsed.tabRouterList.map((item, index) =>
      createNavigationTab({
        path: item.path,
        name: item.name,
        title: item.title ?? String(item.name ?? '未命名'),
        query: item.query as any,
        meta: item.meta,
        index,
        isHome: Boolean(item.isHome),
        isAlive: item.isAlive ?? true,
        closable: !item.isHome,
      })
    );

    localStorage.removeItem(LEGACY_PERSIST_KEY);

    return tabs;
  } catch (error) {
    console.warn('[tab-route] migrate legacy tabs failed:', error);
    return null;
  }
}
