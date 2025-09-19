<template>
  <div class="board">
    <signboard :key="1" :list="list1" class="kanban todo" header-text="Todo" />
    <signboard :key="2" :list="list2" class="kanban working" header-text="Working" />
    <signboard :key="3" :list="list3" class="kanban done" header-text="Done" />
  </div>
</template>

<script lang="ts">
export default {
  name: 'SignboardDemo',
};
</script>

<script setup lang="ts">
import { reactive } from 'vue';
import signboard from './component/index.vue';

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
 * 待办任务列表
 */
const list1 = reactive<MissionItem[]>([
  { name: '任务1', id: 1 },
  { name: '任务2', id: 2 },
  { name: '任务3', id: 3 },
  { name: '任务4', id: 4 },
]);

/**
 * 进行中任务列表
 */
const list2 = reactive<MissionItem[]>([
  { name: '任务5', id: 5 },
  { name: '任务6', id: 6 },
  { name: '任务7', id: 7 },
  { name: '任务8', id: 8 },
]);

/**
 * 已完成任务列表
 */
const list3 = reactive<MissionItem[]>([
  { name: '任务9', id: 9 },
  { name: '任务10', id: 10 },
  { name: '任务11', id: 11 },
  { name: '任务12', id: 12 },
]);
</script>

<style lang="less">
.board {
  display: flex;
  width: 1000px;
  margin-left: 20px;
  justify-content: space-around;
  flex-direction: row;
  align-items: flex-start;
}
.kanban {
  &.todo {
    .board-column-header {
      background: #4a9ff9;
    }
  }
  &.working {
    .board-column-header {
      background: #f9944a;
    }
  }
  &.done {
    .board-column-header {
      background: #2ac06d;
    }
  }
}
</style>
