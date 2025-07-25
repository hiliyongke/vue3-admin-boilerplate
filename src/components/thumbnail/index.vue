<template>
  <img
    :class="className"
    :src="url"
  />
</template>
<script setup lang="ts">
import { computed } from 'vue';

/**
 * 缩略图类型
 */
type ThumbnailType = 'circle' | 'layout';

/**
 * 组件属性接口
 */
interface Props {
  /** 图片URL */
  url?: string;
  /** 缩略图类型 */
  type?: ThumbnailType;
}

/**
 * 定义组件属性
 */
const props = withDefaults(defineProps<Props>(), {
  url: '',
  type: 'layout'
});

/**
 * 计算样式类名
 */
const className = computed<(string | Record<string, boolean>)[]>(() => {
  const { type } = props;
  return [
    'thumbnail-container',
    {
      'thumbnail-circle': type === 'circle',
      'thumbnail-layout': type === 'layout'
    }
  ];
});
</script>
<style lang="less" scoped>
@import url('@/style/index.less');
.thumbnail {
  &-container {
    display: inline-block;
  }
  &-circle {
    border-radius: var(--td-border-radius-50);
  }
  &-layout {
    width: 88px;
    height: 48px;
  }
}
</style>
