<template>
  <div>
    <t-divider content-position="left">
      markdown编辑器常用于技术型文本编辑场景
    </t-divider>
    <Editor :model-value="content"></Editor>
  </div>
</template>
<script lang="ts">
import { defineComponent, reactive, ref, toRefs } from 'vue';

import Editor from '@/components/markdown-editor/index.vue';

export default defineComponent({
  components: {
    Editor
  },
  setup() {
    const value = ref('');
    const state = reactive({
      content: '# Toast UI'
    });
    return {
      value,
      ...toRefs(state)
    };
  }
});
</script>
<style lang="less" scoped></style>
