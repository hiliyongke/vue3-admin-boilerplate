<!--
 * @description 应用程序根组件
 * @author 优化版本
 *
 * 主要功能：
 * 1. 提供TDesign全局配置
 * 2. 渲染路由视图
 * 3. 集成锁屏功能
 * 4. 监听语言切换和路由变化
 * 5. 动态设置页面标题
-->
<template>
  <t-config-provider :global-config="globalConfig">
    <router-view :class="[displayMode]" />
    <LockScreen />
  </t-config-provider>
</template>

<script setup lang="ts">
import { type Ref, ref, computed, watch, nextTick } from 'vue';
import { useRoute } from 'vue-router';
import { APP_TITLE } from '@/constants/app';
import LockScreen from '@/components/lock-screen/index.vue';
import { globalConfigEn, globalConfigZh } from '@/config/global';
import { useSettingStore } from '@/store';
import enUs from 'tdesign-vue-next/es/locale/en_US';
import zhCn from 'tdesign-vue-next/es/locale/zh_CN';

/**
 * 路由实例
 */
const route = useRoute();

/**
 * 设置状态管理
 */
const settingStore = useSettingStore();

/**
 * 当前显示模式（深色/浅色）
 */
const displayMode = computed<string>(() => settingStore.displayMode);

/**
 * TDesign全局配置
 */
const globalConfig: Ref<Record<string, any>> = ref({});

/**
 * 监听语言变化，更新全局配置
 */
watch(
  () => settingStore.language,
  (newLanguage: string) => {
    const isZhCN = newLanguage === 'zh-CN';

    // 合并语言包和全局配置
    globalConfig.value = Object.assign(
      isZhCN ? zhCn : enUs,
      isZhCN ? globalConfigZh : globalConfigEn
    );
  },
  { immediate: true } // 立即执行一次
);

/**
 * 监听路由变化，动态设置页面标题
 */
watch(
  () => route.path,
  () => {
    nextTick(() => {
      const pageTitle = (route.meta?.title as string) || '';
      const fullTitle = pageTitle ? `${pageTitle} - ${APP_TITLE}` : APP_TITLE;
      document.title = fullTitle;
    });
  },
  { immediate: true } // 立即执行一次
);
</script>
<style lang="less" scoped>
#nprogress .bar {
  background: var(--td-brand-color) !important;
}
</style>
