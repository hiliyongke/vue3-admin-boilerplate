<template>
  <div class="editor-container">
    <div ref="reditor"></div>
  </div>
</template>

<script lang="ts">
export default {
  name: 'RichEditor'
};
</script>

<script setup lang="ts">
import { ref, onMounted, toRefs, watch, onUnmounted } from 'vue';
import E from 'wangeditor';

/**
 * 组件属性接口
 */
interface Props {
  /** 编辑器内容 */
  modelValue?: string;
  /** 编辑器高度 */
  height?: number;
  /** 是否禁用 */
  disabled?: boolean;
  /** 占位符文本 */
  placeholder?: string;
}

/**
 * 组件事件接口
 */
interface Emits {
  /** 内容更新事件 */
  'update:modelValue': [value: string];
  /** 内容变化事件 */
  'change': [value: string];
  /** 获得焦点事件 */
  'focus': [];
  /** 失去焦点事件 */
  'blur': [];
}

/**
 * 组件属性
 */
const props = withDefaults(defineProps<Props>(), {
  modelValue: '',
  height: 300,
  disabled: false,
  placeholder: '请输入内容...'
});

/**
 * 组件事件
 */
const emit = defineEmits<Emits>();

/**
 * 富文本编辑器容器引用
 */
const reditor = ref<HTMLDivElement>();

/**
 * 响应式属性
 */
const { modelValue } = toRefs(props);

/**
 * 编辑器实例
 */
let editor: typeof E | null = null;

/**
 * 获取编辑器HTML内容
 * @returns HTML内容
 */
const getHTML = (): string => {
  return editor?.txt.html() || '';
};

/**
 * 设置编辑器HTML内容
 * @param html HTML内容
 */
const setHTML = (html: string): void => {
  editor?.txt.html(html);
};

/**
 * 获取编辑器文本内容
 * @returns 文本内容
 */
const getText = (): string => {
  return editor?.txt.text() || '';
};

/**
 * 清空编辑器内容
 */
const clear = (): void => {
  editor?.txt.clear();
};

/**
 * 销毁编辑器
 */
const destroyEditor = (): void => {
  if (editor) {
    editor.destroy();
    editor = null;
  }
};

/**
 * 组件挂载后初始化编辑器
 */
onMounted(() => {
  if (reditor.value) {
    editor = new E(reditor.value);

    // 配置编辑器
    editor.config.height = props.height;
    editor.config.placeholder = props.placeholder;

    // 配置 onchange 回调函数
    editor.config.onchange = (newHtml: string) => {
      emit('update:modelValue', newHtml);
      emit('change', newHtml);
    };

    // 配置触发 onchange 的时间频率，默认为 200ms
    editor.config.onchangeTimeout = 500; // 修改为 500ms

    // 配置焦点事件
    editor.config.onfocus = () => {
      emit('focus');
    };

    // 配置失焦事件
    editor.config.onblur = () => {
      emit('blur');
    };

    // 创建编辑器
    editor.create();

    // 设置禁用状态
    if (props.disabled) {
      editor.disable();
    }

    // 使用父组件的默认数据进行初始化
    if (modelValue.value) {
      editor.txt.html(modelValue.value);
    }
  }
});

/**
 * 监听父组件数据变化
 */
watch(modelValue, (newValue) => {
  if (editor && newValue !== getHTML()) {
    editor.txt.html(newValue || '');
  }
});

/**
 * 监听禁用状态变化
 */
watch(() => props.disabled, (newDisabled) => {
  if (editor) {
    if (newDisabled) {
      editor.disable();
    } else {
      editor.enable();
    }
  }
});

/**
 * 组件卸载前销毁编辑器
 */
onUnmounted(() => {
  destroyEditor();
});

/**
 * 暴露给父组件的方法
 */
defineExpose({
  getHTML,
  setHTML,
  getText,
  clear,
  destroyEditor
});
</script>

<style lang="less" scoped>
.editor-container {
  :deep(.w-e-text-container) {
    text-align: left;
  }
}
</style>
