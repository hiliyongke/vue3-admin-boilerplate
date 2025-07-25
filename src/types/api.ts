/**
 * @description API相关类型定义
 * @author 优化版本
 */

/**
 * HTTP请求方法类型
 */
type HttpMethod = 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH' | 'HEAD' | 'OPTIONS';

/**
 * API响应基础结构
 */
export interface ApiResponse<T = any> {
  /** 响应状态码 */
  code: number;
  /** 响应数据 */
  data: T;
  /** 响应消息 */
  message: string;
  /** 响应消息（兼容msg字段） */
  msg?: string;
  /** 响应时间戳 */
  timestamp?: number;
  /** 请求追踪ID */
  traceId?: string;
}

/**
 * 分页请求参数
 */
export interface PageParams {
  /** 当前页码 */
  current: number;
  /** 每页数量 */
  pageSize: number;
  /** 排序字段 */
  sorter?: string;
  /** 排序方向 */
  order?: 'asc' | 'desc';
}

/**
 * 分页响应数据
 */
export interface PageResult<T = any> {
  /** 数据列表 */
  list: T[];
  /** 总数量 */
  total: number;
  /** 当前页码 */
  current: number;
  /** 每页数量 */
  pageSize: number;
  /** 总页数 */
  pages?: number;
}

/**
 * 用户信息类型
 */
export interface UserInfo {
  /** 用户ID */
  id: string | number;
  /** 用户名 */
  username: string;
  /** 用户昵称 */
  nickname?: string;
  /** 用户邮箱 */
  email?: string;
  /** 用户手机号 */
  phone?: string;
  /** 用户头像 */
  avatar?: string;
  /** 用户角色 */
  roles: string[];
  /** 用户权限 */
  permissions: string[];
  /** 用户状态 */
  status: 0 | 1; // 0-禁用 1-启用
  /** 创建时间 */
  createTime?: string;
  /** 更新时间 */
  updateTime?: string;
}

/**
 * 登录请求参数
 */
export interface LoginParams {
  /** 用户名 */
  username: string;
  /** 密码 */
  password: string;
  /** 验证码 */
  captcha?: string;
  /** 验证码key */
  captchaKey?: string;
  /** 记住我 */
  rememberMe?: boolean;
}

/**
 * 登录响应数据
 */
export interface LoginResult {
  /** 访问令牌 */
  accessToken: string;
  /** 刷新令牌 */
  refreshToken?: string;
  /** 令牌类型 */
  tokenType?: string;
  /** 过期时间（秒） */
  expiresIn?: number;
  /** 用户信息 */
  userInfo: UserInfo;
}

/**
 * 菜单项类型
 */
export interface MenuItem {
  /** 菜单ID */
  id: string | number;
  /** 父级菜单ID */
  parentId?: string | number;
  /** 菜单名称 */
  name: string;
  /** 菜单标题 */
  title: string;
  /** 菜单路径 */
  path: string;
  /** 菜单图标 */
  icon?: string;
  /** 菜单组件 */
  component?: string;
  /** 重定向路径 */
  redirect?: string;
  /** 菜单类型 0-目录 1-菜单 2-按钮 */
  type: 0 | 1 | 2;
  /** 菜单状态 */
  status: 0 | 1;
  /** 排序 */
  sort: number;
  /** 是否隐藏 */
  hidden?: boolean;
  /** 是否缓存 */
  keepAlive?: boolean;
  /** 权限标识 */
  permission?: string;
  /** 子菜单 */
  children?: MenuItem[];
  /** 路由元信息 */
  meta?: {
    title: string;
    icon?: string;
    hidden?: boolean;
    keepAlive?: boolean;
    permission?: string;
    order?: number;
    expanded?: boolean;
  };
}

/**
 * 文件上传响应
 */
export interface UploadResult {
  /** 文件名 */
  filename: string;
  /** 文件路径 */
  url: string;
  /** 文件大小 */
  size: number;
  /** 文件类型 */
  type: string;
}

/**
 * 字典项类型
 */
export interface DictItem {
  /** 字典项值 */
  value: string | number;
  /** 字典项标签 */
  label: string;
  /** 字典项颜色 */
  color?: string;
  /** 字典项状态 */
  status?: 0 | 1;
  /** 排序 */
  sort?: number;
  /** 备注 */
  remark?: string;
}

/**
 * 字典类型
 */
export interface DictType {
  /** 字典类型 */
  type: string;
  /** 字典名称 */
  name: string;
  /** 字典项列表 */
  items: DictItem[];
}

/**
 * 操作日志类型
 */
export interface OperationLog {
  /** 日志ID */
  id: string | number;
  /** 操作用户 */
  username: string;
  /** 操作模块 */
  module: string;
  /** 操作类型 */
  operation: string;
  /** 操作描述 */
  description: string;
  /** 请求方法 */
  method: string;
  /** 请求URL */
  url: string;
  /** 请求参数 */
  params?: string;
  /** 响应结果 */
  result?: string;
  /** 操作状态 */
  status: 0 | 1; // 0-失败 1-成功
  /** 错误信息 */
  errorMsg?: string;
  /** 操作时间 */
  createTime: string;
  /** IP地址 */
  ip?: string;
  /** 用户代理 */
  userAgent?: string;
}

/**
 * 系统配置类型
 */
export interface SystemConfig {
  /** 配置键 */
  key: string;
  /** 配置值 */
  value: string;
  /** 配置名称 */
  name: string;
  /** 配置描述 */
  description?: string;
  /** 配置类型 */
  type: 'string' | 'number' | 'boolean' | 'json';
  /** 配置分组 */
  group?: string;
}
