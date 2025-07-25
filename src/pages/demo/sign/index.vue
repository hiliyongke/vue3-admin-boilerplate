<template>
  <div>
    使用方法一
    <CanvasSign
      ref="canvasSign"
      image-type="image/png"
      :width="width"
      :line-width="lineWidth"
      :image-qual="0.01"
      background-color="#EEE"
    />
    <div>
      <t-button @click="saveHandle">save</t-button>
      <t-button @click="clearHandle">clear</t-button>
    </div>
    <hr />
    使用方法二
    <CanvasSign
      ref="canvasSign2"
      :height="400"
      :width="width"
      :line-width="lineWidth"
    >
      <template #default="{ save, clear }">
        <t-button @click="() => save(saveCallback)">save</t-button>
        <t-button @click="() => clearWithSlotHandle(clear)">clear</t-button>
      </template>
    </CanvasSign>
    <hr />
    生成图片展示
    <img
      :src="imgSrc"
      alt="生成的图片"
    />
  </div>
</template>
<script lang="ts">
export default {
  name: 'SignDemo'
};
</script>

<script setup lang="ts">
import { onMounted, ref } from 'vue';
import CanvasSign from '@/components/canvas-sign/index.vue';

/**
 * 空白图片 Base64
 */
const BLANK_IMAGE = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAAC0lEQVQYV2NgAAIAAAUAAarVyFEAAAAASUVORK5CYII=';

/**
 * 画布签名组件实例类型
 */
interface CanvasSignInstance {
  save: (callback: (img?: string) => void) => void;
  clear: () => void;
  reset: () => void;
}

/**
 * 生成的图片源
 */
const imgSrc = ref<string>(BLANK_IMAGE);

/**
 * 第一个画布签名组件引用
 */
const canvasSign = ref<CanvasSignInstance>();

/**
 * 第二个画布签名组件引用
 */
const canvasSign2 = ref<CanvasSignInstance>();

/**
 * 画布宽度
 */
const width = ref<number>(
  document.documentElement.clientWidth || document.body.clientWidth
);

/**
 * 线条宽度
 */
const lineWidth = ref<number>(10);

/**
 * Slot 中 save 方法回调
 * @param imgBase64 图片 Base64 字符串
 */
const saveCallback = (imgBase64?: string): void => {
  imgSrc.value = imgBase64 || BLANK_IMAGE;
};

/**
 * 不使用 slot 的 save 方法
 */
const saveHandle = (): void => {
  canvasSign.value?.save((img?: string) => {
    imgSrc.value = img || BLANK_IMAGE;
  });
};

/**
 * 不使用 slot 的 clear 方法
 */
const clearHandle = (): void => {
  canvasSign.value?.clear(); // 清空画布
  imgSrc.value = BLANK_IMAGE; // 清空图片
};

/**
 * 使用 slot 的 clear 方法
 * @param clear 清空函数
 */
const clearWithSlotHandle = (clear: () => void): void => {
  clear?.(); // 清空画布
  imgSrc.value = BLANK_IMAGE; // 清空图片
};

/**
 * 组件挂载后设置窗口大小变化监听
 */
onMounted(() => {
  window.onresize = (): void => {
    const w = document.documentElement.clientWidth || document.body.clientWidth;
    width.value = w;
    lineWidth.value = w / 100;

    // 组件参数改变后，通过 reset 方法使属性生效
    canvasSign.value?.reset();
    canvasSign2.value?.reset();
  };
});
</script>
