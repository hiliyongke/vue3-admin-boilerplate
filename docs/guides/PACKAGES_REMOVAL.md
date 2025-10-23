# 📦 packages 目录移除说明

## 背景

原项目包含 `packages/` 目录，存放了以下子包：

- `packages/itools` - 自定义工具库
- `packages/logger` - 自定义日志库
- `packages/indexeddb-helper` - IndexedDB 辅助库
- `packages/deploy-cli` - 部署 CLI 工具

经过排查，这些子包在主应用中**仅用于内联引入源代码**，且存在更现代、更轻量的原生实现。为降低维护成本、减少依赖复杂度，我们将这些子包的功能迁移进主应用或移除不用的部分，最终删除 `packages/` 目录。

---

## 处理步骤

### 1. 功能迁移

#### 1.1 itools
- **原用途**：通过 `app.config.globalProperties.$itools` 暴露全局工具库
- **处理方案**：移除依赖，保留 VueUse 和内置工具即可
- **变更文件**：
  - `src/plugins/global-properties.ts` 移除 `$itools`

#### 1.2 logger
- **原用途**：自定义前端日志系统
- **处理方案**：已存在新的 TypeScript 版 `src/shared/utils/logger.ts`，直接使用
- **变更文件**：
  - `src/plugins/logger.ts` 改为使用内置 logger，并支持配置上报
  - `package.json` 移除 workspace 依赖

#### 1.3 indexeddb-helper
- **原用途**：旧的 IndexedDB 工具
- **处理方案**：未被引用，直接移除

#### 1.4 deploy-cli
- **原用途**：老旧的部署 CLI
- **处理方案**：功能已由 GitHub Actions + Docker 取代，直接移除

---

### 2. 依赖与配置清理

- 移除 `package.json` 中的 `workspace:*` 依赖
- 更新 `pnpm-workspace.yaml`，去掉 `packages/*`
- 更新 `tsconfig.json` 的 `exclude` 配置
- 删除 `packages/` 目录

---

## 变更摘要

| 文件 | 变更说明 |
|------|----------|
| `src/plugins/global-properties.ts` | 移除 `$itools` 
| `src/plugins/logger.ts` | 改用内置 `logger` 模块 |
| `package.json` | 删除 `itools` 和 `logger` 依赖、移除 `start:*` 脚本 |
| `pnpm-workspace.yaml` | 仅保留 `packages/*`（已清理在上一轮） |
| `tsconfig.json` | 删除 `packages/**` 排除项 |
| `packages/` | 整个目录删除 |
| `docs/guides/PROJECT_CLEANUP_2.md` | 已记录相关内容 |
| `docs/guides/PACKAGES_REMOVAL.md` | 新增此文档 |

---

## 验证

1. 运行单元测试：
   ```bash
   pnpm test:unit
   ```
2. 运行 E2E 测试：
   ```bash
   pnpm test:e2e
   ```
3. 启动开发环境：
   ```bash
   pnpm dev
   ```

---

## 保障措施

- 移除前已确认无外部引用
- 新的 `logger` 模块功能更强大、类型更完善
- VueUse 提供的工具函数足够覆盖原 `itools`
- 构建、测试命令均通过验证

---

## 下一步建议

- 如果需要额外的工具函数，可整理到 `src/shared/utils/` 下
- 日志上报可结合 Sentry 或自定义上报接口
- 若未来需要发布独立 npm 包，再重新引入 Monorepo 结构

---

**移除完成时间**: 2025-10-22  
**移除内容**: `packages/` 目录及关联配置  
**状态**: ✅ 完成
