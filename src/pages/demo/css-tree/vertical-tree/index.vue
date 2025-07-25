<template>
  <div class="processDesign">
    <div
      v-for="(item, idx) in nodeList"
      :key="idx"
      class="process"
    >
      <div
        v-if="item.type == 'root'"
        class="rootNode"
      >
        <div>根节点</div>
      </div>
      <NodePort
        v-if="item.children"
        :node-list="item.children"
      />
    </div>
  </div>
</template>

<script lang="ts">
export default {
  name: 'VerticalTreeDemo'
};
</script>

<script setup lang="ts">
import NodePort from './node.vue';

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
 * 节点列表数据
 */
const nodeList: TreeNode[] = [
  {
    label: '模板名称',
    id: 1,
    type: 'root',
    children: [
      {
        label: '子节点1',
        id: 2,
        type: 'card',
        children: [
          {
            label: '子节点1-1',
            id: 4,
            type: 'btn'
          },
          {
            label: '子节点1-2',
            id: 44,
            type: 'btn',
            children: [
              {
                label: '叶子节点1-2-1',
                id: 7,
                type: 'btn'
              }
            ]
          }
        ]
      },
      {
        label: '子节点3',
        id: 8,
        type: 'card',
        children: [
          {
            label: '子节点3-1',
            id: 12,
            type: 'btn',
            children: [
              {
                label: '叶子节点1',
                id: 108,
                type: 'btn'
              }
            ]
          },
          {
            label: '子节点3-2',
            id: 13,
            type: 'btn',
            children: [
              {
                label: '叶子节点2',
                id: 132,
                type: 'btn'
              }
            ]
          }
        ]
      }
    ]
  }
];
</script>
<style lang="less" scoped>
.processDesign {
  .process {
    display: inline-block;
    width: 100%;
    text-align: center;
  }
  .childNodeItem {
    width: 140px;
    border: 1px solid #ef1a0b;
  }
  .rootNode {
    width: 140px;
    height: 100px;
    margin: 0 auto;
    border: 1px solid #ef1a0b;
  }
  .nodewrap {
    display: inline-block;
  }
  .nodeLine {
    position: relative;
    width: 100%;
    height: 50px;
    &:after {
      position: absolute;
      top: 0;
      bottom: 0;
      left: 50%;
      width: 2px;
      margin-left: -1px;
      background: #ef1a0b;
      content: '';
    }
  }
  .nodeType {
    width: 140px;
  }
  .nodeLine2 {
    position: relative;
    width: 100%;
    &:after {
      position: absolute;
      right: 0;
      left: 0;
      height: 2px;
      background: #ef1a0b;
      content: '';
    }
  }
  .nodeport {
    flex: 1;
    display: flex;
    flex-direction: row;
    justify-content: space-around;
  }
  .nodeInfo {
    height: 100px;
    padding: 0 20px;
    border: 1px solid blue;
  }
  .nodeItem {
    display: flex;
    margin: 0 25px;
    flex-direction: column;
    align-items: center;
  }
  .nodeItems {
    &:first-child {
      position: relative;
      margin: 0;
      transform: translateX(-50%);
      &:after {
        position: absolute;
        top: 0;
        right: 0;
        width: 50%;
        height: 2px;
        background: #ef1a0b;
        content: '';
      }
    }
    &:last-child {
      position: relative;
      margin: 0;
      transform: translateX(50%);
      &:after {
        position: absolute;
        top: 0;
        left: 0;
        width: 50%;
        height: 2px;
        background: #ef1a0b;
        content: '';
      }
    }
  }
}
</style>
