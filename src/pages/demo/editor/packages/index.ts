import type { Plugin } from 'vue';
import Component, { Props } from './component';
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
  install
};
