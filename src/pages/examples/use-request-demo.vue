<template>
  <div class="demo-card">
    <section class="demo-section">
      <header class="demo-header">
        <h2>useRequest 示例：用户信息</h2>
        <p>该示例演示如何通过 useRequest 管理异步请求状态、错误处理与刷新逻辑。</p>
      </header>

      <div class="demo-actions">
        <t-input v-model="userId" placeholder="输入用户 ID" style="max-width: 240px" />
        <t-button theme="primary" :loading="loading" @click="handleFetchUser"> 获取用户信息 </t-button>
        <t-button variant="outline" :disabled="loading" @click="handleRefresh"> 刷新 </t-button>
        <t-button variant="text" :disabled="loading" @click="handleReset"> 重置 </t-button>
      </div>

      <t-alert v-if="error" theme="error" :message="error.message" close>
        {{ error.message }}
      </t-alert>

      <t-card v-if="user" title="用户信息" class="demo-card__result">
        <ul class="demo-list">
          <li>
            <span>ID：</span>
            <strong>{{ user.id }}</strong>
          </li>
          <li>
            <span>姓名：</span>
            <strong>{{ user.name }}</strong>
          </li>
          <li>
            <span>邮箱：</span>
            <strong>{{ user.email }}</strong>
          </li>
          <li>
            <span>电话：</span>
            <strong>{{ user.phone }}</strong>
          </li>
          <li>
            <span>角色：</span>
            <t-tag v-for="role in user.roles" :key="role" theme="success" size="small">
              {{ role }}
            </t-tag>
          </li>
        </ul>
      </t-card>

      <t-skeleton v-if="loading" theme="paragraph" :row-col="[1, 1, 1, 1]" animated />
    </section>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { useRequest } from '@/shared/composables';

interface MockUser {
  id: string;
  name: string;
  email: string;
  phone: string;
  roles: string[];
}

// 模拟异步请求
async function fetchUser(id: string): Promise<MockUser> {
  await new Promise((resolve) => setTimeout(resolve, 800));

  if (!id) {
    throw new Error('请先输入用户 ID');
  }

  if (id === '404') {
    throw new Error('用户不存在');
  }

  return {
    id,
    name: `用户_${id}`,
    email: `user_${id}@example.com`,
    phone: '188-8888-8888',
    roles: ['admin', 'user'],
  } satisfies MockUser;
}

const userId = ref('10001');

const { loading, error, data, execute, reset } = useRequest(fetchUser, {
  immediate: false,
  onSuccess: (user) => {
    console.log('✅ 获取用户成功', user);
  },
  onError: (err) => {
    console.error('❌ 获取用户失败', err);
  },
});

const user = data;

async function handleFetchUser() {
  await execute(userId.value);
}

async function handleRefresh() {
  await execute(userId.value);
}

function handleReset() {
  userId.value = '';
  reset();
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

.demo-actions {
  display: flex;
  flex-wrap: wrap;
  gap: 12px;
  align-items: center;
}

.demo-card__result {
  background: var(--td-bg-color-page);
  border: 1px solid var(--td-component-border);
}

.demo-list {
  list-style: none;
  padding: 0;
  margin: 0;
  display: grid;
  gap: 12px;
}

.demo-list span {
  color: var(--td-text-color-secondary);
}

.demo-list strong {
  margin-left: 8px;
}

.demo-list .t-tag {
  margin-right: 8px;
}
</style>
