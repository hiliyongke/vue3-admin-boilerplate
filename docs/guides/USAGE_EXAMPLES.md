# 📖 使用示例文档

> 展示重构后的核心功能使用方法

## 🎯 目录

- [请求封装使用](#请求封装使用)
- [组合式函数使用](#组合式函数使用)
- [表格组件使用](#表格组件使用)
- [表单组件使用](#表单组件使用)
- [弹窗组件使用](#弹窗组件使用)
- [日志工具使用](#日志工具使用)

## 📡 请求封装使用

### 基础请求

```typescript
import { request } from '@/shared/utils';

// GET请求
const getUserList = async () => {
  const data = await request.get('/api/users', { page: 1, size: 20 });
  return data;
};

// POST请求
const createUser = async (userData: any) => {
  const data = await request.post('/api/users', userData);
  return data;
};

// PUT请求
const updateUser = async (id: string, userData: any) => {
  const data = await request.put(`/api/users/${id}`, userData);
  return data;
};

// DELETE请求
const deleteUser = async (id: string) => {
  await request.delete(`/api/users/${id}`);
};
```

### 高级配置

```typescript
import { request } from '@/shared/utils';

// 自定义配置
const getUserInfo = async (id: string) => {
  const data = await request.get(`/api/users/${id}`, null, {
    // 不显示错误提示
    showError: false,
    // 不需要token
    withToken: false,
    // 重试3次
    retryCount: 3,
    retryDelay: 1000,
  });
  return data;
};

// 文件上传
const uploadFile = async (file: File) => {
  const data = await request.upload('/api/upload', file);
  return data;
};

// 文件下载
const downloadFile = async (fileId: string) => {
  await request.download(`/api/files/${fileId}`, 'filename.pdf');
};
```

## 🎣 组合式函数使用

### useRequest - 请求Hook

```vue
<script setup lang="ts">
import { useRequest } from '@/shared/composables';
import { getUserInfo } from '@/api/user';

// 基础使用
const { data, loading, error, run } = useRequest(getUserInfo, {
  immediate: false, // 不立即执行
  onSuccess: (data) => {
    console.log('请求成功:', data);
  },
  onError: (error) => {
    console.error('请求失败:', error);
  },
});

// 手动触发请求
const handleClick = () => {
  run('user-id-123');
};
</script>

<template>
  <div>
    <t-button @click="handleClick" :loading="loading">获取用户信息</t-button>
    <div v-if="error">{{ error.message }}</div>
    <div v-else-if="data">{{ data }}</div>
  </div>
</template>
```

### usePagination - 分页Hook

```vue
<script setup lang="ts">
import { usePagination } from '@/shared/composables';
import { getUserList } from '@/api/user';

const { data, loading, page, pageSize, total, changePage, changePageSize } = usePagination(
  getUserList,
  {
    defaultPage: 1,
    defaultPageSize: 20,
    immediate: true,
  }
);
</script>

<template>
  <div>
    <t-table :data="data" :loading="loading" />
    <t-pagination
      v-model:current="page"
      v-model:pageSize="pageSize"
      :total="total"
      @change="changePage"
      @page-size-change="changePageSize"
    />
  </div>
</template>
```

### useTable - 表格Hook

```vue
<script setup lang="ts">
import { useTable } from '@/shared/composables';
import { getUserList } from '@/api/user';

const {
  columns,
  data,
  loading,
  pagination,
  selectedRowKeys,
  loadData,
  refresh,
  onPageChange,
} = useTable({
  columns: [
    { title: 'ID', colKey: 'id', width: 100 },
    { title: '姓名', colKey: 'name', width: 150 },
    { title: '邮箱', colKey: 'email', width: 200 },
    {
      title: '操作',
      colKey: 'action',
      width: 150,
      cell: (h, { row }) => (
        <t-button onClick={() => handleEdit(row)}>编辑</t-button>
      ),
    },
  ],
  requestFn: getUserList,
  immediate: true,
  rowKey: 'id',
});

const handleEdit = (row: any) => {
  console.log('编辑:', row);
};

const handleSearch = (keyword: string) => {
  loadData({ keyword });
};
</script>

<template>
  <div>
    <t-input placeholder="搜索" @change="handleSearch" />
    <t-button @click="refresh">刷新</t-button>

    <t-table
      :columns="columns"
      :data="data"
      :loading="loading"
      :pagination="pagination"
      v-model:selectedRowKeys="selectedRowKeys"
      @page-change="onPageChange"
    />
  </div>
</template>
```

### useForm - 表单Hook

```vue
<script setup lang="ts">
import { useForm } from '@/shared/composables';
import { createUser } from '@/api/user';

const {
  formData,
  rules,
  submitting,
  formRef,
  validate,
  reset,
  submit,
} = useForm({
  initialValues: {
    name: '',
    email: '',
    age: 0,
  },
  rules: {
    name: [{ required: true, message: '请输入姓名' }],
    email: [
      { required: true, message: '请输入邮箱' },
      { type: 'email', message: '邮箱格式不正确' },
    ],
    age: [
      { required: true, message: '请输入年龄' },
      { type: 'number', min: 1, max: 120, message: '年龄范围1-120' },
    ],
  },
  onSubmit: async (values) => {
    await createUser(values);
    console.log('提交成功:', values);
  },
});
</script>

<template>
  <t-form ref="formRef" :data="formData" :rules="rules">
    <t-form-item label="姓名" name="name">
      <t-input v-model="formData.name" placeholder="请输入姓名" />
    </t-form-item>

    <t-form-item label="邮箱" name="email">
      <t-input v-model="formData.email" placeholder="请输入邮箱" />
    </t-form-item>

    <t-form-item label="年龄" name="age">
      <t-input-number v-model="formData.age" placeholder="请输入年龄" />
    </t-form-item>

    <t-form-item>
      <t-button @click="submit" :loading="submitting">提交</t-button>
      <t-button @click="reset">重置</t-button>
    </t-form-item>
  </t-form>
</template>
```

### useModal - 弹窗Hook

```vue
<script setup lang="ts">
import { useModal } from '@/shared/composables';

const { visible, open, close } = useModal({
  onBeforeOpen: async () => {
    // 打开前的验证
    console.log('准备打开弹窗');
    return true;
  },
  onOpen: () => {
    console.log('弹窗已打开');
  },
  onBeforeClose: async () => {
    // 关闭前的确认
    return confirm('确定要关闭吗?');
  },
  onClose: () => {
    console.log('弹窗已关闭');
  },
});
</script>

<template>
  <div>
    <t-button @click="open">打开弹窗</t-button>

    <t-dialog v-model:visible="visible" header="标题" @close="close">
      <div>弹窗内容</div>
    </t-dialog>
  </div>
</template>
```

### useConfirm - 确认弹窗Hook

```vue
<script setup lang="ts">
import { useConfirm } from '@/shared/composables';
import { deleteUser } from '@/api/user';

const { visible, confirming, open, confirm, cancel } = useConfirm({
  title: '确认删除',
  content: '确定要删除这条记录吗?',
  onConfirm: async () => {
    await deleteUser('user-id-123');
    console.log('删除成功');
  },
});
</script>

<template>
  <div>
    <t-button @click="open">删除</t-button>

    <t-dialog v-model:visible="visible" header="确认删除">
      <div>确定要删除这条记录吗?</div>
      <template #footer>
        <t-button @click="cancel">取消</t-button>
        <t-button theme="primary" @click="confirm" :loading="confirming">
          确定
        </t-button>
      </template>
    </t-dialog>
  </div>
</template>
```

## 📝 日志工具使用

```typescript
import { logger } from '@/shared/utils';

// Debug日志
logger.debug('调试信息', { data: 'some data' });

// Info日志
logger.info('普通信息', { user: 'John' });

// Warning日志
logger.warn('警告信息', { code: 'WARN_001' });

// Error日志
logger.error('错误信息', new Error('Something went wrong'));

// 获取所有日志
const logs = logger.getLogs();
console.log('所有日志:', logs);

// 清空日志
logger.clearLogs();

// 更新配置
logger.updateConfig({
  level: 'info',
  reportToServer: true,
});
```

## 🎨 完整示例 - 用户管理页面

```vue
<script setup lang="ts">
import { ref } from 'vue';
import { useTable, useForm, useModal, useConfirm } from '@/shared/composables';
import { getUserList, createUser, updateUser, deleteUser } from '@/api/user';

// 表格
const {
  columns,
  data,
  loading,
  pagination,
  selectedRowKeys,
  loadData,
  refresh,
  onPageChange,
} = useTable({
  columns: [
    { title: 'ID', colKey: 'id', width: 100 },
    { title: '姓名', colKey: 'name', width: 150 },
    { title: '邮箱', colKey: 'email', width: 200 },
    { title: '年龄', colKey: 'age', width: 100 },
    {
      title: '操作',
      colKey: 'action',
      width: 200,
      cell: (h, { row }) => (
        <div>
          <t-button size="small" onClick={() => handleEdit(row)}>
            编辑
          </t-button>
          <t-button size="small" theme="danger" onClick={() => handleDelete(row)}>
            删除
          </t-button>
        </div>
      ),
    },
  ],
  requestFn: getUserList,
  immediate: true,
});

// 表单
const {
  formData,
  rules,
  submitting,
  formRef,
  reset: resetForm,
  submit,
} = useForm({
  initialValues: {
    id: '',
    name: '',
    email: '',
    age: 0,
  },
  rules: {
    name: [{ required: true, message: '请输入姓名' }],
    email: [
      { required: true, message: '请输入邮箱' },
      { type: 'email', message: '邮箱格式不正确' },
    ],
    age: [{ required: true, message: '请输入年龄' }],
  },
  onSubmit: async (values) => {
    if (values.id) {
      await updateUser(values.id, values);
    } else {
      await createUser(values);
    }
    formModal.close();
    refresh();
  },
});

// 表单弹窗
const formModal = useModal({
  onClose: () => {
    resetForm();
  },
});

// 删除确认弹窗
const deleteConfirm = useConfirm({
  onConfirm: async () => {
    await deleteUser(currentRow.value.id);
    refresh();
  },
});

const currentRow = ref<any>({});

// 新增
const handleAdd = () => {
  resetForm();
  formModal.open();
};

// 编辑
const handleEdit = (row: any) => {
  Object.assign(formData, row);
  formModal.open();
};

// 删除
const handleDelete = (row: any) => {
  currentRow.value = row;
  deleteConfirm.open();
};

// 搜索
const searchKeyword = ref('');
const handleSearch = () => {
  loadData({ keyword: searchKeyword.value });
};
</script>

<template>
  <div class="user-management">
    <!-- 搜索栏 -->
    <div class="toolbar">
      <t-input
        v-model="searchKeyword"
        placeholder="搜索用户"
        @enter="handleSearch"
      />
      <t-button @click="handleSearch">搜索</t-button>
      <t-button theme="primary" @click="handleAdd">新增用户</t-button>
      <t-button @click="refresh">刷新</t-button>
    </div>

    <!-- 表格 -->
    <t-table
      :columns="columns"
      :data="data"
      :loading="loading"
      :pagination="pagination"
      v-model:selectedRowKeys="selectedRowKeys"
      @page-change="onPageChange"
    />

    <!-- 表单弹窗 -->
    <t-dialog
      v-model:visible="formModal.visible.value"
      :header="formData.id ? '编辑用户' : '新增用户'"
      width="600px"
    >
      <t-form ref="formRef" :data="formData" :rules="rules">
        <t-form-item label="姓名" name="name">
          <t-input v-model="formData.name" placeholder="请输入姓名" />
        </t-form-item>

        <t-form-item label="邮箱" name="email">
          <t-input v-model="formData.email" placeholder="请输入邮箱" />
        </t-form-item>

        <t-form-item label="年龄" name="age">
          <t-input-number v-model="formData.age" placeholder="请输入年龄" />
        </t-form-item>
      </t-form>

      <template #footer>
        <t-button @click="formModal.close()">取消</t-button>
        <t-button theme="primary" @click="submit" :loading="submitting">
          确定
        </t-button>
      </template>
    </t-dialog>

    <!-- 删除确认弹窗 -->
    <t-dialog
      v-model:visible="deleteConfirm.visible.value"
      header="确认删除"
      width="400px"
    >
      <div>确定要删除用户 "{{ currentRow.name }}" 吗?</div>

      <template #footer>
        <t-button @click="deleteConfirm.cancel()">取消</t-button>
        <t-button
          theme="danger"
          @click="deleteConfirm.confirm()"
          :loading="deleteConfirm.confirming.value"
        >
          确定
        </t-button>
      </template>
    </t-dialog>
  </div>
</template>

<style scoped lang="less">
.user-management {
  padding: 20px;

  .toolbar {
    display: flex;
    gap: 10px;
    margin-bottom: 20px;
  }
}
</style>
```

## 🎯 最佳实践

### 1. 请求封装

```typescript
// ✅ 推荐：统一的API管理
// src/api/user.ts
import { request } from '@/shared/utils';

export const userApi = {
  getList: (params: any) => request.get('/users', params),
  getById: (id: string) => request.get(`/users/${id}`),
  create: (data: any) => request.post('/users', data),
  update: (id: string, data: any) => request.put(`/users/${id}`, data),
  delete: (id: string) => request.delete(`/users/${id}`),
};

// ❌ 不推荐：直接在组件中写请求
const getUserList = async () => {
  const res = await axios.get('/api/users');
  return res.data;
};
```

### 2. 组合式函数

```typescript
// ✅ 推荐：使用组合式函数封装逻辑
const { data, loading, run } = useRequest(userApi.getList);

// ❌ 不推荐：在组件中直接管理状态
const data = ref([]);
const loading = ref(false);
const fetchData = async () => {
  loading.value = true;
  try {
    data.value = await userApi.getList();
  } finally {
    loading.value = false;
  }
};
```

### 3. 类型定义

```typescript
// ✅ 推荐：定义清晰的类型
interface User {
  id: string;
  name: string;
  email: string;
  age: number;
}

const { data } = useRequest<User[]>(userApi.getList);

// ❌ 不推荐：使用any类型
const { data } = useRequest<any>(userApi.getList);
```

### 4. 错误处理

```typescript
// ✅ 推荐：统一的错误处理
const { data, error } = useRequest(userApi.getList, {
  onError: (error) => {
    logger.error('获取用户列表失败', error);
    MessagePlugin.error(error.message);
  },
});

// ❌ 不推荐：忽略错误
const { data } = useRequest(userApi.getList);
```

## 📚 更多资源

- [Vue 3 组合式API文档](https://cn.vuejs.org/guide/extras/composition-api-faq.html)
- [TDesign Vue Next文档](https://tdesign.tencent.com/vue-next/overview)
- [TypeScript文档](https://www.typescriptlang.org/docs/)
