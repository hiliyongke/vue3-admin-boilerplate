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

<script>
export default {
  name: 'NodePort',
  props: {
    // eslint-disable-next-line vue/require-prop-types
    nodeList: []
  }
};
</script>

<style lang="less" scoped>
@import './process.less';
</style>
