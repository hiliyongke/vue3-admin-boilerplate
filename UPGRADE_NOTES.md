# 依赖升级和优化说明

## 主要变更

### 1. 移除的多余依赖

#### 开发依赖中移除：
- `@commitlint/types` - 不需要单独安装类型定义
- `@types/jest` - 已切换到 Vitest，不再需要 Jest 类型
- `babel-jest` - 已切换到 Vitest，不再需要 Babel Jest
- `commitlint` - 重复依赖，已有 `@commitlint/cli`
- `commitlint-config-cz` - 使用标准的 conventional 配置
- `cz-customizable` - 简化为标准的 conventional changelog
- `eslint-config-airbnb-base` - 简化 ESLint 配置
- `eslint-config-airbnb-typescript` - 简化 ESLint 配置
- `eslint-define-config` - 不再需要
- `eslint-plugin-import` - 简化配置
- `eslint-plugin-vuejs-accessibility` - 可选的无障碍插件
- `inquirer` - 项目中未使用
- `jest` - 已切换到 Vitest
- `ora` - 项目中未使用
- `semver` - 项目中未使用
- `swagger-typescript-api` - 项目中未使用
- `ts-jest` - 已切换到 Vitest
- `ts-node` - 项目中未使用
- `vite-plugin-progress` - 可选插件
- `vite-plugin-vconsole` - 开发时可选
- `vue-jest` - 已切换到 Vitest

#### 生产依赖中移除：
- `@toast-ui/editor` - 项目中未实际使用
- `csstype` - Vue 3 已内置类型支持
- `mockjs` - 开发时模拟数据，生产环境不需要
- `plop` - 代码生成工具，应该放在 devDependencies
- `vconsole` - 调试工具，生产环境不需要

### 2. 新增的依赖

#### 开发依赖：
- `@commitlint/cli` - Commitlint 命令行工具
- `@commitlint/config-conventional` - 标准的提交信息配置
- `@vitest/coverage-v8` - Vitest 代码覆盖率
- `@vitest/ui` - Vitest UI 界面
- `jsdom` - Vitest 测试环境
- `vitest` - 现代化测试框架，替代 Jest
- `taze` - 依赖更新工具
- `conventional-changelog-cli` - 生成变更日志

### 3. 版本升级

所有依赖都已升级到最新稳定版本：

#### 主要框架升级：
- `vue`: `^3.5.13` (最新版本)
- `vue-router`: `^4.5.0`
- `pinia`: `^2.2.6`
- `vite`: `^6.0.3`
- `typescript`: `^5.7.2`

#### UI 框架升级：
- `tdesign-vue-next`: `^1.10.4`
- `@vueuse/core`: `^11.2.0`

#### 工具库升级：
- `axios`: `^1.7.9`
- `dayjs`: `^1.11.13`
- `echarts`: `^5.5.1`
- `lodash-es`: `^4.17.21`

### 4. 配置优化

#### package.json 优化：
- 添加 `"type": "module"` 支持 ES 模块
- 添加 `"packageManager"` 指定 pnpm 版本
- 简化 scripts，移除未使用的脚本
- 优化 commitizen 配置为标准配置
- 更新 engines 要求

#### 测试框架切换：
- 从 Jest 切换到 Vitest
- 更好的 Vite 集成
- 更快的测试执行速度
- 内置 TypeScript 支持

## 升级后的优势

1. **性能提升**：所有依赖都是最新版本，包含性能优化和 bug 修复
2. **安全性**：修复了已知的安全漏洞
3. **包体积减小**：移除了未使用的依赖，减少了 node_modules 大小
4. **开发体验**：使用 Vitest 提供更好的测试体验
5. **维护性**：简化了配置，更容易维护

## 需要注意的变更

1. **测试框架变更**：如果有现有的 Jest 测试，需要迁移到 Vitest
2. **ESLint 配置**：可能需要调整 ESLint 配置文件
3. **Commitizen 配置**：提交信息格式可能有细微变化
4. **构建配置**：某些 Vite 插件可能需要配置调整

## 建议的后续操作

1. 删除 `node_modules` 和 `pnpm-lock.yaml`
2. 运行 `pnpm install` 重新安装依赖
3. 运行 `pnpm run typecheck` 检查类型错误
4. 运行 `pnpm run lint` 检查代码规范
5. 运行 `pnpm run build` 确保构建正常
6. 如有测试文件，需要迁移到 Vitest 格式
