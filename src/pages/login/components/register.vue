<template>
  <t-form
    ref="formRef"
    :class="['item-container', `register-${type}`]"
    :data="formData"
    :rules="FORM_RULES"
    label-width="0"
    @submit="onSubmit"
  >
    <template v-if="type === 'phone'">
      <t-form-item name="phone">
        <t-input v-model="formData.phone" :maxlength="11" size="large" placeholder="请输入您的手机号">
          <template #prefix-icon>
            <t-icon name="user" />
          </template>
        </t-input>
      </t-form-item>
    </template>

    <template v-if="type === 'email'">
      <t-form-item name="email">
        <t-input v-model="formData.email" type="text" size="large" placeholder="请输入您的邮箱">
          <template #prefix-icon>
            <t-icon name="mail" />
          </template>
        </t-input>
      </t-form-item>
    </template>

    <t-form-item name="password">
      <t-input
        v-model="formData.password"
        size="large"
        :type="showPsw ? 'text' : 'password'"
        clearable
        placeholder="请输入登录密码"
      >
        <template #prefix-icon>
          <t-icon name="lock-on" />
        </template>
        <template #suffix-icon>
          <t-icon :name="showPsw ? 'browse' : 'browse-off'" @click="showPsw = !showPsw" />
        </template>
      </t-input>
    </t-form-item>

    <template v-if="type === 'phone'">
      <t-form-item class="verification-code" name="verifyCode">
        <t-input v-model="formData.verifyCode" size="large" placeholder="请输入验证码" />
        <t-button variant="outline" :disabled="countDown > 0" @click="handleCounter">
          {{ countDown === 0 ? '发送验证码' : `${countDown}秒后可重发` }}
        </t-button>
      </t-form-item>
    </template>

    <t-form-item class="check-container" name="checked">
      <t-checkbox v-model="formData.checked">我已阅读并同意</t-checkbox>
      <span>服务协议</span>
      和
      <span>隐私声明</span>
    </t-form-item>

    <t-form-item>
      <t-button block size="large" type="submit"> 注册 </t-button>
    </t-form-item>

    <div class="switch-container">
      <span class="tip" @click="switchType(type === 'phone' ? 'email' : 'phone')">
        {{ type === 'phone' ? '使用邮箱注册' : '使用手机号注册' }}
      </span>
    </div>
  </t-form>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { MessagePlugin } from 'tdesign-vue-next';
import type { SubmitContext } from 'tdesign-vue-next';
import { useCounter } from '@/hooks/use-counter';

/**
 * 注册类型
 */
type RegisterType = 'phone' | 'email';

/**
 * 表单数据接口
 */
interface FormData {
  phone: string;
  email: string;
  password: string;
  verifyCode: string;
  checked: boolean;
}

/**
 * 表单实例接口
 */
interface FormInstance {
  reset: () => void;
}

/**
 * 初始表单数据
 */
const INITIAL_DATA: FormData = {
  phone: '',
  email: '',
  password: '',
  verifyCode: '',
  checked: false,
};

/**
 * 表单验证规则
 */
const FORM_RULES = {
  phone: [{ required: true, message: '手机号必填', trigger: 'blur' as const }],
  email: [
    { required: true, message: '邮箱必填', trigger: 'blur' as const },
    { email: true, message: '请输入正确的邮箱', trigger: 'blur' as const },
  ],
  password: [{ required: true, message: '密码必填', trigger: 'blur' as const }],
  verifyCode: [{ required: true, message: '验证码必填', trigger: 'blur' as const }],
};

/**
 * 当前注册类型
 */
const type = ref<RegisterType>('phone');

/**
 * 表单实例引用
 */
const formRef = ref<FormInstance>();

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
 * 定义组件事件
 */
const emit = defineEmits<{
  registerSuccess: [];
}>();

/**
 * 提交表单
 * @param context 提交上下文
 */
const onSubmit = (context: SubmitContext<any>): void => {
  if (context.validateResult === true) {
    if (!formData.value.checked) {
      MessagePlugin.error('请同意服务协议和隐私声明');
      return;
    }
    MessagePlugin.success('注册成功');
    emit('registerSuccess');
  }
};

/**
 * 切换注册类型
 * @param newType 新的注册类型
 */
const switchType = (newType: RegisterType): void => {
  formRef.value?.reset();
  type.value = newType;
};
</script>

<style lang="less" scoped>
@import url('../index.less');
</style>
