/**
 * v-longpress
 * 长按指令，长按时触发事件
 */

import { App, DirectiveBinding } from 'vue';

export function longPressDirective(app: App) {
  app.directive('longpress', {
    // 当被绑定的元素插入到 DOM 中时……
    mounted(el: HTMLElement, binding: DirectiveBinding) {
      if (typeof binding.value !== 'function') {
        throw 'callback must be a function';
      }
      // 定义变量
      let pressTimer: ReturnType<typeof setTimeout> | null = null;
      // 创建计时器（ 2秒后执行函数 ）
      const start = (e: MouseEvent | TouchEvent) => {
        if ('button' in e) {
          if (e.type === 'click' && e.button !== 0) {
            return;
          }
        }
        if (pressTimer === null) {
          pressTimer = setTimeout(() => {
            handler(e);
          }, 1000);
        }
      };
      // 取消计时器
      const cancel = (e: Event) => {
        if (pressTimer !== null) {
          clearTimeout(pressTimer);
          pressTimer = null;
        }
      };
      // 运行函数
      const handler = (e: MouseEvent | TouchEvent) => {
        binding.value(e);
      };
      // 添加事件监听器
      el.addEventListener('mousedown', start);
      el.addEventListener('touchstart', start);
      // 取消计时器
      el.addEventListener('click', cancel);
      el.addEventListener('mouseout', cancel);
      el.addEventListener('touchend', cancel);
      el.addEventListener('touchcancel', cancel);
    }
  });
}
