<template>
  <div class="editorWrapper">
    <div class="info">
      <t-divider content-position="left">markdown编辑器</t-divider>
      <span style="text-align: left">
        markdown编辑器常用于技术型文本编辑场景。
      </span>
    </div>
    <div>
      <div class="grid-content bg-purple-dark">
        <t-card class="box-card">
          <div style="text-align: left">
            <span>Toast UI Editor markdown编辑器</span>
            <t-divider></t-divider>
          </div>
          <Editor :model-value="content"></Editor>
        </t-card>
      </div>
    </div>
  </div>
</template>
<script lang="ts">
import { defineComponent, reactive, ref, toRefs } from 'vue';

import Editor from '@/components/basic/markdown-editor/index.vue';

export default defineComponent({
  components: {
    Editor
  },
  setup() {
    const value = ref('');
    const state = reactive({
      content: '# wesome Editor! Toast UI'
    });
    return {
      value,
      ...toRefs(state)
    };
  }
});
</script>
<style lang="less" scoped>
.editorWrapper {
  margin-top: 20px;
  .info {
    padding-left: 20px;
    margin-bottom: 20px;
    font-size: 12px;
    text-align: left;
  }
  .section {
    display: flex;
    flex-direction: row;
    justify-content: flex-start;
    align-items: center;
  }
}
</style>
