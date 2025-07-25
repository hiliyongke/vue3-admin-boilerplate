import { defineStore } from 'pinia';

export interface AuthState {
  isAuthenticated: boolean;
  token: string | null;
  user: any;
}

export const useAuthStore = defineStore('auth', {
  state: (): AuthState => ({
    isAuthenticated: false,
    token: null,
    user: null
  }),

  getters: {
    isLoggedIn: (state) => state.isAuthenticated
  },

  actions: {
    async login(credentials: any) {
      // 模拟登录逻辑
      this.token = 'mock-token';
      this.user = { id: '1', name: credentials.username };
      this.isAuthenticated = true;
    },

    async logout() {
      this.token = null;
      this.user = null;
      this.isAuthenticated = false;
    },

    setAuth(token: string, user: any) {
      this.token = token;
      this.user = user;
      this.isAuthenticated = true;
    },

    clearAuth() {
      this.token = null;
      this.user = null;
      this.isAuthenticated = false;
    }
  }
});
