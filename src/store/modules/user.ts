/**
 * @description 用户状态管理
 * @author 现代化重构版本
 */

import { defineStore } from 'pinia';
import { logger } from '@/shared/utils';
import type { DefineStoreOptions } from 'pinia';
import { ref, computed } from 'vue';
import { TOKEN_NAME } from '@/config/global';
import { usePermissionStore } from '@/store';
import { getUser, login } from '@/api/user';

/**
 * 用户信息接口
 */
export interface UserInfo {
  roles: string[];
  user_name: string;
  avatar: string;
  email: string;
  phone: string;
}

/**
 * 登录参数接口
 */
export interface LoginParams {
  phone: string;
  account: string;
  password: string;
  verifyCode: string;
  checked: boolean;
}

/**
 * 初始用户信息
 */
const InitUserInfo: UserInfo = {
  roles: [],
  user_name: '',
  avatar: '',
  email: '',
  phone: '',
};

/**
 * 用户 Store - Setup Store 模式
 *
 * @example
 * ```ts
 * const userStore = useUserStore()
 * await userStore.login({ username: 'admin', password: '123456' })
 * logger.debug(userStore.isLoggedIn) // true
 * ```
 */
export const useUserStore = defineStore(
  'user',
  () => {
    // ==================== State ====================

    /**
     * 用户令牌
     */
    const token = ref<string>(localStorage.getItem(TOKEN_NAME) || 'main_token');

    /**
     * 用户信息
     */
    const userInfo = ref<UserInfo>(InitUserInfo);

    // ==================== Getters ====================

    /**
     * 用户角色列表
     */
    const roles = computed<string[]>(() => userInfo.value.roles);

    /**
     * 是否已登录
     */
    const isLoggedIn = computed<boolean>(() => !!token.value && token.value !== 'main_token');

    /**
     * 用户名
     */
    const username = computed<string>(() => userInfo.value.user_name);

    /**
     * 用户头像
     */
    const avatar = computed<string>(() => userInfo.value.avatar);

    // ==================== Actions ====================

    /**
     * 用户登录
     * @param params - 登录参数
     * @throws {Error} 登录失败时抛出错误
     */
    async function handleLogin(params: LoginParams): Promise<void> {
      try {
        const res = await login(params);

        if (res && res.code === 200) {
          // 更新 token
          token.value = res.token;
          localStorage.setItem(TOKEN_NAME, res.token);

          // 更新用户信息
          userInfo.value = {
            ...res.userInfo,
            phone: (res.userInfo as any).phone || '',
          };

          // 初始化路由权限
          const permissionStore = usePermissionStore();
          await permissionStore.initRoutes(res.userInfo.roles);
        } else {
          throw new Error(res.message || '登录失败');
        }
      } catch (error) {
        logger.error('登录失败:', error);
        throw error;
      }
    }

    /**
     * 获取用户信息
     * @throws {Error} 获取失败时抛出错误
     */
    async function fetchUserInfo(): Promise<void> {
      try {
        const res = await getUser({ token: token.value });

        if (res && res.code === 200) {
          userInfo.value = {
            ...res.userInfo,
            phone: (res.userInfo as any).phone || '',
          };

          // 初始化路由权限
          const permissionStore = usePermissionStore();
          await permissionStore.initRoutes(res.userInfo.roles);
        } else {
          throw new Error(res.message || '获取用户信息失败');
        }
      } catch (error) {
        logger.error('获取用户信息失败:', error);
        throw error;
      }
    }

    /**
     * 用户登出
     */
    async function handleLogout(): Promise<void> {
      try {
        // 清除 token
        localStorage.removeItem(TOKEN_NAME);
        token.value = '';

        // 重置用户信息
        userInfo.value = InitUserInfo;

        // 可以在这里调用登出 API
        // await logoutApi()
      } catch (error) {
        logger.error('登出失败:', error);
        throw error;
      }
    }

    /**
     * 移除 token
     */
    function removeToken(): void {
      token.value = '';
      localStorage.removeItem(TOKEN_NAME);
    }

    /**
     * 更新用户信息
     * @param info - 部分用户信息
     */
    function updateUserInfo(info: Partial<UserInfo>): void {
      userInfo.value = {
        ...userInfo.value,
        ...info,
      };
    }

    // ==================== Return ====================

    return {
      // State
      token,
      userInfo,

      // Getters
      roles,
      isLoggedIn,
      username,
      avatar,

      // Actions
      login: handleLogin,
      getUserInfo: fetchUserInfo,
      logout: handleLogout,
      removeToken,
      updateUserInfo,
    };
  },
  {
    persist: {
      paths: ['token', 'userInfo'],
    },
  } as any
);
