/**
 * @description 全局错误处理工具
 * @author 优化版本
 */

import type { App } from 'vue';
import { HTTP_STATUS, BUSINESS_CODE, MESSAGE_TYPES } from '@/constants';

/**
 * 错误类型枚举
 */
export enum ErrorType {
  /** HTTP错误 */
  HTTP_ERROR = 'HTTP_ERROR',
  /** 业务错误 */
  BUSINESS_ERROR = 'BUSINESS_ERROR',
  /** JavaScript错误 */
  JAVASCRIPT_ERROR = 'JAVASCRIPT_ERROR',
  /** 资源加载错误 */
  RESOURCE_ERROR = 'RESOURCE_ERROR',
  /** Promise未捕获错误 */
  PROMISE_ERROR = 'PROMISE_ERROR',
  /** Vue错误 */
  VUE_ERROR = 'VUE_ERROR',
}

/**
 * 错误信息接口
 */
export interface ErrorInfo {
  /** 错误类型 */
  type: ErrorType;
  /** 错误消息 */
  message: string;
  /** 错误堆栈 */
  stack?: string;
  /** 错误代码 */
  code?: number | string;
  /** 错误详情 */
  details?: any;
  /** 发生时间 */
  timestamp: number;
  /** 用户代理 */
  userAgent: string;
  /** 页面URL */
  url: string;
}

/**
 * 错误处理器类
 */
class ErrorHandler {
  private errorQueue: ErrorInfo[] = [];
  private maxQueueSize = 100;
  private reportUrl = '';

  /**
   * 设置错误上报地址
   * @param url 上报地址
   */
  setReportUrl(url: string): void {
    this.reportUrl = url;
  }

  /**
   * 创建错误信息对象
   * @param type 错误类型
   * @param message 错误消息
   * @param options 其他选项
   * @returns 错误信息对象
   */
  private createErrorInfo(type: ErrorType, message: string, options: Partial<ErrorInfo> = {}): ErrorInfo {
    return {
      type,
      message,
      timestamp: Date.now(),
      userAgent: navigator.userAgent,
      url: window.location.href,
      ...options,
    };
  }

  /**
   * 添加错误到队列
   * @param errorInfo 错误信息
   */
  private addToQueue(errorInfo: ErrorInfo): void {
    this.errorQueue.push(errorInfo);

    // 限制队列大小
    if (this.errorQueue.length > this.maxQueueSize) {
      this.errorQueue.shift();
    }

    // 在开发环境下打印错误
    if (import.meta.env.DEV) {
      console.group(`🚨 ${errorInfo.type} 错误`);
      console.error('错误消息:', errorInfo.message);
      if (errorInfo.stack) {
        console.error('错误堆栈:', errorInfo.stack);
      }
      if (errorInfo.details) {
        console.error('错误详情:', errorInfo.details);
      }
      console.groupEnd();
    }

    // 上报错误（生产环境）
    if (import.meta.env.PROD && this.reportUrl) {
      this.reportError(errorInfo);
    }
  }

