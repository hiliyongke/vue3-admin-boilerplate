/**
 * @description 服务层统一导出
 * @author 优化版本
 */

import { logger } from '@/shared/utils/logger';

// API服务
export * from './api';

// 业务服务
export * from './business';

/**
 * 服务基类
 */
export abstract class BaseService {
  protected baseURL: string;

  constructor(baseURL = '') {
    this.baseURL = baseURL;
  }

  /**
   * 处理API响应
   */
  protected handleResponse<T>(response: any): T {
    if (response.code === 200) {
      return response.data;
    }
    throw new Error(response.message || '请求失败');
  }

  /**
   * 处理API错误
   */
  protected handleError(error: any): never {
    logger.error('API请求错误:', error);
    throw error;
  }
}
