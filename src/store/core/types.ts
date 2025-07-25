/**
 * @description 状态管理类型定义
 * @author 现代化架构
 */

/**
 * 基础状态接口
 */
export interface BaseState {
  /** 加载状态 */
  loading: boolean;
  /** 错误信息 */
  error: string | null;
  /** 最后更新时间 */
  lastUpdated: number;
}

/**
 * 用户状态接口
 */
export interface UserState extends BaseState {
  /** 用户信息 */
  userInfo: UserInfo | null;
  /** 访问令牌 */
  token: string | null;
  /** 权限列表 */
  permissions: string[];
  /** 角色列表 */
  roles: string[];
}

/**
 * 应用状态接口
 */
export interface AppState extends BaseState {
  /** 应用标题 */
  title: string;
  /** 主题模式 */
  theme: 'light' | 'dark' | 'auto';
  /** 语言设置 */
  locale: string;
  /** 侧边栏折叠状态 */
  sidebarCollapsed: boolean;
  /** 设备类型 */
  device: 'desktop' | 'tablet' | 'mobile';
  /** 屏幕尺寸 */
  screenSize: {
    width: number;
    height: number;
  };
}

/**
 * 路由状态接口
 */
export interface RouterState extends BaseState {
  /** 标签页列表 */
  tabs: TabInfo[];
  /** 当前激活的标签页 */
  activeTab: string;
  /** 缓存的页面列表 */
  cachedViews: string[];
  /** 访问过的路由列表 */
  visitedRoutes: string[];
}

/**
 * 用户信息接口
 */
export interface UserInfo {
  /** 用户ID */
  id: string;
  /** 用户名 */
  username: string;
  /** 昵称 */
  nickname: string;
  /** 邮箱 */
  email: string;
  /** 头像 */
  avatar: string;
  /** 手机号 */
  phone: string;
  /** 部门 */
  department: string;
  /** 职位 */
  position: string;
  /** 创建时间 */
  createdAt: string;
  /** 最后登录时间 */
  lastLoginAt: string;
}

/**
 * 标签页信息接口
 */
export interface TabInfo {
  /** 路由路径 */
  path: string;
  /** 页面标题 */
  title: string;
  /** 路由名称 */
  name: string;
  /** 是否固定 */
  affix: boolean;
  /** 是否缓存 */
  keepAlive: boolean;
  /** 图标 */
  icon?: string;
  /** 查询参数 */
  query?: Record<string, any>;
}

/**
 * 状态持久化配置
 */
export interface PersistConfig {
  /** 存储键名 */
  key: string;
  /** 存储类型 */
  storage: 'localStorage' | 'sessionStorage';
  /** 需要持久化的路径 */
  paths?: string[];
  /** 序列化函数 */
  serializer?: {
    serialize: (value: any) => string;
    deserialize: (value: string) => any;
  };
}
