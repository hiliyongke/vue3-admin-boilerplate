# 🔧 项目优化清单

> 基于 2025-10-22 的全面代码审查

## 📊 优先级说明

- 🔴 **P0 - 严重**：必须立即修复，影响生产环境
- 🟡 **P1 - 重要**：需要尽快优化，影响开发效率
- 🟢 **P2 - 优化**：提升体验，可以逐步改进

---

## 🔴 P0 - 严重问题

### 1. 清理生产环境日志 ⚠️⚠️⚠️

**问题**：发现 30+ 处 console.log/warn/error，生产环境会暴露调试信息

**影响**：
- 安全风险（暴露内部逻辑）
- 性能影响
- 不专业

**需要修复的文件**：

```bash
# 用户模块
src/store/modules/user.ts:122,148,168
src/store/modules/permission.ts:130,136,151
src/store/modules/lock-screen.ts:85,99,102,126

# 业务页面
src/pages/list/base/index.vue:175,257,266
src/pages/list/card/index.vue:114
src/pages/list/card/components/dialog-form.vue:80
src/pages/list/components/common-table.vue:210,251,254,257,260,263
src/pages/demo/editor/index.vue:118,145
src/pages/demo/editor/packages/component.ts:56,60,65,69,73,78
src/pages/demo/rich-editor/index.vue:34
src/pages/demo/yapi/index.vue:105
src/pages/login/components/login.vue:167

# 服务层
src/services/index.ts:36
src/router/guards.ts:44
```

**修复方案**：

```typescript
// ❌ 错误示例
console.log('登录成功:', data);
console.error('登录失败:', error);

// ✅ 正确示例
import { logger } from '@/shared/utils';

logger.info('登录成功', data);
logger.error('登录失败', error);
```

**自动化修复**：

```bash
# 1. 全局搜索替换
find src -name "*.ts" -o -name "*.vue" | xargs sed -i '' 's/console\.log/logger.debug/g'
find src -name "*.ts" -o -name "*.vue" | xargs sed -i '' 's/console\.warn/logger.warn/g'
find src -name "*.ts" -o -name "*.vue" | xargs sed -i '' 's/console\.error/logger.error/g'

# 2. 手动检查并调整
pnpm lint:check
```

**验证**：
```bash
# 确保生产环境不输出日志
pnpm build:prod
# 检查 dist 目录，确保没有 console.log
```

---

### 2. 修复硬编码的敏感信息 ⚠️⚠️

**问题**：加密密钥、API 密钥等写死在代码中

**位置**：

```typescript
// src/utils/aes.ts:10
const keyStr = 'xxxx'; // ❌ 硬编码

// src/pages/user/constants.ts:4,8,24
content: 'xxxxxxx', // ❌ 占位符
```

**修复方案**：

```typescript
// ✅ 从环境变量读取
const keyStr = import.meta.env.VITE_CRYPTO_KEY || '';

if (!keyStr) {
  throw new Error('VITE_CRYPTO_KEY is not defined');
}
```

**环境变量配置**：

```bash
# .env.development
VITE_CRYPTO_KEY=dev-secret-key-12345678

# .env.production
VITE_CRYPTO_KEY=prod-secret-key-87654321
```

---

### 3. 补充核心功能测试 ⚠️⚠️

**问题**：测试覆盖率 < 5%，核心功能缺少测试

**当前状态**：
- ✅ `use-request.test.ts` - 完整
- ✅ `use-form.test.ts` - 完整
- ❌ 用户登录/登出 - 缺失
- ❌ 权限验证 - 缺失
- ❌ 路由守卫 - 缺失
- ❌ 状态持久化 - 缺失

**需要补充的测试**：

```bash
# 1. 用户模块测试
src/store/modules/__tests__/user.test.ts

# 2. 权限模块测试
src/store/modules/__tests__/permission.test.ts

# 3. 路由守卫测试
src/router/__tests__/guards.test.ts

# 4. 请求封装测试
src/shared/utils/__tests__/request.test.ts

# 5. 表格 Hook 测试
src/shared/composables/__tests__/use-table.test.ts
```

**测试模板**：

```typescript
// src/store/modules/__tests__/user.test.ts
import { describe, it, expect, beforeEach } from 'vitest';
import { setActivePinia, createPinia } from 'pinia';
import { useUserStore } from '../user';

describe('useUserStore', () => {
  beforeEach(() => {
    setActivePinia(createPinia());
  });

  it('should login successfully', async () => {
    const store = useUserStore();
    
    await store.login({
      username: 'admin',
      password: '123456',
    });

    expect(store.isLoggedIn).toBe(true);
    expect(store.userInfo).toBeDefined();
  });

  it('should logout successfully', async () => {
    const store = useUserStore();
    
    await store.login({ username: 'admin', password: '123456' });
    await store.logout();

    expect(store.isLoggedIn).toBe(false);
    expect(store.userInfo).toBeNull();
  });
});
```

