<template>
  <div class="board-column">
    <div class="board-column-header">
      {{ headerText }}
    </div>
    <div
      :id="headerText"
      class="board-column-content"
    >
      <div
        v-for="(item, index) in list"
        :key="index"
        class="board-item"
      >
        {{ item.name }}
      </div>
    </div>
  </div>
</template>

<script setup>
import SortableJsExample from 'sortablejs';
const props = defineProps({
  headerText: {
    type: String,
    default: 'Header'
  },

  list: {
    type: Array,
    default() {
      return [];
    }
  }
});
//拖拽
onMounted(() => {
  console.log(props.list);
  nextTick(() => {
    rowDrop();
  });
});
const rowDrop = () => {
  new SortableJsExample(document.querySelector('#' + props.headerText), {
    group: {
      name: 'group',
      put: true
    }
  });
};
</script>
<style lang="less" scoped>
.board-column {
  height: auto;
  min-width: 300px;
  min-height: 100px;
  overflow: hidden;
  background: #f0f0f0;
  border-radius: 3px;
  .board-column-header {
    height: 50px;
    padding: 0 20px;
    overflow: hidden;
    line-height: 50px;
    color: #ffffff;
    text-align: center;
    background: #333333;
    border-radius: 3px 3px 0 0;
  }
  .board-column-content {
    display: flex;
    height: auto;
    min-height: 60px;
    overflow: hidden;
    border: 10px solid transparent;
    justify-content: flex-start;
    flex-direction: column;
    align-items: center;
    .board-item {
      width: 100%;
      height: 64px;
      padding: 5px 10px;
      margin: 5px 0;
      line-height: 54px;
      text-align: left;
      cursor: pointer;
      background-color: #ffffff;
      box-shadow: 0px 1px 3px 0 rgba(0, 0, 0, 0.2);
      box-sizing: border-box;
    }
  }
}
</style>
