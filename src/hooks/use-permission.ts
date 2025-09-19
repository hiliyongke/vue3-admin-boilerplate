// 用户权限hooks
import { getUserStore } from '@/store/index';

export function usePermission() {
  /**
   * @description 判断当前用户是否有权限
   * @param {*} value 用户权限数组或字符串、数值,例:['admin']
   */
  function hasPermission(value: string[]) {
    // Visible by default
    if (!value) {
      return true;
    }
    // 获取登录用户权限信息
    const userStore = getUserStore();
    const { userInfo } = userStore;
    const { roles } = userInfo;
    if (!Array.isArray(value)) {
      return roles.includes(value);
    }
    // value是数组
    return value.some((item) => roles.includes(item));
  }
  return {
    hasPermission,
  };
}
