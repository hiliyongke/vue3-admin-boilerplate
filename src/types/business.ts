// 业务相关类型定义
import type { UserInfo } from './api';

// 产品数据类型
export interface ProductData {
  id: string;
  name: string;
  subtitle: string;
  subTitle: string; // 兼容现有代码
  size: string;
  cpu: string;
  memory: string;
  info: string;
  use: number;
  stock: number;
  price?: number;
  status?: string;
  createdAt?: string;
  updatedAt?: string;
}

// 项目信息类型
export interface ProjectInfo {
  id: string;
  name: string;
  description?: string;
  status: 'active' | 'inactive' | 'pending';
  createdAt: string;
  updatedAt: string;
  owner: UserInfo;
}

// 订单信息类型
export interface OrderInfo {
  id: string;
  orderNo: string;
  userId: string;
  productId: string;
  quantity: number;
  totalAmount: number;
  status: 'pending' | 'processing' | 'completed' | 'cancelled';
  createdAt: string;
  updatedAt: string;
}

// 表单数据类型
export interface FormData {
  [key: string]: any;
}

// 验证结果类型
export interface ValidateResult {
  validateResult: boolean;
}

// 验证结果上下文类型
export interface ValidateResultContext<T = FormData> {
  validateResult: boolean;
  firstError?: string;
  data?: T;
}

// 注意：TRouterInfo 已在 src/interface.ts 中定义
// 如需使用，请从 interface.ts 导入

// 颜色系列类型
export interface TColorSeries {
  color: string;
  name: string;
}

// 通知消息数据类型
export interface NotificationData {
  id: string;
  content: string;
  type: string;
  status: boolean;
  collected: boolean;
  date: string;
  quality: string;
}

// API 响应结果类型
export interface Result<T = any> {
  code: number;
  message: string;
  data: T;
  success: boolean;
}

// 注意：PageParams 和 PageResult 已在 src/types/api.ts 中定义
// 如需使用，请从 api.ts 导入
