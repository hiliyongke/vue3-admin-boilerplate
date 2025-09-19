<!-- 登录页面 -->
<template>
  <div class="wrapper">
    <div class="login-wrapper">
      <div class="login-container">
        <img class="login-one-ball" src="../../assets/images/material1.png" alt="装饰球1" />
        <img class="login-two-ball" src="../../assets/images/material2.png" alt="装饰球2" />
        <div class="title-container">
          <h1 class="title margin-no">
            {{ type === 'register' ? '注册' : '登录' }}
          </h1>
          <div class="sub-title">
            <p class="tip">
              {{ type === 'register' ? '已有账号?' : '没有账号吗?' }}
            </p>
            <p class="tip" @click="handleSwitchType(type === 'register' ? 'login' : 'register')">
              {{ type === 'register' ? '登录' : '注册新账号' }}
            </p>
          </div>
        </div>

        <Login v-if="type === 'login'" />
        <Register v-else @register-success="handleRegisterSuccess" />
        <Setting />
      </div>

      <footer class="copyright">
        Copyright @ 2021-{{ new Date().getFullYear() }} {{ COMPANY_NAME }}. All Rights Reserved
      </footer>
    </div>
  </div>
</template>

<script lang="ts">
export default {
  name: 'LoginIndex',
};
</script>

<script setup lang="ts">
import { ref } from 'vue';
import Login from './components/login.vue';
import Register from './components/register.vue';
import Setting from '@/layouts/setting.vue';
import { COMPANY_NAME } from '@/constants/app';

/**
 * 登录类型：'login' | 'register'
 */
type LoginType = 'login' | 'register';

/**
 * 当前登录类型
 */
const type = ref<LoginType>('login');

/**
 * 切换登录类型
 * @param newType 新的登录类型
 */
const handleSwitchType = (newType: LoginType): void => {
  type.value = newType;
};

/**
 * 注册成功回调
 */
const handleRegisterSuccess = (): void => {
  handleSwitchType('login');
};
</script>

<style lang="less" scoped>
@import url('./index.less');
</style>
