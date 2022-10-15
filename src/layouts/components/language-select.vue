<template>
  <t-dropdown
    :options="langOptions"
    trigger="click"
    @click="handleSetlang"
  >
    <t-button variant="text">
      <InternetIcon />
    </t-button>
  </t-dropdown>
</template>

<script setup lang="ts">
import { useSettingStore } from '@/store';
const state = reactive({
  langOptions: [
    { content: '中文', value: 'zh-CN' },
    { content: 'English', value: 'en-US' }
  ]
});
const settingStore = useSettingStore();
const { locale } = useI18n();
const handleSetlang = data => {
  localStorage.setItem('language', data.value);
  settingStore.language = data.value;
  //auto refresh not reload the page
  locale.value = data.value;
  // location.reload()
};
//导出属性到页面中使用
let { langOptions } = toRefs(state);
</script>

<style scoped lang="scss"></style>
