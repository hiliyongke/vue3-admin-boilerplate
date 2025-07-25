<template>
  <div>
    <t-divider content-position="left">
      markdown编辑器常用于技术型文本编辑场景
    </t-divider>
    <Editor :model-value="content"></Editor>
  </div>
</template>
<script lang="ts">
export default {
  name: 'MarkdownEditorDemo'
};
</script>

<script setup lang="ts">
import { ref } from 'vue';
import Editor from '@/components/markdown-editor/index.vue';

/**
 * 编辑器内容
 */
const content = ref<string>('# Toast UI Markdown 编辑器\n\n这是一个功能强大的 Markdown 编辑器演示。\n\n## 功能特性\n\n- 实时预览\n- 语法高亮\n- 工具栏支持\n- 快捷键操作\n\n## 代码示例\n\n```javascript\nconst message = "Hello, Markdown!";\nconsole.log(message);\n```\n\n## 表格示例\n\n| 功能 | 描述 | 状态 |\n|------|------|------|\n| 编辑 | 文本编辑 | ✅ |\n| 预览 | 实时预览 | ✅ |\n| 导出 | 文件导出 | ✅ |');

/**
 * 输入值（备用）
 */
const value = ref<string>('');
</script>
<style lang="less" scoped></style>
