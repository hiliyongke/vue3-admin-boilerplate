# 🚀 快速参考指南

## 📋 常用命令

### 开发

```bash
# 启动开发服务器
pnpm dev

# 启动并自动打开浏览器
pnpm dev:open

# 预览开发构建
pnpm preview

# 预览生产构建
pnpm preview:prod
```

### 构建

```bash
# 生产构建
pnpm build

# 开发构建
pnpm build:dev

# 生产构建（显式）
pnpm build:prod
```

### 代码质量

```bash
# 类型检查
pnpm type-check

# ESLint 检查
pnpm lint:check

# ESLint 自动修复
pnpm lint --fix

# CSS 检查
pnpm lint:css:check

# CSS 自动修复
pnpm lint:css --fix

# 代码格式检查
pnpm lint:prettier:check

# 代码格式化
pnpm lint:prettier

# 文件命名检查
pnpm lint:file

# 全部检查
pnpm lint:all
```

### 测试

```bash
# 运行单元测试
pnpm test:unit

# 监听模式运行测试
pnpm test:watch

# 测试覆盖率
pnpm test:coverage

# 测试 UI 界面
pnpm test:ui

# E2E 测试
pnpm test:e2e

# E2E 测试 UI
pnpm test:e2e:ui
```

### 文档

```bash
# 开发文档
pnpm docs:dev

# 构建文档
pnpm docs:build

# 预览文档
pnpm docs:serve
```

### 依赖管理

```bash
# 检查依赖更新
pnpm deps:check

# 更新所有依赖
pnpm deps:update

# 更新主版本
pnpm deps:update:major

# 更新次版本
pnpm deps:update:minor

# 更新补丁版本
pnpm deps:update:patch
```

### 版本发布

```bash
# 发布版本
pnpm release

# 发布主版本
pnpm release:major

# 发布次版本
pnpm release:minor

# 发布补丁版本
pnpm release:patch

# 生成变更日志
pnpm changelog
```

### 其他

```bash
# 代码生成
pnpm plop

# API 代码生成
pnpm api:gen

# Git 提交（使用 commitizen）
pnpm commit

# 清理
pnpm clean

# 重新安装依赖
pnpm clean:deps
```

---

## 🔧 修复脚本

### 自动修复所有问题

```bash
# 运行自动修复脚本
node scripts/fix-all-issues.js
```

**修复内容**:
- ✅ ESLint 错误
- ✅ CSS 错误
- ✅ 代码格式
- ✅ 目录命名
- ✅ 缺失依赖

---

## 📊 脚本状态

### ✅ 正常运行

- `type-check` - TypeScript 类型检查
- `lint:prettier:check` - 代码格式检查
- `docs:build` - 文档构建
- `release` - 版本发布
- `test:unit` - 单元测试
- `deps:check` - 依赖检查

### ⚠️ 需要手动修复

- `lint:check` - ESLint 检查（66 个错误）

**修复方法**:
```bash
# 查看错误
pnpm lint:check

# 自动修复
pnpm lint --fix

# 验证
pnpm lint:check
```

---

## 🎯 常见任务

### 1. 启动开发

```bash
# 1. 安装依赖
pnpm install

# 2. 启动开发服务器
pnpm dev

# 3. 打开浏览器访问 http://localhost:3000
```

### 2. 提交代码

```bash
# 1. 修改代码
# ... 编辑文件 ...

# 2. 检查代码质量
pnpm lint:all

# 3. 运行测试
pnpm test:unit

# 4. 提交代码
pnpm commit

# 5. 推送到远程
git push
```

### 3. 发布版本

```bash
# 1. 确保所有测试通过
pnpm test:unit

# 2. 构建项目
pnpm build

# 3. 发布版本
pnpm release

# 4. 推送标签
git push --tags
```

### 4. 修复 Lint 错误

```bash
# 1. 查看错误
pnpm lint:check

# 2. 自动修复
pnpm lint --fix

# 3. 手动修复剩余问题
# ... 编辑文件 ...

# 4. 验证
pnpm lint:check
```

### 5. 运行测试

```bash
# 1. 运行所有测试
pnpm test:unit

# 2. 查看覆盖率
pnpm test:coverage

# 3. 监听模式
pnpm test:watch

# 4. UI 界面
pnpm test:ui
```

---

## 🐛 故障排查

### 问题：`pnpm: command not found`

**解决**:
```bash
# 安装 pnpm
npm install -g pnpm

# 验证
pnpm --version
```

### 问题：`Node version not supported`

**解决**:
```bash
# 检查 Node 版本
node --version

# 需要 Node >= 18.12.0
# 使用 nvm 切换版本
nvm use 22
```

### 问题：`pnpm lint:check` 失败

**解决**:
```bash
# 自动修复
pnpm lint --fix

# 查看详细错误
pnpm lint:check 2>&1 | head -50

# 手动修复剩余问题
```

### 问题：`pnpm test:unit` 失败

**解决**:
```bash
# 查看详细错误
pnpm test:unit 2>&1

# 修复测试文件或实现代码
# ... 编辑文件 ...

# 重新运行
pnpm test:unit
```

### 问题：`pnpm build` 失败

**解决**:
```bash
# 1. 检查类型
pnpm type-check

# 2. 检查 lint
pnpm lint:check

# 3. 清理缓存
pnpm clean

# 4. 重新安装
pnpm install

# 5. 重新构建
pnpm build
```

---

## 📚 文档

- 📋 `SCRIPTS_VALIDATION_REPORT.md` - 脚本验证报告
- 📊 `SCRIPTS_FIX_SUMMARY.md` - 修复总结
- 🔧 `OPTIMIZATION_CHECKLIST.md` - 优化清单
- 📖 `OPTIMIZATION_SUMMARY.md` - 优化总结
- 📝 `README.md` - 项目说明

---

## 🚀 快速开始

```bash
# 1. 克隆项目
git clone <repo-url>
cd vue3-admin-boilerplate

# 2. 安装依赖
pnpm install

# 3. 启动开发
pnpm dev

# 4. 打开浏览器
# http://localhost:3000

# 5. 修改代码
# ... 编辑 src/ 目录下的文件 ...

# 6. 提交代码
pnpm commit
```

---

## 💡 最佳实践

### 1. 提交前检查

```bash
# 运行所有检查
pnpm lint:all
pnpm test:unit
```

### 2. 定期更新依赖

```bash
# 检查更新
pnpm deps:check

# 更新依赖
pnpm deps:update
```

### 3. 保持代码质量

```bash
# 定期运行
pnpm lint:all
pnpm test:coverage
```

### 4. 编写测试

```bash
# 为新功能编写测试
# src/shared/composables/__tests__/

# 运行测试
pnpm test:unit

# 查看覆盖率
pnpm test:coverage
```

---

## 📞 获取帮助

### 查看脚本列表

```bash
pnpm run
```

### 查看脚本帮助

```bash
# 查看 vite 帮助
pnpm dev --help

# 查看 eslint 帮助
pnpm lint --help

# 查看 vitest 帮助
pnpm test:unit --help
```

### 查看详细报告

```bash
# 脚本验证报告
cat SCRIPTS_VALIDATION_REPORT.md

# 修复总结
cat SCRIPTS_FIX_SUMMARY.md

# 优化清单
cat OPTIMIZATION_CHECKLIST.md
```

---

**最后更新**: 2025-10-22  
**Node 版本**: >= 18.12.0  
**pnpm 版本**: >= 8.0.0
