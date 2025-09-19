/**
 * @description 增强版请求工具 - 基于现有request.ts优化
 * @author 基于现有项目优化
 */

import { httpRequest, type RequestConfig } from './request';
import { modernRetry } from '@/utils/modern-helpers';

/**
 * 增强版请求配置
 */
export interface EnhancedRequestConfig extends RequestConfig {
  /** 自动重试配置 */
  autoRetry?: {
    times: number;
    delay: number;
    backoff?: 'linear' | 'exponential';
  };
  /** 缓存配置 */
  cache?: {
    key: string;
    ttl: number; // 缓存时间（毫秒）
  };
  /** 取消信号 */
  signal?: AbortSignal;
}

/**
 * 简单的内存缓存
 */
class RequestCache {
  private cache = new Map<string, { data: any; timestamp: number; ttl: number }>();

  set(key: string, data: any, ttl: number): void {
    this.cache.set(key, {
      data,
      timestamp: Date.now(),
      ttl,
    });
  }

  get(key: string): any | null {
    const cached = this.cache.get(key);
    if (!cached) return null;

    const now = Date.now();
    if (now - cached.timestamp > cached.ttl) {
      this.cache.delete(key);
      return null;
    }

    return cached.data;
  }

  clear(): void {
    this.cache.clear();
  }
}

const requestCache = new RequestCache();

/**
 * 增强版HTTP请求类
 */
export class EnhancedHttpRequest {
  /**
   * GET请求（支持缓存和重试）
   */
  static async get<T = any>(url: string, config?: EnhancedRequestConfig): Promise<T> {
    // 检查缓存
    if (config?.cache) {
      const cached = requestCache.get(config.cache.key);
      if (cached) {
        return cached;
      }
    }

    const requestFn = () => httpRequest.get<T>(url, config);

    let result: T;

    // 支持自动重试
    if (config?.autoRetry) {
      result = await modernRetry(requestFn, {
        retries: config.autoRetry.times,
        delay: config.autoRetry.delay,
        backoff: config.autoRetry.backoff,
        signal: config.signal,
      });
    } else {
      result = await requestFn();
    }

    // 缓存结果
    if (config?.cache) {
      requestCache.set(config.cache.key, result, config.cache.ttl);
    }

    return result;
  }

  /**
   * POST请求（支持重试）
   */
  static async post<T = any>(url: string, data?: any, config?: EnhancedRequestConfig): Promise<T> {
    const requestFn = () => httpRequest.post<T>(url, data, config);

    // 支持自动重试
    if (config?.autoRetry) {
      return await modernRetry(requestFn, {
        retries: config.autoRetry.times,
        delay: config.autoRetry.delay,
        backoff: config.autoRetry.backoff,
        signal: config.signal,
      });
    }

    return await requestFn();
  }

  /**
   * PUT请求（支持重试）
   */
  static async put<T = any>(url: string, data?: any, config?: EnhancedRequestConfig): Promise<T> {
    const requestFn = () => httpRequest.put<T>(url, data, config);

    if (config?.autoRetry) {
      return await modernRetry(requestFn, {
        retries: config.autoRetry.times,
        delay: config.autoRetry.delay,
        backoff: config.autoRetry.backoff,
        signal: config.signal,
      });
    }

    return await requestFn();
  }

  /**
   * DELETE请求（支持重试）
   */
  static async delete<T = any>(url: string, config?: EnhancedRequestConfig): Promise<T> {
    const requestFn = () => httpRequest.delete<T>(url, config);

    if (config?.autoRetry) {
      return await modernRetry(requestFn, {
        retries: config.autoRetry.times,
        delay: config.autoRetry.delay,
        backoff: config.autoRetry.backoff,
        signal: config.signal,
      });
    }

    return await requestFn();
  }

  /**
   * 清除缓存
   */
  static clearCache(): void {
    requestCache.clear();
  }
}

/**
 * 便捷的请求方法
 */
export const enhancedRequest = {
  get: EnhancedHttpRequest.get,
  post: EnhancedHttpRequest.post,
  put: EnhancedHttpRequest.put,
  delete: EnhancedHttpRequest.delete,
  clearCache: EnhancedHttpRequest.clearCache,
};
