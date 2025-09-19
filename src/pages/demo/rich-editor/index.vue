<template>
  <div>
    <t-divider content-position="left">富文本编辑器</t-divider>
    <Editor :model-value="editorValue" @update:model-value="handleUpdateValue"></Editor>
  </div>
</template>
<script lang="ts">
export default {
  name: 'RichEditorDemo',
};
</script>

<script setup lang="ts">
import { ref } from 'vue';
import Editor from '@/components/rich-editor/index.vue';

/**
 * 编辑器内容
 */
const editorValue = ref<string>(
  '欢迎使用富文本编辑器！\n\n这是一个功能强大的富文本编辑器演示。您可以在这里编辑各种格式的文本内容。'
);

/**
 * 富文本 HTML 内容
 */
const richHtml = ref<string>('');

/**
 * 处理编辑器内容更新
 * @param val 新的编辑器内容
 */
const handleUpdateValue = (val: string): void => {
  console.log('富文本内容更新:', val);
  richHtml.value = val;
};
</script>
<style lang="less" scoped></style>
