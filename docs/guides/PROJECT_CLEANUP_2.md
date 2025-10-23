# 🗑️ 项目清理 - 第二轮

## 清理目标

移除项目中无用的文件夹和过时的配置，保持项目结构清晰。

---

## 🔍 发现的无用文件

### 1. `libs/` 文件夹 ❌

**问题**：
- 没有被项目引用
- 功能与 `src/shared/utils/` 重复
- `libs/ui` 只有配置文件，没有实际组件

**内容**：
```
libs/
├── ui/
│   └── package.json          # 空的 UI 组件库配置
└── utils/
    └── src/
        └── modern-utils.ts   # 与 src/utils 重复
```

**决定**：✅ 删除

---

### 2. `gulp/` 文件夹 ⚠️

**问题**：
- 使用旧的 Gulp 部署方式
- 已被 CI/CD 流程替代
- 配置中包含硬编码的服务器信息（安全隐患）

**内容**：
```
gulp/
├── gulpfile.config.ts        # Gulp 配置
└── gulpfile.ts               # Gulp 任务
```

**决定**：⚠️ 建议删除（如果不再使用 Gulp 部署）

---

### 3. `test/` 文件夹 ⚠️

**问题**：
- 只有一个 `setup.ts` 文件
- 新的测试都在 `tests/` 和 `src/**/__tests__/` 中

**内容**：
```
test/
└── setup.ts                  # 测试设置文件
```

**决定**：⚠️ 保留（Vitest 配置中引用了）

---

## ✅ 已执行的清理

### 1. 删除 `libs/` 文件夹

```bash
rm -rf libs/
```

**影响**：
- 无影响（没有被引用）

---

### 2. 更新 `pnpm-workspace.yaml`

**修改前**：
```yaml
packages:
  - 'packages/*'
  - 'apps/*'
  - 'libs/*'
```

**修改后**：
```yaml
packages:
  - 'packages/*'
```

**说明**：
- 移除了 `apps/*`（不存在）
- 移除了 `libs/*`（已删除）

---

## 🤔 建议清理的内容

### 1. Gulp 相关 ⚠️

如果不再使用 Gulp 部署，建议删除：

```bash
# 删除 gulp 文件夹
rm -rf gulp/

# 卸载 gulp 依赖
pnpm remove gulp gulp-ssh -w
```

**替代方案**：
- 使用 GitHub Actions CI/CD（已配置）
- 使用 Docker 部署（已配置）

---

### 2. Jest 相关 ⚠️

项目已切换到 Vitest，可以删除 Jest 配置：

```bash
# 删除 jest 配置
rm -f jest.config.ts

# 卸载 jest 依赖
pnpm remove jest @types/jest babel-jest ts-jest vue-jest -w
```

---

### 3. 旧的文档 ⚠️

一些临时的重构文档可以归档：

```bash
# 移动到归档目录
mkdir -p docs/archive
mv QUICK_FIX.md docs/archive/
mv ENTERPRISE_CHECKLIST.md docs/archive/
```

---

## 📊 清理效果

### 删除的文件

| 文件/文件夹 | 大小 | 状态 |
|------------|------|------|
| `libs/` | ~10KB | ✅ 已删除 |
| `pnpm-workspace.yaml` | 更新 | ✅ 已更新 |

### 建议删除的文件

| 文件/文件夹 | 大小 | 原因 |
|------------|------|------|
| `gulp/` | ~6KB | 已被 CI/CD 替代 |
| `jest.config.ts` | ~1KB | 已切换到 Vitest |

---

## 🎯 清理后的目录结构

```
vue3-admin-boilerplate/
├── .github/              # GitHub Actions
├── build/                # 构建配置
├── docs/                 # 文档
├── mock/                 # Mock 数据
├── packages/             # Monorepo 包
├── plop-tpls/           # 代码模板
├── public/              # 静态资源
├── scripts/             # 脚本
├── src/                 # 源代码
├── tests/               # 测试
│   ├── e2e/            # E2E 测试
│   └── unit/           # 单元测试（可选）
├── types/               # 类型定义
├── package.json
├── vite.config.ts
├── vitest.config.ts
├── playwright.config.ts
└── ...
```

---

## 🚀 下一步建议

### 立即执行

1. **确认是否使用 Gulp**：
   - 如果不使用，删除 `gulp/` 文件夹
   - 如果使用，保留但更新配置

2. **清理 Jest 配置**：
   - 删除 `jest.config.ts`
   - 卸载 Jest 相关依赖

### 可选执行

3. **归档临时文档**：
   - 将临时文档移到 `docs/archive/`
   - 保持根目录清爽

4. **清理 node_modules**：
   ```bash
   pnpm clean:deps
   ```

---

## 📝 清理清单

- [x] 删除 `libs/` 文件夹
- [x] 更新 `pnpm-workspace.yaml`
- [ ] 删除 `gulp/` 文件夹（待确认）
- [ ] 删除 `jest.config.ts`（待确认）
- [ ] 卸载 Jest 依赖（待确认）
- [ ] 归档临时文档（可选）

---

## ⚠️ 注意事项

1. **备份重要文件**：
   - 删除前确保没有重要配置
   - 可以先提交到 Git

2. **检查依赖**：
   - 删除文件夹前检查是否被引用
   - 使用 `grep -r "folder-name" .` 搜索

3. **测试验证**：
   - 清理后运行测试
   - 确保项目正常运行

---

## 📚 相关文档

- [项目清理总结](./PROJECT_CLEANUP.md) - 第一轮清理
- [企业级改进建议](./ENTERPRISE_IMPROVEMENTS.md) - 改进方案

---

**清理时间**: 2025-10-22  
**清理内容**: libs/ 文件夹 + pnpm-workspace.yaml  
**下一步**: 确认是否删除 gulp/ 和 jest 配置
