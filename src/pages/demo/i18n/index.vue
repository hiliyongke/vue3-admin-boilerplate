<!--
 * @Description:  国际化demo
-->
<template>
  <div>
    <div>
      {{ $d(new Date()) }}
    </div>
    <div>{{ $t('common.now', { time: Date.now().toString() }) }}</div>
    <div>{{ $t('login.userName') }}</div>
    <div v-t="'login.password'"></div>
  </div>
</template>
<script setup lang="ts">
const { t } = useI18n();

// console.log(t('login.userName'));
// console.log(t('login.time'));
</script>
<style lang="less"></style>
