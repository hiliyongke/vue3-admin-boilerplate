/**
 * @description 环境变量类型定义
 */

/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_APP_TITLE: string;
  readonly VITE_APP_VERSION: string;
  readonly VITE_PORT: number;
  readonly VITE_PUBLIC_PATH: string;
  readonly VITE_MONITOR_URL: string;
  readonly VITE_API_URL: string;
  readonly VITE_USE_MOCK: boolean;
  readonly VITE_DROP_CONSOLE: boolean;
  readonly VITE_BUILD_COMPRESS: string;
  readonly VITE_USE_CDN: boolean;
  readonly VITE_LEGACY: boolean;
  readonly VITE_USE_IMAGEMIN: boolean;
  readonly VITE_GENERATE_UI: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}

declare module '*.vue' {
  import type { DefineComponent } from 'vue';

  const component: DefineComponent<Record<string, never>, Record<string, never>, any>;
  export default component;
}
