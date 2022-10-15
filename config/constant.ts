/**
 * @name Config
 * @description 项目配置
 */

// ================== App start ==================

// 应用名
export const APP_TITLE = 'Admin';

// 默认语言
export const DEFAULT_LANGUAGE = 'zh-CN';

// 长时间不操作默认锁屏时间
export const DEFAULT_LOCK_TIME = 10 * 60;

// 本地服务端口
export const VITE_PORT = 3000;

// prefix
export const API_PREFIX = '/api';

// serve
export const API_BASE_URL = '/api';
export const API_TARGET_URL = 'http://localhost:3000';

// mock
export const MOCK_API_BASE_URL = '/mock/api';
export const MOCK_API_TARGET_URL = 'http://localhost:3000';

// ================== App end ==================

// ================== Vite start ==================

// mock
export const MOCK = true;

// 包依赖分析
export const ANALYSIS = true;

// 调试工具
export const INSPECT = false;

// 是否支持Md渲染
export const MARKDOWN = true;

// 代码压缩
export const COMPRESSION = true;

// 生产时压缩算法，可选 gzip, brotliCompress, deflate, deflateRaw
export const COMPRESSION_ALGORITHM = 'gzip';

// 删除 console
export const DROP_CONSOLE = true;

// 删除 debugger
export const DROP_DEBUGGER = true;

// progress
export const PROGRESS = true;

export const V_CONSOLE = false;

// ================== Vite end ==================
