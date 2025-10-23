/**
 * @description 全局接口类型定义
 * @author 优化版本
 */

import { type RouteRecordName } from 'vue-router';
import type STYLE_CONFIG from '@/config/style';

/**
 * API响应数据类型
 */
export interface ResDataType<T = any> {
  /** 响应状态码 */
  code: number;
  /** 响应数据 */
  data: T;
  /** 响应消息 */
  message?: string;
  /** 响应时间戳 */
  timestamp?: number;
}

/**
 * 菜单路由类型
 */
export interface MenuRoute {
  /** 路由路径 */
  path: string;
  /** 菜单标题 */
  title?: string;
  /** 菜单图标 */
  icon?:
    | string
    | {
        /** 图标渲染函数 */
        render: () => any;
      };
  /** 重定向路径 */
  redirect?: string;
  /** 子菜单列表 */
  children: MenuRoute[];
  /** 路由元信息 */
  meta: {
    /** 页面标题 */
    title?: string;
    /** 菜单图标 */
    icon?: string;
    /** 是否隐藏 */
    hidden?: boolean;
    /** 是否缓存 */
    keepAlive?: boolean;
    /** 权限标识 */
    permission?: string;
    /** 排序权重 */
    order?: number;
    /** 是否展开 */
    expanded?: boolean;
  };
}

/**
 * 主题模式类型
 */
export type ModeType = 'dark' | 'light';

/**
 * 设置配置类型
 */
export type SettingType = typeof STYLE_CONFIG;

/**
 * CSS类名类型
 */
export type ClassName = string | Record<string, boolean> | Array<string | Record<string, boolean>>;

/**
 * 通用对象类型
 */
export type CommonObjType = Record<string, string | number>;

/**
 * 通知消息类型
 */
export interface NotificationItem {
  /** 通知ID */
  id: string;
  /** 通知内容 */
  content: string;
  /** 通知类型 */
  type: 'info' | 'success' | 'warning' | 'error';
  /** 通知状态 */
  status: boolean;
  /** 是否已收藏 */
  collected: boolean;
  /** 通知日期 */
  date: string;
  /** 通知等级 */
  quality: 'low' | 'medium' | 'high';
}

/**
 * 表格列配置类型
 */
export interface TableColumn {
  /** 列标题 */
  title: string;
  /** 数据字段名 */
  dataIndex: string;
  /** 列宽度 */
  width?: number | string;
  /** 是否固定列 */
  fixed?: 'left' | 'right';
  /** 是否可排序 */
  sorter?: boolean;
  /** 是否可筛选 */
  filterable?: boolean;
  /** 列对齐方式 */
  align?: 'left' | 'center' | 'right';
  /** 自定义渲染函数 */
  render?: (value: any, record: any, index: number) => any;
}

/**
 * 表单项配置类型
 */
export interface FormItem {
  /** 字段名 */
  name: string;
  /** 字段标签 */
  label: string;
  /** 字段类型 */
  type: 'input' | 'select' | 'date' | 'textarea' | 'number' | 'switch' | 'upload';
  /** 是否必填 */
  required?: boolean;
  /** 字段规则 */
  rules?: any[];
  /** 字段选项（用于select等） */
  options?: Array<{ label: string; value: any }>;
  /** 占位符 */
  placeholder?: string;
  /** 默认值 */
  defaultValue?: any;
}

/**
 * 分页配置类型
 */
export interface PaginationConfig {
  /** 当前页码 */
  current: number;
  /** 每页条数 */
  pageSize: number;
  /** 总条数 */
  total: number;
  /** 是否显示快速跳转 */
  showJumper?: boolean;
  /** 是否显示每页条数选择器 */
  showSizeChanger?: boolean;
  /** 每页条数选项 */
  pageSizeOptions?: number[];
}
