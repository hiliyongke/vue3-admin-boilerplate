import type { App } from 'vue';
import { inject } from 'vue';
import type { Props } from './component';

const CONFIG_SYMBOL = Symbol('vue-codemirror-global-config');
export const injectGlobalConfig = (app: App, config?: Props) => {
  app.provide(CONFIG_SYMBOL, config);
};

export const useGlobalConfig = () => {
  return inject<Props>(CONFIG_SYMBOL, {} as Props);
};
