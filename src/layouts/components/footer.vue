<template>
  <div :class="prefix + '-footer'">
    Copyright @ 2022-{{ new Date().getFullYear() }} xxx. All Rights Reserved
  </div>
</template>

<script setup lang="ts">
import { prefix } from '@/config/global';
</script>

<style lang="less" scoped>
.@{starter-prefix}-footer {
  line-height: 20px;
  color: var(--td-text-color-placeholder);
  text-align: center;
}
</style>
