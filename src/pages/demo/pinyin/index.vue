<template>
  <div>
    <t-input
      v-model="inputTxt"
      @change="change"
    ></t-input>
    {{ pinyin(inputTxt).join(' ') }}
  </div>
</template>

<script setup lang="ts">
import pinyin from 'pinyin';
import { InputValue } from 'tdesign-vue-next';

const inputTxt = ref<string>('我是中国人');
const change = (val: InputValue) => {
  inputTxt.value = val as string;
};
</script>

<style scoped></style>
