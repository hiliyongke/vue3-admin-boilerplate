import { defineStore } from 'pinia';
import { RouteRecordRaw } from 'vue-router';
import router, { asyncRouterList } from '@/router';
import pinia from '@/store';

function filterPermissionsRouters(
  routes: Array<RouteRecordRaw>,
  roles: Array<unknown>
) {
  const res = [];
  const removeRoutes = [];
  routes.forEach(route => {
    const children = [];
    route.children?.forEach(childRouter => {
      const roleCode = childRouter.meta?.roleCode || childRouter.name;
      if (roles.indexOf(roleCode) !== -1) {
        children.push(childRouter);
      } else {
        removeRoutes.push(childRouter);
      }
    });
    if (children.length > 0) {
      route.children = children;
      res.push(route);
    }
  });
  return { accessedRouters: res, removeRoutes };
}

export const usePermissionStore = defineStore({
  id: 'permission',
  state: () => ({
    whiteListRouters: ['/login'],
    routers: [],
    removeRoutes: []
  }),
  actions: {
    async initRoutes(roles: Array<unknown>) {
      let accessedRouters = [];
      let removeRoutes = [];

      // 如果用户有 admin 角色或 all 权限，允许访问所有路由
      if (roles.includes('all') || roles.includes('admin')) {
        accessedRouters = asyncRouterList;
      } else {
        const res = filterPermissionsRouters(asyncRouterList, roles);
        accessedRouters = res.accessedRouters;
        removeRoutes = res.removeRoutes;
      }

      this.routers = accessedRouters;
      this.removeRoutes = removeRoutes;

      removeRoutes.forEach((item: RouteRecordRaw) => {
        if (router.hasRoute(item.name)) {
          router.removeRoute(item.name);
        }
      });
    },
    async restore() {
      this.removeRoutes.forEach((item: RouteRecordRaw) => {
        router.addRoute(item);
      });
    }
  }
});

export function getPermissionStore() {
  return usePermissionStore(pinia);
}
