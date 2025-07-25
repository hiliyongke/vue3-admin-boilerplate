/**
 * @name Config
 * @description 项目配置
 */

// ================== App start ==================
// 公司名
export const COMPANY_NAME = '冲向大佬';

// 应用名
export const APP_TITLE = 'Admin';

// spa
export const PWA = true;

// shortname 轻应用
export const VITE_GLOB_APP_SHORT_NAME = 'Admin';

// 默认语言
export const DEFAULT_LANGUAGE = 'zh-CN';

// 长时间不操作默认锁屏时间
export const DEFAULT_LOCK_TIME = 10 * 60;

// 本地服务端口
export const VITE_PORT = 3000;

// api prefix
export const API_PREFIX = '/api';

// serve
export const API_BASE_URL = '/api';
export const API_TARGET_URL = 'http://localhost:3000';

// mock
export const MOCK_API_BASE_URL = '/mock/api';
export const MOCK_API_TARGET_URL = 'http://localhost:3000';

// ================== App end ==================

// ================== Vite start ==================

// PUBLIC_PATH
export const PUBLIC_PATH = './';

// mock
export const MOCK = false;

// 包依赖分析
export const ANALYSIS = true;

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

// 输出目录
export const OUTPUT_DIR = 'dist';

// ================== Vite end ==================
