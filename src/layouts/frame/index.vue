<template>
  <div v-if="showFrame">
    <template v-for="frame in getFramePages" :key="frame.path">
      <frame-content
        v-if="frame.name && hasRenderFrame(frame.name)"
        v-show="showIframe(frame)"
        :frame-src="frame.meta.frameSrc"
      />
    </template>
  </div>
</template>
<script lang="ts">
export default {
  name: 'FrameLayout',
};
</script>

<script setup lang="ts">
import { unref, computed } from 'vue';
import FrameContent from '../components/frame-content.vue';
import { useFrameKeepAlive } from './use-frame-keepalive';

/**
 * 使用框架保活功能
 */
const { getFramePages, hasRenderFrame, showIframe } = useFrameKeepAlive();

/**
 * 是否显示框架
 */
const showFrame = computed<boolean>(() => unref(getFramePages).length > 0);
</script>
