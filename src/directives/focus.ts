/**
 * Global focus directive
 * Used for fine-grained control of component focus
 * @Example v-focus
 */
import type { App } from 'vue';

export function focusDirective(app: App) {
  app.directive('focus', {
    // 当被绑定的元素插入到 DOM 中时……
    mounted(el) {
      // Focus the element
      el.focus();
    },
  });
}
