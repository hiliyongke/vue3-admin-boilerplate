<template>
  <workflow v-model="dataSource" />
</template>
<script setup lang="ts">
import workflow from '@/components/basic/workflow/index.vue';

const dataSource = ref({
  name: '发起人',
  type: 'start',
  nodeId: -1,
  childNode: {
    type: 'branch',
    prevId: -1,
    nodeId: 1962370654,
    conditionNodes: [
      {
        name: '条件1',
        type: 'condition',
        prevId: 1962370654,
        nodeId: 8724388758
      },
      {
        name: '条件2',
        type: 'condition',
        prevId: 1962370654,
        nodeId: 6955647539,
        childNode: {
          type: 'branch',
          prevId: 6955647539,
          nodeId: 6579100235,
          conditionNodes: [
            {
              name: '条件1',
              type: 'condition',
              prevId: 6579100235,
              nodeId: 7943358411
            },
            {
              name: '条件2',
              type: 'condition',
              prevId: 6579100235,
              nodeId: 9245914757
            }
          ],
          childNode: {
            type: 'approver',
            name: '审批人',
            prevId: 6579100235,
            nodeId: 2573062896
          }
        }
      }
    ]
  }
});
</script>