**目标**：
- 单元测试覆盖率 > 80%
- E2E 测试覆盖核心流程（登录、权限、CRUD）

---

### 4. 处理 TODO/FIXME 注释 ⚠️

**问题**：代码中有未完成的功能

**位置**：

```typescript
// src/hooks/use-chart.ts:14
// TODO: resize 报错，响应式的问题，待处理

// src/pages/demo/editor/packages/codemirror.ts:52
export const focus = (view: EditorView) => view.focus(); // TODO: focus on the last word

// src/utils/ws-axios/ws-axios.ts:107
//TODO 本次请求的id，后端响应的时候需要带上本次请求的requestId
```

**修复方案**：

1. **立即修复**：如果是简单问题，直接修复
2. **创建 Issue**：如果是复杂问题，创建 GitHub Issue 跟踪
3. **删除注释**：如果不重要，删除 TODO 注释

**示例修复**：

```typescript
// ❌ 之前
export const focus = (view: EditorView) => view.focus(); // TODO: focus on the last word

// ✅ 修复后
export const focus = (view: EditorView, position?: number) => {
  view.focus();
  if (position !== undefined) {
    view.dispatch({
      selection: { anchor: position },
    });
  }
};
```

---

## 🟡 P1 - 重要问题

### 5. 统一路径别名使用 ⚠️

**问题**：配置了大量别名，但实际代码中几乎不使用

**当前配置**：

```typescript
// vite.config.ts + tsconfig.json
'@': './src',
'@api': './src/api',
'@components': './src/components',
'@utils': './src/utils',
'@types': './src/types',
'@constants': './src/constants',
'@hooks': './src/hooks',
'@store': './src/store',
// ... 还有 10+ 个
```

**实际使用情况**：
- 搜索 `import.*from ['"]@/` - 0 个结果
- 大部分代码使用相对路径 `../../`

**建议方案**：

**方案 A：简化别名（推荐）**

```typescript
// 只保留核心别名
{
  '@': './src',
  '@shared': './src/shared',
  '@features': './src/features',
  '@core': './src/core',
}
```

**方案 B：强制使用别名**

```bash
# 1. 添加 ESLint 规则
# eslint.config.mjs
{
  rules: {
    'no-restricted-imports': ['error', {
      patterns: ['../*', '../../*', '../../../*']
    }]
  }
}

# 2. 全局替换
# 使用 VSCode 的 "Replace in Files" 功能
# 或使用脚本自动替换
```

---

### 6. 完善环境变量配置 ⚠️

**问题**：缺少开发和测试环境的配置文件

**当前状态**：
- ✅ `.env.example` - 模板
- ✅ `.env.production` - 生产环境
- ❌ `.env.development` - 缺失
- ❌ `.env.test` - 缺失

**需要创建的文件**：

```bash
# .env.development
VITE_APP_TITLE=Vue3 Admin (Dev)
VITE_APP_VERSION=1.0.0
VITE_APP_ENV=development

# API 配置
VITE_API_BASE_URL=http://localhost:3000/api
VITE_API_TIMEOUT=30000

# Sentry 配置（开发环境可以不配置）
VITE_SENTRY_DSN=
VITE_SENTRY_ENVIRONMENT=development

# 性能监控
VITE_ENABLE_PERFORMANCE_MONITOR=true

# 功能开关
VITE_ENABLE_MOCK=true
VITE_ENABLE_PWA=false
VITE_ENABLE_VCONSOLE=true

# 加密密钥（开发环境使用固定密钥）
VITE_CRYPTO_KEY=dev-secret-key-12345678

# 第三方服务（开发环境可以使用测试密钥）
VITE_MAP_KEY=test-map-api-key
VITE_OSS_BUCKET=test-oss-bucket
```

```bash
# .env.test
VITE_APP_TITLE=Vue3 Admin (Test)
VITE_APP_ENV=test

# API 配置（使用 Mock 数据）
VITE_API_BASE_URL=http://localhost:3000/mock
VITE_API_TIMEOUT=10000

# 禁用外部服务
VITE_SENTRY_DSN=
VITE_ENABLE_PERFORMANCE_MONITOR=false
VITE_ENABLE_MOCK=true
VITE_ENABLE_PWA=false
VITE_ENABLE_VCONSOLE=false

# 测试密钥
VITE_CRYPTO_KEY=test-secret-key-12345678
```

