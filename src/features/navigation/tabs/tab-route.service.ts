/**
 * @description 标签页导航业务服务
 */

import type { Router, RouteLocationNormalizedLoaded } from 'vue-router';
import { storeToRefs } from 'pinia';
import { watch } from 'vue';
import { useNavigationTabStore } from './tab-route.store';
import type { CloseTabOperator } from './tab-route.types';
import { migrateLegacyTabState } from './tab-route.migrator';

export function createNavigationTabService(router: Router) {
  const tabStore = useNavigationTabStore();
  const { activePath } = storeToRefs(tabStore);

  function initialize() {
    const legacyTabs = migrateLegacyTabState();
    if (legacyTabs && legacyTabs.length > 0) {
      tabStore.initializeFromRoutes(
        legacyTabs.map(
          (tab) =>
            ({
              path: tab.path,
              name: tab.name,
              meta: tab.meta ?? {},
              query: tab.query ?? {},
              hash: tab.hash ?? '',
              fullPath: tab.fullPath ?? tab.path,
            }) as RouteLocationNormalizedLoaded
        )
      );
      tabStore.setActive(router.currentRoute.value.path);
    } else {
      tabStore.initializeFromRoutes([router.currentRoute.value as RouteLocationNormalizedLoaded]);
    }

    watch(
      () => router.currentRoute.value,
      (route) => {
        tabStore.appendTab({ route, isHome: Boolean(route.meta?.isHome) });
      },
      { immediate: true }
    );
  }

  async function refresh(path: string) {
    await tabStore.refresh(path);
    await router.replace({ path, query: router.currentRoute.value.query, hash: router.currentRoute.value.hash });
  }

  function close(path: string, operator: CloseTabOperator = 'self') {
    const prevActivePath = activePath.value;
    tabStore.close(path, operator);

    if (operator === 'self' && path === prevActivePath) {
      if (tabStore.activePath && tabStore.activePath !== prevActivePath) {
        router.push({ path: tabStore.activePath });
      }
    }

    if (operator !== 'self' && tabStore.activePath !== prevActivePath) {
      router.push({ path: tabStore.activePath });
    }
  }

  return {
    initialize,
    refresh,
    close,
    get store() {
      return tabStore;
    },
  };
}
