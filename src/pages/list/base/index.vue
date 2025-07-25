<template>
  <div>
    <t-card class="list-card-container">
      <t-row justify="space-between">
        <div class="left-operation-container">
          <t-button @click="handleSetupContract">新建合同</t-button>
          <t-button
            variant="base"
            theme="default"
            :disabled="!selectedRowKeys.length"
          >
            导出合同
          </t-button>
          <p
            v-if="!!selectedRowKeys.length"
            class="selected-count"
          >
            已选{{ selectedRowKeys.length }}项
          </p>
        </div>
        <div class="search-input">
          <t-input
            v-model="searchValue"
            placeholder="请输入你需要搜索的内容"
            clearable
          >
            <template #suffix-icon>
              <search-icon size="20px" />
            </template>
          </t-input>
        </div>
      </t-row>
      <t-table
        :data="data"
        :columns="COLUMNS"
        :row-key="rowKey"
        vertical-align="top"
        :hover="true"
        :pagination="pagination"
        :selected-row-keys="selectedRowKeys"
        :loading="dataLoading"
        :header-affixed-top="{ offsetTop, container: getContainer }"
        @page-change="rehandlePageChange"
        @change="rehandleChange"
        @select-change="rehandleSelectChange"
      >
        <template #status="{ row }">
          <t-tag
            v-if="row.status === CONTRACT_STATUS.FAIL"
            theme="danger"
            variant="light"
          >
            审核失败
          </t-tag>
          <t-tag
            v-if="row.status === CONTRACT_STATUS.AUDIT_PENDING"
            theme="warning"
            variant="light"
          >
            待审核
          </t-tag>
          <t-tag
            v-if="row.status === CONTRACT_STATUS.EXEC_PENDING"
            theme="warning"
            variant="light"
          >
            待履行
          </t-tag>
          <t-tag
            v-if="row.status === CONTRACT_STATUS.EXECUTING"
            theme="success"
            variant="light"
          >
            履行中
          </t-tag>
          <t-tag
            v-if="row.status === CONTRACT_STATUS.FINISH"
            theme="success"
            variant="light"
          >
            已完成
          </t-tag>
        </template>
        <template #contractType="{ row }">
          <p v-if="row.contractType === CONTRACT_TYPES.MAIN">审核失败</p>
          <p v-if="row.contractType === CONTRACT_TYPES.SUB">待审核</p>
          <p v-if="row.contractType === CONTRACT_TYPES.SUPPLEMENT">待履行</p>
        </template>
        <template #paymentType="{ row }">
          <div
            v-if="row.paymentType === CONTRACT_PAYMENT_TYPES.PAYMENT"
            class="payment-col"
          >
            付款
            <trend
              class="dashboard-item-trend"
              type="up"
            />
          </div>
          <div
            v-if="row.paymentType === CONTRACT_PAYMENT_TYPES.RECEIPT"
            class="payment-col"
          >
            收款
            <trend
              class="dashboard-item-trend"
              type="down"
            />
          </div>
        </template>

        <template #op="slotProps">
          <a
            class="t-button-link"
            @click="handleClickDetail()"
          >
            详情
          </a>
          <a
            class="t-button-link"
            @click="handleClickDelete(slotProps)"
          >
            删除
          </a>
        </template>
      </t-table>
    </t-card>

    <t-dialog
      v-model:visible="confirmVisible"
      header="确认删除当前所选合同？"
      :body="confirmBody"
      :on-cancel="onCancel"
      @confirm="onConfirmDelete"
    />
  </div>
</template>

<script lang="ts">
export default {
  name: 'ListBase'
};
</script>

<script setup lang="ts">
import { ref, onMounted, computed } from 'vue';
import { useRouter } from 'vue-router';
import { SearchIcon } from 'tdesign-icons-vue-next';
import { MessagePlugin } from 'tdesign-vue-next';
import type { PageInfo } from 'tdesign-vue-next';

import {
  CONTRACT_STATUS,
  CONTRACT_TYPES,
  CONTRACT_PAYMENT_TYPES
} from '@/enums/index';
import Trend from '@/components/trend/index.vue';
import { getList } from '@/api/list';
import { useSettingStore } from '@/store';
import { prefix } from '@/config/global';

import { COLUMNS } from './constants';

/**
 * 合同数据接口
 */
interface ContractData {
  index: number;
  name: string;
  status: number;
  contractType: number;
  paymentType: number;
  [key: string]: any;
}

/**
 * 分页配置接口
 */
