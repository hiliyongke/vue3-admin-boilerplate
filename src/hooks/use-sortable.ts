import type { Options } from 'sortablejs';
import type { Ref } from 'vue';
import { nextTick, unref } from 'vue';

/**
 * sortablejs 拖拽 hook
 * @param el 拖拽容器元素
 * @param options 拖拽配置项
 */
export function useSortable(el: HTMLElement | Ref<HTMLElement> | null, options?: Options) {
  async function initSortable() {
    return new Promise((resolve) => {
      nextTick(async () => {
        if (!el) return;
        const Sortable = (await import('sortablejs')).default;
        Sortable.create(unref(el), {
          animation: 150,
          delay: 400,
          delayOnTouchOnly: true,
          ...options,
        });
        resolve(Sortable);
      });
    });
  }

  return { initSortable };
}
