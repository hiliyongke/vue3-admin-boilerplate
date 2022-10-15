<!--
 * @Description: 
-->
<template>
  <div class="login-wrapper">
    <login-header />

    <div class="login-container">
      <div class="title-container">
        <h1 class="title margin-no">登录到</h1>
        <h1 class="title">Vue3 Admin Starter</h1>
        <div class="sub-title">
          <p class="tip">
            {{ type == 'register' ? '已有账号?' : '没有账号吗?' }}
          </p>
          <p
            class="tip"
            @click="switchType(type == 'register' ? 'login' : 'register')"
          >
            {{ type == 'register' ? '登录' : '注册新账号' }}
          </p>
        </div>
      </div>

      <login v-if="type === 'login'" />
      <register
        v-else
        @register-success="switchType('login')"
      />
      <setting />
    </div>

    <footer class="copyright">
      Copyright @ 2021-2022 xxx. All Rights Reserved
    </footer>
  </div>
</template>
<script lang="ts">
export default {
  name: 'LoginIndex'
};
</script>
<script setup lang="ts">
import Login from './components/login.vue';
import Register from './components/register.vue';
import LoginHeader from './components/header.vue';
import Setting from '@/layouts/setting.vue';

const type = ref('login');
const switchType = (val: string) => {
  type.value = val;
};
</script>

<style lang="less" scoped>
@import url('./index.less');
</style>
