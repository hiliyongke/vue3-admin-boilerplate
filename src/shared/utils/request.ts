/**
 * @description 统一请求封装
 * @author 现代化架构
 */

import axios, { type AxiosInstance, type AxiosRequestConfig, type AxiosResponse, type AxiosError } from 'axios';
import { MessagePlugin } from 'tdesign-vue-next';
import { logger } from './logger';
import { TOKEN_NAME } from '@/config/global';

/**
 * 请求配置接口
 */
export interface RequestConfig extends AxiosRequestConfig {
  /** 是否显示加载提示 */
  showLoading?: boolean;
  /** 是否显示错误提示 */
  showError?: boolean;
  /** 是否需要token */
  withToken?: boolean;
  /** 重试次数 */
  retryCount?: number;
  /** 重试延迟(ms) */
  retryDelay?: number;
}

/**
 * 响应数据接口
 */
export interface ResponseData<T = any> {
  code: number;
  data: T;
  message: string;
  success?: boolean;
}

/**
 * 请求类
 */
class Request {
  private instance: AxiosInstance;
  private baseConfig: AxiosRequestConfig = {
    baseURL: import.meta.env.VITE_API_BASE_URL || '/api',
    timeout: 30000,
    headers: {
      'Content-Type': 'application/json;charset=UTF-8',
    },
  };

  constructor(config?: AxiosRequestConfig) {
    this.instance = axios.create({ ...this.baseConfig, ...config });
    this.setupInterceptors();
  }

  /**
   * 设置拦截器
   */
  private setupInterceptors(): void {
    // 请求拦截器
    this.instance.interceptors.request.use(
      (config: any) => {
        const requestConfig = config as RequestConfig;

        // 添加token
        if (requestConfig.withToken !== false) {
          const token = localStorage.getItem(TOKEN_NAME);
          if (token) {
            config.headers.Authorization = `Bearer ${token}`;
          }
        }

        // 添加时间戳防止缓存
        if (config.method?.toLowerCase() === 'get') {
          config.params = {
            ...config.params,
            _t: Date.now(),
          };
        }

        logger.debug('请求发送', {
          url: config.url,
          method: config.method,
          params: config.params,
          data: config.data,
        });

        return config;
      },
      (error: AxiosError) => {
        logger.error('请求错误', error);
        return Promise.reject(error);
      }
    );

    // 响应拦截器
    this.instance.interceptors.response.use(
      (response: AxiosResponse<ResponseData>) => {
        const { data, config } = response;
        const requestConfig = config as RequestConfig;

        logger.debug('响应接收', {
          url: config.url,
          data,
        });

        // 处理特殊状态码
        if (response.status === 204) {
          return response;
        }

        // 业务成功
        if (data.code === 0 || data.code === 200 || data.success === true) {
          return data.data;
        }

        // 业务失败
        const errorMessage = data.message || '请求失败';
        if (requestConfig.showError !== false) {
          MessagePlugin.error(errorMessage);
        }

        logger.warn('业务错误', {
          code: data.code,
          message: errorMessage,
        });

        return Promise.reject(new Error(errorMessage));
      },
      async (error: AxiosError) => {
        const { config, response } = error;
        const requestConfig = config as RequestConfig;

        // 处理网络错误
        if (!response) {
          const message = '网络连接失败，请检查网络设置';
          if (requestConfig?.showError !== false) {
            MessagePlugin.error(message);
          }
          logger.error('网络错误', error);
          return Promise.reject(error);
        }

        // 处理HTTP错误
        const { status, data } = response as AxiosResponse<ResponseData>;
        let message = '请求失败';

        switch (status) {
          case 400:
            message = '请求参数错误';
            break;
          case 401:
            message = '未授权，请重新登录';
            // 跳转到登录页
            window.location.href = '/#/login';
            break;
          case 403:
            message = '拒绝访问';
            break;
          case 404:
            message = '请求的资源不存在';
            break;
          case 408:
            message = '请求超时';
            break;
          case 500:
            message = '服务器内部错误';
            break;
          case 502:
            message = '网关错误';
            break;
          case 503:
            message = '服务不可用';
            break;
          case 504:
            message = '网关超时';
            break;
          default:
            message = data?.message || `请求失败 (${status})`;
        }

        if (requestConfig?.showError !== false) {
          MessagePlugin.error(message);
        }

        logger.error('HTTP错误', {
          status,
          message,
          url: config?.url,
        });

        // 重试逻辑
        if (requestConfig?.retryCount && requestConfig.retryCount > 0) {
          return this.retry(requestConfig);
        }

        return Promise.reject(error);
      }
    );
  }

  /**
   * 重试请求
   */
  private async retry(config: RequestConfig): Promise<any> {
    const retryCount = config.retryCount || 0;
    const retryDelay = config.retryDelay || 1000;

    if (retryCount <= 0) {
      return Promise.reject(new Error('重试次数已用完'));
    }

    logger.info(`请求重试 (剩余${retryCount}次)`, { url: config.url });

    // 延迟后重试
    await new Promise((resolve) => setTimeout(resolve, retryDelay));

    // 减少重试次数
    config.retryCount = retryCount - 1;

    return this.instance.request(config);
  }

  /**
   * GET请求
   */
  get<T = any>(url: string, params?: any, config?: RequestConfig): Promise<T> {
    return this.instance.get(url, { params, ...config });
  }

  /**
   * POST请求
   */
  post<T = any>(url: string, data?: any, config?: RequestConfig): Promise<T> {
    return this.instance.post(url, data, config);
  }

  /**
   * PUT请求
   */
  put<T = any>(url: string, data?: any, config?: RequestConfig): Promise<T> {
    return this.instance.put(url, data, config);
  }

  /**
   * DELETE请求
   */
  delete<T = any>(url: string, params?: any, config?: RequestConfig): Promise<T> {
    return this.instance.delete(url, { params, ...config });
  }

  /**
   * PATCH请求
   */
  patch<T = any>(url: string, data?: any, config?: RequestConfig): Promise<T> {
    return this.instance.patch(url, data, config);
  }

  /**
   * 上传文件
   */
  upload<T = any>(url: string, file: File, config?: RequestConfig): Promise<T> {
    const formData = new FormData();
    formData.append('file', file);

    return this.instance.post(url, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
      ...config,
    });
  }

  /**
   * 下载文件
   */
  async download(url: string, filename?: string, config?: RequestConfig): Promise<void> {
    const response = await this.instance.get(url, {
      responseType: 'blob',
      ...config,
    });

    const blob = new Blob([response.data]);
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = filename || 'download';
    link.click();
    URL.revokeObjectURL(link.href);
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
export const request = new Request();

/**
 * 导出请求方法
 */
export const { get, post, put, delete: del, patch, upload, download } = request;

export default request;
