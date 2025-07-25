// 通用类型定义

// 基础响应类型
export interface BaseResponse<T = any> {
  code: number;
  message: string;
  data: T;
  success: boolean;
}

// 分页信息类型
export interface PageInfo {
  current: number;
  pageSize: number;
  total: number;
  totalPages?: number;
}

// 选择选项类型
export interface SelectOption {
  label: string;
  value: string | number;
  disabled?: boolean;
}

// 表格行数据类型
export interface TableRowData {
  [key: string]: any;
}

// 表格选择选项类型
export interface SelectOptions<T = TableRowData> {
  selectedRowData: T[];
  type: 'check' | 'uncheck';
  currentRowKey?: string;
  currentRowData?: T;
}

// 滚动容器元素类型
export type ScrollContainerElement = HTMLElement | Window;

// 滚动容器类型
export type ScrollContainer = (() => ScrollContainerElement) | undefined;

// 文件上传类型
export interface UploadFile {
  name: string;
  size: number;
  type: string;
  url?: string;
  status?: 'uploading' | 'success' | 'error';
  percent?: number;
}

// 树形数据类型
export interface TreeNode {
  id: string | number;
  label: string;
  children?: TreeNode[];
  disabled?: boolean;
  [key: string]: any;
}

// 注意：MenuItem 已在 src/types/api.ts 中定义
// 如需使用，请从 api.ts 导入

// 主题配置类型
export interface ThemeConfig {
  mode: 'light' | 'dark' | 'auto';
  primaryColor: string;
  borderRadius: number;
  compactMode: boolean;
}

// 语言配置类型
export interface LanguageConfig {
  locale: string;
  fallback: string;
  messages: Record<string, any>;
}

// 错误信息类型
export interface ErrorInfo {
  message: string;
  stack?: string;
  componentStack?: string;
  errorBoundary?: string;
}

// 加载状态类型
export type LoadingState = 'idle' | 'loading' | 'success' | 'error';

// 操作结果类型
export interface OperationResult<T = any> {
  success: boolean;
  data?: T;
  error?: string;
  message?: string;
}

// 键值对类型
export type KeyValuePair<T = any> = {
  key: string;
  value: T;
};

// 可选字段类型
export type Optional<T, K extends keyof T> = Omit<T, K> & Partial<Pick<T, K>>;

// 必需字段类型
export type Required<T, K extends keyof T> = T & { [P in K]-?: T[P] };
