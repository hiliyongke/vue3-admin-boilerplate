/**
 * @description 现代化请求组合式API
 * @author 现代化架构
 */

import { ref, reactive, computed, type Ref, type UnwrapRef } from 'vue';
import { httpRequest, type RequestConfig } from '@/api/core/request';

/**
 * 请求状态接口
 */
export interface RequestState<T = any> {
  /** 响应数据 */
  data: T | null;
  /** 加载状态 */
  loading: boolean;
  /** 错误信息 */
  error: Error | null;
  /** 是否已完成 */
  finished: boolean;
}

/**
 * 请求选项接口
 */
export interface UseRequestOptions<T = any> extends RequestConfig {
  /** 是否立即执行 */
  immediate?: boolean;
  /** 默认数据 */
  defaultData?: T;
  /** 成功回调 */
  onSuccess?: (data: T) => void;
  /** 错误回调 */
  onError?: (error: Error) => void;
  /** 完成回调 */
  onFinally?: () => void;
  /** 数据转换函数 */
  transform?: (data: any) => T;
}

/**
 * 请求返回值接口
 */
export interface UseRequestReturn<T = any> {
  /** 响应数据 */
  data: Ref<T | null>;
  /** 加载状态 */
  loading: Ref<boolean>;
  /** 错误信息 */
  error: Ref<Error | null>;
  /** 是否已完成 */
  finished: Ref<boolean>;
  /** 执行请求 */
  execute: (...args: any[]) => Promise<T>;
  /** 刷新请求 */
  refresh: () => Promise<T>;
  /** 重置状态 */
  reset: () => void;
  /** 取消请求 */
  cancel: () => void;
}

/**
 * 请求组合式API
 */
export function useRequest<T = any>(
  requestFn: (...args: any[]) => Promise<T>,
  options: UseRequestOptions<T> = {}
): UseRequestReturn<T> {
  const {
    immediate = false,
    defaultData = null,
    onSuccess,
    onError,
    onFinally,
    transform,
    ...requestConfig
  } = options;

  // 状态管理
  const state = reactive<RequestState<T>>({
    data: defaultData,
    loading: false,
    error: null,
    finished: false
  });

  // 请求参数缓存
  let lastArgs: any[] = [];

  // 取消控制器
  let abortController: AbortController | null = null;

  /**
   * 执行请求
   */
  const execute = async (...args: any[]): Promise<T> => {
    // 取消之前的请求
    if (abortController) {
      abortController.abort();
    }

    // 创建新的取消控制器
    abortController = new AbortController();

    // 缓存参数
    lastArgs = args;

    // 重置状态
    state.loading = true;
    state.error = null;
    state.finished = false;

    try {
      const response = await requestFn(...args);

      // 检查是否被取消
      if (abortController.signal.aborted) {
        throw new Error('Request cancelled');
      }

      // 数据转换
      const data = transform ? transform(response) : response;

      (state as any).data = data;
      state.finished = true;

      // 成功回调
      onSuccess?.(data);

      return data;
    } catch (error) {
      const err = error instanceof Error ? error : new Error(String(error));

      // 如果不是取消错误，则设置错误状态
      if (err.message !== 'Request cancelled') {
        state.error = err;
        onError?.(err);
      }

      throw err;
    } finally {
      state.loading = false;
      onFinally?.();
      abortController = null;
    }
  };

  /**
   * 刷新请求
   */
  const refresh = (): Promise<T> => {
    return execute(...lastArgs);
  };

  /**
   * 重置状态
   */
  const reset = (): void => {
    (state as any).data = defaultData;
    state.loading = false;
    state.error = null;
    state.finished = false;
  };

  /**
   * 取消请求
   */
  const cancel = (): void => {
    if (abortController) {
      abortController.abort();
      abortController = null;
    }
  };

  // 立即执行
  if (immediate) {
    execute();
  }

  return {
    data: computed(() => state.data) as Ref<T | null>,
    loading: computed(() => state.loading),
    error: computed(() => state.error),
    finished: computed(() => state.finished),
    execute,
    refresh,
    reset,
    cancel
  };
}

/**
 * GET请求组合式API
 */
export function useGet<T = any>(
  url: string,
  options: UseRequestOptions<T> = {}
): UseRequestReturn<T> {
  return useRequest<T>(
    () => httpRequest.get<T>(url, options),
    options
  );
}

/**
 * POST请求组合式API
 */
export function usePost<T = any>(
  url: string,
  options: UseRequestOptions<T> = {}
): UseRequestReturn<T> {
  return useRequest<T>(
    (data?: any) => httpRequest.post<T>(url, data, options),
    options
  );
}

/**
 * PUT请求组合式API
 */
export function usePut<T = any>(
  url: string,
  options: UseRequestOptions<T> = {}
): UseRequestReturn<T> {
  return useRequest<T>(
    (data?: any) => httpRequest.put<T>(url, data, options),
    options
  );
}

/**
 * DELETE请求组合式API
 */
export function useDelete<T = any>(
  url: string,
  options: UseRequestOptions<T> = {}
): UseRequestReturn<T> {
  return useRequest<T>(
    () => httpRequest.delete<T>(url, options),
    options
  );
}
