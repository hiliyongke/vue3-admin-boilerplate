/**
 * @description 表格数据管理 Composable
 * @author 现代化重构版本
 */

import { ref, computed, type Ref } from 'vue';
import { useRequest, type UseRequestOptions } from './use-request';

/**
 * 分页参数
 */
export interface PaginationParams {
  /**
   * 当前页码
   * @default 1
   */
  page?: number;

  /**
   * 每页数量
   * @default 10
   */
  pageSize?: number;
}

/**
 * 分页响应数据
 */
export interface PaginationResponse<T> {
  /**
   * 数据列表
   */
  list: T[];

  /**
   * 总数
   */
  total: number;

  /**
   * 当前页码
   */
  page?: number;

  /**
   * 每页数量
   */
  pageSize?: number;
}

/**
 * 表格配置选项
 */
export interface UseTableOptions<T, P = any> extends UseRequestOptions<PaginationResponse<T>> {
  /**
   * 初始页码
   * @default 1
   */
  initialPage?: number;

  /**
   * 初始每页数量
   * @default 10
   */
  initialPageSize?: number;

  /**
   * 是否立即加载
   * @default true
   */
  immediate?: boolean;

  /**
   * 初始查询参数
   */
  initialParams?: P;
}

/**
 * 表格返回值
 */
export interface UseTableReturn<T, P = any> {
  /**
   * 加载状态
   */
  loading: Ref<boolean>;

  /**
   * 错误信息
   */
  error: Ref<Error | null>;

  /**
   * 表格数据
   */
  data: Ref<T[]>;

  /**
   * 当前页码
   */
  page: Ref<number>;

  /**
   * 每页数量
   */
  pageSize: Ref<number>;

  /**
   * 总数
   */
  total: Ref<number>;

  /**
   * 总页数
   */
  totalPages: Ref<number>;

  /**
   * 查询参数
   */
  params: Ref<P>;

  /**
   * 刷新当前页
   */
  refresh: () => Promise<void>;

  /**
   * 重新加载（回到第一页）
   */
  reload: () => Promise<void>;

  /**
   * 切换页码
   */
  changePage: (page: number) => Promise<void>;

  /**
   * 切换每页数量
   */
  changePageSize: (pageSize: number) => Promise<void>;

  /**
   * 更新查询参数
   */
  updateParams: (newParams: Partial<P>) => Promise<void>;

  /**
   * 重置
   */
  reset: () => void;
}

/**
 * 表格数据管理 Hook
 *
 * @example
 * ```ts
 * interface User {
 *   id: string
 *   name: string
 * }
 *
 * interface SearchParams {
 *   keyword?: string
 *   status?: string
 * }
 *
 * const {
 *   loading,
 *   data,
 *   page,
 *   pageSize,
 *   total,
 *   refresh,
 *   changePage,
 *   updateParams
 * } = useTable<User, SearchParams>(
 *   async (params) => {
 *     return await fetchUsers(params)
 *   },
 *   {
 *     initialPageSize: 20,
 *     initialParams: { status: 'active' }
 *   }
 * )
 *
 * // 搜索
 * await updateParams({ keyword: 'vue' })
 *
 * // 切换页码
 * await changePage(2)
 * ```
 */
export function useTable<T, P = any>(
  requestFn: (params: PaginationParams & P) => Promise<PaginationResponse<T>>,
  options: UseTableOptions<T, P> = {}
): UseTableReturn<T, P> {
  const {
    initialPage = 1,
    initialPageSize = 10,
    immediate = true,
    initialParams = {} as P,
    ...requestOptions
  } = options;

  // State
  const page = ref(initialPage);
  const pageSize = ref(initialPageSize);
  const total = ref(0);
  const data = ref<T[]>([]) as Ref<T[]>;
  const params = ref<P>(initialParams) as Ref<P>;

  // Computed
  const totalPages = computed(() => Math.ceil(total.value / pageSize.value));

  // Request
  const { loading, error, execute } = useRequest(
    async () => {
      const result = await requestFn({
        page: page.value,
        pageSize: pageSize.value,
        ...params.value,
      } as any);

      data.value = result.list;
      total.value = result.total;

      // 更新分页信息（如果后端返回）
      if (result.page !== undefined) {
        page.value = result.page;
      }
      if (result.pageSize !== undefined) {
        pageSize.value = result.pageSize;
      }

      return result;
    },
    {
      ...requestOptions,
      immediate,
    }
  );

  /**
   * 刷新当前页
   */
  async function refresh(): Promise<void> {
    await execute();
  }

  /**
   * 重新加载（回到第一页）
   */
  async function reload(): Promise<void> {
    page.value = initialPage;
    await execute();
  }

  /**
   * 切换页码
   */
  async function changePage(newPage: number): Promise<void> {
    if (newPage < 1 || newPage > totalPages.value) {
      console.warn(`Invalid page number: ${newPage}`);
      return;
    }
    page.value = newPage;
    await execute();
  }

  /**
   * 切换每页数量
   */
  async function changePageSize(newPageSize: number): Promise<void> {
    if (newPageSize < 1) {
      console.warn(`Invalid page size: ${newPageSize}`);
      return;
    }
    pageSize.value = newPageSize;
    page.value = 1; // 重置到第一页
    await execute();
  }

  /**
   * 更新查询参数
   */
  async function updateParams(newParams: Partial<P>): Promise<void> {
    params.value = {
      ...params.value,
      ...newParams,
    };
    page.value = 1; // 重置到第一页
    await execute();
  }

  /**
   * 重置
   */
  function reset(): void {
    page.value = initialPage;
    pageSize.value = initialPageSize;
    total.value = 0;
    data.value = [];
    params.value = initialParams;
  }

  return {
    loading,
    error,
    data,
    page,
    pageSize,
    total,
    totalPages,
    params,
    refresh,
    reload,
    changePage,
    changePageSize,
    updateParams,
    reset,
  };
}
