/**
 * @description 请求状态管理 Composable
 * @author 现代化重构版本
 */

import { ref, type Ref } from 'vue';

/**
 * 请求配置选项
 */
export interface UseRequestOptions<T> {
  /**
   * 是否立即执行
   * @default false
   */
  immediate?: boolean;

  /**
   * 是否手动触发
   * @default false
   */
  manual?: boolean;

  /**
   * 失败重试次数
   * @default 0
   */
  retry?: number;

  /**
   * 重试延迟（毫秒）
   * @default 1000
   */
  retryDelay?: number;

  /**
   * 成功回调
   */
  onSuccess?: (data: T) => void;

  /**
   * 失败回调
   */
  onError?: (error: Error) => void;

  /**
   * 完成回调（无论成功失败都会执行）
   */
  onFinally?: () => void;

  /**
   * 初始数据
   */
  initialData?: T;
}

/**
 * 请求返回值
 */
export interface UseRequestReturn<T, P extends any[]> {
  /**
   * 加载状态
   */
  loading: Ref<boolean>;

  /**
   * 错误信息
   */
  error: Ref<Error | null>;

  /**
   * 响应数据
   */
  data: Ref<T | null>;

  /**
   * 执行请求
   */
  execute: (...args: P) => Promise<T | null>;

  /**
   * 刷新（使用上次参数重新执行）
   */
  refresh: () => Promise<T | null>;

  /**
   * 重置状态
   */
  reset: () => void;

  /**
   * 取消请求
   */
  cancel: () => void;
}

/**
 * 请求状态管理 Hook
 *
 * @example
 * ```ts
 * const { loading, error, data, execute } = useRequest(
 *   async (id: string) => {
 *     return await fetchUser(id)
 *   },
 *   {
 *     immediate: false,
 *     onSuccess: (data) => {
 *       console.log('Success:', data)
 *     },
 *     onError: (error) => {
 *       console.error('Error:', error)
 *     }
 *   }
 * )
 *
 * // 手动执行
 * await execute('123')
 * ```
 */
export function useRequest<T, P extends any[] = []>(
  requestFn: (...args: P) => Promise<T>,
  options: UseRequestOptions<T> = {}
): UseRequestReturn<T, P> {
  const {
    immediate = false,
    manual = false,
    retry = 0,
    retryDelay = 1000,
    onSuccess,
    onError,
    onFinally,
    initialData = null,
  } = options;

  // State
  const loading = ref(false);
  const error = ref<Error | null>(null);
  const data = ref<T | null>(initialData) as Ref<T | null>;

  // 取消控制器
  let abortController: AbortController | null = null;
  // 保存最后一次执行的参数，用于 refresh
  let lastArgs: P | null = null;

  /**
   * 执行请求（带重试）
   */
  async function execute(...args: P): Promise<T | null> {
    // 保存参数用于 refresh
    lastArgs = args;

    // 取消之前的请求
    cancel();

    // 创建新的取消控制器
    abortController = new AbortController();

    loading.value = true;
    error.value = null;

    let retryCount = 0;

    while (retryCount <= retry) {
      try {
        const result = await requestFn(...args);

        // 检查是否已取消
        if (abortController.signal.aborted) {
          return null;
        }

        data.value = result;
        onSuccess?.(result);
        return result;
      } catch (err) {
        // 检查是否已取消
        if (abortController.signal.aborted) {
          return null;
        }

        const errorObj = err instanceof Error ? err : new Error(String(err));

        // 如果还有重试次数，等待后重试
        if (retryCount < retry) {
          retryCount++;
          await new Promise((resolve) => setTimeout(resolve, retryDelay));
          continue;
        }

        // 重试次数用尽，抛出错误
        error.value = errorObj;
        onError?.(errorObj);
        return null;
      } finally {
        // 检查是否已取消
        if (!abortController.signal.aborted && retryCount > retry) {
          loading.value = false;
          onFinally?.();
        }
      }
    }

    return null;
  }

  /**
   * 刷新（使用上次参数重新执行）
   */
  async function refresh(): Promise<T | null> {
    if (lastArgs === null) {
      console.warn('useRequest: refresh() called before execute()');
      return null;
    }
    return execute(...lastArgs);
  }

  /**
   * 重置状态
   */
  function reset(): void {
    loading.value = false;
    error.value = null;
    data.value = initialData;
    cancel();
  }

  /**
   * 取消请求
   */
  function cancel(): void {
    if (abortController) {
      abortController.abort();
      abortController = null;
    }
  }

  // 立即执行（如果不是手动模式）
  if (immediate && !manual) {
    execute(...([] as unknown as P));
  }

  return {
    loading,
    error,
    data,
    execute,
    refresh,
    reset,
    cancel,
  };
}

/**
 * 防抖请求 Hook
 *
 * @example
 * ```ts
 * const { loading, data, execute } = useDebouncedRequest(
 *   async (keyword: string) => {
 *     return await searchApi(keyword)
 *   },
 *   { delay: 500 }
 * )
 *
 * // 输入时调用，会自动防抖
 * execute('vue')
 * ```
 */
export function useDebouncedRequest<T, P extends any[] = []>(
  requestFn: (...args: P) => Promise<T>,
  options: UseRequestOptions<T> & { delay?: number } = {}
): UseRequestReturn<T, P> {
  const { delay = 300, ...restOptions } = options;
  const request = useRequest(requestFn, restOptions);

  let timeoutId: ReturnType<typeof setTimeout> | null = null;

  const debouncedExecute = (...args: P): Promise<T | null> => {
    return new Promise((resolve) => {
      if (timeoutId) {
        clearTimeout(timeoutId);
      }

      timeoutId = setTimeout(async () => {
        const result = await request.execute(...args);
        resolve(result);
      }, delay);
    });
  };

  return {
    ...request,
    execute: debouncedExecute,
  };
}

/**
 * 节流请求 Hook
 *
 * @example
 * ```ts
 * const { loading, data, execute } = useThrottledRequest(
 *   async () => {
 *     return await fetchData()
 *   },
 *   { delay: 1000 }
 * )
 *
 * // 频繁调用，但只会按节流间隔执行
 * execute()
 * ```
 */
export function useThrottledRequest<T, P extends any[] = []>(
  requestFn: (...args: P) => Promise<T>,
  options: UseRequestOptions<T> & { delay?: number } = {}
): UseRequestReturn<T, P> {
  const { delay = 300, ...restOptions } = options;
  const request = useRequest(requestFn, restOptions);

  let lastExecuteTime = 0;
  let timeoutId: ReturnType<typeof setTimeout> | null = null;

  const throttledExecute = (...args: P): Promise<T | null> => {
    return new Promise((resolve) => {
      const now = Date.now();
      const timeSinceLastExecute = now - lastExecuteTime;

      if (timeSinceLastExecute >= delay) {
        lastExecuteTime = now;
        request.execute(...args).then(resolve);
      } else {
        if (timeoutId) {
          clearTimeout(timeoutId);
        }

        timeoutId = setTimeout(() => {
          lastExecuteTime = Date.now();
          request.execute(...args).then(resolve);
        }, delay - timeSinceLastExecute);
      }
    });
  };

  return {
    ...request,
    execute: throttledExecute,
  };
}
