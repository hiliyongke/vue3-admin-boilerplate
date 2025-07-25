<template>
  <div class="result-fail">
    <t-icon
      class="result-fail-icon"
      name="error-circle"
    />
    <div class="result-fail-title">项目创建失败</div>
    <div class="result-fail-describe">
      企业微信联系检查创建者权限，或返回修改
    </div>
    <div class="result-fail-actions">
      <t-button @click="handleGoBack">返回修改</t-button>
      <t-button
        theme="default"
        @click="handleGoHome"
      >
        返回首页
      </t-button>
    </div>
  </div>
</template>

<script lang="ts">
export default {
  name: 'ResultFail'
};
</script>

<script setup lang="ts">
import { useRouter } from 'vue-router';

/**
 * 路由实例
 */
const router = useRouter();

/**
 * 返回修改
 */
const handleGoBack = (): void => {
  router.push('/form/base');
};

/**
 * 返回首页
 */
const handleGoHome = (): void => {
  router.push('/dashboard/base');
};
</script>
<style lang="less" scoped>
.result-fail {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 75vh;
  &-icon {
    font-size: 64px;
    color: var(--td-error-color);
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
    color: var(--td-text-color-secondary);
  }
  &-actions {
    display: flex;
    gap: 16px;
  }
}
</style>
