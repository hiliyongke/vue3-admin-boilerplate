<template>
  <t-row :gutter="[16, 16]">
    <t-col
      v-for="(item, index) in PANE_LIST"
      :key="item.title"
      :xs="6"
      :xl="3"
    >
      <t-card
        :title="item.title"
        :style="{ height: '168px' }"
        :class="{
          'dashboard-item': true,
          'dashboard-item--main-color': index == 0
        }"
      >
        <div class="dashboard-item-top">
          <span :style="{ fontSize: `${resizeTime * 36}px` }">
            {{ item.number }}
          </span>
        </div>
        <div class="dashboard-item-left">
          <div
            v-if="index === 0"
            id="moneyContainer"
            class="dashboard-chart-container"
            :style="{
              width: `${resizeTime * 120}px`,
              height: `${resizeTime * 66}px`
            }"
          ></div>
          <div
            v-else-if="index === 1"
            id="refundContainer"
            class="dashboard-chart-container"
            :style="{
              width: `${resizeTime * 120}px`,
              height: `${resizeTime * 42}px`
            }"
          ></div>
          <span
            v-else-if="index === 2"
            :style="{ marginTop: `-24px` }"
          >
            <usergroup-icon />
          </span>
          <span
            v-else
            :style="{ marginTop: '-24px' }"
          >
            <file-icon />
          </span>
        </div>
        <template #footer>
          <div class="dashboard-item-bottom">
            <div class="dashboard-item-block">
              自从上周以来
              <trend
                class="dashboard-item-trend"
                :type="item.upTrend ? 'up' : 'down'"
                :is-reverse-color="index === 0"
                :describe="item.upTrend || item.downTrend"
              />
            </div>
            <t-icon name="chevron-right" />
          </div>
        </template>
      </t-card>
    </t-col>
  </t-row>
</template>

<script lang="ts">
export default {
  name: 'DashboardBase'
};
</script>

<script setup lang="ts">
import { ref, onMounted, onUnmounted, nextTick, watch } from 'vue';
import * as echarts from 'echarts/core';
import { LineChart, BarChart } from 'echarts/charts';
import { CanvasRenderer } from 'echarts/renderers';
import { useSettingStore } from '@/store';
import { changeChartsTheme } from '@/utils/color';
import Trend from '@/components/trend/index.vue';
import { constructInitDashboardDataset } from '../index';
import { PANE_LIST } from '../constants';

// 注册 ECharts 组件
echarts.use([LineChart, BarChart, CanvasRenderer]);

/**
 * 图表类型
 */
type ChartType = 'line' | 'bar';

/**
 * 设置 store
 */
const store = useSettingStore();

/**
 * 响应式缩放比例
 */
const resizeTime = ref<number>(1);

/**
 * 收入图表相关变量
 */
let moneyContainer: HTMLElement | null = null;
let moneyChart: echarts.ECharts | null = null;

/**
 * 退款图表相关变量
 */
let refundContainer: HTMLElement | null = null;
let refundChart: echarts.ECharts | null = null;

/**
 * 渲染收入图表
 */
const renderMoneyChart = (): void => {
  if (!moneyContainer) {
    moneyContainer = document.getElementById('moneyContainer');
  }
  if (moneyContainer) {
    moneyChart = echarts.init(moneyContainer);
    moneyChart.setOption(constructInitDashboardDataset('line'));
  }
};

/**
 * 渲染退款图表
 */
const renderRefundChart = (): void => {
  if (!refundContainer) {
    refundContainer = document.getElementById('refundContainer');
  }
  if (refundContainer) {
    refundChart = echarts.init(refundContainer);
    refundChart.setOption(constructInitDashboardDataset('bar'));
  }
};

/**
 * 渲染所有图表
 */
const renderCharts = (): void => {
  renderMoneyChart();
  renderRefundChart();
};

/**
 * 更新容器尺寸
 */
const updateContainer = (): void => {
  const clientWidth = document.documentElement.clientWidth;

  if (clientWidth >= 1400 && clientWidth < 1920) {
    resizeTime.value = Number((clientWidth / 2080).toFixed(2));
  } else if (clientWidth < 1080) {
    resizeTime.value = Number((clientWidth / 1080).toFixed(2));
  } else {
    resizeTime.value = 1;
  }

  // 调整图表尺寸
  if (moneyChart) {
    moneyChart.resize({
      width: resizeTime.value * 120,
      height: resizeTime.value * 66
    });
  }

  if (refundChart) {
    refundChart.resize({
      width: resizeTime.value * 120,
      height: resizeTime.value * 42
    });
  }
};

/**
 * 组件挂载时初始化
 */
onMounted(() => {
  renderCharts();
  nextTick(() => {
    updateContainer();
  });
  window.addEventListener('resize', updateContainer, { passive: true });
});

/**
 * 组件卸载时清理
 */
onUnmounted(() => {
  window.removeEventListener('resize', updateContainer);

  // 销毁图表实例
  if (moneyChart) {
    moneyChart.dispose();
    moneyChart = null;
  }
  if (refundChart) {
    refundChart.dispose();
    refundChart = null;
  }
});

/**
 * 监听主题变化
 */
watch(
  () => store.brandTheme,
  () => {
    if (refundChart) {
      changeChartsTheme([refundChart]);
    }
  }
);

/**
 * 监听模式变化
 */
watch(
  () => store.mode,
  () => {
    // 销毁现有图表
    [moneyChart, refundChart].forEach(chart => {
      if (chart) {
        chart.dispose();
      }
    });

    // 重新渲染图表
    renderCharts();
  }
);
</script>

<style lang="less" scoped>
.dashboard-item {
  padding: 8px;
  :deep(.t-card__footer) {
    padding-top: 0;
  }
  :deep(.t-card__title) {
    font-size: 14px;
    font-weight: 500;
  }
  :deep(.t-card__body) {
    position: relative;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    flex: 1;
  }
  &:hover {
    cursor: pointer;
  }
  &-top {
    display: flex;
    flex-direction: row;
    align-items: flex-start;
    > span {
      display: inline-block;
      font-size: 36px;
      line-height: 44px;
      color: var(--td-text-color-primary);
    }
  }
  &-bottom {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    > .t-icon {
      cursor: pointer;
    }
  }
  &-block {
    display: flex;
    align-items: center;
    justify-content: center;
    line-height: 22px;
    color: var(--td-text-color-placeholder);
  }
  &-trend {
    margin-left: 8px;
  }
  &-left {
    position: absolute;
    top: 0;
    right: 32px;
    > span {
      display: inline-flex;
      align-items: center;
      justify-content: center;
      width: 56px;
      height: 56px;
      background: var(--td-brand-color-1);
      border-radius: 50%;
      .t-icon {
        font-size: 24px;
        color: var(--td-brand-color);
      }
    }
  }

  // 针对第一个卡片需要反色处理
  &--main-color {
    color: var(--td-text-color-primary);
    background: var(--td-brand-color);
    :deep(.t-card__title),
    .dashboard-item-top span,
    .dashboard-item-bottom {
      color: var(--td-text-color-anti);
    }
    .dashboard-item-block {
      color: var(--td-text-color-anti);
      opacity: 0.6;
    }
    .dashboard-item-bottom {
      color: var(--td-text-color-anti);
    }
  }
}
</style>
