<!--
 * @Description: main-page
-->
<template>
  <t-config-provider :global-config="globalConfig">
    <router-view :class="[mode]" />
    <LockScreen />
  </t-config-provider>
</template>
<script setup lang="ts">
import { APP_TITLE } from '../build/constant';
import { useSettingStore } from '@/store';
import LockScreen from '@/components/basic/lock-screen/index.vue';
import { globalConfig } from '@/config/global';
const route = useRoute();
const store = useSettingStore(),
  mode = computed(() => {
    return store.displayMode;
  });

// 监听路由的变化，设置网站标题
watch(
  () => route.path,
  () => {
    nextTick(() => {
      const pageTitle = route.meta.title || '';
      document.title = `${pageTitle} - ${APP_TITLE}` || `${APP_TITLE}`;
    });
  }
);
</script>
<style lang="less" scoped>
#nprogress .bar {
  background: var(--td-brand-color) !important;
}
</style>
