<template>
  <div :class="prefix + '-footer'">
    Copyright @ 2021-{{ new Date().getFullYear() }} {{ COMPANY_NAME }}. All
    Rights Reserved
  </div>
</template>

<script setup lang="ts">
import { prefix } from '@/config/global';
import { COMPANY_NAME } from '@/constants/app';
</script>

<style lang="less" scoped>
.@{starter-prefix}-footer {
  line-height: 20px;
  color: var(--td-text-color-placeholder);
  text-align: center;
}
</style>
