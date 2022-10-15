/*
 * @Description: 注册全局自定义指令
 */
import type { App } from 'vue';
import { permissionDirective } from '@/directives/permission';
import { focusDirective } from '@/directives/focus';
import { copyDirective } from '@/directives/copy';
import { debounceDirective } from '@/directives/debounce';
import { throttleDirective } from '@/directives/throttle';
import { watermarkDirective } from '@/directives/watermark';
import { longPressDirective } from '@/directives/long-press';
import { draggableDirective } from '@/directives/draggable';

export function setupGlobDirectives(app: App) {
  copyDirective(app);
  debounceDirective(app);
  draggableDirective(app);
  focusDirective(app);
  longPressDirective(app);
  permissionDirective(app);
  throttleDirective(app);
  watermarkDirective(app);
}
