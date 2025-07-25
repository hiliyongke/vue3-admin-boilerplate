/**
 * @description 现代化工具函数库
 * @author 2024最新架构
 */

/**
 * 现代化的深拷贝实现（使用 structuredClone）
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
export function debounce<T extends (...args: any[]) => any>(
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
  let lastThis: any;
  let result: ReturnType<T>;
  let lastCallTime: number | undefined;
  let lastInvokeTime = 0;

  function invokeFunc(time: number) {
    const args = lastArgs;
    const thisArg = lastThis;

    lastArgs = lastThis = undefined as any;
    lastInvokeTime = time;
    result = fn.apply(thisArg, args);
    return result;
  }

  function leadingEdge(time: number) {
    lastInvokeTime = time;
    timeoutId = window.setTimeout(timerExpired, delay);
    return leading ? invokeFunc(time) : result;
  }

  function remainingWait(time: number) {
    const timeSinceLastCall = time - (lastCallTime || 0);
    const timeSinceLastInvoke = time - lastInvokeTime;
    const timeWaiting = delay - timeSinceLastCall;

    return Math.min(timeWaiting, delay - timeSinceLastInvoke);
  }

  function shouldInvoke(time: number) {
    const timeSinceLastCall = time - (lastCallTime || 0);
    const timeSinceLastInvoke = time - lastInvokeTime;

    return (
      lastCallTime === undefined ||
      timeSinceLastCall >= delay ||
      timeSinceLastCall < 0 ||
      timeSinceLastInvoke >= delay
    );
  }

  function timerExpired() {
    const time = Date.now();
    if (shouldInvoke(time)) {
      return trailingEdge(time);
    }
    timeoutId = window.setTimeout(timerExpired, remainingWait(time));
  }

  function trailingEdge(time: number) {
    timeoutId = undefined;

    if (trailing && lastArgs) {
      return invokeFunc(time);
    }
    lastArgs = lastThis = undefined as any;
    return result;
  }

  function cancel() {
    if (timeoutId !== undefined) {
      clearTimeout(timeoutId);
    }
    lastInvokeTime = 0;
    lastArgs = lastCallTime = lastThis = timeoutId = undefined as any;
  }

  function flush() {
    return timeoutId === undefined ? result : trailingEdge(Date.now());
  }

  function debounced(this: any, ...args: Parameters<T>) {
    const time = Date.now();
    const isInvoking = shouldInvoke(time);

    // 检查是否被取消
    if (signal?.aborted) {
      cancel();
      return result;
    }

    lastArgs = args;
    lastThis = this;
    lastCallTime = time;

    if (isInvoking) {
      if (timeoutId === undefined) {
        return leadingEdge(lastCallTime);
      }
    }
    if (timeoutId === undefined) {
      timeoutId = window.setTimeout(timerExpired, delay);
    }
    return result;
  }

  // 监听取消信号
  signal?.addEventListener('abort', cancel);

  debounced.cancel = cancel;
  debounced.flush = flush;

  return debounced as T & { cancel: () => void; flush: () => void };
}

/**
 * 现代化的节流函数
 */
export function throttle<T extends (...args: any[]) => any>(
  fn: T,
  delay: number,
  options: {
    leading?: boolean;
    trailing?: boolean;
    signal?: AbortSignal;
  } = {}
): T & { cancel: () => void; flush: () => void } {
  const { leading = true, trailing = true } = options;
  return debounce(fn, delay, { leading, trailing, ...options });
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

  function memoized(this: any, ...args: Parameters<T>): ReturnType<T> {
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
      cache.delete(firstKey);
    }

    return result;
  }

  memoized.cache = cache;
  memoized.clear = () => cache.clear();

  return memoized as T & { cache: Map<string, any>; clear: () => void };
}

/**
 * 现代化的事件发射器
 */
export class EventEmitter<T extends Record<string, any[]> = Record<string, any[]>> {
  private events = new Map<keyof T, Set<(...args: any[]) => void>>();

  /**
   * 监听事件
   */
  on<K extends keyof T>(event: K, listener: (...args: T[K]) => void): () => void {
    if (!this.events.has(event)) {
      this.events.set(event, new Set());
    }

    this.events.get(event)!.add(listener);

    // 返回取消监听函数
    return () => this.off(event, listener);
  }

  /**
   * 监听一次事件
   */
  once<K extends keyof T>(event: K, listener: (...args: T[K]) => void): () => void {
    const onceListener = (...args: T[K]) => {
      this.off(event, onceListener);
      listener(...args);
    };

    return this.on(event, onceListener);
  }

  /**
   * 取消监听
   */
  off<K extends keyof T>(event: K, listener: (...args: T[K]) => void): void {
    const listeners = this.events.get(event);
    if (listeners) {
      listeners.delete(listener);
      if (listeners.size === 0) {
        this.events.delete(event);
      }
    }
  }

  /**
   * 发射事件
   */
  emit<K extends keyof T>(event: K, ...args: T[K]): void {
    const listeners = this.events.get(event);
    if (listeners) {
      listeners.forEach(listener => {
        try {
          listener(...args);
        } catch (error) {
          console.error(`事件监听器执行错误 [${String(event)}]:`, error);
        }
      });
    }
  }

  /**
   * 移除所有监听器
   */
  removeAllListeners<K extends keyof T>(event?: K): void {
    if (event) {
      this.events.delete(event);
    } else {
      this.events.clear();
    }
  }

  /**
   * 获取监听器数量
   */
  listenerCount<K extends keyof T>(event: K): number {
    return this.events.get(event)?.size || 0;
  }
}

/**
 * 现代化的类型守卫工具
 */
export const is = {
  /**
   * 检查是否为字符串
   */
  string: (value: unknown): value is string => typeof value === 'string',

  /**
   * 检查是否为数字
   */
  number: (value: unknown): value is number =>
    typeof value === 'number' && !Number.isNaN(value),

  /**
   * 检查是否为布尔值
   */
  boolean: (value: unknown): value is boolean => typeof value === 'boolean',

  /**
   * 检查是否为函数
   */
  function: (value: unknown): value is Function => typeof value === 'function',

  /**
   * 检查是否为对象
   */
  object: (value: unknown): value is Record<string, any> =>
    value !== null && typeof value === 'object' && !Array.isArray(value),

  /**
   * 检查是否为数组
   */
  array: (value: unknown): value is any[] => Array.isArray(value),

  /**
   * 检查是否为 Promise
   */
  promise: (value: unknown): value is Promise<any> =>
    value instanceof Promise ||
    (is.object(value) && is.function((value as any).then)),

  /**
   * 检查是否为空值
   */
  nullish: (value: unknown): value is null | undefined =>
    value === null || value === undefined,

  /**
   * 检查是否为空
   */
  empty: (value: unknown): boolean => {
    if (is.nullish(value)) return true;
    if (is.string(value) || is.array(value)) return value.length === 0;
    if (is.object(value)) return Object.keys(value).length === 0;
    return false;
  }
};
