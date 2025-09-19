<template>
  <div class="content-box">
    <div class="example">
      <div class="toolbar">
        <pre class="state">{{ state }}</pre>
        <div class="config">
          <p>
            <button @click="state.disabled = !state.disabled">toggle disabled</button>
          </p>
          <p>
            <button @click="state.autofocus = !state.autofocus">toggle autofocus</button>
          </p>
          <p>
            <button @click="state.indentWithTab = !state.indentWithTab">toggle indentWithTab</button>
          </p>
          <p>
            <label for="tabSize">tabSize:</label>
            <input id="tabSize" v-model.number="state.tabSize" type="range" min="2" max="10" step="1" />
          </p>
          <p>
            <label for="backgroundColor">backgroundColor:</label>
            <select id="backgroundColor" v-model="state.backgroundColor" name="backgroundColor">
              <option
                v-for="option in ['white', 'red', 'black', 'yellow', 'lawngreen', 'blue']"
                :key="option"
                :value="option"
              >
                {{ option }}
              </option>
            </select>
          </p>
          <p>
            <label for="language">language:</label>
            <select id="language" v-model="state.language" name="language">
              <option
                v-for="option in [
                  'javascript',
                  'html',
                  'json',
                  'markdown',
                  'cpp',
                  'java',
                  'php',
                  'python',
                  'rust',
                  'sql',
                ]"
                :key="option"
                :value="option"
              >
                {{ option }}
              </option>
            </select>
          </p>
          <p>
            <label for="theme">theme:</label>
            <select id="theme" v-model="state.theme" name="theme">
              <option v-for="option in ['default', 'oneDark']" :key="option" :value="option">
                {{ option }}
              </option>
            </select>
          </p>
        </div>
      </div>
      <div class="content">
        <Codemirror
          ref="cm"
          v-model="code"
          class="codemirror"
          :autofocus="state.autofocus"
          :placeholder="state.placeholder"
          :indent-with-tab="state.indentWithTab"
          :tab-size="state.tabSize"
          :disabled="state.disabled"
          :style="{ backgroundColor: state.backgroundColor }"
          :extensions="extensions"
          @ready="consoleLog('ready', $event)"
          @change="consoleLog('change', $event)"
          @focus="consoleLog('focus', $event)"
          @blur="consoleLog('blur', $event)"
        />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts" name="editor">
import { reactive, shallowRef, computed, onMounted } from 'vue';
import { javascript } from '@codemirror/lang-javascript';
import { html } from '@codemirror/lang-html';
import { json } from '@codemirror/lang-json';
import { markdown } from '@codemirror/lang-markdown';
import { cpp } from '@codemirror/lang-cpp';
import { java } from '@codemirror/lang-java';
import { php } from '@codemirror/lang-php';
import { python } from '@codemirror/lang-python';
import { rust } from '@codemirror/lang-rust';
import { sql } from '@codemirror/lang-sql';
import { oneDark } from '@codemirror/theme-one-dark';
import { Codemirror } from './packages';
import codeList from './packages/code-list';

const themes: Record<string, any> = { oneDark };
const languages: Record<string, any> = {
  javascript: javascript(),
  html: html(),
  json: json(),
  markdown: markdown(),
  cpp: cpp(),
  java: java(),
  php: php(),
  python: python(),
  rust: rust(),
  sql: sql(),
};

const consoleLog = console.log;
const code = computed(() => {
  const str = codeList[state.language] || '暂无该语言内容';
  return str;
});
const cm = shallowRef();
const state = reactive({
  disabled: false,
  indentWithTab: true,
  tabSize: 2,
  autofocus: true,
  placeholder: 'code...',
  backgroundColor: 'white',
  language: 'javascript',
  theme: 'oneDark',
});

const extensions = computed(() => {
  const result: any[] = [];
  result.push(languages[state.language]);
  if (themes[state.theme]) {
    result.push(themes[state.theme]);
  }
  return result;
});

onMounted(() => {
  console.log('cm', cm);
});
</script>

<style scoped lang="less">
.content-box {
  .example {
    display: flex;
    width: 100%;
    height: 100vh;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    .toolbar {
      display: flex;
      align-items: center;
      margin-bottom: 1rem;
      .state {
        padding: 2em;
        margin-right: 2rem;
        border: 1px solid #cccccc;
      }
    }
    .content {
      display: flex;
      width: 100%;
      justify-content: center;
      margin-bottom: 20px;
      .code {
        overflow: scroll;
      }
      .code,
      .codemirror {
        :deep(.cm-editor) {
          width: 100%;
          min-height: 35vh;
          margin: 0 1rem;
          border: 1px solid #dddddd;
        }
      }
    }
  }
}
</style>
