/**
 * Global permission directive
 * Used for fine-grained control of component permission
 * @Example v-auth="RoleEnum.TEST"
 */
import type { App } from 'vue';
import { usePermission } from '@/hooks/use-permission';

function isAuth(el, binding) {
  const { hasPermission } = usePermission();

  const value = binding.value;
  if (!value) return;
  if (!hasPermission(value)) {
    el.parentNode?.removeChild(el);
  }
}

export function permissionDirective(app: App) {
  app.directive('auth', {
    // 当被绑定的元素插入到 DOM 中时……
    mounted(el, binding) {
      isAuth(el, binding);
    },
    updated(el, binding) {
      // 实时更新最新的目标内容
      isAuth(el, binding);
    }
  });
}
