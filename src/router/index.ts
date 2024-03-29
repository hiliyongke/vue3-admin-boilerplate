import {
  useRoute,
  createRouter,
  createWebHashHistory,
  RouteRecordRaw
} from 'vue-router';
import uniq from 'lodash-es/uniq';

import asyncModules from './async-modules';
import staticModules from './static-modules';
import { App } from 'vue';

// 对路由进行排序
export const asyncRouterList: Array<RouteRecordRaw> = [
  ...asyncModules,
  ...staticModules
].sort((a, b) => a.meta?.order - b.meta?.order);

// 存放固定路由
const defaultRouterList: Array<RouteRecordRaw> = [
  {
    path: '/login',
    name: 'login',
    component: () => import('@/pages/login/index.vue')
  },
  {
    path: '/',
    redirect: '/dashboard/base'
  },
  {
    path: '/:w+',
    name: '404Page',
    redirect: '/result/404'
  }
];

export const allRoutes = [...asyncRouterList, ...defaultRouterList];

export const getRoutesExpanded = () => {
  const expandedRoutes = [];

  allRoutes.forEach(item => {
    if (item.meta && item.meta.expanded) {
      expandedRoutes.push(item.path);
    }
    if (item.children && item.children.length > 0) {
      item.children
        .filter(child => child.meta && child.meta.expanded)
        .forEach((child: RouteRecordRaw) => {
          expandedRoutes.push(item.path);
          expandedRoutes.push(`${item.path}/${child.path}`);
        });
    }
  });
  return uniq(expandedRoutes);
};

export const getActive = (maxLevel = 3): string => {
  const route = useRoute();
  if (!route.path) {
    return '';
  }
  return route.path
    .split('/')
    .filter((_item: string, index: number) => index <= maxLevel && index > 0)
    .map((item: string) => `/${item}`)
    .join('');
};

const router = createRouter({
  history: createWebHashHistory(),
  routes: allRoutes,
  scrollBehavior() {
    return {
      el: '#app',
      top: 0,
      behavior: 'smooth'
    };
  }
});

export function setupRouter(app: App<Element>) {
  app.use(router);
}

export default router;
