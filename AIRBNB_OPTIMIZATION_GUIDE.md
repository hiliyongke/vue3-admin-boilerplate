# Vue3 Admin 项目 Airbnb 规范优化指南

## 🎯 优化目标

本次优化将项目完全按照 Airbnb JavaScript/TypeScript 规范进行重构，提升代码质量和团队协作效率。

## 📦 依赖包更新

### ESLint 相关
```json
{
  "eslint": "^8.57.0",
  "eslint-config-airbnb-base": "^15.0.0",
  "eslint-config-airbnb-typescript": "^17.1.0",
  "eslint-plugin-import": "^2.29.1",
  "eslint-plugin-vue": "^9.22.0",
  "eslint-plugin-vuejs-accessibility": "^2.2.1"
}
```

### TypeScript 相关
```json
{
  "@typescript-eslint/eslint-plugin": "^6.21.0",
  "@typescript-eslint/parser": "^6.21.0",
  "typescript": "^5.4.2"
}
```

### 其他工具
```json
{
  "prettier": "^3.2.5",
  "lint-staged": "^15.2.2",
  "stylelint": "^16.2.1"
}
```

## 🔧 配置文件优化

### 1. ESLint 配置 (`.eslintrc.js`)

采用 Airbnb 规范作为基础配置：

```javascript
module.exports = {
  extends: [
    'airbnb-base',
    'airbnb-typescript/base',
    'plugin:vue/vue3-recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:import/recommended',
    'plugin:vuejs-accessibility/recommended',
    'prettier',
  ],
  // ... 其他配置
};
```

### 2. Prettier 配置 (`.prettierrc.ts`)

遵循 Airbnb 代码风格：

```typescript
const config = {
  printWidth: 120,
  tabWidth: 2,
  useTabs: false,
  semi: true,
  singleQuote: true,
  trailingComma: 'es5',
  bracketSpacing: true,
  arrowParens: 'always',
  endOfLine: 'lf',
};
```

### 3. TypeScript 配置 (`tsconfig.json`)

现代化的 TypeScript 配置：

```json
{
  "compilerOptions": {
    "target": "ES2022",
    "module": "ESNext",
    "moduleResolution": "bundler",
    "strict": true,
    "noUnusedLocals": true,
    "noUnusedParameters": true,
    "noFallthroughCasesInSwitch": true
  }
}
```

## 📁 项目结构优化

### 标准化目录结构

```
src/
├── components/          # 组件目录
│   ├── common/         # 通用组件
│   ├── business/       # 业务组件
│   └── layout/         # 布局组件
├── utils/              # 工具函数
│   ├── common/         # 通用工具
│   ├── business/       # 业务工具
│   └── validation/     # 验证工具
├── types/              # 类型定义
│   ├── api/           # API类型
│   ├── business/      # 业务类型
│   └── common/        # 通用类型
├── constants/          # 常量定义
│   ├── api/           # API常量
│   ├── business/      # 业务常量
│   └── common/        # 通用常量
├── hooks/              # 自定义钩子
│   ├── common/        # 通用钩子
│   └── business/      # 业务钩子
├── services/           # 服务层
│   ├── api/           # API服务
│   └── business/      # 业务服务
└── styles/             # 样式文件
    ├── components/    # 组件样式
    ├── pages/         # 页面样式
    └── themes/        # 主题样式
```

## 🎨 代码规范

### 1. 命名规范

#### 变量和函数
```typescript
// ✅ 好的命名
const userList = [];
const getUserInfo = () => {};
const isUserLoggedIn = false;

// ❌ 避免的命名
const list = [];
const get = () => {};
const flag = false;
```

#### 常量
```typescript
// ✅ 使用大写下划线
const API_BASE_URL = 'https://api.example.com';
const MAX_RETRY_COUNT = 3;

// ❌ 避免
const apiBaseUrl = 'https://api.example.com';
```

#### 类型定义
```typescript
// ✅ 接口使用 PascalCase
interface UserInfo {
  id: number;
  name: string;
}

// ✅ 类型别名
type UserStatus = 'active' | 'inactive';

// ✅ 枚举
enum UserRole {
  ADMIN = 'admin',
  USER = 'user',
}
```

### 2. 函数规范

#### 函数声明
```typescript
// ✅ 使用箭头函数（简单函数）
const add = (a: number, b: number): number => a + b;

// ✅ 使用函数声明（复杂函数）
function processUserData(userData: UserInfo[]): ProcessedUserData[] {
  // 复杂逻辑处理
  return processedData;
}
```

#### 参数解构
```typescript
// ✅ 使用解构参数
function createUser({ name, email, age }: CreateUserParams): User {
  return { name, email, age };
}

// ❌ 避免
function createUser(params: CreateUserParams): User {
  return { name: params.name, email: params.email, age: params.age };
}
```

