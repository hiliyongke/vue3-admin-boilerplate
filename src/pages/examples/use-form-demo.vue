<template>
  <div class="demo-card">
    <section class="demo-section">
      <header class="demo-header">
        <h2>useForm 示例：创建账号</h2>
        <p>演示如何构建带验证的表单，包含实时校验与统一提交逻辑。</p>
      </header>

      <t-form ref="formRef" :data="values" :rules="rules" label-width="80" colon>
        <t-form-item label="用户名" name="username">
          <t-input v-model="values.username" placeholder="请输入用户名" @blur="validateField('username')" />
        </t-form-item>

        <t-form-item label="邮箱" name="email">
          <t-input v-model="values.email" placeholder="请输入邮箱" @blur="validateField('email')" />
        </t-form-item>

        <t-form-item label="密码" name="password">
          <t-input
            v-model="values.password"
            placeholder="请输入密码"
            type="password"
            @blur="validateField('password')"
          />
        </t-form-item>

        <t-form-item label="角色" name="roles">
          <t-select v-model="values.roles" :options="roleOptions" multiple placeholder="选择角色" />
        </t-form-item>

        <t-form-item label="状态" name="status">
          <t-radio-group v-model="values.status">
            <t-radio value="active">启用</t-radio>
            <t-radio value="inactive">禁用</t-radio>
          </t-radio-group>
        </t-form-item>

        <t-form-item label="协议" name="agreement">
          <t-checkbox v-model="values.agreement">
            我已阅读并同意
            <t-link theme="primary" hover="color">《用户协议》</t-link>
          </t-checkbox>
        </t-form-item>

        <t-form-item>
          <t-space>
            <t-button theme="primary" type="submit" :loading="submitting">提交</t-button>
            <t-button variant="outline" :disabled="submitting" @click="reset">重置</t-button>
            <t-button variant="text" :disabled="submitting" @click="clearErrors">清除错误</t-button>
          </t-space>
        </t-form-item>
      </t-form>

      <t-card title="当前表单值">
        <pre>{{ values }}</pre>
      </t-card>
    </section>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import type { FormRule, FormInstanceFunctions } from 'tdesign-vue-next';
import { useForm } from '@/shared/composables';

interface CreateUserForm {
  username: string;
  email: string;
  password: string;
  roles: string[];
  status: 'active' | 'inactive';
  agreement: boolean;
}

const roleOptions = [
  { label: '管理员', value: 'admin' },
  { label: '运营', value: 'operator' },
  { label: '访客', value: 'guest' },
];

const formRef = ref<FormInstanceFunctions>();

const { values, errors, submitting, validate, validateField, reset, clearErrors, setFieldError } =
  useForm<CreateUserForm>({
    initialValues: {
      username: '',
      email: '',
      password: '',
      roles: [],
      status: 'active',
      agreement: false,
    },
    rules: {
      username: [
        { required: true, message: '请输入用户名' },
        { min: 3, message: '用户名至少 3 个字符' },
      ],
      email: [
        { required: true, message: '请输入邮箱' },
        { pattern: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i, message: '邮箱格式不正确' },
      ],
      password: [
        { required: true, message: '请输入密码' },
        { min: 6, message: '密码至少 6 个字符' },
      ],
      roles: [{ required: true, message: '请至少选择一个角色' }],
      agreement: [
        {
          validator: (value: boolean) => (value ? true : '请同意用户协议'),
          message: '请同意用户协议',
        },
      ],
    },
    onValidateFailed: (formErrors) => {
      console.warn('表单校验失败:', formErrors);
    },
  });

const rules = ref<Record<keyof CreateUserForm, FormRule[]>>({
  username: [
    { required: true, message: '请输入用户名' },
    { min: 3, message: '用户名至少 3 个字符' },
  ],
  email: [
    { required: true, message: '请输入邮箱' },
    { pattern: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i, message: '邮箱格式不正确' },
  ],
  password: [
    { required: true, message: '请输入密码' },
    { min: 6, message: '密码至少 6 个字符' },
  ],
  roles: [{ required: true, message: '请至少选择一个角色' }],
  status: [],
  agreement: [
    {
      validator: (value: boolean) => ({
        result: value,
        message: value ? '' : '请同意用户协议',
        type: 'error' as const,
      }),
      message: '请同意用户协议',
    },
  ],
});

async function handleSubmit(e: Event) {
  e.preventDefault();
  const isValid = await validate();
  if (!isValid) {
    setFieldError('username', errors.value.username || '请完善表单');
    return;
  }

  try {
    await new Promise((resolve) => setTimeout(resolve, 1000));
    console.log('✅ 创建用户成功', values);
    reset();
  } catch (error) {
    console.error('❌ 创建用户失败', error);
  }
}
</script>

<style scoped>
.demo-card {
  display: grid;
  gap: 24px;
}

.demo-section {
  display: grid;
  gap: 16px;
  padding: 24px;
  background: var(--td-bg-color-container);
  border-radius: 12px;
  box-shadow: var(--td-shadow-1);
}

.demo-header h2 {
  margin: 0 0 8px;
  font-size: 18px;
  font-weight: 600;
}

.demo-header p {
  margin: 0;
  color: var(--td-text-color-secondary);
}

.t-form-item {
  max-width: 480px;
}

pre {
  margin: 0;
  font-size: 13px;
  line-height: 1.6;
  background: var(--td-bg-color-page);
  padding: 16px;
  border-radius: 8px;
  border: 1px solid var(--td-component-border);
  overflow: auto;
}
</style>
