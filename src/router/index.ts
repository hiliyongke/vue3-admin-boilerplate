/**
 * @description 路由配置文件
 * @author 优化版本
 *
 * 主要功能：
 * 1. 创建路由实例
 * 2. 配置路由规则
 * 3. 设置路由守卫
 * 4. 提供路由工具函数
 */

import { useRoute, createRouter, createWebHashHistory, type RouteRecordRaw, type Router } from 'vue-router';
import { uniq } from 'lodash-es';
import type { App } from 'vue';

import asyncModules from './async-modules';
import staticModules from './static-modules';

/**
 * 异步路由列表（需要权限验证的路由）
 * 按照meta.order字段进行排序
 */
export const asyncRouterList: RouteRecordRaw[] = [...asyncModules, ...staticModules].sort(
  (a, b) => (a.meta?.order || 0) - (b.meta?.order || 0)
);

/**
 * 基础路由列表（无需权限验证的路由）
 */
const defaultRouterList: RouteRecordRaw[] = [
  {
    path: '/login',
    name: 'login',
    component: () => import('@/pages/login/index.vue'),
    meta: {
      title: '登录',
      hidden: true,
    },
  },
  {
    path: '/',
    redirect: '/dashboard/base',
  },
  {
    path: '/:pathMatch(.*)*',
    name: '404Page',
    redirect: '/result/404',
  },
];

/**
 * 所有路由配置
 */
export const allRoutes: RouteRecordRaw[] = [...asyncRouterList, ...defaultRouterList];

/**
 * 获取展开的路由列表
 * @returns 展开的路由路径数组
 */
export const getRoutesExpanded = (): string[] => {
  const expandedRoutes: string[] = [];

  allRoutes.forEach((item: RouteRecordRaw) => {
    // 检查当前路由是否需要展开
    if (item.meta?.expanded) {
      expandedRoutes.push(item.path);
    }

    // 检查子路由是否需要展开
    if (item.children && item.children.length > 0) {
      item.children
        .filter((child: RouteRecordRaw) => child.meta?.expanded)
        .forEach((child: RouteRecordRaw) => {
          expandedRoutes.push(item.path);
          expandedRoutes.push(`${item.path}/${child.path}`);
        });
    }
  });

  return uniq(expandedRoutes);
};

/**
 * 获取当前激活的路由路径
 * @returns 激活的路由路径
 */
export const getActive = (): string => {
  const route = useRoute();
  return route.path || '';
};

/**
 * 创建路由实例
 */
const router: Router = createRouter({
  // 使用hash模式，兼容性更好
  history: createWebHashHistory(import.meta.env.BASE_URL),
  routes: allRoutes,
  // 路由切换时的滚动行为
  scrollBehavior(to, from, savedPosition) {
    if (savedPosition) {
      return savedPosition;
    }
    return {
      el: '#app',
      top: 0,
      behavior: 'smooth',
    };
  },
});

/**
 * 配置路由
 * @param app Vue应用实例
 */
export function setupRouter(app: App<Element>): void {
  app.use(router);
}

export default router;
