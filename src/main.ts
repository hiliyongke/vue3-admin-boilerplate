import { startApp } from '@core/app';

import 'default-passive-events';
import 'virtual:svg-icons-register';

import '@/style/index.less';

void startApp().catch((error: unknown) => {
  console.error('应用启动失败:', error);
});