---

### 7. 简化 CI/CD 配置 ⚠️

**问题**：配置文件 325 行，但很多功能不可用

**当前问题**：
- Docker 构建需要 `DOCKER_USERNAME` 和 `DOCKER_PASSWORD`（未配置）
- Lighthouse CI 未配置
- Snyk 需要 `SNYK_TOKEN`（未配置）
- 部署步骤是空的（只有 echo）

**建议方案**：

**阶段 1：基础版（立即可用）**

```yaml
# .github/workflows/ci-basic.yml
name: CI Basic

on:
  push:
    branches: [main, develop]
  pull_request:
    branches: [main, develop]

jobs:
  lint-and-test:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: pnpm/action-setup@v2
        with:
          version: 8
      - uses: actions/setup-node@v4
        with:
          node-version: '20'
          cache: 'pnpm'
      
      - run: pnpm install --frozen-lockfile
      - run: pnpm lint:check
      - run: pnpm type-check
      - run: pnpm test:coverage
      
  build:
    needs: lint-and-test
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: pnpm/action-setup@v2
      - uses: actions/setup-node@v4
        with:
          node-version: '20'
          cache: 'pnpm'
      
      - run: pnpm install --frozen-lockfile
      - run: pnpm build:prod
      
      - uses: actions/upload-artifact@v3
        with:
          name: dist
          path: dist/
```

**阶段 2：完整版（配置好 Secrets 后）**

保留原有的完整配置，但添加条件判断：

```yaml
# 只在配置了 Secrets 时运行
docker:
  if: ${{ secrets.DOCKER_USERNAME != '' }}
  
security:
  if: ${{ secrets.SNYK_TOKEN != '' }}
```

---

### 8. 规范依赖版本管理 ⚠️

**问题**：依赖版本管理混乱

**当前问题**：
- `^` 和 `~` 混用
- `pinyin: 3.0.0-alpha.5` 使用 alpha 版本
- 缺少 `engines` 严格限制

**修复方案**：

```json
// package.json
{
  "engines": {
    "node": ">=18.12.0 <21.0.0",
    "pnpm": ">=8.0.0 <9.0.0"
  },
  "packageManager": "pnpm@8.15.0",
  "dependencies": {
    // 统一使用 ^ 表示兼容版本
    "vue": "^3.5.18",
    "pinia": "^3.0.3",
    
    // 稳定版本，避免使用 alpha/beta
    "pinyin": "^2.11.2" // 改为稳定版本
  }
}
```

**添加版本检查脚本**：

```json
// package.json
{
  "scripts": {
    "preinstall": "node scripts/check-version.js"
  }
}
```

```javascript
// scripts/check-version.js
const { engines } = require('../package.json');
const semver = require('semver');

const nodeVersion = process.version;
const pnpmVersion = process.env.npm_config_user_agent?.match(/pnpm\/(\d+\.\d+\.\d+)/)?.[1];

if (!semver.satisfies(nodeVersion, engines.node)) {
  console.error(`❌ Node.js 版本不匹配！要求: ${engines.node}，当前: ${nodeVersion}`);
  process.exit(1);
}

if (pnpmVersion && !semver.satisfies(pnpmVersion, engines.pnpm)) {
  console.error(`❌ pnpm 版本不匹配！要求: ${engines.pnpm}，当前: ${pnpmVersion}`);
  process.exit(1);
}

console.log('✅ 版本检查通过');
```

---

## 🟢 P2 - 优化建议

### 9. 补充关键文档 📚

**缺失的文档**：

```bash
docs/
├── api/                    # ❌ API 接口文档
├── components/             # ❌ 组件使用文档
├── deployment/             # ❌ 部署文档
│   ├── docker.md
│   ├── nginx.md
│   └── cdn.md
├── troubleshooting/        # ❌ 故障排查
│   ├── common-errors.md
│   └── performance.md
└── best-practices/         # ❌ 最佳实践
    ├── coding-style.md
    ├── git-workflow.md
    └── testing.md
```

**建议使用 VitePress**：

```bash
# 1. 安装 VitePress（已安装）
pnpm add -D vitepress

# 2. 初始化文档
pnpm docs:dev

# 3. 编写文档
# docs/api/user.md
# docs/components/table.md
# docs/deployment/docker.md
```

---

### 10. 性能优化 🚀

**优化点**：

1. **图片压缩**

