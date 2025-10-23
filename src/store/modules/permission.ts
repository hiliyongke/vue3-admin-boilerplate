/**
 * @description 权限状态管理
 * @author 现代化重构版本
 */

import { defineStore } from 'pinia';
import { logger } from '@/shared/utils';
import { ref, computed } from 'vue';
import type { RouteRecordRaw } from 'vue-router';
import router, { asyncRouterList } from '@/router';

/**
 * 过滤权限路由
 * @param routes - 路由列表
 * @param roles - 用户角色列表
 * @returns 过滤后的路由和被移除的路由
 */
function filterPermissionsRouters(
  routes: RouteRecordRaw[],
  roles: string[]
): {
  accessedRouters: RouteRecordRaw[];
  removeRoutes: RouteRecordRaw[];
} {
  const accessedRouters: RouteRecordRaw[] = [];
  const removeRoutes: RouteRecordRaw[] = [];

  routes.forEach((route) => {
    const children: RouteRecordRaw[] = [];

    route.children?.forEach((childRouter) => {
      const roleCode = childRouter.meta?.roleCode || childRouter.name;

      if (roleCode && roles.includes(String(roleCode))) {
        children.push(childRouter);
      } else {
        removeRoutes.push(childRouter);
      }
    });

    if (children.length > 0) {
      route.children = children;
      accessedRouters.push(route);
    }
  });

  return { accessedRouters, removeRoutes };
}

/**
 * 权限 Store - Setup Store 模式
 *
 * @example
 * ```ts
 * const permissionStore = usePermissionStore()
 * await permissionStore.initRoutes(['admin', 'user'])
 * logger.debug(permissionStore.hasPermission('admin')) // true
 * ```
 */
export const usePermissionStore = defineStore('permission', () => {
  // ==================== State ====================

  /**
   * 白名单路由（无需权限即可访问）
   */
  const whiteListRouters = ref<string[]>(['/login', '/404', '/403']);

  /**
   * 用户可访问的路由列表
   */
  const routers = ref<RouteRecordRaw[]>([]);

  /**
   * 被移除的路由列表
   */
  const removeRoutes = ref<RouteRecordRaw[]>([]);

  /**
   * 用户角色列表
   */
  const userRoles = ref<string[]>([]);

  // ==================== Getters ====================

  /**
   * 是否有管理员权限
   */
  const isAdmin = computed<boolean>(() => userRoles.value.includes('admin') || userRoles.value.includes('all'));

  /**
   * 可访问的路由数量
   */
  const routerCount = computed<number>(() => routers.value.length);

  /**
   * 是否已初始化路由
   */
  const isInitialized = computed<boolean>(() => routers.value.length > 0);

  // ==================== Actions ====================

  /**
   * 初始化路由权限
   * @param roles - 用户角色列表
   */
  async function initRoutes(roles: string[]): Promise<void> {
    try {
      userRoles.value = roles;
      let accessedRouters: RouteRecordRaw[] = [];
      let removedRoutes: RouteRecordRaw[] = [];

      // 如果用户有 admin 角色或 all 权限，允许访问所有路由
      if (roles.includes('all') || roles.includes('admin')) {
        accessedRouters = asyncRouterList;
      } else {
        const result = filterPermissionsRouters(asyncRouterList, roles);
        accessedRouters = result.accessedRouters;
        removedRoutes = result.removeRoutes;
      }

      routers.value = accessedRouters;
      removeRoutes.value = removedRoutes;

      // 移除无权限的路由
      removedRoutes.forEach((item: RouteRecordRaw) => {
        if (item.name && router.hasRoute(item.name)) {
          router.removeRoute(item.name);
        }
      });

      logger.debug('✅ 路由权限初始化完成', {
        roles,
        accessedCount: accessedRouters.length,
        removedCount: removedRoutes.length,
      });
    } catch (error) {
      logger.error('❌ 路由权限初始化失败:', error);
      throw error;
    }
  }

  /**
   * 恢复被移除的路由
   */
  async function restoreRoutes(): Promise<void> {
    removeRoutes.value.forEach((item: RouteRecordRaw) => {
      if (item.name && !router.hasRoute(item.name)) {
        router.addRoute(item);
      }
    });

    logger.debug('✅ 路由已恢复', {
      restoredCount: removeRoutes.value.length,
    });
  }

  /**
   * 检查是否有指定权限
   * @param role - 角色名称
   * @returns 是否有权限
   */
  function hasPermission(role: string): boolean {
    return userRoles.value.includes(role) || isAdmin.value;
  }

  /**
   * 检查是否有任一权限
   * @param roles - 角色列表
   * @returns 是否有任一权限
   */
  function hasAnyPermission(roles: string[]): boolean {
    return roles.some((role) => hasPermission(role));
  }

  /**
   * 检查是否有所有权限
   * @param roles - 角色列表
   * @returns 是否有所有权限
   */
  function hasAllPermissions(roles: string[]): boolean {
    return roles.every((role) => hasPermission(role));
  }

  /**
   * 重置权限状态
   */
  function reset(): void {
    routers.value = [];
    removeRoutes.value = [];
    userRoles.value = [];
  }

  // ==================== Return ====================

  return {
    // State
    whiteListRouters,
    routers,
    removeRoutes,
    userRoles,

    // Getters
    isAdmin,
    routerCount,
    isInitialized,

    // Actions
    initRoutes,
    restore: restoreRoutes,
    hasPermission,
    hasAnyPermission,
    hasAllPermissions,
    reset,
  };
});
