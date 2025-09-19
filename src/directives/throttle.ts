/**
 *  节流 每单位时间可触发一次
 *  第一次瞬间触发，最后一次不管是否达到间隔时间依然触发
 *  @param {?Number|300} delay - 间隔时间
 *  @param {Function} fn - 执行事件
 *  @param {?String|"click"} event - 事件类型 例："click"
 *  @param {Array} binding.value - [fn,event,delay]
 *  例：<el-button v-throttle="[reset,`click`,500]">刷新</el-button>
 */
import type { App, DirectiveBinding } from 'vue';

function throttle(el: HTMLElement, binding: DirectiveBinding) {
  const [fn, event = 'click', delay = 500] = binding.value;
  let timer: NodeJS.Timeout | null;
  el.addEventListener(event, () => {
    if (timer) return;
    timer = setTimeout(() => {
      fn();
      timer = null;
    }, delay);
  });
}

export function throttleDirective(app: App) {
  app.directive('throttle', {
    // 当被绑定的元素插入到 DOM 中时……
    mounted(el, binding) {
      throttle(el, binding);
    },
  });
}
