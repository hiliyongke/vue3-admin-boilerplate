/// <reference types="vite/client" />
/// <reference types="vite-svg-loader" />
/// <reference types="file-saver" />

declare module 'virtual:*' {
  const result: any;

  export default result;
}

declare module 'logger';
declare module 'itools';
declare module 'indexeddb-helper';
