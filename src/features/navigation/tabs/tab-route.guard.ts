/**
 * @description 标签页导航路由守卫
 */

import type { Router } from 'vue-router';
import { useNavigationTabStore } from './tab-route.store';

export function setupTabRouteGuard(router: Router) {
  const tabStore = useNavigationTabStore();

  router.afterEach((to) => {
    tabStore.appendTab({ route: to, isHome: Boolean(to.meta?.isHome) });
    tabStore.setActive(to.path);
  });
}
