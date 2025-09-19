import type { Plugin } from 'vue';
import type { Props } from './component';
import Component from './component';
import { injectGlobalConfig } from './config';

export type { Props } from './component';
export { DEFAULT_CONFIG } from './component';

export const Codemirror = Component;
export const install: Plugin = (app, defaultConfig?: Props) => {
  app.component(Component.name || 'VueCodemirror', Component);
  if (defaultConfig) {
    injectGlobalConfig(app, defaultConfig);
  }
};

export default {
  Codemirror,
  install,
};