  /**
   * 上报错误到服务器
   * @param errorInfo 错误信息
   */
  private async reportError(errorInfo: ErrorInfo): Promise<void> {
    try {
      await fetch(this.reportUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(errorInfo),
      });
    } catch (error) {
      console.error('错误上报失败:', error);
    }
  }

  /**
   * 处理HTTP错误
   * @param error HTTP错误对象
   */
  handleHttpError(error: any): void {
    const { response, message } = error;
    const status = response?.status;
    const statusText = response?.statusText;

    let errorMessage = '网络请求失败';

    switch (status) {
      case HTTP_STATUS.BAD_REQUEST:
        errorMessage = '请求参数错误';
        break;
      case HTTP_STATUS.UNAUTHORIZED:
        errorMessage = '登录已过期，请重新登录';
        break;
      case HTTP_STATUS.FORBIDDEN:
        errorMessage = '没有权限访问该资源';
        break;
      case HTTP_STATUS.NOT_FOUND:
        errorMessage = '请求的资源不存在';
        break;
      case HTTP_STATUS.METHOD_NOT_ALLOWED:
        errorMessage = '请求方法不被允许';
        break;
      case HTTP_STATUS.REQUEST_TIMEOUT:
        errorMessage = '请求超时';
        break;
      case HTTP_STATUS.INTERNAL_SERVER_ERROR:
        errorMessage = '服务器内部错误';
        break;
      case HTTP_STATUS.BAD_GATEWAY:
        errorMessage = '网关错误';
        break;
      case HTTP_STATUS.SERVICE_UNAVAILABLE:
        errorMessage = '服务暂不可用';
        break;
      case HTTP_STATUS.GATEWAY_TIMEOUT:
        errorMessage = '网关超时';
        break;
      default:
        errorMessage = message || statusText || '未知网络错误';
    }

    const errorInfo = this.createErrorInfo(ErrorType.HTTP_ERROR, errorMessage, {
      code: status,
      details: {
        url: response?.config?.url,
        method: response?.config?.method,
        data: response?.data,
      },
    });

    this.addToQueue(errorInfo);
  }

  /**
   * 处理业务错误
   * @param error 业务错误对象
   */
  handleBusinessError(error: any): void {
    const { code, message } = error;

    const errorInfo = this.createErrorInfo(ErrorType.BUSINESS_ERROR, message, {
      code,
      details: error,
    });

    this.addToQueue(errorInfo);
  }

  /**
   * 处理JavaScript错误
   * @param error JavaScript错误对象
   */
  handleJavaScriptError(error: Error): void {
    const errorInfo = this.createErrorInfo(ErrorType.JAVASCRIPT_ERROR, error.message, {
      stack: error.stack,
      details: error,
    });

    this.addToQueue(errorInfo);
  }

  /**
   * 处理资源加载错误
   * @param event 错误事件
   */
  handleResourceError(event: Event): void {
    const target = event.target as HTMLElement;
    const tagName = target.tagName.toLowerCase();
    const src = (target as any).src || (target as any).href;

    const errorInfo = this.createErrorInfo(ErrorType.RESOURCE_ERROR, `${tagName}资源加载失败: ${src}`, {
      details: {
        tagName,
        src,
        outerHTML: target.outerHTML,
      },
    });

    this.addToQueue(errorInfo);
  }

  /**
   * 处理Promise未捕获错误
   * @param event Promise错误事件
   */
  handlePromiseError(event: PromiseRejectionEvent): void {
    const errorInfo = this.createErrorInfo(ErrorType.PROMISE_ERROR, event.reason?.message || '未捕获的Promise错误', {
      stack: event.reason?.stack,
      details: event.reason,
    });

    this.addToQueue(errorInfo);
  }

  /**
   * 处理Vue错误
   * @param error Vue错误对象
   * @param instance Vue组件实例
   * @param info 错误信息
   */
  handleVueError(error: unknown, instance: any, info: string): void {
    const err = error as Error;
    const errorInfo = this.createErrorInfo(ErrorType.VUE_ERROR, err.message || String(error), {
      stack: err.stack,
      details: {
        componentName: instance?.$options?.name || 'Unknown',
        errorInfo: info,
        error,
      },
    });

    this.addToQueue(errorInfo);
  }

  /**
   * 获取错误队列
   * @returns 错误队列
   */
  getErrorQueue(): ErrorInfo[] {
    return [...this.errorQueue];
  }

  /**
   * 清空错误队列
   */
  clearErrorQueue(): void {
    this.errorQueue = [];
  }
}

// 创建全局错误处理器实例
const errorHandler = new ErrorHandler();

/**
 * 设置全局错误处理
 * @param app Vue应用实例
 */
export function setupErrorHandle(app: App): void {
  // 设置Vue错误处理器
  app.config.errorHandler = (error: unknown, instance, info: string) => {
    errorHandler.handleVueError(error, instance, info);
  };

  // 监听全局JavaScript错误
  window.addEventListener('error', (event: ErrorEvent) => {
    errorHandler.handleJavaScriptError(new Error(event.message));
  });

  // 监听资源加载错误
  window.addEventListener(
    'error',
    (event: Event) => {
      const { target } = event;
      if (target && target !== window) {
        errorHandler.handleResourceError(event);
      }
    },
    true
  );

  // 监听未捕获的Promise错误
  window.addEventListener('unhandledrejection', (event: PromiseRejectionEvent) => {
    errorHandler.handlePromiseError(event);
    event.preventDefault(); // 阻止默认的控制台错误输出
  });

  // 设置错误上报地址
  const reportUrl = import.meta.env.VITE_ERROR_REPORT_URL;
  if (reportUrl) {
    errorHandler.setReportUrl(reportUrl);
  }
}

export { errorHandler };
export default errorHandler;
