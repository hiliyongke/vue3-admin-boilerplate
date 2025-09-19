<template>
  <t-row :gutter="[24, 24]">
    <t-col :flex="3">
      <div class="user-left-greeting">
        <div>
          Hi，xxx
          <span class="regular">下午好，今天是你加入公司第 100 天～</span>
        </div>
        <!-- <img
          src="@/assets/svg/assets-tencent-logo.png"
          class="logo"
        /> -->
      </div>

      <t-card class="user-info-list" title="个人信息">
        <template #actions>
          <t-button theme="default" shape="square" variant="text">
            <t-icon name="edit" size="18" />
          </t-button>
        </template>
        <t-row class="content" justify="space-between">
          <t-col v-for="(item, index) in USER_INFO_LIST" :key="index" class="contract" :span="item.span || 3">
            <div class="contract-title">
              {{ item.title }}
            </div>
            <div class="contract-detail">
              {{ item.content }}
            </div>
          </t-col>
        </t-row>
      </t-card>

      <t-card class="content-container">
        <t-tabs value="second">
          <t-tab-panel value="first" label="内容列表">
            <p>内容列表</p>
          </t-tab-panel>
          <t-tab-panel value="second" label="内容列表">
            <t-card :bordered="false" class="card-padding-no" title="主页访问数据" describe="（次）">
              <template #actions>
                <t-date-range-picker
                  class="card-date-picker-container"
                  :default-value="LAST_7_DAYS"
                  theme="primary"
                  mode="date"
                  @change="onLineChange"
                />
              </template>
              <div id="lineContainer" style="width: 100%; height: 330px"></div>
            </t-card>
          </t-tab-panel>
          <t-tab-panel value="third" label="内容列表">
            <p>内容列表</p>
          </t-tab-panel>
        </t-tabs>
      </t-card>
    </t-col>

    <t-col :flex="1">
      <t-card class="user-intro">
        <t-avatar size="90px">T</t-avatar>
        <div class="name">My Account</div>
        <div class="position">XXG 港澳业务拓展组员工 直客销售</div>
      </t-card>

      <t-card title="团队成员" class="user-team">
        <template #actions>
          <t-button theme="default" shape="square" variant="text">
            <t-icon name="edit" size="18" />
          </t-button>
        </template>
        <t-list :split="false">
          <t-list-item v-for="(item, index) in TEAM_MEMBERS" :key="index">
            <t-list-item-meta :image="item.avatar" :title="item.title" :description="item.description" />
          </t-list-item>
        </t-list>
      </t-card>

      <t-card title="服务产品" class="product-container">
        <template #actions>
          <t-button theme="default" shape="square" variant="text">
            <t-icon name="edit" size="18" />
          </t-button>
        </template>
        <t-row class="content" :getters="16">
          <t-col v-for="(item, index) in PRODUCT_LIST" :key="index" :span="3">
            <component :is="getIcon(item)" />
          </t-col>
        </t-row>
      </t-card>
    </t-col>
  </t-row>
</template>
<script lang="ts">
export default {
  name: 'UserIndex',
};
</script>
<script setup lang="ts">
import { ref, computed, onMounted, onUnmounted, nextTick, watch } from 'vue';
import * as echarts from 'echarts/core';
import { GridComponent, TooltipComponent, LegendComponent } from 'echarts/components';
import { LineChart } from 'echarts/charts';
import { CanvasRenderer } from 'echarts/renderers';
import type { DateRangeValue } from 'tdesign-vue-next';
import { useSettingStore } from '@/store';

import { LAST_7_DAYS } from '@/utils/date';
import { USER_INFO_LIST, TEAM_MEMBERS, PRODUCT_LIST } from './constants';
import { getFolderLineDataSet } from './index';
import ProductAIcon from '@/assets/svg/assets-product-1.svg';
import ProductBIcon from '@/assets/svg/assets-product-2.svg';
import ProductCIcon from '@/assets/svg/assets-product-3.svg';
import ProductDIcon from '@/assets/svg/assets-product-4.svg';
import { changeChartsTheme } from '@/utils/color';

/**
 * 产品类型
 */
type ProductType = 'a' | 'b' | 'c' | 'd';

/**
 * 日期范围类型
 */
type DateRange = [string, string] | string[];

/**
 * 图表配置接口
 */
interface ChartOption {
  grid: {
    left: string | number;
    top: string | number;
    right: string | number;
    bottom: string | number;
  };
  [key: string]: any;
}

// 注册 ECharts 组件
echarts.use([GridComponent, TooltipComponent, LineChart, CanvasRenderer, LegendComponent]);

/**
 * 图表容器元素
 */
let lineContainer: HTMLElement;

/**
 * 图表实例
 */
let lineChart: echarts.ECharts;

/**
 * 设置 store
 */
const store = useSettingStore();

/**
 * 图表颜色配置
 */
const chartColors = computed(() => store.chartColors);

/**
 * 处理日期范围变化
 * @param value 日期范围值
 */
const onLineChange = (value: DateRangeValue): void => {
  if (lineChart) {
    lineChart.setOption(getFolderLineDataSet(value as any));
  }
};

/**
 * 初始化图表
 */
const initChart = (): void => {
  const container = document.getElementById('lineContainer');
  if (!container) {
    console.error('图表容器未找到');
    return;
  }

  lineContainer = container;
  lineChart = echarts.init(lineContainer);

  const chartOption = getFolderLineDataSet({ ...chartColors.value });

  lineChart.setOption(chartOption);
};

/**
 * 更新图表容器尺寸
 */
const updateContainer = (): void => {
  if (lineChart && lineContainer) {
    lineChart.resize({
      width: lineContainer.clientWidth,
      height: lineContainer.clientHeight,
    });
  }
};

/**
 * 获取产品图标组件
 * @param type 产品类型
 * @returns 图标组件
 */
const getIcon = (type: any): any => {
  switch (type) {
    case 'a':
      return ProductAIcon;
    case 'b':
      return ProductBIcon;
    case 'c':
      return ProductCIcon;
    case 'd':
      return ProductDIcon;
    default:
      return ProductAIcon;
  }
};

// 组件挂载时初始化图表
onMounted(() => {
  nextTick(() => {
    initChart();
  });
  window.addEventListener('resize', updateContainer, false);
});

// 组件卸载时清理事件监听器
onUnmounted(() => {
  window.removeEventListener('resize', updateContainer);
  if (lineChart) {
    lineChart.dispose();
  }
});

// 监听主题变化
watch(
  () => store.brandTheme,
  () => {
    if (lineChart) {
      changeChartsTheme([lineChart]);
    }
  }
);
</script>

<style lang="less" scoped>
@import url('./index.less');
</style>
