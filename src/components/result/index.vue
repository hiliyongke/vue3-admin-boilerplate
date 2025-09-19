<template>
  <div class="result-container">
    <div class="result-bg-img">
      <component :is="dynamicComponent" />
    </div>
    <div class="result-title">{{ title }}</div>
    <div class="result-tip">{{ tip }}</div>
    <slot></slot>
  </div>
</template>
<script setup lang="ts">
import { computed } from 'vue';
import type { Component } from 'vue';
import Result403Icon from '@/assets/svg/assets-result-403.svg';
import Result404Icon from '@/assets/svg/assets-result-404.svg';
import Result500Icon from '@/assets/svg/assets-result-500.svg';
import ResultIeIcon from '@/assets/svg/assets-result-ie.svg';
import ResultWifiIcon from '@/assets/svg/assets-result-wifi.svg';
import ResultMaintenanceIcon from '@/assets/svg/assets-result-maintenance.svg';

/**
 * 结果页面类型
 */
type ResultType = '403' | '404' | '500' | 'ie' | 'wifi' | 'maintenance';

/**
 * 组件属性接口
 */
interface Props {
  /** 背景图片URL */
  bgUrl?: string;
  /** 标题 */
  title?: string;
  /** 提示信息 */
  tip?: string;
  /** 结果类型 */
  type?: ResultType;
}

/**
 * 定义组件属性
 */
const props = withDefaults(defineProps<Props>(), {
  bgUrl: '',
  title: '',
  tip: '',
  type: '403',
});

/**
 * 图标组件映射表
 */
const ICON_MAP: Record<ResultType, any> = {
  '403': Result403Icon,
  '404': Result404Icon,
  '500': Result500Icon,
  ie: ResultIeIcon,
  wifi: ResultWifiIcon,
  maintenance: ResultMaintenanceIcon,
} as const;

/**
 * 动态组件计算属性
 */
const dynamicComponent = computed(() => {
  return ICON_MAP[props.type] || ICON_MAP['403'];
});
</script>
<style lang="less" scoped>
.result {
  &-link {
    color: var(--td-brand-color);
    text-decoration: none;
    cursor: pointer;
    &:hover {
      color: var(--td-brand-color);
    }
    &:active {
      color: var(--td-brand-color);
    }
    &--active {
      color: var(--td-brand-color);
    }
    &:focus {
      text-decoration: none;
    }
  }
  &-container {
    display: flex;
    height: 75vh;
    min-height: 400px;
    padding: 24px;
    flex-direction: column;
    align-items: center;
    justify-content: center;
  }
  &-bg-img {
    width: 200px;
    color: var(--td-brand-color);
  }
  &-title {
    margin-top: 8px;
    font-size: var(--td-font-size-xl);
    font-style: normal;
    font-weight: 500;
    line-height: var(--td-text-line-height-xl);
    color: var(--td-text-color-primary);
  }
  &-tip {
    margin: 8px 0 32px;
    font-size: var(--td-font-size-base);
    line-height: var(--td-text-line-height-base);
    color: var(--td-text-color-secondary);
  }
}
</style>
