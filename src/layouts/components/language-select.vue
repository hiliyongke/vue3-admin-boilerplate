<template>
  <div>
    <t-dropdown :options="langOptions" trigger="click" @click="handleSetLanguage">
      <t-button variant="text">
        {{ langOptions.find((x) => x.value === settingStore.language)?.content }}
      </t-button>
    </t-dropdown>
  </div>
</template>

<script setup lang="ts">
import { reactive, toRefs } from 'vue';
import { useI18n } from 'vue-i18n';
import { useSettingStore } from '@/store';
import type { DropdownOption } from 'tdesign-vue-next';

const state = reactive({
  langOptions: [
    { content: '中文', value: 'zh-CN' },
    { content: 'English', value: 'en-US' },
  ],
});
const settingStore = useSettingStore();
const { locale } = useI18n();

const handleSetLanguage = (dropdownItem: DropdownOption, context: { e: MouseEvent }) => {
  if (dropdownItem && typeof dropdownItem.value === 'string') {
    settingStore.updateConfig({
      language: dropdownItem.value,
    });
    locale.value = dropdownItem.value;
  }
};

//导出属性到页面中使用
let { langOptions } = toRefs(state);
</script>

<style scoped lang="scss"></style>
