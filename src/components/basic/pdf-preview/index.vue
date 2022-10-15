<template>
  <div class="pdf-preview">
    <div class="page-tool">
      <div
        class="page-tool-item"
        @click="lastPage"
      >
        上一页
      </div>
      <div
        class="page-tool-item"
        @click="nextPage"
      >
        下一页
      </div>
      <div class="page-tool-item">{{ state.pageNum }}/{{ state.numPages }}</div>
      <div
        class="page-tool-item"
        @click="pageZoomOut"
      >
        放大
      </div>
      <div
        class="page-tool-item"
        @click="pageZoomIn"
      >
        缩小
      </div>
    </div>
    <div class="pdf-wrap">
      <vue-pdf-embed
        :source="state.source"
        :style="scale"
        class="vue-pdf-embed"
        :page="state.pageNum"
      />
    </div>
  </div>
</template>
<script setup lang="ts" name="PdfPreview">
import { reactive, onMounted, computed } from 'vue';
import VuePdfEmbed from 'vue-pdf-embed';
import { createLoadingTask } from 'vue3-pdfjs/esm'; // 获得总页数

const props = defineProps({
  pdfUrl: {
    type: String,
    required: true
  }
});
const state = reactive({
  source: props.pdfUrl,
  pageNum: 1,
  scale: 1, // 缩放比例
  numPages: 0 // 总页数
});

onMounted(() => {
  const loadingTask = createLoadingTask(state.source);
  loadingTask.promise.then((pdf: { numPages: number }) => {
    state.numPages = pdf.numPages;
  });
});

const scale = computed(() => `transform:scale(${state.scale})`);
function lastPage() {
  if (state.pageNum > 1) {
    state.pageNum -= 1;
  }
}
function nextPage() {
  if (state.pageNum < state.numPages) {
    state.pageNum += 1;
  }
}
function pageZoomOut() {
  if (state.scale < 2) {
    state.scale += 0.1;
  }
}
function pageZoomIn() {
  if (state.scale > 1) {
    state.scale -= 0.1;
  }
}
</script>
<style lang="css" scoped>
.pdf-preview {
  height: 100vh;
  padding: 20px 0;
  background-color: #e9e9e9;
  box-sizing: border-box;
}
.pdf-wrap {
  overflow-y: auto;
}
.vue-pdf-embed {
  width: 100%;
  margin: 10px auto;
  text-align: center;
  border: 1px solid #e5e5e5;
  box-sizing: border-box;
}
.page-tool {
  position: fixed;
  top: 115px;
  right: 0;
  z-index: 100;
  display: flex;
  padding-right: 15px;
  padding-left: 15px;
  color: white;
  cursor: pointer;
  background: rgb(66, 66, 66);
  border-radius: 20px;
  align-items: center;
  justify-content: center;
}
.page-tool-item {
  padding: 8px 15px;
  padding-left: 10px;
  cursor: pointer;
}
</style>
