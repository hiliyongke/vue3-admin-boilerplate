<template>
  <div v-if="showFrame">
    <template
      v-for="frame in getFramePages"
      :key="frame.path"
    >
      <frame-content
        v-if="hasRenderFrame(frame.name)"
        v-show="showIframe(frame)"
        :frame-src="frame.meta.frameSrc"
      />
    </template>
  </div>
</template>
<script lang="ts">
import { defineComponent, unref, computed } from 'vue';
import FrameContent from '../components/frame-content.vue';

import { useFrameKeepAlive } from './use-frame-keepalive';

export default defineComponent({
  name: 'FrameLayout',
  components: { FrameContent },
  setup() {
    const { getFramePages, hasRenderFrame, showIframe } = useFrameKeepAlive();

    const showFrame = computed(() => unref(getFramePages).length > 0);

    return { getFramePages, hasRenderFrame, showIframe, showFrame };
  }
});
</script>
