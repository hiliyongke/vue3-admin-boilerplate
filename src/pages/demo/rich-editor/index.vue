<template>
  <div class="editorWrapper">
    <div class="info">
      <t-divider content-position="left">富文本编辑器</t-divider>
      <span style="text-align: left">富文本编辑器编辑场景。</span>
    </div>
    <div>
      <div class="grid-content bg-purple-dark">
        <t-card class="box-card">
          <div style="text-align: left">
            <span>富文本编辑器</span>
            <t-divider></t-divider>
          </div>
          <Editor
            :model-value="editorValue"
            @update:model-value="handleUpdateValue"
          ></Editor>
        </t-card>
      </div>
    </div>
  </div>
</template>
<script lang="ts">
import { defineComponent, ref } from 'vue';
import Editor from '@/components/basic/rich-editor/index.vue';

export default defineComponent({
  components: {
    Editor
  },
  setup() {
    const editorValue = ref('默认数据'); // 富文本引用
    const richHtml = ref(); // 富文本内容；

    // setTimeout(() => {
    //   // 3秒后设置数据为'3秒后的数据'
    //   editorValue.value = '3秒后的数据';
    // }, 3000);

    /**
     * @description  获取接收最新文本
     */
    const handleUpdateValue = (val: any) => {
      console.log(val);
      richHtml.value = val;
    };
    return {
      handleUpdateValue,
      editorValue
    };
  }
});
</script>
<style lang="less" scoped>
.editorWrapper {
  margin-top: 20px;
  :deep(.w-e-text-container) {
    text-align: left;
  }
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
