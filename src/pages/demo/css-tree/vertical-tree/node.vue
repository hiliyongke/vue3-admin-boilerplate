<template>
  <div class="nodewrap">
    <div class="nodeLine"></div>
    <div
      v-if="nodeList && nodeList.length > 1"
      class="nodeLine2"
    ></div>
    <div class="nodeport">
      <div
        v-for="(node, idx) in nodeList"
        :key="idx"
        class="nodeItem"
        :class="nodeList.length > 1 ? 'nodeItems' : ''"
      >
        <div class="nodeLine"></div>
        <div class="nodeType">
          <div class="nodeInfo">
            <div class="">{{ node.type }}</div>
            <div class="">{{ node.label }}</div>
          </div>
        </div>
        <NodePort
          v-if="node.children"
          :node-list="node.children"
        />
      </div>
    </div>
  </div>
</template>

<script lang="ts">
export default {
  name: 'NodePort'
};
</script>

<script setup lang="ts">
/**
 * 树节点类型
 */
type NodeType = 'root' | 'card' | 'btn';

/**
 * 树节点接口
 */
interface TreeNode {
  /** 节点标签 */
  label: string;
  /** 节点ID */
  id: number;
  /** 节点类型 */
  type: NodeType;
  /** 子节点列表 */
  children?: TreeNode[];
}

/**
 * 组件属性接口
 */
interface Props {
  /** 节点列表 */
  nodeList?: TreeNode[];
}

/**
 * 组件属性
 */
withDefaults(defineProps<Props>(), {
  nodeList: () => []
});
</script>

<style lang="less" scoped>
@import './process.less';
</style>
