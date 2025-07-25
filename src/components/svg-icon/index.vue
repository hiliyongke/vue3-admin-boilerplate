<template>
  <svg
    :class="svgClass"
    aria-hidden="true"
  >
    <use
      class="svg-use"
      :href="symbolId"
    />
  </svg>
</template>

<script setup lang="ts">
import { computed } from 'vue';

/**
 * 组件属性接口
 */
interface Props {
  /** 图标前缀 */
  prefix?: string;
  /** 图标名称 */
  name: string;
  /** 自定义类名 */
  className?: string;
}

/**
 * 组件属性
 */
const props = withDefaults(defineProps<Props>(), {
  prefix: 'icon',
  className: ''
});

/**
 * 符号ID
 */
const symbolId = computed<string>(() => `#${props.name}`);

/**
 * SVG类名
 */
const svgClass = computed<string>(() => {
  if (props.className) {
    return `svg-icon ${props.className}`;
  }
  return 'svg-icon';
});
</script>
<style scope>
.svg-icon {
  overflow: hidden;
  vertical-align: -0.1em; /* 因icon大小被设置为和字体大小一致，而span等标签的下边缘会和字体的基线对齐，故需设置一个往下的偏移比例，来纠正视觉上的未对齐效果 */
  fill: currentColor; /* 定义元素的颜色，currentColor是一个变量，这个变量的值就表示当前元素的color值，如果当前元素未设置color值，则从父元素继承 */
}
</style>
