<template>
  <div :class="prefixCls" :style="getWrapStyle">
    <t-loading :loading="loading" size="large" :style="getWrapStyle">
      <iframe ref="frameRef" :src="frameSrc" :class="`${prefixCls}__main`" @load="hideLoading"></iframe>
    </t-loading>
  </div>
</template>
<script lang="ts">
export default {
  name: 'FrameContent',
};
</script>

<script setup lang="ts">
import { CSSProperties, watch, ref, unref, computed } from 'vue';
import debounce from 'lodash-es/debounce';
import { useWindowSizeFn } from '@/hooks/use-window-size';
import { prefix } from '@/config/global';
import { useSettingStore } from '@/store';

/**
 * 组件属性接口
 */
interface Props {
  /** 框架源地址 */
  frameSrc?: string;
}

/**
 * 组件属性
 */
const props = withDefaults(defineProps<Props>(), {
  frameSrc: '',
});

/**
 * 加载状态
 */
const loading = ref<boolean>(true);

/**
 * 高度引用
 */
const heightRef = ref<number>(window.innerHeight);

/**
 * 框架元素引用
 */
const frameRef = ref<HTMLIFrameElement>();

/**
 * 前缀类名
 */
const prefixCls = computed<string[]>(() => [`${prefix}-iframe-page`]);

/**
 * 设置存储
 */
const settingStore = useSettingStore();

/**
 * 包装样式
 */
const getWrapStyle = computed<CSSProperties>(() => ({
  height: `${unref(heightRef)}px`,
}));

/**
 * 计算样式
 */
const computedStyle = getComputedStyle(document.documentElement);
const sizeXxxl = computedStyle.getPropertyValue('--td-comp-size-xxxl');
const paddingTBXxl = computedStyle.getPropertyValue('--td-comp-paddingTB-xxl');

/**
 * 获取元素外部高度
 * @param dom 目标元素
 * @returns 外部高度
 */
function getOuterHeight(dom: Element | null): number {
  if (!dom) return 0;

  let height = dom.clientHeight;
  const computedStyle = window.getComputedStyle(dom);
  height += parseInt(computedStyle.marginTop, 10);
  height += parseInt(computedStyle.marginBottom, 10);
  height += parseInt(computedStyle.borderTopWidth, 10);
  height += parseInt(computedStyle.borderBottomWidth, 10);
  return height;
}

/**
 * 计算高度
 */
function calcHeight(): void {
  const iframe = unref(frameRef);
  if (!iframe) {
    return;
  }

  const { showFooter, isUseTabsRouter, showBreadcrumb } = settingStore;
  const headerHeight = parseFloat(sizeXxxl);
  const navDom = document.querySelector('.t-tabs__nav');
  const navHeight = isUseTabsRouter ? getOuterHeight(navDom) : 0;
  const breadcrumbDom = document.querySelector('.t-breadcrumb');
  const breadcrumbHeight = showBreadcrumb ? getOuterHeight(breadcrumbDom) : 0;
  const contentPadding = parseFloat(paddingTBXxl) * 2;
  const footerDom = document.querySelector('.t-layout__footer');
  const footerHeight = showFooter ? getOuterHeight(footerDom) : 0;

  const top = headerHeight + navHeight + breadcrumbHeight + contentPadding + footerHeight + 2;
  heightRef.value = window.innerHeight - top;
  const clientHeight = document.documentElement.clientHeight - top;
  iframe.style.height = `${clientHeight}px`;
}

/**
 * 隐藏加载状态
 */
function hideLoading(): void {
  loading.value = false;
  calcHeight();
}

useWindowSizeFn(calcHeight as any, { immediate: true });

watch(
  [() => settingStore.showFooter, () => settingStore.isUseTabsRouter, () => settingStore.showBreadcrumb],
  debounce(calcHeight, 250)
);
</script>
<style lang="less" scoped>
@prefix-cls: ~'@{starter-prefix}-iframe-page';

.@{prefix-cls} {
  &__mask {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
  }
  &__main {
    width: 100%;
    height: 100%;
    overflow: hidden;
    background-color: #ffffff;
    border: 0;
    box-sizing: border-box;
  }
}
</style>
