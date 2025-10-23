/**
 * @description 标签页导航 Store（领域化重构 - Setup 语法）
 */

import { defineStore } from 'pinia';
import { ref, computed, toRaw } from 'vue';
import type { RouteLocationNormalizedLoaded } from 'vue-router';
import type { NavigationTab, AppendTabPayload, CloseTabOperator, NavigationRouteSnapshot } from './tab-route.types';
import { createNavigationTab, findTabIndex, closeTabs, calcIncludeNames } from './tab-route.utils';

const HOME_ROUTE_PATH = '/dashboard/base';
const UNCACHEABLE_DEFAULT: string[] = ['login'];

export const useNavigationTabStore = defineStore(
  'navigationTab',
  () => {
    // State
    const tabs = ref<NavigationTab[]>([
      createNavigationTab({
        path: HOME_ROUTE_PATH,
        title: '仪表盘',
        name: 'DashboardBase',
        isHome: true,
        isAlive: true,
        closable: false,
        index: 0,
      }),
    ]);

    const activePath = ref<string>(HOME_ROUTE_PATH);
    const refreshing = ref<boolean>(false);
    // 确保始终是 Set 对象（防止持久化后变成普通对象）
    const uncacheableRouteNames = ref<Set<string>>(new Set(UNCACHEABLE_DEFAULT));

    // Getters
    const allTabs = computed(() => tabs.value);
    const visibleTabs = computed(() => tabs.value);
    const includeNames = computed(() => calcIncludeNames(tabs.value, uncacheableRouteNames.value));
    const isRefreshing = computed(() => refreshing.value);
    const activePathValue = computed(() => activePath.value);

    // Actions
    function setUncacheable(names: string[]) {
      uncacheableRouteNames.value = new Set(names);
    }

    function appendUncacheable(names: string[]) {
      names.forEach((name) => uncacheableRouteNames.value.add(name));
    }

    function appendTab(payload: AppendTabPayload) {
      const { route, isHome = false } = payload;
      const shouldCache = !uncacheableRouteNames.value.has(String(route.name));
      const tab = createNavigationTab({
        path: route.path,
        name: route.name,
        title: String(route.meta?.title ?? route.name ?? '未命名'),
        query: toRaw(route.query),
        hash: route.hash,
        fullPath: route.fullPath,
        meta: route.meta,
        isHome,
        isAlive: shouldCache,
        closable: !isHome,
        index: tabs.value.length,
      });

      const existingIndex = findTabIndex(tabs.value, tab.path);

      if (existingIndex === -1) {
        tabs.value = [...tabs.value, tab];
      } else {
        tabs.value[existingIndex] = { ...tabs.value[existingIndex], ...tab };
      }

      activePath.value = tab.path;
    }

    function setActive(path: string) {
      if (!path) return;
      activePath.value = path;
    }

    async function refresh(path: string) {
      const index = findTabIndex(tabs.value, path);
      if (index === -1) return;
      refreshing.value = true;
      tabs.value[index].isAlive = false;

      await new Promise((resolve) => window.requestAnimationFrame(() => resolve(true)));

      tabs.value[index].isAlive = true;
      refreshing.value = false;
    }

    function close(path: string, operator: CloseTabOperator = 'self') {
      const currentIndex = findTabIndex(tabs.value, path);
      if (currentIndex === -1) return;

      const result = closeTabs(tabs.value, currentIndex, operator);
      tabs.value = result.tabs;
      activePath.value = result.target?.path ?? activePath.value;
    }

    function reset() {
      tabs.value = [
        createNavigationTab({
          path: HOME_ROUTE_PATH,
          title: '仪表盘',
          name: 'DashboardBase',
          isHome: true,
          isAlive: true,
          closable: false,
          index: 0,
        }),
      ];
      activePath.value = HOME_ROUTE_PATH;
      refreshing.value = false;
      uncacheableRouteNames.value = new Set(UNCACHEABLE_DEFAULT);
    }

    function initializeFromRoutes(routes: Array<NavigationRouteSnapshot | RouteLocationNormalizedLoaded>) {
      const effectiveRoutes =
        routes.length > 0
          ? routes
          : [
              {
                path: HOME_ROUTE_PATH,
                name: 'DashboardBase',
                meta: { title: '仪表盘', isHome: true },
                query: {},
                hash: '',
                fullPath: HOME_ROUTE_PATH,
              } satisfies NavigationRouteSnapshot,
            ];

      tabs.value = effectiveRoutes.map((route, index) =>
        createNavigationTab({
          path: route.path,
          name: route.name,
          title: String(route.meta?.title ?? route.name ?? '未命名'),
          query: toRaw(route.query ?? {}),
          hash: route.hash,
          fullPath: route.fullPath ?? route.path,
          meta: route.meta,
          index,
          isHome: Boolean(route.meta?.isHome || route.path === HOME_ROUTE_PATH),
          isAlive: !uncacheableRouteNames.value.has(String(route.name)),
          closable: !(route.meta?.isHome || route.path === HOME_ROUTE_PATH),
        })
      );

      const active = tabs.value.find((tab) => tab.path === activePath.value) ?? tabs.value[0];
      activePath.value = active.path;
    }

    // 初始化检查：确保 uncacheableRouteNames 是 Set 对象
    // 防止从持久化存储恢复后变成普通对象
    if (!(uncacheableRouteNames.value instanceof Set)) {
      uncacheableRouteNames.value = new Set(UNCACHEABLE_DEFAULT);
    }

    return {
      // State
      tabs,
      activePath,
      refreshing,
      uncacheableRouteNames,
      // Getters
      allTabs,
      visibleTabs,
      includeNames,
      isRefreshing,
      activePathValue,
      // Actions
      setUncacheable,
      appendUncacheable,
      appendTab,
      setActive,
      refresh,
      close,
      reset,
      initializeFromRoutes,
    };
  },
  {
    persist: {
      // 只持久化 tabs 和 activePath，不持久化 Set 类型的 uncacheableRouteNames
      paths: ['tabs', 'activePath'],
    },
  } as any
);
