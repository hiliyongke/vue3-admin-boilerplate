<template>
  <splitpanes class="default-theme" horizontal :push-other-panes="false">
    <pane>
      <div class="item" style="background-color: #fe5308">1</div>
    </pane>
    <pane>
      <splitpanes :push-other-panes="false">
        <pane>
          <div class="item" style="background-color: #fefe34">2</div>
        </pane>
        <pane>
          <div class="item" style="background-color: #cfea2b">3</div>
        </pane>
        <pane>
          <div class="item" style="background-color: #66b032">4</div>
        </pane>
      </splitpanes>
    </pane>
    <pane>
      <div class="item" style="background-color: #0492ce">5</div>
    </pane>
  </splitpanes>
</template>

<script lang="ts">
export default {
  name: 'DragPanelDemo',
};
</script>

<script setup lang="ts">
import { Splitpanes, Pane } from 'splitpanes';
import 'splitpanes/dist/splitpanes.css';

// 拖拽面板演示页面
// 使用 splitpanes 组件实现可拖拽调整大小的面板布局
</script>

<style lang="less" scoped>
.item {
  display: flex;
  width: 100%;
  height: 100%;
  font-family: Helvetica, Arial, sans-serif;
  font-size: 5em;
  color: #333333;
  justify-content: center;
  align-items: center;
}
</style>
