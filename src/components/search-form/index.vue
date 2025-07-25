<template>
  <div
    v-if="columns && columns.length"
    class="table-search"
  >
    <t-form
      ref="formRef"
      :model="searchParam"
      :inline="true"
      label-width="100px"
      :style="`max-width: ${maxWidth}px`"
    >
      <template
        v-for="item in getSearchList"
        :key="item.prop"
      >
        <t-form-item :label="`${item.label} :`">
          <SearchFormItem
            :item="item"
            :search-param="searchParam"
          />
        </t-form-item>
      </template>
    </t-form>
    <div class="search-operation">
      <t-button
        theme="primary"
        @click="search"
      >
        搜索
      </t-button>
      <t-button @click="reset">重置</t-button>
      <t-button
        v-if="columns && columns.length > maxLength"
        theme="primary"
        link
        class="search-isOpen"
        @click="searchShow = !searchShow"
      >
        {{ searchShow ? '合并' : '展开' }}
        <t-icon class="el-icon--right">
          <ChevronUpIcon v-if="searchShow" />
          <ChevronUpIcon v-else />
        </t-icon>
      </t-button>
    </div>
  </div>
</template>

<script setup lang="ts" name="searchForm">
import { ref, computed, onMounted } from 'vue';
import { ColumnProps } from '@/components/pro-table/interface';
import SearchFormItem from './components/search-form-item.vue';

interface ProTableProps {
  columns: Partial<ColumnProps>[]; // 搜索配置列
  searchParam: any; // 搜索参数
  search: (params: any) => void; // 搜索方法
  reset: (params: any) => void; // 重置方法
}

// 默认值
const props = withDefaults(defineProps<{
  columns?: Partial<ColumnProps>[];
  searchParam?: any;
  search?: (params: any) => void;
  reset?: (params: any) => void;
}>(), {
  columns: () => [],
  searchParam: () => ({}),
  search: () => {},
  reset: () => {}
});

const maxLength = ref<number>(4);
const maxWidth = ref<number>(1260);

onMounted(() => {
  // * 暂时只判断这两种情况（第四个搜索项为时间/日期范围 || 前三项存在时间/日期范围选择框）(后期通过css解决)
  if (props.columns && props.columns.length >= 4) {
    props.columns[3]?.searchType === 'datetimerange' ||
    props.columns[3]?.searchType === 'daterange'
      ? ((maxWidth.value = 945), (maxLength.value = 3))
      : null;
    props.columns.slice(0, 3).forEach(item => {
      item?.searchType === 'datetimerange' || item?.searchType === 'daterange'
        ? ((maxWidth.value = 1135), (maxLength.value = 3))
        : null;
    });
  }
});

// 是否展开搜索项
const searchShow = ref(false);

// 根据是否展开配置搜索项长度
const getSearchList = computed((): Partial<ColumnProps>[] => {
  if (!props.columns) return [];
  if (searchShow.value) return props.columns;
  return props.columns.slice(0, maxLength.value);
});
</script>
