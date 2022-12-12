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
import { computed, defineComponent, onMounted, ref } from 'vue';

interface ICanvasSignProps {
  readonly width: number;
  readonly height: number;
  readonly lineWidth: number;
  readonly color: string;
  readonly backgroundColor: string;
  readonly borderWidth: number;
  readonly borderColor: string;
  readonly imageType: string;
  readonly imageQual: number;
}

export default defineComponent({
  name: 'CanvasSign',
  props: {
    // 画布宽
    width: {
      type: Number,
      default: document.documentElement.clientWidth || document.body.clientWidth
    },
    // 画布高
    height: {
      type: Number,
      default: 200
    },
    // 画线粗细
    lineWidth: {
      type: Number,
      default: 2
    },
    // 画线颜色
    color: {
      type: String,
      default: '#000'
    },
    // 画布背景色
    backgroundColor: {
      type: String,
      default: 'rgba(255, 255, 255, 0)'
    },
    // 边框宽度
    borderWidth: {
      type: Number,
      default: 1
    },
    // 边框颜色
    borderColor: {
      type: String,
      default: '#333'
    },
    // 图片类型，默认：image/png，可选：image/jpeg（注意修改backgroundColor），image/webp（Chrome支持），其他类型均为image/png
    imageType: {
      type: String,
      default: 'image/png',
      validator(value: string) {
        return ['image/png', 'image/jpeg', 'image/webp'].includes(value);
      }
    },
    // 图片质量，当imageType为image/jpeg时生效，默认值：0.92，可选0~1之间，超出范围使用默认0.92
    imageQual: {
      type: Number,
      default: 0.92,
      validator(value: number) {
        return value <= 1 && value >= 0;
      }
    }
  },
  setup(props: ICanvasSignProps) {
    const canvas = ref<HTMLCanvasElement>();
    const cxt = ref<CanvasRenderingContext2D>();
    const isDraw = ref(false);

    const borderStyle = computed(() => {
      if (props.borderWidth > 0 && props.width > props.borderWidth * 2) {
        return `border: ${props.borderWidth}px solid ${props.borderColor}`;
      }
      return '';
    });

    // 生成图片
    const save = (callback: (imgBase64?: string) => void) => {
      if (!canvas.value) {
        callback();
        return;
      }
      let imgBase64;
      if (props.imageType === 'image/jpeg') {
        imgBase64 = canvas.value.toDataURL('image/jpeg', props.imageQual);
      } else {
        imgBase64 = canvas.value.toDataURL(props.imageType);
      }
      callback(imgBase64);
    };
    // 清空画布
    const clear = () => {
      const { backgroundColor } = props;
      const { width, height } = canvas.value || {};
      if (cxt.value) {
        cxt.value.clearRect(0, 0, width || 0, height || 0);
        cxt.value.fillStyle = backgroundColor;
        cxt.value.fillRect(0, 0, width || 0, height || 0);
      }
    };
    // 属性改变后重置画布
    const reset = () => {
      const context = cxt.value;
      if (context) {
        const { width, height, borderWidth } = props;
        context.canvas.width =
          width > borderWidth * 2 ? width - borderWidth * 2 : width;
        context.canvas.height = height;
        setTimeout(init, 0);
      }
    };

    // 初始化
    const init = () => {
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
    // 移动端触摸摁下
    const touchstart = (e: TouchEvent) => {
      const { clientX, clientY, target } = e.changedTouches[0];
      if ((target as HTMLCanvasElement).tagName === 'CANVAS') {
        const { left, top } = canvas.value?.getBoundingClientRect() || {
          left: 0,
          top: 0
        };
        cxt.value?.beginPath();
        cxt.value?.moveTo(clientX - left, clientY - top);
      }
    };
    // pc端鼠标点下
    const mousedown = (e: MouseEvent) => {
      if ((e.target as HTMLCanvasElement).tagName === 'CANVAS') {
        const { left, top } = canvas.value?.getBoundingClientRect() || {
          left: 0,
          top: 0
        };
        isDraw.value = true;
        cxt.value?.beginPath();
        cxt.value?.moveTo(e.clientX - left, e.clientY - top);
      }
    };
    // 移动端触摸滑动
    const touchmove = (e: TouchEvent) => {
      e.stopPropagation();
      e.preventDefault();
      if (!cxt.value) return;
      const { clientX, clientY, target } = e.changedTouches[0];
      if ((target as HTMLCanvasElement).tagName === 'CANVAS') {
        const { left, top } = canvas.value?.getBoundingClientRect() || {
          left: 0,
          top: 0
        };
        cxt.value.lineTo(clientX - left, clientY - top);
        cxt.value.stroke();
      }
    };
    // pc端鼠标移动
    const mousemove = (e: MouseEvent) => {
      e.stopPropagation();
      e.preventDefault();
      if (isDraw.value && canvas.value && cxt.value) {
        if ((e.target as HTMLCanvasElement).tagName === 'CANVAS') {
          const { width, height } = canvas.value;
          const { left, top } = canvas.value.getBoundingClientRect() || {
            left: 0,
            top: 0
          };
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
    // 移动端触摸抬起
    const touchend = () => {
      cxt.value?.closePath();
    };
    // pc端鼠标松开
    const mouseup = () => {
      isDraw.value = false;
      cxt.value?.closePath();
    };

    onMounted(() => {
      // 获取canvas context
      const context = canvas.value?.getContext('2d');
      if (context) {
        cxt.value = context;
        init();
      }
    });

    return {
      canvas,
      borderStyle,
      save,
      clear,
      reset,
      touchstart,
      mousedown,
      touchmove,
      mousemove,
      touchend,
      mouseup
    };
  }
});
</script>
