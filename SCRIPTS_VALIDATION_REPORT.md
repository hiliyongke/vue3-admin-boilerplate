# 📋 脚本命令验证报告

**验证时间**: 2025-10-22  
**Node 版本**: v22.19.0  
**pnpm 版本**: 9.x  

---

## 📊 验证结果总览

| 脚本命令 | 状态 | 问题数 | 优先级 |
|---------|------|--------|--------|
| `type-check` | ✅ 通过 | 0 | - |
| `lint:check` | ❌ 失败 | 66 | 🔴 P0 |
| `lint:css:check` | ❌ 失败 | 多个 | 🔴 P0 |
| `lint:prettier:check` | ✅ 通过 | 0 | - |
| `lint:file` | ❌ 失败 | 1 | 🟡 P1 |
| `test:unit` | ❌ 失败 | 6 | 🔴 P0 |
| `test:coverage` | ❌ 失败 | 6 | 🔴 P0 |
| `deps:check` | ❌ 失败 | 1 | 🟡 P1 |
| `docs:build` | ✅ 通过 | 0 | - |
| `release` | ✅ 通过 | 0 | - |

**总体通过率**: 40% (4/10)

---

## 🔴 严重问题（P0）

### 1. **lint:check 失败 - 66 个 ESLint 错误**

**错误类型**:
- `no-useless-catch` - 不必要的 try/catch 包装
- `vue/max-attributes-per-line` - Vue 属性过多（需要换行）
- `no-unused-vars` - 未使用的变量
- `eqeqeq` - 应使用 `===` 而不是 `==`

**影响文件**:
- `src/pages/user/login/index.vue`
- `src/pages/user/register/index.vue`
- `src/pages/list/base/index.vue`
- 等多个文件

**修复方案**:
```bash
# 自动修复大部分问题
pnpm lint --fix

# 手动检查剩余问题
pnpm lint:check
```

---

### 2. **lint:css:check 失败 - Stylelint 配置错误**

**错误信息**:
```
ConfigurationError: No configuration provided for 
/Users/yorke/Desktop/cloud5/learn-code/vue3-admin-boilerplate/src/pages/detail/advanced/components/product.vue
```

**原因**: `.stylelintrc` 配置不完整或缺少某些文件的规则

**修复方案**:
```bash
# 检查 stylelint 配置
cat .stylelintrc.json

# 或创建完整配置
pnpm lint:css --fix
```

---

### 3. **test:unit 失败 - 6 个测试用例失败**

**失败的测试**:
1. `useForm > should validate field on change` - 验证逻辑错误
2. `useForm > should track submitting state` - 提交状态跟踪失败
3. `useRequest > should handle successful request` - 请求处理失败
4. `useRequest > should handle failed request` - 错误处理失败
5. `useRequest > should support auto mode` - 自动模式未执行
6. `useRequest > should handle concurrent requests correctly` - 并发请求处理错误

**根本原因**: 测试用例与实现不匹配

**修复方案**: 见下文详细修复

---

## 🟡 重要问题（P1）

### 4. **lint:file 失败 - 目录命名规范**

**错误**:
```
src/shared/composables/__tests__ failed for `.dir` rules: kebabcase
```

**原因**: 目录名 `__tests__` 不符合 kebab-case 规范

**修复方案**:
```bash
# 重命名目录
mv src/shared/composables/__tests__ src/shared/composables/tests
```

---

### 5. **deps:check 失败 - taze 未安装**

**错误**:
```
sh: taze: command not found
```

**原因**: `taze` 依赖未安装或未在 PATH 中

**修复方案**:
```bash
# 安装 taze
pnpm add -D taze

# 或使用 npx
npx taze
```

---

## ✅ 通过的脚本

### ✓ type-check
- 状态: 通过
- 说明: TypeScript 类型检查无错误

### ✓ lint:prettier:check
- 状态: 通过
- 说明: 代码格式符合 Prettier 规范

### ✓ docs:build
- 状态: 通过
- 说明: VitePress 文档构建成功

### ✓ release
- 状态: 通过
- 说明: standard-version 可用

---

## 🔧 快速修复方案

### **方案 A：自动修复（推荐）**

