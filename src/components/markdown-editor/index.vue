<template>
  <div>
    <div ref="editorSection"></div>
  </div>
</template>

<script lang="ts">
export default {
  name: 'MarkdownEditor'
};
</script>

<script setup lang="ts">
import { onMounted, onUnmounted, ref } from 'vue';
import Editor from '@toast-ui/editor';
import '@toast-ui/editor/dist/toastui-editor.css';
import '@toast-ui/editor/dist/theme/toastui-editor-dark.css';

/**
 * 编辑器主题类型
 */
type EditorTheme = 'light' | 'dark';

/**
 * 编辑器预览样式类型
 */
type PreviewStyle = 'tab' | 'vertical';

/**
 * 编辑器初始类型
 */
type InitialEditType = 'markdown' | 'wysiwyg';

/**
 * 组件属性接口
 */
interface Props {
  /** 编辑器内容 */
  modelValue?: string;
  /** 编辑器高度 */
  height?: string;
  /** 编辑器主题 */
  theme?: EditorTheme;
  /** 预览样式 */
  previewStyle?: PreviewStyle;
  /** 初始编辑类型 */
  initialEditType?: InitialEditType;
}

/**
 * 组件事件接口
 */
interface Emits {
  /** 内容更新事件 */
  'update:modelValue': [value: string];
  /** 内容变化事件 */
  'change': [value: string];
}

/**
 * 组件属性
 */
const props = withDefaults(defineProps<Props>(), {
  modelValue: '# Toast UI Editor\n\n欢迎使用 Markdown 编辑器！',
  height: '500px',
  theme: 'light',
  previewStyle: 'vertical',
  initialEditType: 'markdown'
});

/**
 * 组件事件
 */
const emit = defineEmits<Emits>();

/**
 * 编辑器容器引用
 */
const editorSection = ref<HTMLDivElement>();

/**
 * 编辑器实例
 */
let editor: Editor | null = null;

/**
 * 获取编辑器内容
 * @returns 编辑器内容
 */
const getMarkdown = (): string => {
  return editor?.getMarkdown() || '';
};

/**
 * 设置编辑器内容
 * @param markdown Markdown 内容
 */
const setMarkdown = (markdown: string): void => {
  editor?.setMarkdown(markdown);
};

/**
 * 获取 HTML 内容
 * @returns HTML 内容
 */
const getHTML = (): string => {
  return editor?.getHTML() || '';
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
  if (editorSection.value) {
    editor = new Editor({
      el: editorSection.value,
      initialEditType: props.initialEditType,
      previewStyle: props.previewStyle,
      height: props.height,
      initialValue: props.modelValue,
      theme: props.theme,
      events: {
        change: () => {
          const markdown = getMarkdown();
          emit('update:modelValue', markdown);
          emit('change', markdown);
        }
      }
    });
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
  getMarkdown,
  setMarkdown,
  getHTML,
  destroyEditor
});
</script>

<style lang="less" scoped>
:deep(.ProseMirror) {
  text-align: left;
}
:deep(.toastui-editor-contents) {
  text-align: left;
}
</style>