### 3. 导入导出规范

#### 导入顺序
```typescript
// 1. Node.js 内置模块
import path from 'path';

// 2. 第三方库
import { ref, computed } from 'vue';
import axios from 'axios';

// 3. 项目内部模块
import { UserService } from '@/services/user';
import type { UserInfo } from '@/types/user';
```

#### 导出规范
```typescript
// ✅ 命名导出（推荐）
export const userService = new UserService();
export const getUserList = () => {};

// ✅ 默认导出（组件等）
export default defineComponent({
  name: 'UserList',
  // ...
});
```

### 4. Vue 组件规范

#### 组件结构
```vue
<template>
  <!-- 模板内容 -->
</template>

<script setup lang="ts">
// 导入
import { ref, computed } from 'vue';
import type { UserInfo } from '@/types/user';

// Props 定义
interface Props {
  userList: UserInfo[];
  loading?: boolean;
}

const props = withDefaults(defineProps<Props>(), {
  loading: false,
});

// Emits 定义
interface Emits {
  (e: 'update', user: UserInfo): void;
  (e: 'delete', id: number): void;
}

const emit = defineEmits<Emits>();

// 响应式数据
const selectedUser = ref<UserInfo | null>(null);

// 计算属性
const filteredUsers = computed(() => {
  return props.userList.filter(user => user.status === 'active');
});

// 方法
const handleUserSelect = (user: UserInfo): void => {
  selectedUser.value = user;
  emit('update', user);
};
</script>

<style scoped>
/* 样式 */
</style>
```

## 🔍 代码质量检查

### 1. ESLint 规则

#### 重要规则说明
```javascript
{
  // 导入规则
  'import/extensions': ['error', 'ignorePackages', {
    'js': 'never',
    'ts': 'never',
    'vue': 'never'
  }],

  // TypeScript 规则
  '@typescript-eslint/no-unused-vars': ['error', {
    'argsIgnorePattern': '^_',
    'varsIgnorePattern': '^_'
  }],

  // Vue 规则
  'vue/component-name-in-template-casing': ['error', 'PascalCase'],
  'vue/require-explicit-emits': 'error',
}
```

### 2. 代码检查命令

```bash
# 检查代码
npm run lint

# 自动修复
npm run lint:fix

# 检查样式
npm run lint:css

# 格式化代码
npm run format
```

## 🚀 最佳实践

### 1. 错误处理
```typescript
// ✅ 统一错误处理
try {
  const result = await apiCall();
  return result;
} catch (error) {
  console.error('API调用失败:', error);
  throw new Error('操作失败，请重试');
}
```

### 2. 类型安全
```typescript
// ✅ 严格的类型定义
interface ApiResponse<T> {
  code: number;
  data: T;
  message: string;
}

// ✅ 泛型使用
function request<T>(url: string): Promise<ApiResponse<T>> {
  return fetch(url).then(res => res.json());
}
```

### 3. 性能优化
```typescript
// ✅ 使用 computed 而不是 method
const expensiveValue = computed(() => {
  return heavyCalculation(props.data);
});

// ✅ 合理使用 watch
watch(
  () => props.userId,
  async (newId) => {
    if (newId) {
      await fetchUserData(newId);
    }
  },
  { immediate: true }
);
```

## 📋 检查清单

### 代码提交前检查
- [ ] ESLint 检查通过
- [ ] Prettier 格式化完成
- [ ] TypeScript 类型检查通过
- [ ] 单元测试通过
- [ ] 代码审查完成

### 组件开发检查
- [ ] 组件名使用 PascalCase
- [ ] Props 有完整类型定义
- [ ] Emits 有明确定义
- [ ] 添加必要的注释
- [ ] 样式使用 scoped

### 工具函数检查
- [ ] 函数有完整类型定义
- [ ] 添加 JSDoc 注释
- [ ] 提供使用示例
- [ ] 编写单元测试

## 🔧 开发工具配置

### VSCode 推荐插件
- ESLint
- Prettier
- Vetur 或 Volar
- TypeScript Importer
- Auto Rename Tag

### VSCode 设置
```json
{
  "editor.formatOnSave": true,
  "editor.codeActionsOnSave": {
    "source.fixAll.eslint": true
  },
  "typescript.preferences.importModuleSpecifier": "relative"
}
```

## 📈 优化效果

1. **代码质量提升** - 统一的代码规范和严格的类型检查
2. **开发效率提高** - 更好的IDE支持和自动化工具
3. **团队协作改善** - 一致的代码风格和规范
4. **维护成本降低** - 清晰的项目结构和文档
5. **错误减少** - 严格的类型检查和代码检查

---

*遵循 Airbnb 规范，让代码更专业、更可维护！*
