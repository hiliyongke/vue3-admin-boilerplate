<template>
  <transition name="fade">
    <div
      v-if="backtopShow"
      :class="['backtop-box', customClass]"
      @click="backtop"
    >
      <slot v-if="slot['default']"></slot>
      <div
        v-else
        class="backtop-default-box"
      >
        <span class="default-backtop-icon">
          <ArrowUpIcon size="25px" />
        </span>
      </div>
    </div>
  </transition>
</template>
<script setup>
import { onMounted, ref, onBeforeUnmount, useSlots } from 'vue';
const props = defineProps({
  target: {
    type: String,
    default: 'body'
  },
  visibilityHeight: {
    type: Number,
    default: 240
  },
  right: {
    type: Number,
    default: 20
  },
  bottom: {
    type: Number,
    default: 40
  },
  customClass: String
});
const backtopShow = ref(false);
const scrollTop = ref(0);
const timer = ref(null);
const slot = useSlots();
const right = ref(props.right + 'px');
const bottom = ref(props.bottom + 'px');
const backtop = () => {
  clearInterval(timer.value);
  timer.value = setInterval(() => {
    scrollTop.value -= 30;
    if (props.target == 'body') {
      if (typeof document !== 'undefined') {
        document.body.scrollTop =
          scrollTop.value =
          document.documentElement.scrollTop =
            scrollTop.value;
      }
    } else {
      if (typeof document !== 'undefined') {
        document.querySelector(props.target).scrollTop = scrollTop.value;
      }
    }
    if (scrollTop.value <= 0) {
      scrollTop.value = 0;
      clearInterval(timer.value);
    }
  });
};
const handleScroll = () => {
  if (typeof document !== 'undefined') {
    scrollTop.value =
      props.target == 'body'
        ? document.body.scrollTop || document.documentElement.scrollTop
        : document.querySelector(props.target).scrollTop;
  }
  if (scrollTop.value >= props.visibilityHeight) {
    backtopShow.value = true;
  } else {
    backtopShow.value = false;
  }
};
onMounted(() => {
  if (props.target == 'body') {
    if (typeof window !== 'undefined') {
      window.addEventListener('scroll', handleScroll, false);
    }
  } else {
    if (typeof document !== 'undefined') {
      document
        .querySelector(props.target)
        .addEventListener('scroll', handleScroll, false);
    }
  }
});
onBeforeUnmount(() => {
  if (props.target == 'body') {
    if (typeof window !== 'undefined') {
      window.removeEventListener('scroll', handleScroll);
    }
  } else {
    if (typeof document !== 'undefined') {
      document
        .querySelector(props.target)
        .removeEventListener('scroll', handleScroll);
    }
  }
});
</script>

<style lang="less" scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s ease;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
.backtop-box,
.backtop-default-box {
  position: fixed;
  right: v-bind(right);
  bottom: v-bind(bottom);
  z-index: 9999999;
  width: auto;
  overflow: auto;
  overflow: hidden;
  cursor: pointer;
  .default-backtop-icon {
    display: inline-block;
    width: 40px;
    height: 40px;
    line-height: 40px;
    color: white;
    text-align: center;
    background: #f35e31;
    border-radius: 20px;
  }
}
</style>
