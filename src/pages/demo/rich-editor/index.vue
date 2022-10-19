<template>
  <div>
    <t-divider content-position="left">富文本编辑器</t-divider>
    <Editor
      :model-value="editorValue"
      @update:model-value="handleUpdateValue"
    ></Editor>
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
<style lang="less" scoped></style>
