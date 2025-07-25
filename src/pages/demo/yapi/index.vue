<template>
  <div>
    <div class="desc">
      <div>
        A json-schema editor of high efficient and easy-to-use, base on Vue.
        <a @click="visible = true">import json</a>
      </div>
    </div>
    <div class="container">
      <pre class="code">{{ jsonStr }}</pre>
      <json-schema-editor
        class="schema"
        :value="tree"
        disabled-type
        lang="zh_CN"
        custom
      />
    </div>
  </div>
</template>

<script lang="ts">
export default {
  name: 'YapiDemo'
};
</script>

<script setup lang="ts">
import { ref, computed } from 'vue';
import JsonSchemaEditor from '@/components/json-schema-editor/index.vue';
import GenerateSchema from 'generate-schema';

/**
 * JSON Schema 属性接口
 */
interface SchemaProperty {
  type: string;
  title: string;
  maxLength?: number;
  minLength?: number;
  format?: string;
}

/**
 * JSON Schema 对象接口
 */
interface SchemaObject {
  type: string;
  title: string;
  properties: Record<string, SchemaProperty>;
  required: string[];
}

/**
 * Schema 树结构接口
 */
interface SchemaTree {
  root: SchemaObject;
}

/**
 * 导入的 JSON 字符串
 */
const importJson = ref<string>('');

/**
 * 导入对话框显示状态
 */
const visible = ref<boolean>(false);

/**
 * Schema 树结构数据
 */
const tree = ref<SchemaTree>({
  root: {
    type: 'object',
    title: '条件',
    properties: {
      name: {
        type: 'string',
        title: '名称',
        maxLength: 10,
        minLength: 2
      },
      appId: {
        type: 'integer',
        title: '应用ID'
      },
      credate: {
        type: 'string',
        title: '创建日期',
        format: 'date'
      }
    },
    required: ['name', 'appId', 'credate']
  }
});

/**
 * JSON 字符串计算属性
 */
const jsonStr = computed<string>({
  get(): string {
    return JSON.stringify(tree.value, null, 2);
  },
  set(newVal: string): void {
    try {
      tree.value = JSON.parse(newVal);
    } catch (error) {
      console.error('JSON 解析错误:', error);
    }
  }
});

/**
 * 处理导入 JSON
 */
const handleImportJson = (): void => {
  try {
    const parsedJson = JSON.parse(importJson.value);
    const generatedSchema = GenerateSchema.json(parsedJson);

    // 删除 $schema 属性
    delete (generatedSchema as any).$schema;

    tree.value.root = generatedSchema as SchemaObject;
    visible.value = false;
  } catch (error) {
    console.error('导入 JSON 失败:', error);
  }
};
</script>
<style>
* {
  padding: 0;
  margin: 0;
  box-sizing: border-box;
}
.title {
  height: 100px;
  font-size: 40px;
  font-weight: bold;
  line-height: 100px;
  text-align: center;
}
.desc {
  width: 80vw;
  min-width: 800px;
  padding: 20px;
  padding: 0 3em;
  margin: auto;
  font-size: 1.2em;
}
.container {
  display: flex;
  width: 80vw;
  height: calc(100vh - 150px);
  min-width: 800px;
  padding: 20px;
  margin: auto;
  justify-content: center;
}
.container pre {
  width: 30%;
  height: 100%;
  padding: 12px;
  overflow-y: auto;
  font-family: monospace;
  border: 1px solid rgba(0, 0, 0, 0.1);
  border-radius: 4px;
}
.code-container {
  max-height: 600px;
  overflow: auto;
}
.schema {
  width: 70%;
  height: 100%;
  padding: 12px;
  margin-left: 20px;
  overflow-x: hidden;
  overflow-y: auto;
  border: 1px solid rgba(0, 0, 0, 0.1);
  border-radius: 8px;
}
.CodeMirror {
  height: 100% !important;
}
.vue-codemirror {
  min-height: 300px;
  margin: 0 24px;
  overflow: auto;
  border: 1px solid rgba(0, 0, 0, 0.1);
  border-radius: 6px;
  flex: 1;
}
</style>
