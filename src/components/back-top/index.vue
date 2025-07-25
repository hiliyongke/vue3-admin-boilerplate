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
<script setup lang="ts">
import { onMounted, ref, onBeforeUnmount, useSlots, computed } from 'vue';

/**
 * 组件属性接口
 */
interface Props {
  /** 滚动目标元素选择器 */
  target?: string;
  /** 显示回到顶部按钮的滚动高度 */
  visibilityHeight?: number;
  /** 距离右边的距离 */
  right?: number;
  /** 距离底部的距离 */
  bottom?: number;
  /** 自定义样式类名 */
  customClass?: string;
}

/**
 * 定义组件属性
 */
const props = withDefaults(defineProps<Props>(), {
  target: 'body',
  visibilityHeight: 240,
  right: 20,
  bottom: 40,
  customClass: ''
});

/**
 * 是否显示回到顶部按钮
 */
const backtopShow = ref<boolean>(false);

/**
 * 当前滚动位置
 */
const scrollTop = ref<number>(0);

/**
 * 滚动动画定时器
 */
const timer = ref<NodeJS.Timeout | null>(null);

/**
 * 插槽
 */
const slot = useSlots();

/**
 * 计算右边距离样式
 */
const right = computed<string>(() => `${props.right}px`);

/**
 * 计算底部距离样式
 */
const bottom = computed<string>(() => `${props.bottom}px`);

/**
 * 回到顶部功能
 */
const backtop = (): void => {
  if (timer.value) {
    clearInterval(timer.value);
  }

  timer.value = setInterval(() => {
    scrollTop.value -= 30;

    if (props.target === 'body') {
      if (typeof document !== 'undefined') {
        document.body.scrollTop = scrollTop.value;
        document.documentElement.scrollTop = scrollTop.value;
      }
    } else {
      if (typeof document !== 'undefined') {
        const targetElement = document.querySelector(props.target) as HTMLElement;
        if (targetElement) {
          targetElement.scrollTop = scrollTop.value;
        }
      }
    }

    if (scrollTop.value <= 0) {
      scrollTop.value = 0;
      if (timer.value) {
        clearInterval(timer.value);
        timer.value = null;
      }
    }
  }, 16); // 约60fps
};

/**
 * 处理滚动事件
 */
const handleScroll = (): void => {
  if (typeof document !== 'undefined') {
    if (props.target === 'body') {
      scrollTop.value = document.body.scrollTop || document.documentElement.scrollTop;
    } else {
      const targetElement = document.querySelector(props.target) as HTMLElement;
      if (targetElement) {
        scrollTop.value = targetElement.scrollTop;
      }
    }
  }

  backtopShow.value = scrollTop.value >= props.visibilityHeight;
};

/**
 * 组件挂载时添加滚动监听
 */
onMounted(() => {
  if (props.target === 'body') {
    if (typeof window !== 'undefined') {
      window.addEventListener('scroll', handleScroll, { passive: true });
    }
  } else {
    if (typeof document !== 'undefined') {
      const targetElement = document.querySelector(props.target);
      if (targetElement) {
        targetElement.addEventListener('scroll', handleScroll, { passive: true });
      }
    }
  }
});

/**
 * 组件卸载时移除滚动监听和清理定时器
 */
onBeforeUnmount(() => {
  // 清理定时器
  if (timer.value) {
    clearInterval(timer.value);
    timer.value = null;
  }

  // 移除事件监听
  if (props.target === 'body') {
    if (typeof window !== 'undefined') {
      window.removeEventListener('scroll', handleScroll);
    }
  } else {
    if (typeof document !== 'undefined') {
      const targetElement = document.querySelector(props.target);
      if (targetElement) {
        targetElement.removeEventListener('scroll', handleScroll);
      }
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
