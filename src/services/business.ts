// 业务服务相关

import request from '@/utils/request';

// 项目相关 API
export const projectApi = {
  // 获取项目列表
  getProjectList: (params?: any) => request.get({ url: '/api/get-project-list', params }),

  // 获取项目详情
  getProjectDetail: (id: string) => request.get({ url: `/project/${id}` }),

  // 创建项目
  createProject: (data: any) => request.post({ url: '/project', data }),

  // 更新项目
  updateProject: (id: string, data: any) => request.put({ url: `/project/${id}`, data }),

  // 删除项目
  deleteProject: (id: string) => request.delete({ url: `/project/${id}` }),
};

// 订单相关 API
export const orderApi = {
  // 获取订单列表
  getOrderList: (params?: any) => request.get({ url: '/order/list', params }),

  // 获取订单详情
  getOrderDetail: (id: string) => request.get({ url: `/order/${id}` }),

  // 创建订单
  createOrder: (data: any) => request.post({ url: '/order', data }),

  // 更新订单状态
  updateOrderStatus: (id: string, status: string) => request.put({ url: `/order/${id}/status`, data: { status } }),
};

// 产品相关 API
export const productApi = {
  // 获取产品列表
  getProductList: (params?: any) => request.get({ url: '/product/list', params }),

  // 获取产品详情
  getProductDetail: (id: string) => request.get({ url: `/product/${id}` }),

  // 创建产品
  createProduct: (data: any) => request.post({ url: '/product', data }),

  // 更新产品
  updateProduct: (id: string, data: any) => request.put({ url: `/product/${id}`, data }),
};

// 统计相关 API
export const statisticsApi = {
  // 获取仪表板数据
  getDashboardData: () => request.get({ url: '/statistics/dashboard' }),

  // 获取销售统计
  getSalesStatistics: (params?: any) => request.get({ url: '/statistics/sales', params }),

  // 获取用户统计
  getUserStatistics: (params?: any) => request.get({ url: '/statistics/users', params }),
};
