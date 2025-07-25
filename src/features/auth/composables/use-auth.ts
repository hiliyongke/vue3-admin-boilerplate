/**
 * 认证组合式API
 * 参考 Nuxt 3 组合式函数设计
 */

import { computed } from 'vue'
import { useRouter } from 'vue-router'
import { useAuthStore } from '../stores/auth'
import { useSharedUserStore } from '@/shared/stores/user'

export function useAuth() {
  const authStore = useAuthStore()
  const userStore = useSharedUserStore()
  const router = useRouter()

  // 计算属性
  const isLoggedIn = computed(() => authStore.isLoggedIn)
  const user = computed(() => userStore.profile)
  const loading = computed(() => false) // 临时修复

  // 登录方法
  const login = async (form: any) => {
    try {
      await authStore.login(form)
      await router.push('/dashboard')
    } catch (error) {
      console.error('登录失败:', error)
      throw error
    }
  }

  // 登出方法
  const logout = async () => {
    try {
      await authStore.logout()
      await router.push('/login')
    } catch (error) {
      console.error('登出失败:', error)
    }
  }

  // 权限检查
  const hasRole = (role: string) => {
    return authStore.user?.roles?.includes(role) || false
  }

  return {
    // 状态
    isLoggedIn,
    user,
    loading,

    // 方法
    login,
    logout,
    hasRole
  }
}
