import { defineStore } from 'pinia';
import { TOKEN_NAME } from '@/config/global';
import pinia, { usePermissionStore } from '@/store';
import { getUser, login } from '@/api/user';

const InitUserInfo = {
  roles: []
};

export const useUserStore = defineStore({
  id: 'user',
  state: () => ({
    token: localStorage.getItem(TOKEN_NAME) || 'main_token', // 默认token不走权限
    userInfo: InitUserInfo
  }),
  getters: {
    roles: state => {
      return state.userInfo.roles;
    }
  },
  actions: {
    async login(userInfo: {
      phone: string;
      account: string;
      password: string;
      verifyCode: string;
      checked: boolean;
    }) {
      const res = await login(userInfo);
      if (res) {
        this.token = res.token;
      } else {
        throw res;
      }
    },
    async getUserInfo() {
      const res = await getUser({ token: this.token });
      this.userInfo = res.userInfo;
    },
    async logout() {
      localStorage.removeItem(TOKEN_NAME);
      this.token = '';
      this.userInfo = InitUserInfo;
    },
    async removeToken() {
      this.token = '';
    }
  },
  persist: {
    afterRestore: ctx => {
      if (ctx.store.roles && ctx.store.roles.length > 0) {
        const permissionStore = usePermissionStore();
        permissionStore.initRoutes(ctx.store.roles);
      }
    }
  }
});

export function getUserStore() {
  return useUserStore(pinia);
}