interface PaginationConfig {
  defaultPageSize: number;
  total: number;
  defaultCurrent: number;
}

/**
 * 删除行参数接口
 */
interface DeleteRowParams {
  rowIndex: number;
}

/**
 * 表格变化参数接口
 */
interface ChangeParams {
  [key: string]: any;
}

/**
 * 触发数据接口
 */
interface TriggerAndData {
  [key: string]: any;
}

const store = useSettingStore();
const router = useRouter();

/**
 * 表格数据
 */
const data = ref<ContractData[]>([]);

/**
 * 分页配置
 */
const pagination = ref<PaginationConfig>({
  defaultPageSize: 20,
  total: 100,
  defaultCurrent: 1
});

/**
 * 搜索值
 */
const searchValue = ref<string>('');

/**
 * 数据加载状态
 */
const dataLoading = ref<boolean>(false);

/**
 * 获取列表数据
 */
const fetchData = async (): Promise<void> => {
  dataLoading.value = true;
  try {
    const { list } = await getList();
    data.value = list;
    pagination.value = {
      ...pagination.value,
      total: list.length
    };
  } catch (e) {
    console.log(e);
  } finally {
    dataLoading.value = false;
  }
};

/**
 * 待删除项索引
 */
const deleteIdx = ref<number>(-1);

/**
 * 确认删除弹窗内容
 */
const confirmBody = computed<string>(() => {
  if (deleteIdx.value > -1) {
    const { name } = data.value[deleteIdx.value];
    return `删除后，${name}的所有合同信息将被清空，且无法恢复`;
  }
  return '';
});

/**
 * 确认弹窗显示状态
 */
const confirmVisible = ref<boolean>(false);

/**
 * 选中的行键
 */
const selectedRowKeys = ref<number[]>([1, 2]);

/**
 * 表格行键
 */
const rowKey = 'index';

/**
 * 重置删除索引
 */
const resetIdx = (): void => {
  deleteIdx.value = -1;
};

/**
 * 确认删除
 */
const onConfirmDelete = (): void => {
  // 真实业务请发起请求
  data.value.splice(deleteIdx.value, 1);
  pagination.value.total = data.value.length;
  const selectedIdx = selectedRowKeys.value.indexOf(deleteIdx.value);
  if (selectedIdx > -1) {
    selectedRowKeys.value.splice(selectedIdx, 1);
  }
  confirmVisible.value = false;
  MessagePlugin.success('删除成功');
  resetIdx();
};

/**
 * 取消删除
 */
const onCancel = (): void => {
  resetIdx();
};

/**
 * 处理选择变化
 * @param val 选中的行键数组
 */
const rehandleSelectChange = (val: number[]): void => {
  selectedRowKeys.value = val;
};

/**
 * 处理分页变化
 * @param curr 当前页
 * @param pageInfo 分页信息
 */
const rehandlePageChange = (curr: number, pageInfo: PageInfo): void => {
  console.log('分页变化', curr, pageInfo);
};

/**
 * 处理表格变化
 * @param changeParams 变化参数
 * @param triggerAndData 触发数据
 */
const rehandleChange = (changeParams: ChangeParams, triggerAndData: TriggerAndData): void => {
  console.log('统一Change', changeParams, triggerAndData);
};

/**
 * 点击详情
 */
const handleClickDetail = (): void => {
  router.push('/detail/base');
};

/**
 * 新建合同
 */
const handleSetupContract = (): void => {
  router.push('/form/base');
};

/**
 * 点击删除
 * @param row 行数据
 */
const handleClickDelete = (row: DeleteRowParams): void => {
  deleteIdx.value = row.rowIndex;
  confirmVisible.value = true;
};

/**
 * 计算顶部偏移量
 */
const offsetTop = computed<number>(() => {
  return store.isUseTabsRouter ? 48 : 0;
});

/**
 * 获取容器元素
 * @returns 容器元素
 */
const getContainer = (): Element | null => {
  return document.querySelector(`.${prefix}-layout`);
};

// 组件挂载时获取数据
onMounted(() => {
  fetchData();
});
</script>

<style lang="less" scoped>
.payment-col {
  display: flex;
  .trend-container {
    display: flex;
    align-items: center;
    margin-left: 8px;
  }
}
.left-operation-container {
  padding: 6px 0;
  margin-bottom: 16px;
  .selected-count {
    display: inline-block;
    margin-left: 8px;
    color: var(--td-text-color-secondary);
  }
}
.search-input {
  width: 360px;
}
</style>
