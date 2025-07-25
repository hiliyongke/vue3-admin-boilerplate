<template>
  <span :class="containerCls">
    <span :class="iconCls">
      <svg
        v-if="type === 'down'"
        width="16"
        height="16"
        viewBox="0 0 16 16"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M11.5 8L8 11.5L4.5 8"
          stroke="currentColor"
          stroke-width="1.5"
        />
        <path
          d="M8 11L8 4"
          stroke="currentColor"
          stroke-width="1.5"
        />
      </svg>
      <svg
        v-else
        width="16"
        height="16"
        viewBox="0 0 16 16"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M4.5 8L8 4.5L11.5 8"
          stroke="currentColor"
          stroke-width="1.5"
        />
        <path
          d="M8 5V12"
          stroke="currentColor"
          stroke-width="1.5"
        />
      </svg>
    </span>
    <span>{{ describe }}</span>
  </span>
</template>
<script setup lang="ts">
import { computed } from 'vue';

/**
 * 趋势类型
 */
type TrendType = 'up' | 'down';

/**
 * 组件属性接口
 */
interface Props {
  /** 趋势类型：上升或下降 */
  type?: TrendType;
  /** 描述文本或数字 */
  describe?: string | number;
  /** 是否反色显示 */
  isReverseColor?: boolean;
}

/**
 * 定义组件属性
 */
const props = withDefaults(defineProps<Props>(), {
  type: 'up',
  describe: '',
  isReverseColor: false
});

/**
 * 计算容器样式类名
 */
const containerCls = computed<(string | Record<string, boolean>)[]>(() => {
  const { isReverseColor, type } = props;
  return [
    'trend-container',
    {
      'trend-container__reverse': isReverseColor,
      'trend-container__up': !isReverseColor && type === 'up',
      'trend-container__down': !isReverseColor && type === 'down'
    }
  ];
});

/**
 * 计算图标样式类名
 */
const iconCls = computed<string[]>(() => ['trend-icon-container']);
</script>

<style lang="less" scoped>
.trend {
  &-container {
    &__up {
      display: inline-flex;
      color: var(--td-error-color);
      align-items: center;
      justify-content: center;
      .trend-icon-container {
        margin-right: 8px;
        background: var(--td-error-color-2);
      }
    }
    &__down {
      display: inline-flex;
      color: var(--td-success-color);
      align-items: center;
      justify-content: center;
      .trend-icon-container {
        margin-right: 8px;
        background: var(--td-success-color-2);
      }
    }
    &__reverse {
      display: inline-flex;
      color: #ffffff;
      align-items: center;
      justify-content: center;
      .trend-icon-container {
        margin-right: 8px;
        background: var(--td-brand-color-5);
      }
    }
    .trend-icon-container {
      display: inline-flex;
      width: 16px;
      height: 16px;
      border-radius: 50%;
      align-items: center;
      justify-content: center;
    }
  }
}
</style>
