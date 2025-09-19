<template>
  <div class="tdesign-wrapper">
    <router-view />
  </div>
</template>

<script lang="ts">
export default {
  name: 'BlankLayout',
};
</script>

<script setup lang="ts">
// 空白布局组件，仅提供基础的路由视图容器
</script>

<style lang="less" scoped>
.tdesign-wrapper {
  display: flex;
  height: 100vh;
  flex-direction: column;
}
</style>
