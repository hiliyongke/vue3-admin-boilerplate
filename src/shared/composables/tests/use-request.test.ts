/**
 * @description useRequest 单元测试
 */

import { describe, it, expect, vi, beforeEach } from 'vitest';
import { nextTick } from 'vue';
import { useRequest } from '../use-request';

describe('useRequest', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('should initialize with correct default values', () => {
    const mockFn = vi.fn();
    const { data, loading, error } = useRequest(mockFn);

    expect(data.value).toBeNull();
    expect(loading.value).toBe(false);
    expect(error.value).toBeNull();
  });

  it('should handle successful request', async () => {
    const mockData = { id: 1, name: 'Test' };
    const mockFn = vi.fn().mockResolvedValue(mockData);

    const { data, loading, error, execute } = useRequest(mockFn);

    const promise = execute();

    // 请求开始时 loading 应该为 true
    expect(loading.value).toBe(true);

    await promise;
    await nextTick();

    // 请求完成后
    expect(loading.value).toBe(false);
    expect(data.value).toEqual(mockData);
    expect(error.value).toBeNull();
    expect(mockFn).toHaveBeenCalledTimes(1);
  });

  it('should handle failed request', async () => {
    const mockError = new Error('Request failed');
    const mockFn = vi.fn().mockRejectedValue(mockError);

    const { data, loading, error, execute } = useRequest(mockFn);

    await execute();
    await nextTick();

    expect(loading.value).toBe(false);
    expect(data.value).toBeNull();
    expect(error.value).toBe(mockError);
  });

  it('should pass parameters to request function', async () => {
    const mockFn = vi.fn().mockResolvedValue({ success: true });
    const { execute } = useRequest(mockFn);

    const params = { id: 1, name: 'test' };
    await execute(params);

    expect(mockFn).toHaveBeenCalledWith(params);
  });

  it('should support manual mode', async () => {
    const mockFn = vi.fn().mockResolvedValue({ data: 'test' });
    const { data, loading } = useRequest(mockFn, { manual: true });

    // manual 模式下不会自动执行
    expect(mockFn).not.toHaveBeenCalled();
    expect(loading.value).toBe(false);
    expect(data.value).toBeNull();
  });

  it('should support auto mode', async () => {
    const mockFn = vi.fn().mockResolvedValue({ data: 'test' });
    useRequest(mockFn, { manual: false });

    await nextTick();

    // auto 模式下会自动执行
    expect(mockFn).toHaveBeenCalledTimes(1);
  });

  it('should call onSuccess callback', async () => {
    const mockData = { success: true };
    const mockFn = vi.fn().mockResolvedValue(mockData);
    const onSuccess = vi.fn();

    const { execute } = useRequest(mockFn, { onSuccess });

    await execute();
    await nextTick();

    expect(onSuccess).toHaveBeenCalledWith(mockData);
  });

  it('should call onError callback', async () => {
    const mockError = new Error('Failed');
    const mockFn = vi.fn().mockRejectedValue(mockError);
    const onError = vi.fn();

    const { execute } = useRequest(mockFn, { onError });

    await execute();
    await nextTick();

    expect(onError).toHaveBeenCalledWith(mockError);
  });

  it('should support retry on failure', async () => {
    let callCount = 0;
    const mockFn = vi.fn().mockImplementation(() => {
      callCount++;
      if (callCount < 3) {
        return Promise.reject(new Error('Failed'));
      }
      return Promise.resolve({ success: true });
    });

    const { data, execute } = useRequest(mockFn, {
      retry: 3,
      retryDelay: 10,
    });

    await execute();
    await nextTick();

    expect(mockFn).toHaveBeenCalledTimes(3);
    expect(data.value).toEqual({ success: true });
  });

  it('should cancel request', async () => {
    const mockFn = vi.fn().mockImplementation(() => {
      return new Promise((resolve) => {
        setTimeout(() => resolve({ data: 'test' }), 1000);
      });
    });

    const { data, cancel, execute } = useRequest(mockFn);

    execute();
    cancel();

    await new Promise((resolve) => setTimeout(resolve, 100));

    expect(data.value).toBeNull();
  });

  it('should refresh data', async () => {
    const mockFn = vi.fn().mockResolvedValueOnce({ data: 'first' }).mockResolvedValueOnce({ data: 'second' });

    const { data, execute, refresh } = useRequest(mockFn);

    await execute();
    expect(data.value).toEqual({ data: 'first' });

    await refresh();
    expect(data.value).toEqual({ data: 'second' });
    expect(mockFn).toHaveBeenCalledTimes(2);
  });

  it('should handle concurrent requests correctly', async () => {
    let resolveFirst: any;
    let resolveSecond: any;

    const mockFn = vi
      .fn()
      .mockImplementationOnce(
        () =>
          new Promise((resolve) => {
            resolveFirst = resolve;
          })
      )
      .mockImplementationOnce(
        () =>
          new Promise((resolve) => {
            resolveSecond = resolve;
          })
      );

    const { data, execute } = useRequest(mockFn);

    // 发起第一个请求
    execute();

    // 发起第二个请求
    execute();

    // 第二个请求先完成
    resolveSecond({ data: 'second' });
    await nextTick();

    // 第一个请求后完成（应该被忽略）
    resolveFirst({ data: 'first' });
    await nextTick();

    // 应该使用最后一个请求的结果
    expect(data.value).toEqual({ data: 'second' });
  });
});
