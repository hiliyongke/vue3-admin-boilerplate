<script setup lang="ts">
const dataValue = reactive([
  { num: 73, unit: '百万+', text: '开发人员总数', bg: 'bg-0' },
  { num: 16, unit: '百万+', text: '新增用户', bg: 'bg-1' },
  {
    num: 84,
    unit: '百分之',
    text: '财富100强公司',
    bg: 'bg-2'
  },
  { num: 61, unit: '百万+', text: '创建的新存储库数量', bg: 'bg-3' },
  { num: 170, unit: '百万', text: '合并拉去请求', bg: 'bg-4' }
]);
</script>
<template>
  <div class="flex flex-wrap">
    <t-divider>windicss测试</t-divider>
    <div
      v-for="(item, index) in dataValue"
      :key="index"
      class="flex w-1/2 p-20 bg-octo-violet-primary-light"
      :class="item.bg"
    >
      <span class="inline-flex">
        <span class="font-blimone text-9xl stacked-fractions">
          {{ item.num }}
        </span>
        <span class="inline-flex flex-col">
          <span class="p-4 ml-2 text-4xl font-blimone">{{ item.unit }}</span>
          <span
            class="ml-6 font-thin text-1xl"
            v-html="item.text"
          ></span>
        </span>
      </span>
    </div>
  </div>
</template>
<style lang="less">
.bg-0 {
  background-color: #ffffff;
}
.bg-1 {
  background-color: #f9f8ff;
}
.bg-2 {
  background-color: rgba(244, 248, 253, 1);
}
.bg-3 {
  background-color: rgba(240, 248, 246, 1);
}
font {
  color: #ff6900;
}
</style>
