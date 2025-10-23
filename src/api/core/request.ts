/**
 * @description 现代化请求核心
 * @author 现代化架构
 */

import axios, {
  type AxiosInstance,
  type AxiosRequestConfig,
  type AxiosResponse,
  type InternalAxiosRequestConfig,
} from 'axios';
import { envConfig } from '@/config/env';
import { STORAGE_KEYS } from '@/constants';
import { getStorage } from '@/utils/storage';

/**
 * 请求配置接口
 */
export interface RequestConfig extends AxiosRequestConfig {
  /** 是否显示加载状态 */
  loading?: boolean;
  /** 是否显示错误提示 */
  errorMessage?: boolean;
  /** 是否显示成功提示 */
  successMessage?: boolean;
  /** 重试次数 */
  retry?: number;
  /** 重试延迟 */
  retryDelay?: number;
}

/**
 * 响应数据接口
 */
export interface ResponseData<T = any> {
  code: number;
  data: T;
  message: string;
  timestamp?: number;
}

/**
 * HTTP请求类
 */
export class HttpRequest {
  private instance: AxiosInstance;
  private readonly baseURL: string;
  private readonly timeout: number;

  constructor(config?: AxiosRequestConfig) {
    this.baseURL = config?.baseURL || envConfig.VITE_API_BASE_URL;
    this.timeout = config?.timeout || 10000;

    this.instance = axios.create({
      baseURL: this.baseURL,
      timeout: this.timeout,
      headers: {
        'Content-Type': 'application/json;charset=UTF-8',
      },
      ...config,
    });

    this.setupInterceptors();
  }

  /**
   * 设置拦截器
   */
  private setupInterceptors(): void {
    // 请求拦截器
    this.instance.interceptors.request.use(
      (config: InternalAxiosRequestConfig) => {
        // 添加认证token
        const storage = getStorage();
        const token = storage.get(STORAGE_KEYS.ACCESS_TOKEN);
        if (token && config.headers) {
          config.headers.Authorization = `Bearer ${token}`;
        }

        // 添加请求时间戳
        if (config.method === 'get') {
          config.params = {
            ...config.params,
            _t: Date.now(),
          };
        }

        return config;
      },
      (error) => {
        console.error('请求拦截器错误:', error);
        return Promise.reject(error);
      }
    );

    // 响应拦截器
    this.instance.interceptors.response.use(
      (response: AxiosResponse<ResponseData>) => {
        const { data } = response;

        // 处理业务错误
        if (data.code !== 200) {
          return Promise.reject(new Error(data.message || '请求失败'));
        }

        return response;
      },
      (error) => {
        return this.handleError(error);
      }
    );
  }

  /**
   * 处理请求错误
   */
  private handleError(error: any): Promise<never> {
    let message = '请求失败';

    if (error.response) {
      const { status, data } = error.response;

      switch (status) {
        case 401:
          message = '未授权，请重新登录';
          // 可以在这里处理登录跳转
          break;
        case 403:
          message = '拒绝访问';
          break;
        case 404:
          message = '请求地址不存在';
          break;
        case 500:
          message = '服务器内部错误';
          break;
        default:
          message = data?.message || `请求失败 ${status}`;
      }
    } else if (error.request) {
      message = '网络连接失败';
    } else {
      message = error.message || '请求配置错误';
    }

    console.error('请求错误:', message, error);
    return Promise.reject(new Error(message));
  }

  /**
   * GET请求
   */
  get<T = any>(url: string, config?: RequestConfig): Promise<T> {
    return this.request<T>({ ...config, method: 'GET', url });
  }

  /**
   * POST请求
   */
  post<T = any>(url: string, data?: any, config?: RequestConfig): Promise<T> {
    return this.request<T>({ ...config, method: 'POST', url, data });
  }

  /**
   * PUT请求
   */
  put<T = any>(url: string, data?: any, config?: RequestConfig): Promise<T> {
    return this.request<T>({ ...config, method: 'PUT', url, data });
  }

  /**
   * DELETE请求
   */
  delete<T = any>(url: string, config?: RequestConfig): Promise<T> {
    return this.request<T>({ ...config, method: 'DELETE', url });
  }

  /**
   * 通用请求方法
   */
  async request<T = any>(config: RequestConfig): Promise<T> {
    const response = await this.instance.request<ResponseData<T>>(config);
    return response.data.data;
  }

  /**
   * 获取axios实例
   */
  getInstance(): AxiosInstance {
    return this.instance;
  }
}

/**
 * 创建请求实例
 */
export const httpRequest = new HttpRequest();

/**
 * 默认导出请求方法
 */
export default httpRequest;
