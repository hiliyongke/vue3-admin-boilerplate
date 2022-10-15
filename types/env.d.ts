/// <reference types="vite/client" />
/// <reference types="vite-svg-loader" />
declare module '*.vue' {
  import { DefineComponent } from 'vue';
  const component: DefineComponent<{}, {}, any>;

  export default component;
}

declare module 'virtual:*' {
  const result: any;

  export default result;
}

declare module 'logger';
declare module 'itools';
declare module 'indexeddb-helper';
