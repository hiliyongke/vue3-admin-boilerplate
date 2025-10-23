import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { nextTick } from 'vue';
import { useRequest } from '@/shared/composables/use-request';

describe('useRequest', () => {
  beforeEach(() => {
    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.clearAllMocks();
    vi.useRealTimers();
  });

  it('should set loading state and fetch data successfully', async () => {
    const api = vi.fn().mockResolvedValue({ id: '1' });

    const { loading, data, execute } = useRequest(api, { immediate: false });

    expect(loading.value).toBe(false);
    expect(data.value).toBeNull();

    const promise = execute();

    expect(loading.value).toBe(true);

    await promise;

    expect(loading.value).toBe(false);
    expect(data.value).toEqual({ id: '1' });
    expect(api).toHaveBeenCalledTimes(1);
  });

  it('should handle error and set error state', async () => {
    const error = new Error('Request failed');
    const api = vi.fn().mockRejectedValue(error);

    const { loading, error: errorRef, execute } = useRequest(api);

    await expect(execute()).rejects.toThrow('Request failed');

    expect(loading.value).toBe(false);
    expect(errorRef.value).toEqual(error);
  });

  it('should cancel previous request when execute is called again', async () => {
    const api = vi.fn().mockImplementation(() => new Promise((resolve) => setTimeout(() => resolve('done'), 1000)));

    const { execute } = useRequest(api);

    const promise1 = execute();
    const promise2 = execute();

    await vi.runAllTimersAsync();

    await nextTick();

    await promise1;
    const result2 = await promise2;

    expect(result2).toEqual('done');
    expect(api).toHaveBeenCalledTimes(2);
  });
});
