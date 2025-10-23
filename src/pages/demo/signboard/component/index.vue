<template>
  <div class="board-column">
    <div class="board-column-header">
      {{ headerText }}
    </div>
    <div :id="headerText" class="board-column-content">
      <div v-for="(item, index) in list" :key="index" class="board-item">
        {{ item.name }}
      </div>
    </div>
  </div>
</template>

<script lang="ts">
export default {
  name: 'SignboardComponent',
};
</script>

<script setup lang="ts">
import { onMounted, nextTick } from 'vue';
import SortableJsExample from 'sortablejs';

/**
 * 任务项接口
 */
interface MissionItem {
  /** 任务名称 */
  name: string;
  /** 任务ID */
  id: number;
}

/**
 * 组件属性接口
 */
interface Props {
  /** 标题文本 */
  headerText?: string;
  /** 任务列表 */
  list?: MissionItem[];
}

/**
 * 组件属性
 */
const props = withDefaults(defineProps<Props>(), {
  headerText: 'Header',
  list: () => [],
});

/**
 * 初始化拖拽功能
 */
const rowDrop = (): void => {
  const element = document.querySelector(`#${props.headerText}`);
  if (element) {
    new SortableJsExample(element as HTMLElement, {
      group: {
        name: 'group',
        put: true,
      },
    });
  }
};

/**
 * 组件挂载后初始化拖拽
 */
onMounted(() => {
  console.log('看板任务列表:', props.list);
  nextTick(() => {
    rowDrop();
  });
});
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
