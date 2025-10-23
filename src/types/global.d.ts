// 全局类型定义

import 'pinia';
import type { NavigationTabState } from '@/features/navigation/tabs/tab-route.types';

declare module 'pinia' {
  export interface PiniaCustomProperties {
    // 扩展 Pinia Store 的自定义属性
  }
}

declare global {
  // 通用函数类型
  type Fn<T = any, R = T> = (...arg: T[]) => R;

  // 可记录对象类型
  type Recordable<T = any> = Record<string, T>;

  // 错误日志信息类型
  interface ErrorLogInfo {
    type: 'javascript' | 'resource' | 'ajax' | 'promise';
    message: string;
    stack?: string;
    url?: string;
    line?: number;
    column?: number;
    time: string;
    userAgent: string;
  }

  // 日期范围类型
  type DateRange = string[];

  // 扩展 Navigator 接口
  interface Navigator {
    msSaveOrOpenBlob?: (blob: Blob, filename: string) => void;
  }

  // 扩展 Window 接口
  interface Window {
    webkitPerformance?: Performance;
    msPerformance?: Performance;
  }

  // 扩展 Document 接口
  interface Document {
    webkitCancelFullScreen?: () => void;
    mozCancelFullScreen?: () => void;
    cancelFullScreen?: () => void;
    msExitFullscreen?: () => void;
  }

  // 扩展 HTMLElement 接口
  interface HTMLElement {
    webkitRequestFullScreen?: () => void;
    mozRequestFullScreen?: () => void;
    requestFullScreen?: () => void;
  }

  // ActiveX 对象（IE 兼容）
  class ActiveXObject {
    constructor(s: string);
  }

  // 表单数据转换函数
  function objectToFormData(obj: any): FormData;

  // 性能导航时间接口扩展
  interface PerformanceNavigationTiming {
    navigationStart?: number;
  }
}

export {};
