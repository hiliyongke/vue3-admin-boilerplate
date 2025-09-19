<template>
  <t-form
    ref="formRef"
    :class="['item-container', `login-${type}`]"
    :data="formData"
    :rules="FORM_RULES"
    label-width="0"
    @submit="onSubmit"
  >
    <template v-if="type == 'password'">
      <t-form-item name="account">
        <t-input v-model="formData.account" size="large" placeholder="请输入账号：admin">
          <template #prefix-icon>
            <t-icon name="user" />
          </template>
        </t-input>
      </t-form-item>

      <t-form-item name="password">
        <t-input
          v-model="formData.password"
          size="large"
          :type="showPsw ? 'text' : 'password'"
          clearable
          placeholder="请输入登录密码：admin"
        >
          <template #prefix-icon>
            <t-icon name="lock-on" />
          </template>
          <template #suffix-icon>
            <t-icon :name="showPsw ? 'browse' : 'browse-off'" @click="showPsw = !showPsw" />
          </template>
        </t-input>
      </t-form-item>

      <div class="check-container remember-pwd">
        <t-checkbox>记住账号</t-checkbox>
        <span class="tip">忘记账号？</span>
      </div>
    </template>

    <!-- 扫码登录 -->
    <template v-else-if="type == 'qrcode'">
      <div class="tip-container">
        <span class="tip">请使用微信扫一扫登录</span>
        <span class="refresh">
          刷新
          <t-icon name="refresh" />
        </span>
      </div>
      <qrcode-vue value="" :size="192" level="H" />
    </template>

    <!-- 手机号登录 -->
    <template v-else>
      <t-form-item class="verification-code" name="verifyCode">
        <t-input v-model="formData.verifyCode" size="large" placeholder="请输入验证码" />
        <t-button variant="outline" :disabled="countDown > 0" @click="handleCounter">
          {{ countDown == 0 ? '发送验证码' : `${countDown}秒后可重发` }}
        </t-button>
      </t-form-item>
    </template>

    <t-form-item v-if="type !== 'qrcode'" class="btn-container">
      <t-button block size="large" type="submit"> 登录 </t-button>
    </t-form-item>

    <div class="switch-container">
      <span v-if="type !== 'password'" class="tip" @click="switchType('password')"> 使用账号密码登录 </span>
      <span v-if="type !== 'qrcode'" class="tip" @click="switchType('qrcode')"> 使用微信扫码登录 </span>
      <span v-if="type !== 'phone'" class="tip" @click="switchType('phone')"> 使用手机号登录 </span>
    </div>
  </t-form>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import QrcodeVue from 'qrcode.vue';
import { MessagePlugin } from 'tdesign-vue-next';
import { useCounter } from '@/hooks/use-counter';
import { useUserStore } from '@/store';

/**
 * 登录类型
 */
type LoginType = 'password' | 'qrcode' | 'phone';

/**
 * 表单数据接口
 */
interface FormData {
  phone: string;
  account: string;
  password: string;
  verifyCode: string;
  checked: boolean;
}

import type { SubmitContext } from 'tdesign-vue-next';

const userStore = useUserStore();
const router = useRouter();

/**
 * 初始表单数据
 */
const INITIAL_DATA: FormData = {
  phone: '',
  account: 'admin',
  password: 'admin',
  verifyCode: '',
  checked: false,
};

/**
 * 表单验证规则
 */
const FORM_RULES = {
  phone: [{ required: true, message: '手机号必填', trigger: 'blur' as const }],
  account: [{ required: true, message: '账号必填', trigger: 'blur' as const }],
  password: [{ required: true, message: '密码必填', trigger: 'blur' as const }],
  verifyCode: [{ required: true, message: '验证码必填', trigger: 'blur' as const }],
};

/**
 * 当前登录类型
 */
const type = ref<LoginType>('password');

/**
 * 表单数据
 */
const formData = ref<FormData>({ ...INITIAL_DATA });

/**
 * 是否显示密码
 */
const showPsw = ref<boolean>(false);

/**
 * 验证码倒计时
 */
const [countDown, handleCounter] = useCounter();

/**
 * 切换登录类型
 * @param newType 新的登录类型
 */
const switchType = (newType: LoginType): void => {
  type.value = newType;
};

/**
 * 提交表单
 * @param context 提交上下文
 */
const onSubmit = async (context: SubmitContext<any>): Promise<void> => {
  if (context.validateResult === true) {
    try {
      await userStore.login(formData.value);
      MessagePlugin.success('登录成功');
      await router.push({
        path: '/dashboard/base',
      });
    } catch (error: any) {
      console.error('登录失败:', error);
      MessagePlugin.error(error?.message || '登录失败，请重试');
    }
  }
};
</script>

<style lang="less" scoped>
@import url('../index.less');
</style>
