<template>
  <div class="add-node-btn-box">
    <div class="add-node-btn">
      <t-popup>
        <template #content>
          <div class="popover-inner-content">
            <div @click="add('approver')">审批人</div>
            <div @click="add('notifier')">抄送人</div>
            <div @click="add('branch')">条件分支</div>
          </div>
        </template>
        <button class="btn"><span>+</span></button>
      </t-popup>
    </div>
  </div>
</template>
<script setup lang="ts">
const props = defineProps({
  node: {
    type: Object,
    default: () => {}
  },
  addNode: {
    type: Function,
    default: () => null
  }
});
const add = type => {
  props.addNode({ nodeId: props.node.nodeId, type });
};
</script>
