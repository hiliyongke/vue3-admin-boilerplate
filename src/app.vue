<!--
 * @Description: main-page
-->
<template>
  <t-config-provider :global-config="config">
    <router-view :class="[mode]" />
    <LockScreen />
  </t-config-provider>
</template>
<script setup lang="ts">
import { APP_TITLE } from '../build/constant';
import LockScreen from '@/components/basic/lock-screen/index.vue';
import { globalConfigEn, globalConfigZh } from '@/config/global';
import { useSettingStore } from '@/store';
import enUs from 'tdesign-vue-next/es/locale/en_US';
import zhCn from 'tdesign-vue-next/es/locale/zh_CN';
const route = useRoute();
const settingStore = useSettingStore(),
  mode = computed(() => {
    return settingStore.displayMode;
  });

const config = ref({});
// 监听语言变化
watch(
  () => settingStore.language,
  () => {
    config.value = Object.assign(
      settingStore.language === 'zh-CN' ? zhCn : enUs,
      settingStore.language === 'zh-CN' ? globalConfigZh : globalConfigEn
    );
  }
);
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
