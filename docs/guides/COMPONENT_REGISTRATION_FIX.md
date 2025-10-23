# TDesign 组件注册修复

## 问题描述

移除 `unplugin-vue-components` 插件后，TDesign 组件无法自动注册，导致页面上的 `<t-xxx>` 组件无法识别，页面显示异常。

## 问题原因

之前使用 `unplugin-vue-components` 插件自动注册 TDesign 组件：

```typescript
// 旧的自动注册方式（已移除）
Components({
  resolvers: [
    TDesignResolver({
      library: 'vue-next',
    }),
  ],
})
```

移除插件后，组件没有注册，导致页面无法使用 TDesign 组件。

## 解决方案

### 方案一：全局注册（已采用）✅

在 `src/plugins/custom-components.ts` 中全局注册 TDesign：

```typescript
import TDesign from 'tdesign-vue-next';
import 'tdesign-vue-next/es/style/index.css';

export function setupCustomComponents(app: App) {
  // 注册 TDesign 组件库
  app.use(TDesign);
  
  // 注册自定义组件
  app.component('JsonSchemaEditor', JsonSchemaEditor);
  app.component('SvgIcons', SvgIcon);
  app.component('BackTop', BackTop);
}
```

**优点**：
- ✅ 简单直接，一次配置全局可用
- ✅ 无需在每个组件中导入
- ✅ 与之前的使用方式一致

**缺点**：
- ⚠️ 打包体积较大（包含所有组件）
- ⚠️ 无法 Tree Shaking

### 方案二：按需导入（可选）

如果需要优化打包体积，可以按需导入组件：

```typescript
// 在需要的组件中导入
import { Button, Table, Form } from 'tdesign-vue-next';

export default {
  components: {
    TButton: Button,
    TTable: Table,
    TForm: Form,
  }
}
```

**优点**：
- ✅ 打包体积更小
- ✅ 支持 Tree Shaking

**缺点**：
- ⚠️ 需要在每个组件中手动导入
- ⚠️ 代码量增加

## 验证

启动开发服务器，检查页面是否正常显示：

```bash
pnpm dev
```

访问任意页面，确认 TDesign 组件正常渲染。

## 相关文件

- `src/plugins/custom-components.ts` - 组件注册配置
- `src/core/modules/components.ts` - 组件模块初始化
- `src/core/app.ts` - 应用启动器

## 注意事项

1. **样式导入**：TDesign 样式已在组件注册时导入，无需重复导入
2. **按需优化**：如果项目对打包体积有严格要求，建议后续改为按需导入
3. **类型支持**：TDesign 提供完整的 TypeScript 类型定义

## 后续优化建议

如果需要优化打包体积，可以考虑：

1. **使用 vite-plugin-style-import** 实现样式按需导入
2. **改为手动按需导入** 常用组件
3. **使用动态导入** 对大型组件进行代码分割

---

**修复完成！** ✅

现在 TDesign 组件已全局注册，页面应该可以正常显示了。
