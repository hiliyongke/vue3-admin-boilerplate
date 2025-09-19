import { defineStore } from 'pinia';
import { TOKEN_NAME } from '@/config/global';
import pinia, { usePermissionStore } from '@/store';
import { getUser, login } from '@/api/user';

interface UserInfo {
  roles: string[];
  user_name: string;
  avatar: string;
  email: string;
  phone: string;
}

const InitUserInfo: UserInfo = {
  roles: [],
  user_name: '',
  avatar: '',
  email: '',
  phone: '',
};

export const useUserStore = defineStore({
  id: 'user',
  state: (): {
    token: string;
    userInfo: UserInfo;
  } => ({
    token: localStorage.getItem(TOKEN_NAME) || 'main_token', // 默认token不走权限
    userInfo: InitUserInfo,
  }),
  getters: {
    roles: (state) => {
      return state.userInfo.roles;
    },
  },
  actions: {
    async login(userInfo: { phone: string; account: string; password: string; verifyCode: string; checked: boolean }) {
      const res = await login(userInfo);
      if (res && res.code === 200) {
        this.token = res.token;
        this.userInfo = {
          ...res.userInfo,
          phone: (res.userInfo as any).phone || '',
        };
        localStorage.setItem(TOKEN_NAME, res.token);

        // 登录成功后立即初始化路由权限
        const permissionStore = usePermissionStore();
        await permissionStore.initRoutes(res.userInfo.roles);
      } else {
        throw new Error(res.message || '登录失败');
      }
    },
    async getUserInfo() {
      const res = await getUser({ token: this.token });
      if (res && res.code === 200) {
        this.userInfo = {
          ...res.userInfo,
          phone: (res.userInfo as any).phone || '',
        };

        // 获取用户信息后初始化路由权限
        const permissionStore = usePermissionStore();
        await permissionStore.initRoutes(res.userInfo.roles);
      } else {
        throw new Error(res.message || '获取用户信息失败');
      }
    },
    async logout() {
      localStorage.removeItem(TOKEN_NAME);
      this.token = '';
      this.userInfo = InitUserInfo;
    },
    async removeToken() {
      this.token = '';
    },
  },
  persist: {
    afterRestore: (ctx) => {
      if (ctx.store.roles && ctx.store.roles.length > 0) {
        const permissionStore = usePermissionStore();
        permissionStore.initRoutes(ctx.store.roles);
      }
    },
  },
});

export function getUserStore() {
  return useUserStore(pinia);
}
