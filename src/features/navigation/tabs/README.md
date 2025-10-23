# 导航标签（Tabs Navigation）领域模块

该模块负责主布局中的多标签页导航功能，提供统一的状态管理、业务服务以及向后兼容的持久化迁移能力。

## 目录结构

```
src/features/navigation/tabs/
├── index.ts                  # 模块出口
├── tab-route.guard.ts        # 路由守卫，监听路由变更
├── tab-route.migrator.ts     # 旧版 tabs-router 数据迁移
├── tab-route.service.ts      # 业务服务，封装导航行为
├── tab-route.store.ts        # Pinia Store，管理标签状态
├── tab-route.types.ts        # 类型定义
└── tab-route.utils.ts        # 工具方法
```

## 功能特点

- **领域化 Store**：`useNavigationTabStore` 使用强类型、可扩展的状态结构（包含 `tabs`、`activePath`、`uncacheableRouteNames` 等），支持刷新、批量关闭、初始化等核心操作。
- **业务服务封装**：`createNavigationTabService` 将路由监听、标签刷新、批量关闭行为封装为独立服务，方便在视图层按需组合。
- **路由守卫集成**：`setupTabRouteGuard` 在路由完成后自动附加标签，保持与路由系统同步。
- **向后兼容迁移**：`migrateLegacyTabState` 会在初始化时读取旧版 `tabs-router` 的持久化数据并转换为新格式，保证升级过程平滑。
- **配置化缓存控制**：通过 `uncacheableRouteNames` 控制 `keep-alive` include 列表，结合 `calcIncludeNames` 自动计算需要缓存的组件名称。

## 新旧对比

| 能力                     | 旧版 `tabs-router`             | 新版 `navigation/tabs`               |
|--------------------------|--------------------------------|-------------------------------------|
| 标签数据结构             | `TRouterInfo`（弱类型，字段冗余）| `NavigationTab`（强类型，字段清晰）  |
| 缓存控制                 | 基于黑名单数组                 | 基于 `Set` + `keepAlive` 元信息       |
| 刷新实现                 | 直接 toggle `isAlive`           | Promise + `requestAnimationFrame`    |
| 批量关闭                 | 逻辑散落在组件中               | `closeTabs` 工具集中处理             |
| 路由监听方式             | 主布局 watch route.path         | Service + Guard 双重保障             |
| 向后兼容                 | 无                               | `tab-route.migrator` 自动迁移        |
| 持久化结构               | 多字段混杂                      | 自定义 `serialize/deserialize`       |

## 使用方式

### 1. 初始化（在路由模块中）

```ts
import { setupRouterGuard } from '@/router/guards';
import { setupTabRouteGuard } from '@/features/navigation/tabs';

export async function setupRouter(app: App) {
  app.use(router);
  setupRouterGuard(router);
  setupTabRouteGuard(router);
  await router.isReady();
}
```

### 2. 布局组件中使用

```ts
const tabStore = useNavigationTabStore();
const navigationService = createNavigationTabService(router);

onMounted(() => {
  navigationService.initialize();
});
```

### 3. KeepAlive Include 列表

```ts
const aliveViews = computed(() => tabStore.includeNames);
```

## 迁移步骤

1. **保留旧数据**：新模块会自动读取 `__persisted__tabsRouter` 并转换，无需手动迁移。
2. **删除旧 Store**：代码层面移除了 `src/store/modules/tabs-router.ts` 及相关类型。
3. **替换引用**：所有使用 `useTabsRouterStore` 的位置改为使用新模块导出的 Store/Service。

## 后续计划

- 接入权限/动态路由逻辑，使得 `permissionStore` 初始化时自动注入标签。
- 提供更细粒度的事件钩子（如标签关闭、刷新前后事件）。
- 编写 Vitest 测试覆盖核心功能。
```
