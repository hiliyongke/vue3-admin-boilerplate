/**
 * @description 增强版请求组合式API - 基于现有项目优化
 * @author 基于现有项目优化
 */

import { ref, computed, type Ref } from 'vue';
import { enhancedRequest, type EnhancedRequestConfig } from '@/api/core/enhanced-request';

/**
 * 请求状态接口
 */
export interface RequestState<T> {
  data: Ref<T | null>;
  loading: Ref<boolean>;
  error: Ref<string | null>;
  finished: Ref<boolean>;
}

/**
 * 请求选项
 */
export interface UseRequestOptions<T> extends EnhancedRequestConfig {
  /** 是否立即执行 */
  immediate?: boolean;
  /** 初始数据 */
  initialData?: T;
  /** 成功回调 */
  onSuccess?: (data: T) => void;
  /** 错误回调 */
  onError?: (error: Error) => void;
}

/**
 * 增强版请求Hook
 */
export function useEnhancedRequest<T = any>(
  requestFn: () => Promise<T>,
  options: UseRequestOptions<T> = {}
) {
  const {
    immediate = false,
    initialData = null,
    onSuccess,
    onError,
    ...requestConfig
  } = options;

  // 状态管理
  const data = ref<T | null>(initialData);
  const loading = ref(false);
  const error = ref<string | null>(null);
  const finished = ref(false);

  // 计算属性
  const isLoading = computed(() => loading.value);
  const hasError = computed(() => !!error.value);
  const hasData = computed(() => data.value !== null);

  // 执行请求
  const execute = async (): Promise<T | null> => {
    try {
      loading.value = true;
      error.value = null;
      finished.value = false;

      const result = await requestFn();

      data.value = result;
      finished.value = true;

      onSuccess?.(result);
      return result;
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : String(err);
      error.value = errorMessage;
      finished.value = true;

      onError?.(err instanceof Error ? err : new Error(errorMessage));
      return null;
    } finally {
      loading.value = false;
    }
  };

  // 刷新数据
  const refresh = () => execute();

  // 重置状态
  const reset = () => {
    data.value = initialData;
    loading.value = false;
    error.value = null;
    finished.value = false;
  };

  // 立即执行
  if (immediate) {
    execute();
  }

  return {
    // 状态
    data,
    loading,
    error,
    finished,

    // 计算属性
    isLoading,
    hasError,
    hasData,

    // 方法
    execute,
    refresh,
    reset
  };
}

/**
 * GET请求Hook
 */
export function useGet<T = any>(
  url: string,
  options: UseRequestOptions<T> = {}
) {
  return useEnhancedRequest<T>(
    () => enhancedRequest.get<T>(url, options),
    options
  );
}

/**
 * POST请求Hook
 */
export function usePost<T = any>(
  url: string,
  data?: any,
  options: UseRequestOptions<T> = {}
) {
  return useEnhancedRequest<T>(
    () => enhancedRequest.post<T>(url, data, options),
    options
  );
}
