<template>
  <div v-if="node && node.nodeId && node.childNode && node.conditionNodes" class="branch-and-node-wrap">
    <div class="branch-wrap">
      <div class="branch-wrap-box">
        <div class="branch-box">
          <button class="add-branch" @click="addBranch(node)">添加条件</button>
          <col-box
            v-for="(branch, idx) in node.conditionNodes"
            :key="branch.nodeId"
            :index="idx"
            :node="branch"
            :add-node="addNode"
            :delete-node="deleteNode"
            :parent-length="node.conditionNodes.length"
            @del-branch="delBranch(node, $event)"
          />
        </div>
        <add-node-btn :node="node" :add-node="addNode" :delete-node="deleteNode" />
      </div>
    </div>
    <div v-if="node.childNode.type === 'branch'">
      <node-main :node="node.childNode" :add-node="addNode" :delete-node="deleteNode" />
    </div>
    <div v-else class="node-wrap">
      <node-wrap-box :node="node.childNode" :delete-node="deleteNode" />
      <add-node-btn :node="node.childNode" :add-node="addNode" :delete-node="deleteNode" />
      <node-main
        v-if="node.childNode.childNode"
        :node="node.childNode.childNode"
        :add-node="addNode"
        :delete-node="deleteNode"
      />
    </div>
  </div>
  <div v-else-if="node && node.nodeId" :class="[node.type === 'branch' ? 'branch-wrap' : 'node-wrap']">
    <div v-if="node.type === 'branch'" class="branch-wrap-box">
      <div class="branch-wrap-box">
        <div class="branch-box">
          <button class="add-branch" @click="addBranch(node)">添加条件</button>
          <col-box
            v-for="(branch, idx) in node.conditionNodes"
            :key="branch.nodeId"
            :index="idx"
            :node="branch"
            :parent-length="node.conditionNodes.length"
            :add-node="addNode"
            :delete-node="deleteNode"
            @del-branch="delBranch(node, $event)"
          />
        </div>

        <add-node-btn :node="node" :add-node="addNode" :delete-node="deleteNode" />
      </div>
    </div>
    <node-wrap-box v-else :node="node" :delete-node="deleteNode" />
    <add-node-btn v-if="node.type !== 'branch'" :node="node" :add-node="addNode" :delete-node="deleteNode" />
    <node-main v-if="node.childNode" :node="node.childNode" :add-node="addNode" :delete-node="deleteNode" />
  </div>
</template>
<script setup lang="ts">
import { defineProps } from 'vue';

import addNodeBtn from './add-node-btn.vue';
import colBox from './col-box.vue';
import nodeWrapBox from './node-wrap-box.vue';
const getRandom = () => {
  return Math.floor((Math.random() + Math.floor(Math.random() * 9 + 1)) * Math.pow(10, 9));
};

const props = defineProps({
  node: {
    type: Object,
    default: () => null,
  },
  addNode: {
    type: Function,
    default: () => null,
  },
  deleteNode: {
    type: Function,
    default: () => null,
  },
});

const addBranch = (childNode) => {
  childNode.conditionNodes.push({
    name: `条件${childNode.conditionNodes.length + 1}`,
    type: 'condition',
    prevId: childNode.nodeId,
    nodeId: getRandom(),
  });
};
const delBranch = (node, idx) => {
  if (node.conditionNodes.length <= 2) {
    props.deleteNode(node.nodeId);
  } else {
    node.conditionNodes.splice(idx, 1);
    /* 删除分支时将此分支下节点移动至其他分支  如开启此功能将以下注释打开 */
    if (node.conditionNodes[idx].childNode) {
      const copy = node.conditionNodes[idx].childNode || null;
      node.conditionNodes.splice(idx, 1);
      if (!node.conditionNodes[0].childNode && copy) {
        node.conditionNodes[0].childNode = copy;
      }
    }
  }
};
</script>
