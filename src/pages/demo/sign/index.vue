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
import { defineComponent, onMounted, ref } from 'vue';
import CanvasSign from '@/components/canvas-sign/index.vue';

const blankimg =
  'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAAC0lEQVQYV2NgAAIAAAUAAarVyFEAAAAASUVORK5CYII=';
export default defineComponent({
  components: { CanvasSign },
  setup() {
    const imgSrc = ref(blankimg);
    const canvasSign = ref<typeof CanvasSign>();
    const canvasSign2 = ref<typeof CanvasSign>();
    const width = ref<number>(
      document.documentElement.clientWidth || document.body.clientWidth
    );
    const lineWidth = ref<number>(10);

    // slot中save方法回调
    const saveCallback = (imgBase64?: string) => {
      imgSrc.value = imgBase64 || blankimg;
    };
    // 不使用slot的save方法
    const saveHandle = () => {
      canvasSign.value?.save((img?: string) => {
        imgSrc.value = img || blankimg;
      });
    };
    // 不使用slot的clear方法
    const clearHandle = () => {
      canvasSign.value?.clear(); // 清空图片
      imgSrc.value = blankimg; // 清空画布
    };
    // 使用slot的clear方法
    const clearWithSlotHandle = (clear: () => void) => {
      clear && clear(); // 清空画布
      imgSrc.value = blankimg; // 清空图片
    };

    onMounted(() => {
      window.onresize = () => {
        const w =
          document.documentElement.clientWidth || document.body.clientWidth;
        width.value = w;
        lineWidth.value = w / 100;
        // 组件参数改变后，通过reset方法使属性生效
        canvasSign.value?.reset();
        canvasSign2.value?.reset();
      };
    });

    return {
      width,
      lineWidth,
      canvasSign,
      canvasSign2,
      imgSrc,
      saveCallback,
      saveHandle,
      clearHandle,
      clearWithSlotHandle
    };
  }
});
</script>
