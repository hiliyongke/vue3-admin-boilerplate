<template>
  <div class="col-box">
    <div
      v-if="index === 0"
      class="top-left-cover-line"
    ></div>
    <div
      v-if="index === 0"
      class="bottom-left-cover-line"
    ></div>
    <div class="condition-node">
      <div class="condition-node-box">
        <div class="auto-judge">
          <div class="title-wrapper">
            <span class="editable-title">
              <input
                v-model="node.name"
                type="text"
              />
            </span>
            <span class="priority-title">优先级{{ index + 1 }}</span>
            <span
              class="svg-icon close"
              @click="emit('delBranch', index)"
            >
              删除
            </span>
          </div>
          <div
            class="content-wrapper"
            @click="handle"
          >
            <div class="content">请设置条件</div>
          </div>
        </div>
        <add-node-btn
          :node="node"
          :add-node="addNode"
          :delete-node="deleteNode"
        />
      </div>
    </div>
    <NodeMain
      v-if="node && node.childNode"
      :node="node.childNode"
      :add-node="addNode"
      :delete-node="deleteNode"
    />
    <div
      v-if="index === parentLength - 1"
      class="top-right-cover-line"
    ></div>
    <div
      v-if="index === parentLength - 1"
      class="bottom-right-cover-line"
    ></div>
  </div>
</template>
<script setup lang="ts">
import AddNodeBtn from './add-node-btn.vue';
import NodeMain from './node-main.vue';

const props = defineProps({
  node: {
    type: Object,
    default: () => null
  },
  index: {
    type: Number
  },
  parentLength: {
    type: Number
  },
  addNode: {
    type: Function,
    default: () => null
  },
  deleteNode: {
    type: Function,
    default: () => null
  }
});
const emit = defineEmits(['delBranch']);
const handle = () => {
  console.log(props.node);
};
</script>
