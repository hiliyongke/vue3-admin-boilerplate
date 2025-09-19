<template>
  <t-row justify="center">
    <t-button @click="handleClick">新手引导</t-button>
    <t-drawer v-model:visible="visible" header="演示新手引导" size="60%" :show-overlay="false" destroy-on-close>
      <template #footer>
        <t-button @click="visible = false">关闭抽屉</t-button>
      </template>
      <div class="guide-container">
        <div class="main-title">
          <div class="title-major">Guide 用户引导</div>
          <div class="title-sub">按钮用于开启一个闭环的操作任务，如“删除”对象、“购买”商品等。</div>
        </div>
        <div class="field label-field">
          <div class="label">Label</div>
          <t-input placeholder="请输入内容" />
        </div>
        <div class="field">
          <div class="label">Label</div>
          <t-input placeholder="请输入内容" />
        </div>
        <t-row class="action">
          <t-button>确定</t-button>
          <t-button theme="default" variant="base"> 取消 </t-button>
        </t-row>
      </div>

      <t-guide
        v-model="current"
        :steps="steps"
        @change="handleChange"
        @prev-step-click="handlePrevStepClick"
        @next-step-click="handleNextStepClick"
        @finish="handleFinish"
        @skip="handleSkip"
      />
    </t-drawer>
  </t-row>
</template>

<script lang="ts">
export default {
  name: 'GuideDemo',
};
</script>

<script setup lang="ts">
import { ref } from 'vue';

/**
 * 引导步骤配置接口
 */
interface GuideStep {
  element: string;
  title: string;
  body: string;
  placement: 'top' | 'bottom' | 'left' | 'right' | 'bottom-right';
}

/**
 * 引导事件参数接口
 */
interface GuideEventParams {
  e: Event;
  current: number;
  total: number;
  prev?: number;
  next?: number;
}

/**
 * 抽屉显示状态
 */
const visible = ref<boolean>(false);

/**
 * 当前引导步骤
 */
const current = ref<number>(-1);

/**
 * 引导步骤配置
 */
const steps: GuideStep[] = [
  {
    element: '.main-title',
    title: '新手引导标题',
    body: '新手引导的说明文案',
    placement: 'bottom-right',
  },
  {
    element: '.label-field',
    title: '新手引导标题',
    body: '新手引导的说明文案',
    placement: 'bottom',
  },
  {
    element: '.action',
    title: '新手引导标题',
    body: '新手引导的说明文案',
    placement: 'right',
  },
];

/**
 * 开始引导
 */
const handleClick = (): void => {
  visible.value = true;
  setTimeout(() => {
    current.value = 0;
  }, 800);
};

/**
 * 引导步骤变化
 * @param current 当前步骤
 * @param context 事件上下文
 */
const handleChange = (current: number, context?: { e: MouseEvent; total: number }): void => {
  console.log('引导步骤变化:', current, context);
};

/**
 * 上一步点击
 * @param params 事件参数
 */
const handlePrevStepClick = (params: GuideEventParams): void => {
  console.log('上一步点击:', params);
};

/**
 * 下一步点击
 * @param params 事件参数
 */
const handleNextStepClick = (params: GuideEventParams): void => {
  console.log('下一步点击:', params);
};

/**
 * 完成引导
 * @param params 事件参数
 */
const handleFinish = (params: GuideEventParams): void => {
  visible.value = false;
  console.log('完成引导:', params);
};

/**
 * 跳过引导
 * @param params 事件参数
 */
const handleSkip = (params: GuideEventParams): void => {
  visible.value = false;
  console.log('跳过引导:', params);
};
</script>

<style scoped>
.guide-container {
  max-width: 600px;
  padding: 40px;
}
.title-major {
  font-size: 36px;
  font-weight: 700;
  line-height: 44px;
  color: var(--td-text-color-primary);
}
.title-sub {
  margin-top: 8px;
  font-size: 14px;
  font-weight: 400;
  line-height: 22px;
  color: var(--td-text-color-secondary);
}
.field {
  margin-top: 50px;
}
.label {
  margin-bottom: 8px;
  font-size: 14px;
  font-weight: 400;
  line-height: 22px;
  color: var(--td-text-color-primary);
}
.action {
  display: inline-flex;
  margin-top: 50px;
}
.action button {
  margin-right: 10px;
}
</style>
