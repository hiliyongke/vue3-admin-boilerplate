// 业务相关常量

// 用户角色
export const USER_ROLES = {
  ADMIN: 'admin',
  USER: 'user',
  GUEST: 'guest',
} as const;

// 订单状态
export const ORDER_STATUS = {
  PENDING: 'pending',
  PROCESSING: 'processing',
  COMPLETED: 'completed',
  CANCELLED: 'cancelled',
} as const;

// 支付状态
export const PAYMENT_STATUS = {
  UNPAID: 'unpaid',
  PAID: 'paid',
  REFUNDED: 'refunded',
} as const;

// 产品类型
export type ProductType = 'basic' | 'premium' | 'enterprise';

export const PRODUCT_TYPES: Record<ProductType, string> = {
  basic: '基础版',
  premium: '高级版',
  enterprise: '企业版',
};

// 合同类型
export const CONTRACT_TYPES = {
  PAYMENT: 0,
  RECIPT: 1, // 注意：这里保持原有的拼写错误以兼容现有代码
  RECEIPT: 1, // 正确的拼写
} as const;
