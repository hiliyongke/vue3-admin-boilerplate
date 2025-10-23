<template>
  <div class="demo-card">
    <section class="demo-section">
      <header class="demo-header">
        <h2>useTable 示例：订单列表</h2>
        <p>结合 useRequest 与分页逻辑，实现标准的列表查询体验。</p>
      </header>

      <div class="demo-filters">
        <t-input v-model="filters.keyword" placeholder="输入关键词" style="max-width: 220px" />
        <t-select
          v-model="filters.status"
          :options="statusOptions"
          placeholder="选择状态"
          clearable
          style="max-width: 180px"
        />
        <t-button theme="primary" :loading="loading" @click="handleSearch"> 查询 </t-button>
        <t-button variant="outline" :disabled="loading" @click="handleReset"> 重置 </t-button>
      </div>

      <t-table
        row-key="orderId"
        bordered
        hover
        :data="tableData"
        :columns="columns as any"
        :loading="loading"
        max-height="420"
      />

      <div class="demo-pagination">
        <t-pagination
          v-model:current="page"
          v-model:pageSize="pageSize"
          :total="total"
          :page-size-options="[10, 20, 50]"
          @change="handlePageChange"
        />
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
import { reactive, h } from 'vue';
import type { PrimaryTableCol } from 'tdesign-vue-next';
import { Tag as TTag } from 'tdesign-vue-next';
import { useTable } from '@/shared/composables';

interface OrderItem {
  orderId: string;
  userName: string;
  amount: number;
  status: 'pending' | 'paid' | 'cancelled';
  createdAt: string;
}

interface OrderSearchParams {
  keyword?: string;
  status?: OrderItem['status'];
}

const statusOptions = [
  { label: '待支付', value: 'pending' },
  { label: '已支付', value: 'paid' },
  { label: '已取消', value: 'cancelled' },
];

// 模拟异步接口
async function fetchOrderList(params: { page?: number; pageSize?: number } & OrderSearchParams) {
  const { page = 1, pageSize = 10, keyword, status } = params;
  await new Promise((resolve) => setTimeout(resolve, 600));

  const allData: OrderItem[] = Array.from({ length: 87 }).map((_, index) => ({
    orderId: `${20240000 + index}`,
    userName: `用户_${index}`,
    amount: Math.round(Math.random() * 10000) / 100,
    status: ['pending', 'paid', 'cancelled'][index % 3] as OrderItem['status'],
    createdAt: new Date(Date.now() - index * 3600 * 1000).toLocaleString(),
  }));

  const filtered = allData.filter((item) => {
    const matchKeyword = !keyword || item.orderId.includes(keyword) || item.userName.includes(keyword);
    const matchStatus = !status || item.status === status;
    return matchKeyword && matchStatus;
  });

  const start = (page - 1) * pageSize;
  const end = start + pageSize;

  return {
    list: filtered.slice(start, end),
    total: filtered.length,
  };
}

const filters = reactive<OrderSearchParams>({ keyword: '', status: undefined });

const { loading, data, page, pageSize, total, changePage, changePageSize, updateParams, refresh } = useTable<
  OrderItem,
  OrderSearchParams
>(async (params) => await fetchOrderList(params), {
  initialPageSize: 10,
  initialParams: { keyword: '', status: undefined },
  onSuccess: (result) => {
    console.log('✅ 获取订单成功', result);
  },
  onError: (err) => {
    console.error('❌ 获取订单失败', err);
  },
});

const tableData = data;

const columns: PrimaryTableCol<OrderItem>[] = [
  { colKey: 'orderId', title: '订单号', width: '160px' },
  { colKey: 'userName', title: '用户名称', ellipsis: true },
  {
    colKey: 'amount',
    title: '订单金额',
    cell: (h, { row }) => h('span', `￥${row.amount.toFixed(2)}`),
  },
  {
    colKey: 'status',
    title: '状态',
    cell: (h, { row }) => {
      const map = {
        pending: { theme: 'warning', label: '待支付' },
        paid: { theme: 'success', label: '已支付' },
        cancelled: { theme: 'danger', label: '已取消' },
      } as const;
      const status = map[row.status];
      return h(TTag, { theme: status.theme }, () => status.label);
    },
  },
  { colKey: 'createdAt', title: '创建时间', width: '200px' },
];

async function handleSearch() {
  await updateParams({ ...filters });
}

async function handleReset() {
  filters.keyword = '';
  filters.status = undefined;
  await updateParams({ keyword: '', status: undefined });
}

async function handlePageChange({ current, pageSize: size }: { current: number; pageSize: number }) {
  if (size !== pageSize.value) {
    await changePageSize(size);
  }
  if (current !== page.value) {
    await changePage(current);
  } else {
    await refresh();
  }
}
</script>

<style scoped>
.demo-card {
  display: grid;
  gap: 24px;
}

.demo-section {
  display: grid;
  gap: 16px;
  padding: 24px;
  background: var(--td-bg-color-container);
  border-radius: 12px;
  box-shadow: var(--td-shadow-1);
}

.demo-header h2 {
  margin: 0 0 8px;
  font-size: 18px;
  font-weight: 600;
}

.demo-header p {
  margin: 0;
  color: var(--td-text-color-secondary);
}

.demo-filters {
  display: flex;
  flex-wrap: wrap;
  gap: 12px;
  align-items: center;
}

.demo-pagination {
  display: flex;
  justify-content: flex-end;
}
</style>
