<template>
  <transition name="slide-up">
    <LockScreen v-if="isLock && isMounted && $route.name != LOGIN_NAME" />
  </transition>
</template>

<script setup lang="ts">
import { computed, ref, onMounted, onUnmounted } from 'vue';
import { useRoute } from 'vue-router';
import LockScreen from './lock-screen.vue';
import { useLockScreenStore } from '@/store';
const LOGIN_NAME = 'login';
const lockScreenStore = useLockScreenStore();
const route = useRoute();
const isLock = computed(() => lockScreenStore.isLock);
const lockTime = computed(() => lockScreenStore.lockTime);
const isMounted = ref(false);

let timer;

const timekeeping = () => {
  clearInterval(timer);
  if (route.name === LOGIN_NAME || isLock.value) return;
  // 设置不锁屏
  lockScreenStore.setLock(false);
  // 重置锁屏时间
  lockScreenStore.setLockTime();
  timer = setInterval(() => {
    // 锁屏倒计时递减
    lockScreenStore.setLockTime(lockTime.value - 1);
    if (lockTime.value <= 0) {
      // 设置锁屏
      lockScreenStore.setLock(true);
      return clearInterval(timer);
    }
  }, 1000);
};

onMounted(() => {
  document.addEventListener('mousedown', timekeeping);
  setTimeout(() => {
    isMounted.value = true;
  });
});

onUnmounted(() => document.removeEventListener('mousedown', timekeeping));
</script>

<style lang="less" scoped>
.slide-up-enter-active {
  animation: slide-up 0.5s;
}
.slide-up-leave-active {
  animation: slide-up 0.5s reverse;
}

@keyframes slide-up {
  0% {
    transform: translateY(-100%);
  }
  100% {
    transform: translateY(0);
  }
}
</style>
