<template>
  <router-view v-slot="{ Component }">
    <transition name="fade" mode="out-in">
      <keep-alive :include="aliveViews">
        <component :is="Component" />
      </keep-alive>
    </transition>
  </router-view>
  <frame-page />
</template>

<script setup lang="ts">
import { computed } from 'vue';
import type { ComputedRef } from 'vue';
import { useNavigationTabStore } from '@/features/navigation/tabs';
import FramePage from '@/layouts/frame/index.vue';

const tabStore = useNavigationTabStore();

const aliveViews = computed(() => tabStore.includeNames) as ComputedRef<string[]>;
</script>
<style lang="less" scoped>
.fade-leave-active,
.fade-enter-active {
  transition: opacity @anim-duration-slow @anim-time-fn-easing;
}
.fade-enter,
.fade-leave-to {
  opacity: 0;
}
</style>
