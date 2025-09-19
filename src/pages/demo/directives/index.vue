<template>
  <div v-watermark>
    指令测试集
    <hr />
    <sub>复制：</sub>
    <div style="display: flex">
      <t-input v-model="inputValue" />
      <t-button v-copy="inputValue">点我复制</t-button>
    </div>
    <hr />
    <sub>防抖：</sub>
    <div style="display: flex">
      <t-input v-debounce="[writeTxt, 'input', 1000]" />
    </div>
    <hr />
    <sub>节流：</sub>
    <div style="display: flex">
      <t-input v-throttle="[writeTxt, 'input', 500]" />
    </div>
    <hr />

    <sub>自动聚焦：</sub>
    <div style="display: flex">
      <input v-focus />
    </div>
    <hr />

    <sub>权限：当前用户角色是{{ userStore.userInfo.roles }}</sub>
    <br />
    新增权限需要刷新页面
    <div></div>
    <t-checkbox-group
      v-model="userStore.userInfo.roles"
      :options="['all', 'admin', 'test', 'dev']"
      @change="changeRole"
    />
    <div v-auth="'admin'">看看我是否有admin权限</div>
    <div v-auth="'test'">看看我是否有test权限</div>
    <div v-auth="'dev'">看看我是否有dev权限</div>
    <div v-auth="'all'">看看我是否有all权限</div>
    <hr />
    <sub>长按指令</sub>
    <br />
    <t-button v-longpress="setData">长按指令</t-button>
    <p>{{ data }}</p>
    <hr />
    <span class="text">拖拽指令</span>
    <div class="content-box">
      <div v-draggable class="drag-box">我可以拖拽哦~</div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useUserStore } from '@/store';

const inputValue = ref('我是复制的内容');
const writeTxt = () => {
  console.log('666');
};
const userStore = useUserStore();
const changeRole = (values) => {
  const user = userStore.userInfo;
  user.roles = values;
};
let data = ref('');
const setData = () => {
  data.value = '执行长按指令';
};
</script>

<style lang="less" scoped>
.content-box {
  position: relative;
  width: 500px;
  height: 400px;
  border: 1px red solid;
  .drag-box {
    position: absolute;
    top: 110px;
    z-index: 1000;
    width: 100px;
    height: 100px;
    color: #b2bec3;
    background: #dfe6e9;
    border-radius: 50%;
  }
}
</style>
