import { createPinia } from 'pinia';
import { createPersistedState } from 'pinia-plugin-persistedstate';
import { App } from 'vue';

const pinia = createPinia();

pinia.use(
  createPersistedState({
    // storage: localStorage,
    serializer: {
      // 指定参数序列化器
      serialize: JSON.stringify,
      deserialize: JSON.parse
    }
  })
);

export * from './modules/lock-screen';
export * from './modules/notification';
export * from './modules/permission';
export * from './modules/user';
export * from './modules/setting';
export * from './modules/tabs-router';

export function setupPinia(app: App<Element>) {
  app.use(pinia);
}
export default pinia;
