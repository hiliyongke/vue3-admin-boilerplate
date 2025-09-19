/**
 * @description 基础Store类 - 基于现有Pinia架构优化
 * @author 基于现有项目优化
 */

import { defineStore, acceptHMRUpdate } from 'pinia';
import { ref, computed, type Ref, type ComputedRef } from 'vue';

/**
 * 基础状态接口
 */
export interface BaseState {
  /** 加载状态 */
  loading: boolean;
  /** 错误信息 */
  error: string | null;
  /** 最后更新时间 */
  lastUpdated: number;
}

/**
 * 基础Store选项
 */
export interface BaseStoreOptions {
  /** Store ID */
  id: string;
  /** 是否启用持久化 */
  persist?: boolean;
}

/**
 * 创建基础Store
 */
export function createBaseStore<T extends Record<string, any>>(options: BaseStoreOptions, initialState: T): any {
  return defineStore(
    options.id,
    () => {
      // 状态定义
      const state = ref<T & BaseState>({
        ...initialState,
        loading: false,
        error: null,
        lastUpdated: 0,
      });

      // 计算属性
      const isLoading = computed(() => state.value.loading);
      const hasError = computed(() => !!state.value.error);

      // 方法
      const setLoading = (loading: boolean) => {
        state.value.loading = loading;
      };

      const setError = (error: string | null) => {
        state.value.error = error;
        state.value.loading = false;
      };

      const clearError = () => {
        state.value.error = null;
      };

      const updateTimestamp = () => {
        state.value.lastUpdated = Date.now();
      };

      const reset = () => {
        Object.assign(state.value, {
          ...initialState,
          loading: false,
          error: null,
          lastUpdated: 0,
        });
      };

      return {
        // 状态
        state,
        loading: computed(() => state.value.loading),
        error: computed(() => state.value.error),
        lastUpdated: computed(() => state.value.lastUpdated),

        // 计算属性
        isLoading,
        hasError,

        // 方法
        setLoading,
        setError,
        clearError,
        updateTimestamp,
        reset,
      };
    },
    {
      persist: options.persist,
    }
  );
}

/**
 * 异步操作包装器
 */
export async function withAsyncAction<T>(
  store: {
    setLoading: (loading: boolean) => void;
    setError: (error: string | null) => void;
    clearError: () => void;
    updateTimestamp: () => void;
  },
  action: () => Promise<T>
): Promise<T> {
  try {
    store.setLoading(true);
    store.clearError();

    const result = await action();

    store.updateTimestamp();
    return result;
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : String(error);
    store.setError(errorMessage);
    throw error;
  } finally {
    store.setLoading(false);
  }
}

/**
 * Store热更新支持
 */
export function enableHMR(store: any, module: any) {
  if (import.meta.hot) {
    acceptHMRUpdate(store, import.meta.hot);
  }
}