```bash
# 已安装 vite-plugin-imagemin，但未启用
# build/vite/plugins/imagemin.ts

# 启用配置
import imagemin from 'vite-plugin-imagemin';

export default imagemin({
  gifsicle: { optimizationLevel: 7 },
  optipng: { optimizationLevel: 7 },
  mozjpeg: { quality: 80 },
  pngquant: { quality: [0.8, 0.9] },
  svgo: {
    plugins: [
      { name: 'removeViewBox' },
      { name: 'removeEmptyAttrs', active: false }
    ]
  }
});
```

2. **虚拟滚动**

```bash
# 安装虚拟滚动库
pnpm add vue-virtual-scroller

# 使用示例
<template>
  <RecycleScroller
    :items="items"
    :item-size="50"
    key-field="id"
  >
    <template #default="{ item }">
      <div>{{ item.name }}</div>
    </template>
  </RecycleScroller>
</template>
```

3. **路由懒加载优化**

```typescript
// router/index.ts
const routes = [
  {
    path: '/dashboard',
    component: () => import(
      /* webpackChunkName: "dashboard" */
      '@/pages/dashboard/index.vue'
    ),
  },
];
```

---

### 11. 统一代码规范 📏

**问题**：
- 日志方式不统一（console.log vs logger.debug）
- 路径引用不统一（@/ vs 相对路径）
- 错误处理不统一

**解决方案**：

创建 `CODING_STANDARDS.md`：

```markdown
# 编码规范

## 1. 日志规范

✅ 使用统一的 logger
```typescript
import { logger } from '@/shared/utils';

logger.debug('调试信息', data);
logger.info('普通信息', data);
logger.warn('警告信息', data);
logger.error('错误信息', error);
```

❌ 禁止使用 console
```typescript
console.log('xxx'); // ❌
console.error('xxx'); // ❌
```

## 2. 路径引用规范

✅ 使用别名
```typescript
import { request } from '@/shared/utils';
import UserService from '@/services/user';
```

❌ 避免深层相对路径
```typescript
import { request } from '../../../shared/utils'; // ❌
```

## 3. 错误处理规范

✅ 统一错误处理
```typescript
try {
  await api.login(data);
} catch (error) {
  logger.error('登录失败', error);
  MessagePlugin.error(error.message || '登录失败');
  throw error; // 继续抛出，让上层处理
}
```
```

---

### 12. 添加错误边界 🛡️

**问题**：组件错误可能导致整个页面崩溃

**解决方案**：

```vue
<!-- src/components/common/error-boundary.vue -->
<template>
  <div v-if="error" class="error-boundary">
    <h2>😵 组件加载失败</h2>
    <p>{{ error.message }}</p>
    <t-button @click="reset">重试</t-button>
  </div>
  <slot v-else />
</template>

<script setup lang="ts">
import { ref, onErrorCaptured } from 'vue';
import { logger } from '@/shared/utils';

const error = ref<Error | null>(null);

onErrorCaptured((err) => {
  error.value = err;
  logger.error('组件错误', err);
  return false; // 阻止错误继续传播
});

function reset() {
  error.value = null;
}
</script>
```

**使用示例**：

```vue
<template>
  <ErrorBoundary>
    <SomeComponent />
  </ErrorBoundary>
</template>
```

---

## 📈 成功指标

### 代码质量
- [ ] 测试覆盖率 > 80%
- [ ] ESLint 错误 = 0
- [ ] TypeScript 错误 = 0
- [ ] 生产环境无 console.log

### 性能指标
- [ ] LCP < 2.5s
- [ ] FID < 100ms
- [ ] CLS < 0.1
- [ ] 首屏加载 < 3s

### 工程化指标
- [ ] CI/CD 自动化率 100%
- [ ] 部署成功率 > 95%
- [ ] 文档覆盖率 > 90%

---

## 🚀 快速行动

### 立即执行（今天）

```bash
# 1. 创建环境变量文件
cp .env.example .env.development
cp .env.example .env.test

# 2. 修复 AES 密钥
# 编辑 src/utils/aes.ts

# 3. 清理一个模块的 console.log
# 从 src/store/modules/user.ts 开始
```

### 本周完成

```bash
# 1. 补充核心测试
# 2. 处理所有 TODO
# 3. 统一路径别名
# 4. 简化 CI/CD
```

### 本月完成

```bash
# 1. 测试覆盖率 > 60%
# 2. 补充核心文档
# 3. 性能优化
# 4. 错误边界
```

---

## 📞 需要帮助？

如果在优化过程中遇到问题，可以：

1. 查看 [企业级改进建议](./ENTERPRISE_CHECKLIST.md)
2. 参考 [快速修复指南](./QUICK_FIX.md)
3. 提交 GitHub Issue

---

**最后更新**：2025-10-22  
**审查人**：AI 代码审查助手
