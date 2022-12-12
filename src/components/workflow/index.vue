<template>
  <div>
    <div class="container">
      <div style="position: absolute; right: 40px; z-index: 100">
        <button
          style="
            width: 50px;
            height: 50px;
            font-size: 30px;
            background-color: grey;
            border-radius: 25px;
          "
          @click="changeScale(+step)"
        >
          +
        </button>
        <button
          style="
            width: 50px;

            height: 50px;
            font-size: 30px;
            background-color: grey;
            border-radius: 25px;
          "
          @click="changeScale(-step)"
        >
          -
        </button>
      </div>
      <div :style="`transform: scale(${scaleVal / 100})`">
        <div class="node-wrap">
          <div class="node-wrap-box">
            <div>
              <div class="title">{{ modelValue && modelValue.name }}</div>
              <div class="content">所有人 ></div>
            </div>
          </div>
          <add-node-btn
            :node="modelValue"
            :add-node="addNode"
          />
        </div>

        <node-main
          v-if="modelValue && modelValue.childNode"
          :node="modelValue.childNode"
          :add-node="addNode"
          :delete-node="deleteNode"
        />

        <div class="end-node">
          <div class="end-node-circle"></div>
          <div class="end-node-text">流程结束</div>
        </div>

        <div class="submit">
          <t-button @click="preview">预览</t-button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import addNodeBtn from './add-node-btn.vue';
import nodeMain from './node-main.vue';
import './index.less';

const getRandom = () => {
  return Math.floor(
    (Math.random() + Math.floor(Math.random() * 9 + 1)) * Math.pow(10, 9)
  );
};
const props = defineProps({
  modelValue: {
    type: Object,
    default: () => {}
  }
});

const emit = defineEmits(['input']);

const scaleVal = ref(100); // 流程图缩放比例 100%
const step = ref('5');
const changeScale = val => {
  let v = scaleVal.value + val;
  if (v > 0 && v <= 200) {
    // 缩放介于0%~200%
    scaleVal.value = v;
  }
};
const preview = () => {
  validator(props.modelValue);
};
const addNode = option => {
  getNode(props.modelValue, option.nodeId, node => {
    /* 新增分支 */
    if (option.type === 'branch') {
      const nodeId = getRandom();
      const conditionNodes = [];
      for (let i = 0; i < 2; i++) {
        conditionNodes.push({
          name: `条件${i + 1}`,
          type: 'condition',
          prevId: nodeId,
          nodeId: getRandom()
        });
      }
      node.childNode = {
        type: option.type,
        prevId: node.nodeId,
        nodeId,
        conditionNodes
      };
      emit('input', JSON.parse(JSON.stringify(props.modelValue)));
    } else {
      /* 新增节点 */
      const nodeObj = {
        type: option.type,
        name: option.type === 'approver' ? '审批人' : '抄送人',
        prevId: node.nodeId,
        nodeId: getRandom()
      };
      if (node.childNode) {
        nodeObj.childNode = Object.assign({}, node.childNode);
      }
      node.childNode = nodeObj;
      emit('input', JSON.parse(JSON.stringify(props.modelValue)));
    }
  });
};
const deleteNode = nodeId => {
  del(props.modelValue, nodeId);
  emit('input', JSON.parse(JSON.stringify(props.modelValue)));
};
/* 根据 nodeId 查找对应的节点并执行回调 */
const getNode = (data, nodeId, call) => {
  if (data.type === 'branch') {
    if (data.nodeId === nodeId) {
      call(data);
    } else {
      data.childNode && getNode(data.childNode, nodeId, call);
    }
    data.conditionNodes.map(d => {
      if (d.nodeId === nodeId) {
        call(d);
      } else {
        d.childNode && getNode(d.childNode, nodeId, call);
      }
    });
  } else {
    if (data.nodeId === nodeId) {
      call(data);
    } else {
      data.childNode && getNode(data.childNode, nodeId, call);
    }
  }
};
const del = (data, nodeId) => {
  if (data.childNode) {
    if (data.childNode.conditionNodes) {
      for (let i in data.childNode.conditionNodes) {
        del(data.childNode.conditionNodes[i], nodeId);
      }
    }
    if (data.childNode.nodeId === nodeId) {
      var copy = data.childNode.childNode || null;
      delete data.childNode;
      copy && (data.childNode = copy);
    } else {
      del(data.childNode, nodeId);
    }
  }
};
const validator = data => {
  if (data.childNode) {
    if (data.childNode.conditionNodes) {
      for (let i in data.childNode.conditionNodes) {
        console.log(data.childNode.conditionNodes[i].name);
        validator(data.childNode.conditionNodes[i]);
      }
    }
    validator(data.childNode);
  }
};
</script>
