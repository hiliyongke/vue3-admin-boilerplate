<template>
  <result
    title="404 Not Found"
    tip="抱歉，您访问的页面不存在"
    type="404"
  >
    <t-button @click="handleGoHome">返回首页</t-button>
  </result>
</template>

<script lang="ts">
export default {
  name: 'Result404'
};
</script>

<script setup lang="ts">
import { useRouter } from 'vue-router';
import Result from '@/components/result/index.vue';

/**
 * 路由实例
 */
const router = useRouter();

/**
 * 返回首页
 */
const handleGoHome = (): void => {
  router.push('/');
};
</script>
