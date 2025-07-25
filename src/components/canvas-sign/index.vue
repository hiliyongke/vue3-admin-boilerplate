<template>
  <div>
    <canvas
      ref="canvas"
      :width="width > borderWidth * 2 ? width - borderWidth * 2 : width"
      :height="height"
      :style="borderStyle"
      @touchstart="touchstart"
      @mousedown="mousedown"
      @touchmove="touchmove"
      @mousemove="mousemove"
      @touchend="touchend"
      @mouseup="mouseup"
    ></canvas>
    <slot
      :save="save"
      :clear="clear"
    ></slot>
  </div>
</template>

<script lang="ts">
export default {
  name: 'CanvasSign'
};
</script>

<script setup lang="ts">
import { computed, onMounted, ref } from 'vue';

/**
 * 图片类型
 */
type ImageType = 'image/png' | 'image/jpeg' | 'image/webp';

/**
 * 保存回调函数类型
 */
type SaveCallback = (imgBase64?: string) => void;

/**
 * 组件属性接口
 */
interface Props {
  /** 画布宽度 */
  width?: number;
  /** 画布高度 */
  height?: number;
  /** 画线粗细 */
  lineWidth?: number;
  /** 画线颜色 */
  color?: string;
  /** 画布背景色 */
  backgroundColor?: string;
  /** 边框宽度 */
  borderWidth?: number;
  /** 边框颜色 */
  borderColor?: string;
  /** 图片类型 */
  imageType?: ImageType;
  /** 图片质量 */
  imageQual?: number;
}

/**
 * 组件属性
 */
const props = withDefaults(defineProps<Props>(), {
  width: () => document.documentElement.clientWidth || document.body.clientWidth,
  height: 200,
  lineWidth: 2,
  color: '#000',
  backgroundColor: 'rgba(255, 255, 255, 0)',
  borderWidth: 1,
  borderColor: '#333',
  imageType: 'image/png',
  imageQual: 0.92
});

/**
 * 画布元素引用
 */
const canvas = ref<HTMLCanvasElement>();

/**
 * 画布上下文引用
 */
const cxt = ref<CanvasRenderingContext2D>();

/**
 * 是否正在绘制
 */
const isDraw = ref<boolean>(false);

/**
 * 边框样式
 */
const borderStyle = computed<string>(() => {
  if (props.borderWidth > 0 && props.width > props.borderWidth * 2) {
    return `border: ${props.borderWidth}px solid ${props.borderColor}`;
  }
  return '';
});

/**
 * 生成图片
 * @param callback 保存回调函数
 */
const save = (callback: SaveCallback): void => {
  if (!canvas.value) {
    callback();
    return;
  }

  let imgBase64: string;
  if (props.imageType === 'image/jpeg') {
    imgBase64 = canvas.value.toDataURL('image/jpeg', props.imageQual);
  } else {
    imgBase64 = canvas.value.toDataURL(props.imageType);
  }
  callback(imgBase64);
};

/**
 * 清空画布
 */
const clear = (): void => {
  const { backgroundColor } = props;
  const { width, height } = canvas.value || {};
  if (cxt.value) {
    cxt.value.clearRect(0, 0, width || 0, height || 0);
    cxt.value.fillStyle = backgroundColor;
    cxt.value.fillRect(0, 0, width || 0, height || 0);
  }
};

/**
 * 属性改变后重置画布
 */
const reset = (): void => {
  const context = cxt.value;
  if (context) {
    const { width, height, borderWidth } = props;
    context.canvas.width = width > borderWidth * 2 ? width - borderWidth * 2 : width;
    context.canvas.height = height;
    setTimeout(init, 0);
  }
};

/**
 * 初始化画布
 */
const init = (): void => {
  const context = cxt.value;
  if (context) {
    const { backgroundColor, color, lineWidth } = props;
    const { width, height } = canvas.value || {};

    // canvas context相关设置
    context.fillStyle = backgroundColor;
    context.fillRect(0, 0, width || 0, height || 0);
    context.strokeStyle = color;
    context.lineWidth = lineWidth;
    context.lineCap = 'round'; // 线条末端添加圆形线帽，减少线条的生硬感
    context.lineJoin = 'round'; // 线条交汇时为原型边角

    // 利用阴影，消除锯齿
    context.shadowBlur = 1;
    context.shadowColor = color;
  }
};

/**
 * 移动端触摸按下
 * @param e 触摸事件
 */
const touchstart = (e: TouchEvent): void => {
  const { clientX, clientY, target } = e.changedTouches[0];
  if ((target as HTMLCanvasElement).tagName === 'CANVAS') {
    const { left, top } = canvas.value?.getBoundingClientRect() || { left: 0, top: 0 };
    cxt.value?.beginPath();
    cxt.value?.moveTo(clientX - left, clientY - top);
  }
};

/**
 * PC端鼠标按下
 * @param e 鼠标事件
 */
const mousedown = (e: MouseEvent): void => {
  if ((e.target as HTMLCanvasElement).tagName === 'CANVAS') {
    const { left, top } = canvas.value?.getBoundingClientRect() || { left: 0, top: 0 };
    isDraw.value = true;
    cxt.value?.beginPath();
    cxt.value?.moveTo(e.clientX - left, e.clientY - top);
  }
};

/**
 * 移动端触摸滑动
 * @param e 触摸事件
 */
const touchmove = (e: TouchEvent): void => {
  e.stopPropagation();
  e.preventDefault();
  if (!cxt.value) return;

  const { clientX, clientY, target } = e.changedTouches[0];
  if ((target as HTMLCanvasElement).tagName === 'CANVAS') {
    const { left, top } = canvas.value?.getBoundingClientRect() || { left: 0, top: 0 };
    cxt.value.lineTo(clientX - left, clientY - top);
    cxt.value.stroke();
  }
};

/**
 * PC端鼠标移动
 * @param e 鼠标事件
 */
const mousemove = (e: MouseEvent): void => {
  e.stopPropagation();
  e.preventDefault();

  if (isDraw.value && canvas.value && cxt.value) {
    if ((e.target as HTMLCanvasElement).tagName === 'CANVAS') {
      const { width, height } = canvas.value;
      const { left, top } = canvas.value.getBoundingClientRect() || { left: 0, top: 0 };

      cxt.value.lineTo(e.clientX - left, e.clientY - top);
      cxt.value.stroke();

      if (
        e.clientX - left <= props.borderWidth ||
        e.clientX - left >= (width || 0) - props.borderWidth * 2 ||
        e.clientY - top <= props.borderWidth ||
        e.clientY - top >= (height || 0) - props.borderWidth * 2
      ) {
        isDraw.value = false;
      }
    }
  }
};

/**
 * 移动端触摸抬起
 */
const touchend = (): void => {
  cxt.value?.closePath();
};

/**
 * PC端鼠标松开
 */
const mouseup = (): void => {
  isDraw.value = false;
  cxt.value?.closePath();
};

/**
 * 组件挂载后初始化
 */
onMounted(() => {
  // 获取canvas context
  const context = canvas.value?.getContext('2d');
  if (context) {
    cxt.value = context;
    init();
  }
});

/**
 * 暴露给父组件的方法
 */
defineExpose({
  save,
  clear,
  reset
});
</script>
