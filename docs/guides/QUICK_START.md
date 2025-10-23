# 🚀 快速开始指南

> 5分钟快速上手重构后的 Vue3 Admin 项目

## 📋 前置要求

- Node.js >= 18.12.0
- pnpm >= 8.0.0

## 🔧 安装依赖

```bash
# 安装pnpm（如果还没有安装）
npm install -g pnpm

# 安装项目依赖
pnpm install
```

## 🎯 开发

```bash
# 启动开发服务器
pnpm dev

# 在浏览器中打开
pnpm dev:open
```

访问 http://localhost:3000

## 📦 构建

```bash
# 开发环境构建
pnpm build:dev

# 生产环境构建
pnpm build:prod

# 预览构建结果
pnpm preview
```

## 🎨 核心功能使用

### 1. 创建新页面

```bash
# 使用plop生成页面模板
pnpm plop
```

### 2. 使用请求封装

```typescript
// src/api/user.ts
import { request } from '@/shared/utils';

export const userApi = {
  getList: (params: any) => request.get('/users', params),
  create: (data: any) => request.post('/users', data),
};
```

### 3. 使用组合式函数

```vue
<script setup lang="ts">
import { useRequest } from '@/shared/composables';
import { userApi } from '@/api/user';

const { data, loading, run } = useRequest(userApi.getList, {
  immediate: true,
});
</script>

<template>
  <div v-loading="loading">
    <div v-for="item in data" :key="item.id">
      {{ item.name }}
    </div>
  </div>
</template>
```

### 4. 使用表格Hook

```vue
<script setup lang="ts">
import { useTable } from '@/shared/composables';
import { userApi } from '@/api/user';

const { columns, data, loading, pagination, onPageChange } = useTable({
  columns: [
    { title: 'ID', colKey: 'id' },
    { title: '姓名', colKey: 'name' },
  ],
  requestFn: userApi.getList,
  immediate: true,
});
</script>

<template>
  <t-table
    :columns="columns"
    :data="data"
    :loading="loading"
    :pagination="pagination"
    @page-change="onPageChange"
  />
</template>
```

### 5. 使用表单Hook

```vue
<script setup lang="ts">
import { useForm } from '@/shared/composables';
import { userApi } from '@/api/user';

const { formData, rules, formRef, submit } = useForm({
  initialValues: { name: '', email: '' },
  rules: {
    name: [{ required: true, message: '请输入姓名' }],
    email: [{ required: true, type: 'email', message: '请输入正确的邮箱' }],
  },
  onSubmit: async (values) => {
    await userApi.create(values);
  },
});
</script>

<template>
  <t-form ref="formRef" :data="formData" :rules="rules">
    <t-form-item label="姓名" name="name">
      <t-input v-model="formData.name" />
    </t-form-item>
    <t-form-item label="邮箱" name="email">
      <t-input v-model="formData.email" />
    </t-form-item>
    <t-form-item>
      <t-button @click="submit">提交</t-button>
    </t-form-item>
  </t-form>
</template>
```

## 📝 代码规范

### 提交代码

```bash
# 使用commitizen提交
pnpm commit

# 或使用git commit（会自动触发commitlint检查）
git commit -m "feat: 添加用户管理功能"
```

### 代码检查

```bash
# ESLint检查
pnpm lint

# ESLint自动修复
pnpm lint --fix

# 样式检查
pnpm lint:css

# Prettier格式化
pnpm lint:prettier

# 类型检查
pnpm type-check

# 全部检查
pnpm lint:all
```

## 🧪 测试

```bash
# 运行单元测试
pnpm test

# 运行测试并生成覆盖率报告
pnpm test:coverage

# 监听模式运行测试
pnpm test:watch
```

## 📚 文档

- [架构重构方案](./ARCHITECTURE_REFACTOR.md) - 详细的架构设计和规范
- [使用示例](./USAGE_EXAMPLES.md) - 完整的使用示例代码
- [重构总结](./REFACTOR_SUMMARY.md) - 重构成果和改进对比

## 🔗 相关链接

- [Vue 3 文档](https://cn.vuejs.org/)
- [Vite 文档](https://cn.vitejs.dev/)
- [TDesign 文档](https://tdesign.tencent.com/)
- [Pinia 文档](https://pinia.vuejs.org/zh/)

## ❓ 常见问题

### 1. 如何添加新的路由？

在 `src/router/async-modules/` 或 `src/router/static-modules/` 中添加路由配置：

```typescript
// src/router/async-modules/example.ts
export default [
  {
    path: '/example',
    name: 'Example',
    component: () => import('@/pages/example/index.vue'),
    meta: {
      title: '示例页面',
      icon: 'dashboard',
    },
  },
];
```

### 2. 如何添加新的API接口？

在 `src/api/` 目录下创建对应的API文件：

```typescript
// src/api/example.ts
import { request } from '@/shared/utils';

export const exampleApi = {
  getList: (params: any) => request.get('/example', params),
  create: (data: any) => request.post('/example', data),
};
```

### 3. 如何使用状态管理？

使用Pinia创建store：

```typescript
// src/store/modules/example.ts
import { defineStore } from 'pinia';

export const useExampleStore = defineStore('example', {
  state: () => ({
    data: [],
  }),
  actions: {
    async fetchData() {
      this.data = await exampleApi.getList();
    },
  },
});
```

### 4. 如何配置环境变量？

在 `build/env/` 目录下创建对应的环境文件：

```bash
# .env.development
VITE_API_BASE_URL=http://localhost:8080/api

# .env.production
VITE_API_BASE_URL=https://api.example.com
```

## 🆘 获取帮助

如果遇到问题，可以：

1. 查看[文档](./ARCHITECTURE_REFACTOR.md)
2. 查看[示例代码](./USAGE_EXAMPLES.md)
3. 提交Issue
4. 联系技术支持

## 📄 License

MIT License
