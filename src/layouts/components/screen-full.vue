<template>
  <t-tooltip
    placement="bottom"
    :content="getTitle"
  >
    <t-button
      theme="default"
      shape="square"
      variant="text"
      @click="toggle"
    >
      <t-icon :name="isFullscreen ? 'fullscreen-exit' : 'fullscreen'" />
    </t-button>
  </t-tooltip>
</template>

<script setup lang="ts">
import { computed, unref } from 'vue';
import { useFullscreen } from '@vueuse/core';

const { toggle, isFullscreen } = useFullscreen();

const getTitle = computed(() => {
  return unref(isFullscreen) ? '退出全屏' : '全屏';
});
</script>
