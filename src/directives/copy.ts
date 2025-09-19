/**
 * @Example v-copy=""
 */

import type { App, DirectiveBinding } from 'vue';
import { MessagePlugin } from 'tdesign-vue-next';
function copy(el: HTMLElement, binding: DirectiveBinding) {
  el.textContent = binding.value;
  el.addEventListener('click', () => {
    if (!el.textContent) return MessagePlugin.warning('没有需要复制的目标内容');
    // 创建textarea标签
    const textarea = document.createElement('textarea');
    textarea.readOnly = true;
    textarea.style.position = 'fixed';
    textarea.style.top = '-99999px';
    // 把目标内容赋值给它的value属性
    textarea.value = el.textContent;
    // 插入到页面
    document.body.appendChild(textarea);
    // 调用onselect()方法
    textarea.select();
    // 把目标内容复制进剪贴板, 该API会返回一个Boolean
    const res = document.execCommand('Copy');
    if (res) {
      MessagePlugin.success('复制成功');
    } else {
      MessagePlugin.error('复制失败');
    }
    document.body.removeChild(textarea);
  });
}

export function copyDirective(app: App) {
  app.directive('copy', {
    // 当被绑定的元素插入到 DOM 中时……
    mounted(el, binding) {
      copy(el, binding);
    },
    updated(el, binding) {
      // 实时更新最新的目标内容
      el.targetContent = binding.value;
    },
    unmounted(el) {
      el.removeEventListener('click', () => {});
    },
  });
}
