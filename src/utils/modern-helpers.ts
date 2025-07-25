/**
 * @description 现代化工具函数
 * @author 基于现有项目优化
 */

/**
 * 现代化的深拷贝（优先使用原生API）
 */
export function deepClone<T>(obj: T): T {
  // 优先使用原生 structuredClone（Chrome 98+）
  if (typeof structuredClone !== 'undefined') {
    try {
      return structuredClone(obj);
    } catch {
      // 降级到 JSON 方法
      return JSON.parse(JSON.stringify(obj));
    }
  }

  // 降级到 JSON 方法
  return JSON.parse(JSON.stringify(obj));
}

/**
 * 现代化的防抖函数（支持 AbortController）
 */
export function modernDebounce<T extends (...args: any[]) => any>(
  fn: T,
  delay: number,
  options: {
    leading?: boolean;
    trailing?: boolean;
    signal?: AbortSignal;
  } = {}
): T & { cancel: () => void; flush: () => void } {
  const { leading = false, trailing = true, signal } = options;

  let timeoutId: number | undefined;
  let lastArgs: Parameters<T>;
  let result: ReturnType<T>;

  function debounced(this: ThisParameterType<T>, ...args: Parameters<T>) {
    // 检查是否被取消
    if (signal?.aborted) {
      return result;
    }

    lastArgs = args;
    const context = this;

    if (timeoutId) {
      clearTimeout(timeoutId);
    }

    if (leading && !timeoutId) {
      result = fn.apply(context, args);
    }

    timeoutId = window.setTimeout(() => {
      if (trailing) {
        result = fn.apply(context, lastArgs);
      }
      timeoutId = undefined;
    }, delay);

    return result;
  }

  function cancel() {
    if (timeoutId) {
      clearTimeout(timeoutId);
      timeoutId = undefined;
    }
  }

  function flush(this: ThisParameterType<T>) {
    if (timeoutId) {
      clearTimeout(timeoutId);
      result = fn.apply(this, lastArgs);
      timeoutId = undefined;
    }
    return result;
  }

  // 监听取消信号
  signal?.addEventListener('abort', cancel);

  debounced.cancel = cancel;
  debounced.flush = flush;

  return debounced as unknown as T & { cancel: () => void; flush: () => void };
}

/**
 * 现代化的异步重试函数
 */
export async function retry<T>(
  fn: () => Promise<T>,
  options: {
    retries?: number;
    delay?: number;
    backoff?: 'linear' | 'exponential';
    signal?: AbortSignal;
    onRetry?: (error: Error, attempt: number) => void;
  } = {}
): Promise<T> {
  const {
    retries = 3,
    delay = 1000,
    backoff = 'linear',
    signal,
    onRetry
  } = options;

  let lastError: Error;

  for (let attempt = 0; attempt <= retries; attempt++) {
    // 检查是否被取消
    if (signal?.aborted) {
      throw new Error('操作已取消');
    }

    try {
      return await fn();
    } catch (error) {
      lastError = error instanceof Error ? error : new Error(String(error));

      // 如果是最后一次尝试，直接抛出错误
      if (attempt === retries) {
        throw lastError;
      }

      // 调用重试回调
      onRetry?.(lastError, attempt + 1);

      // 计算延迟时间
      const currentDelay = backoff === 'exponential'
        ? delay * Math.pow(2, attempt)
        : delay * (attempt + 1);

      // 等待延迟
      await new Promise(resolve => setTimeout(resolve, currentDelay));
    }
  }

  throw lastError!;
}

/**
 * 现代化的缓存装饰器
 */
export function memoize<T extends (...args: any[]) => any>(
  fn: T,
  options: {
    maxSize?: number;
    ttl?: number;
    keyGenerator?: (...args: Parameters<T>) => string;
  } = {}
): T & { cache: Map<string, any>; clear: () => void } {
  const {
    maxSize = 100,
    ttl,
    keyGenerator = (...args) => JSON.stringify(args)
  } = options;

  const cache = new Map<string, { value: ReturnType<T>; timestamp: number }>();

  function memoized(this: ThisParameterType<T>, ...args: Parameters<T>): ReturnType<T> {
    const key = keyGenerator(...args);
    const now = Date.now();

    // 检查缓存
    if (cache.has(key)) {
      const cached = cache.get(key)!;

      // 检查是否过期
      if (!ttl || (now - cached.timestamp) < ttl) {
        return cached.value;
      } else {
        cache.delete(key);
      }
    }

    // 执行函数
    const result = fn.apply(this, args);

    // 缓存结果
    cache.set(key, { value: result, timestamp: now });

    // 检查缓存大小
    if (cache.size > maxSize) {
      const firstKey = cache.keys().next().value;
      if (firstKey !== undefined) {
        cache.delete(firstKey);
      }
    }

    return result;
  }

  memoized.cache = cache;
  memoized.clear = () => cache.clear();

  return memoized as T & { cache: Map<string, any>; clear: () => void };
}

/**
 * 现代化类型守卫
 */
export const isType = {
  string: (value: unknown): value is string => typeof value === 'string',
  number: (value: unknown): value is number =>
    typeof value === 'number' && !Number.isNaN(value),
  boolean: (value: unknown): value is boolean => typeof value === 'boolean',
  function: (value: unknown): value is Function => typeof value === 'function',
  object: (value: unknown): value is Record<string, any> =>
    value !== null && typeof value === 'object' && !Array.isArray(value),
  array: (value: unknown): value is any[] => Array.isArray(value),
  promise: (value: unknown): value is Promise<any> =>
    value instanceof Promise ||
    (isType.object(value) && isType.function((value as any).then)),
  nullish: (value: unknown): value is null | undefined =>
    value === null || value === undefined,
  empty: (value: unknown): boolean => {
    if (isType.nullish(value)) return true;
    if (isType.string(value) || isType.array(value)) return value.length === 0;
    if (isType.object(value)) return Object.keys(value).length === 0;
    return false;
  }
};

// 导出别名以保持向后兼容
export { retry as modernRetry };
