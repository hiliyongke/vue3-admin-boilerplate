<template>
  <div class="node-wrap-box">
    <div>
      <div
        class="title"
        :class="[node.type]"
      >
        {{ node.name }}
        <span @click="deleteNode(node.nodeId)">删除</span>
      </div>
      <div
        class="content"
        @click="handle"
      >
        所有人 >
      </div>
    </div>

    <t-drawer
      v-model:visible="showDrawer"
      :header="node.name"
      :width="520"
      @close="
        () => {
          showDrawer = false;
        }
      "
    >
      <t-form
        ref="ruleForm"
        :model="ruleForm"
      >
        <t-form-item
          ref="name"
          :label="node.type === 'approver' ? '审批人' : '抄送人'"
          name="xx"
        >
          <t-radio-group>
            <t-radio-button :value="1">指定成员</t-radio-button>
            <t-radio-button
              v-if="node.type !== 'notifier'"
              :value="2"
            >
              指定岗位
            </t-radio-button>
            <t-radio-button :value="3">发起人主管</t-radio-button>
          </t-radio-group>
        </t-form-item>
        <t-form-item
          ref="name"
          label="审批方式"
          name="name"
        >
          <t-radio-group>
            <t-radio-button value="a">会审</t-radio-button>
            <t-radio-button value="b">或审</t-radio-button>
          </t-radio-group>
        </t-form-item>
      </t-form>
    </t-drawer>
  </div>
</template>
<script setup lang="ts">
defineProps({
  node: {
    type: Object,
    default: () => null
  },
  deleteNode: {
    type: Function,
    default: () => null
  }
});

const showDrawer = ref(false);
const ruleForm = ref({});
const handle = () => {
  showDrawer.value = true;
  ruleForm.value = {};
};
</script>
