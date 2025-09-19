// 应用基础类型
declare interface App {
  title: string;
  version: string;
  shortName: string;
  company: string;
  description: string;
  defaultLanguage: string;
  lockTime: number;
}

// API相关类型
declare interface ApiConfig {
  prefix: string;
  baseUrl: string;
  targetUrl: string;
  mockBaseUrl: string;
  mockTargetUrl: string;
  mockEnabled: boolean;
}

// 构建配置类型
declare interface BuildConfig {
  outputDir: string;
  publicPath: string;
  dropConsole: boolean;
  dropDebugger: boolean;
  compression: boolean;
  compressionAlgorithm: 'gzip' | 'brotli' | 'deflate';
  analysis: boolean;
  progress: boolean;
}

// 开发配置类型
declare interface DevConfig {
  port: number;
  open: boolean;
  https: boolean;
  proxy: Record<string, any>;
}

// 统一配置类型
declare interface AppConfig {
  app: App;
  api: ApiConfig;
  build: BuildConfig;
  dev: DevConfig;
}

// 环境变量类型
declare interface EnvConfig {
  isDev: boolean;
  isProd: boolean;
  mode: string;
}

// 路由元信息类型
declare interface RouteMeta {
  title?: string;
  icon?: string;
  hidden?: boolean;
  roles?: string[];
  keepAlive?: boolean;
}

// 组件Props类型
declare interface ComponentProps {
  [key: string]: any;
}

export { App, ApiConfig, BuildConfig, DevConfig, AppConfig, EnvConfig, RouteMeta, ComponentProps };
