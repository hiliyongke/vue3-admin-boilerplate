<template>
  <div class="result-success">
    <t-icon
      class="result-success-icon"
      name="check-circle"
    />
    <div class="result-success-title">项目已创建成功</div>
    <div class="result-success-describe">可以联系负责人分发应用</div>
    <div class="result-success-actions">
      <t-button @click="handleGoHome">返回首页</t-button>
      <t-button
        theme="default"
        @click="handleViewProgress"
      >
        查看进度
      </t-button>
    </div>
  </div>
</template>

<script lang="ts">
export default {
  name: 'ResultSuccess'
};
</script>

<script setup lang="ts">
import { useRouter } from 'vue-router';

/**
 * 路由实例
 */
const router = useRouter();

/**
 * 返回首页
 */
const handleGoHome = (): void => {
  router.push('/form/base');
};

/**
 * 查看进度
 */
const handleViewProgress = (): void => {
  router.push('/detail/advanced');
};
</script>
<style lang="less" scoped>
.result-success {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 75vh;
  &-icon {
    font-size: 64px;
    color: var(--td-success-color);
  }
  &-title {
    margin-top: 16px;
    font-size: 20px;
    font-weight: 500;
    line-height: 22px;
    color: var(--td-text-color-primary);
    text-align: center;
  }
  &-describe {
    margin: 8px 0 32px;
    font-size: 14px;
    line-height: 22px;
    color: var(--td-text-color-primary);
  }
}
</style>
