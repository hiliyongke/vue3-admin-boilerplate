<!--
 * @Description: 锁屏
-->
<template>
  <div
    :class="{ unLockLogin: state.isShowLogin }"
    class="lock-screen"
    @keyup="unLockLogin(true)"
    @mousedown.stop
    @contextmenu.prevent
  >
    <template v-if="!state.isShowLogin">
      <div class="lock-box">
        <div class="lock">
          <span class="lock-icon" title="解锁屏幕" @click="unLockLogin(true)">
            <LockOffIcon />
          </span>
        </div>
        <h6 class="tips">点击解锁</h6>
      </div>
      <!-- 小米 / 华为 充电-->
      <component
        :is="randomCompName"
        :battery="battery"
        :battery-status="batteryStatus"
        :calc-discharging-time="calcDischargingTime"
      />
    </template>
    <template v-if="state.isShowLogin">
      <div class="login-box">
        <t-avatar size="120px">
          <template #icon>
            <user-icon />
          </template>
        </t-avatar>
        <div class="username">{{ state.loginForm.username }}</div>
        <t-input
          v-model="state.loginForm.password"
          type="password"
          autofocus
          placeholder="请输入登录密码"
          size="large"
          @enter="onLogin"
        >
          <template #suffix-icon>
            <LoadingIcon v-if="state.loginLoading" />
            <ChevronRightIcon v-else />
          </template>
        </t-input>
        <t-button theme="default" style="margin-top: 10px" block @click="nav2login"> 重新登录 </t-button>
      </div>
    </template>
    <template v-if="!state.isShowLogin">
      <div class="local-time">
        <div class="time">{{ hour }}:{{ minute }}</div>
        <div class="date">{{ month }}月{{ day }}号，星期{{ week }}</div>
      </div>
      <div class="computer-status">
        <span :class="{ offline: !online }" class="network">
          <t-icon name="wifi" class="network" />
        </span>
      </div>
    </template>
  </div>
</template>

<script setup lang="ts">
import { useRouter, useRoute } from 'vue-router';
import { reactive } from 'vue';
import { MessagePlugin } from 'tdesign-vue-next';
import { LockOffIcon, UserIcon, LoadingIcon, ChevronRightIcon } from 'tdesign-icons-vue-next';

import HuaweiCharge from './huawei-charge.vue';
import XiaomiCharge from './xiaomi-charge.vue';
import { useOnline } from '@/hooks/use-online';
import { useTime } from '@/hooks/use-time';
import { useBattery } from '@/hooks/use-battery';
import { useLockScreenStore } from '@/store/modules/lock-screen';
import { useUserStore } from '@/store/modules/user';
import { login } from '@/api/user';
const LOGIN_NAME = 'login';
const lockScreenStore = useLockScreenStore();
const userStore = useUserStore();
// 获取本地时间
const { month, day, hour, minute, week } = useTime();
const { online } = useOnline();

const router = useRouter();
const route = useRoute();

const { battery, batteryStatus, calcDischargingTime } = useBattery();

const randomCompName = Math.random() > 0.48 ? XiaomiCharge : HuaweiCharge;

const state = reactive({
  isShowLogin: false,
  loginLoading: false, // 正在登录
  loginForm: {
    username: userStore.userInfo.user_name || '用户',
    password: '',
  },
});

// 解锁登录
const unLockLogin = (val: boolean) => {
  console.log('🔓 unLockLogin called with:', val);
  state.isShowLogin = val;
};

// 登录
const onLogin = async () => {
  if (state.loginForm.password.trim() === '') {
    return MessagePlugin.warning('请输入密码');
  }

  const params = { ...state.loginForm };
  state.loginLoading = true;

  try {
    // 使用 userStore 的登录方法进行模拟登录验证
    await userStore.login({
      account: params.username,
      password: params.password,
      phone: '',
      verifyCode: '',
      checked: false,
    });

    MessagePlugin.success('解锁成功');
    state.loginLoading = false;
    unLockLogin(false);
    lockScreenStore.setLock(false);
  } catch (error) {
    MessagePlugin.error('密码错误');
    state.loginLoading = false;
  }
};

const nav2login = () => {
  unLockLogin(false);
  lockScreenStore.setLock(false);
  router.replace({
    name: LOGIN_NAME,
    query: {
      redirect: route.fullPath,
    },
  });
};
</script>

<style lang="less" scoped>
.lock-screen {
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  z-index: 10000;
  display: flex;
  overflow: hidden;
  color: white;
  background: #000000;
  pointer-events: auto;
  user-select: none;
  &.unLockLogin {
    background-color: rgba(25, 28, 34, 0.78);
    backdrop-filter: blur(7px);
  }
  .login-box {
    position: absolute;
    top: 45%;
    left: 50%;
    display: flex;
    transform: translate(-50%, -50%);
    flex-direction: column;
    justify-content: center;
    align-items: center;
    > * {
      margin-bottom: 14px;
    }
    .username {
      font-size: 30px;
    }
  }
  .lock-box {
    position: absolute;
    top: 12vh;
    left: 50%;
    font-size: 34px;
    transform: translateX(-50%);
    .tips {
      margin-top: 0px;
      color: white;
      cursor: text;
    }
    .lock {
      display: flex;
      justify-content: center;
      .lock-icon {
        cursor: pointer;
        .anticon-unlock {
          display: none;
        }
        &:hover .anticon-unlock {
          display: initial;
        }
        &:hover .anticon-lock {
          display: none;
        }
      }
    }
  }
  .local-time {
    position: absolute;
    bottom: 60px;
    left: 60px;
    font-family: helvetica;
    .time {
      font-size: 70px;
    }
    .date {
      font-size: 40px;
    }
  }
  .computer-status {
    position: absolute;
    right: 60px;
    bottom: 60px;
    font-size: 24px;
    > * {
      margin-left: 14px;
    }
    .network {
      position: relative;
      &.offline::before {
        position: absolute;
        top: 50%;
        left: 50%;
        z-index: 10;
        width: 2px;
        height: 28px;
        background-color: red;
        content: '';
        transform: translate(-50%, -50%) rotate(45deg);
      }
    }
  }
}
</style>