```bash
# 1. 修复 ESLint 错误
pnpm lint --fix

# 2. 修复 CSS 错误
pnpm lint:css --fix

# 3. 修复代码格式
pnpm lint:prettier --write "src/**/*.{vue,js,jsx,ts,tsx,json,css,scss,less}"

# 4. 重命名目录
mv src/shared/composables/__tests__ src/shared/composables/tests

# 5. 安装缺失依赖
pnpm add -D taze

# 6. 验证所有脚本
pnpm type-check
pnpm lint:check
pnpm lint:css:check
pnpm lint:file
```

**预计时间**: 15 分钟

---

### **方案 B：分步修复**

#### 第 1 步：修复 ESLint 错误

```bash
# 查看详细错误
pnpm lint:check 2>&1 | head -50

# 自动修复
pnpm lint --fix

# 验证
pnpm lint:check
```

#### 第 2 步：修复 CSS 错误

```bash
# 查看详细错误
pnpm lint:css:check 2>&1

# 自动修复
pnpm lint:css --fix

# 验证
pnpm lint:css:check
```

#### 第 3 步：修复目录命名

```bash
# 重命名目录
mv src/shared/composables/__tests__ src/shared/composables/tests

# 更新导入路径（如果有的话）
grep -r "__tests__" src/ --include="*.ts" --include="*.vue"

# 验证
pnpm lint:file
```

#### 第 4 步：修复测试

```bash
# 运行测试查看详细错误
pnpm test:unit 2>&1

# 修复测试文件（见下文）
# 然后重新运行
pnpm test:unit
```

#### 第 5 步：安装缺失依赖

```bash
# 安装 taze
pnpm add -D taze

# 验证
pnpm deps:check
```

---

## 📝 详细修复指南

### 修复 1：ESLint 错误

**常见错误及修复**:

1. **`no-useless-catch`** - 不必要的 try/catch
   ```typescript
   // ❌ 错误
   try {
     // ...
   } catch (e) {
     throw e;  // 直接抛出，没有处理
   }

   // ✅ 正确
   try {
     // ...
   } catch (e) {
     logger.error('Error:', e);
     throw e;
   }
   ```

2. **`vue/max-attributes-per-line`** - 属性过多需要换行
   ```vue
   <!-- ❌ 错误 -->
   <t-input v-model="form.email" type="email" @blur="handleBlur" @change="handleChange" />

   <!-- ✅ 正确 -->
   <t-input
     v-model="form.email"
     type="email"
     @blur="handleBlur"
     @change="handleChange"
   />
   ```

3. **`no-unused-vars`** - 移除未使用的变量
   ```typescript
   // ❌ 错误
   const props = defineProps({...});  // 定义但未使用

   // ✅ 正确
   // 删除未使用的定义，或在模板中使用
   ```

4. **`eqeqeq`** - 使用严格相等
   ```typescript
   // ❌ 错误
   if (status == 200) { }

   // ✅ 正确
   if (status === 200) { }
   ```

**自动修复**:
```bash
pnpm lint --fix
```

---

### 修复 2：Stylelint 配置

**检查配置文件**:
```bash
# 查看 stylelint 配置
cat .stylelintrc.json

# 或查看 package.json 中的 stylelint 配置
grep -A 20 "stylelint" package.json
```

**常见问题**:
- 配置文件不完整
- 某些文件类型缺少规则
- 插件未正确加载

**修复**:
```bash
# 自动修复
pnpm lint:css --fix

# 如果仍有问题，检查配置
pnpm lint:css:check 2>&1 | head -20
```

---

### 修复 3：测试失败

**失败的测试分析**:

1. **useForm 验证测试失败**
   - 原因: 验证规则未正确应用
   - 修复: 更新测试用例或实现

2. **useRequest 测试失败**
   - 原因: 异步处理或 mock 不正确
   - 修复: 调整 mock 或等待时间

**修复步骤**:
```bash
# 1. 查看详细错误
pnpm test:unit 2>&1 | grep -A 10 "FAIL"

# 2. 修复测试文件
# 编辑 src/shared/composables/__tests__/use-form.test.ts
# 编辑 src/shared/composables/__tests__/use-request.test.ts

# 3. 重新运行
pnpm test:unit
```

---

### 修复 4：目录命名

```bash
# 重命名目录
mv src/shared/composables/__tests__ src/shared/composables/tests

# 更新所有导入（如果有的话）
find src -name "*.ts" -o -name "*.vue" | xargs grep -l "__tests__" | xargs sed -i '' 's/__tests__/tests/g'

# 验证
pnpm lint:file
```

