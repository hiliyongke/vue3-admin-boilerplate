/**
 * Global debounce directive
 * Used for fine-grained control of component debounce
 *  @param {Function} fn - 执行事件
 *  @param {?String|"click"} event - 事件类型 例："click"
 *  @param {?Number|200} delay - 间隔时间
 *  @param {Array} binding.value - [fn, event, delay]
 * @Example <a-input v-debounce="[search, 'input', 200]"></a-input>
 */

import type { App, DirectiveBinding } from 'vue';

function debounce(el: HTMLElement, binding: DirectiveBinding) {
  const [fn, event = 'input', delay = 200] = binding.value;
  let timer: NodeJS.Timeout | null;
  el.addEventListener(event, () => {
    timer && clearTimeout(timer);
    timer = setTimeout(() => {
      fn();
    }, delay);
  });
}

export function debounceDirective(app: App) {
  app.directive('debounce', {
    // 当被绑定的元素插入到 DOM 中时……
    mounted(el, binding) {
      debounce(el, binding);
    },
  });
}