---

### 修复 5：安装缺失依赖

```bash
# 安装 taze
pnpm add -D taze

# 验证
pnpm deps:check
```

---

## 🎯 完整修复脚本

创建 `scripts/fix-all-scripts.sh`:

```bash
#!/bin/bash

echo "🔧 开始修复所有脚本问题..."
echo ""

# 1. 修复 ESLint
echo "1️⃣  修复 ESLint 错误..."
pnpm lint --fix
echo "✅ ESLint 修复完成"
echo ""

# 2. 修复 CSS
echo "2️⃣  修复 CSS 错误..."
pnpm lint:css --fix
echo "✅ CSS 修复完成"
echo ""

# 3. 修复代码格式
echo "3️⃣  修复代码格式..."
pnpm lint:prettier --write "src/**/*.{vue,js,jsx,ts,tsx,json,css,scss,less}"
echo "✅ 代码格式修复完成"
echo ""

# 4. 重命名目录
echo "4️⃣  重命名目录..."
if [ -d "src/shared/composables/__tests__" ]; then
  mv src/shared/composables/__tests__ src/shared/composables/tests
  echo "✅ 目录重命名完成"
else
  echo "⚠️  目录已存在或不需要重命名"
fi
echo ""

# 5. 安装缺失依赖
echo "5️⃣  安装缺失依赖..."
pnpm add -D taze
echo "✅ 依赖安装完成"
echo ""

# 6. 验证
echo "6️⃣  验证所有脚本..."
echo ""
echo "检查 type-check..."
pnpm type-check && echo "✅ type-check 通过" || echo "❌ type-check 失败"
echo ""

echo "检查 lint:check..."
pnpm lint:check && echo "✅ lint:check 通过" || echo "❌ lint:check 失败"
echo ""

echo "检查 lint:css:check..."
pnpm lint:css:check && echo "✅ lint:css:check 通过" || echo "❌ lint:css:check 失败"
echo ""

echo "检查 lint:file..."
pnpm lint:file && echo "✅ lint:file 通过" || echo "❌ lint:file 失败"
echo ""

echo "检查 test:unit..."
pnpm test:unit && echo "✅ test:unit 通过" || echo "❌ test:unit 失败"
echo ""

echo "检查 deps:check..."
pnpm deps:check && echo "✅ deps:check 通过" || echo "❌ deps:check 失败"
echo ""

echo "🎉 修复完成！"
```

**使用方法**:
```bash
chmod +x scripts/fix-all-scripts.sh
./scripts/fix-all-scripts.sh
```

---

## 📋 修复清单

- [ ] 运行 `pnpm lint --fix` 修复 ESLint 错误
- [ ] 运行 `pnpm lint:css --fix` 修复 CSS 错误
- [ ] 重命名 `__tests__` 目录为 `tests`
- [ ] 安装 `taze` 依赖
- [ ] 修复失败的测试用例
- [ ] 验证 `pnpm lint:check` 通过
- [ ] 验证 `pnpm lint:css:check` 通过
- [ ] 验证 `pnpm lint:file` 通过
- [ ] 验证 `pnpm test:unit` 通过
- [ ] 验证 `pnpm deps:check` 通过

---

## 📊 预期修复效果

| 指标 | 修复前 | 修复后 |
|------|--------|--------|
| 脚本通过率 | 40% | 100% |
| ESLint 错误 | 66 | 0 |
| 测试失败 | 6 | 0 |
| 缺失依赖 | 1 | 0 |

---

## 🚀 后续优化

1. **添加 pre-commit 钩子** - 自动运行 lint 检查
2. **添加 CI/CD 流程** - 自动运行所有脚本
3. **补充测试覆盖率** - 提升到 80%+
4. **文档完善** - 添加脚本使用说明

---

## 📞 问题排查

如果修复后仍有问题，请检查:

1. **Node 版本**: `node --version` (需要 >= 18.12.0)
2. **pnpm 版本**: `pnpm --version` (需要 >= 8.0.0)
3. **依赖完整性**: `pnpm install` 重新安装
4. **缓存问题**: `pnpm store prune` 清理缓存

---

**生成时间**: 2025-10-22  
**验证工具**: Node v22.19.0, pnpm 9.x
