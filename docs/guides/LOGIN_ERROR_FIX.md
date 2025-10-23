# 🚨 登录错误修复：uncacheableRouteNames.value.has is not a function

## 问题现象

登录时报错：
```
uncacheableRouteNames.value.has is not a function
```

## 根本原因

### 技术原因

1. **Set 对象无法被 JSON 序列化**
   - `uncacheableRouteNames` 是一个 `Set<string>` 类型
   - Pinia 的 `persist: true` 会将 Store 持久化到 localStorage
   - localStorage 使用 JSON 序列化，Set 会被转换为普通对象 `{}`

2. **从 localStorage 恢复时类型错误**
   - 恢复时 `uncacheableRouteNames.value` 变成了 `{}`
   - 调用 `.has()` 方法时报错，因为普通对象没有这个方法

### 代码位置

`src/features/navigation/tabs/tab-route.store.ts`:

```typescript
// 问题代码
const uncacheableRouteNames = ref<Set<string>>(new Set(UNCACHEABLE_DEFAULT));

// ...

isAlive: !uncacheableRouteNames.value.has(String(route.name)), // ❌ 这里报错
```

## 解决方案

### ✅ 已完成修复

修改 `tab-route.store.ts` 的持久化配置，**只持久化必要的字段**：

```typescript
export const useNavigationTabStore = defineStore(
  'navigationTab',
  () => {
    // ... store 逻辑
  },
  {
    persist: {
      // 只持久化 tabs 和 activePath
      // 不持久化 Set 类型的 uncacheableRouteNames
      paths: ['tabs', 'activePath'],
    },
  } as any
);
```

### 为什么这样修复？

1. **tabs** 和 **activePath** 需要持久化
   - 用户刷新页面后保持标签页状态
   - 保持当前激活的路由

2. **uncacheableRouteNames** 不需要持久化
   - 每次应用启动时会重新初始化为默认值
   - 避免 Set 序列化问题

3. **refreshing** 不需要持久化
   - 临时状态，刷新页面后应该重置

## 清除旧缓存

如果之前已经保存了错误的数据，需要清除 localStorage：

### 方法一：浏览器控制台

```javascript
// 打开浏览器控制台（F12），执行：
localStorage.clear();
// 或者只删除特定的 key
localStorage.removeItem('navigationTab');
```

### 方法二：应用内清除

在登录页面或任意页面的控制台执行：

```javascript
// 清除所有 Pinia 持久化数据
Object.keys(localStorage).forEach(key => {
  if (key.startsWith('pinia-')) {
    localStorage.removeItem(key);
  }
});
```

### 方法三：手动清除

1. 打开浏览器开发者工具（F12）
2. 切换到 **Application** 标签
3. 左侧选择 **Local Storage** > 你的域名
4. 找到 `navigationTab` 或相关的 key
5. 右键删除

## 验证步骤

1. **清除缓存**：
   ```javascript
   localStorage.clear();
   ```

2. **刷新页面**：
   - 按 `Ctrl + Shift + R`（Windows）
   - 或 `Cmd + Shift + R`（Mac）

3. **重新登录**：
   - 输入用户名和密码
   - 点击登录
   - 确认没有报错

4. **检查 localStorage**：
   ```javascript
   // 在控制台查看持久化的数据
   console.log(localStorage.getItem('navigationTab'));
   ```

   应该看到类似：
   ```json
   {
     "tabs": [...],
     "activePath": "/dashboard/base"
   }
   ```

   **注意**：不应该包含 `uncacheableRouteNames` 字段。

## 技术说明

### Set 序列化问题

```javascript
// Set 无法被 JSON 序列化
const set = new Set(['a', 'b', 'c']);
JSON.stringify(set); // "{}"  ❌ 变成空对象

// 正确的序列化方式
JSON.stringify(Array.from(set)); // '["a","b","c"]' ✅
```

### 为什么不转换为数组？

虽然可以将 Set 转换为数组进行持久化，但：

1. **不必要**：`uncacheableRouteNames` 每次启动都会重新初始化
2. **增加复杂度**：需要自定义序列化/反序列化逻辑
3. **性能影响小**：默认值只有 `['login']`，重新初始化很快

### 持久化最佳实践

1. **只持久化必要的数据**
   - 用户配置、偏好设置
   - 需要跨会话保持的状态

2. **避免持久化复杂类型**
   - Set、Map、Date 等
   - 函数、Symbol

3. **使用 paths 选项**
   ```typescript
   persist: {
     paths: ['field1', 'field2'], // 只持久化指定字段
   }
   ```

## 相关文件

- `src/features/navigation/tabs/tab-route.store.ts` - 标签页 Store
- `src/features/navigation/tabs/tab-route.types.ts` - 类型定义
- `src/features/navigation/tabs/tab-route.utils.ts` - 工具函数

## 后续优化建议

如果确实需要持久化 `uncacheableRouteNames`，可以：

1. **自定义序列化器**：
   ```typescript
   persist: {
     serializer: {
       serialize: (state) => {
         return JSON.stringify({
           ...state,
           uncacheableRouteNames: Array.from(state.uncacheableRouteNames),
         });
       },
       deserialize: (value) => {
         const state = JSON.parse(value);
         return {
           ...state,
           uncacheableRouteNames: new Set(state.uncacheableRouteNames),
         };
       },
     },
   }
   ```

2. **使用数组代替 Set**：
   ```typescript
   const uncacheableRouteNames = ref<string[]>([...UNCACHEABLE_DEFAULT]);
   
   // 使用 includes 代替 has
   isAlive: !uncacheableRouteNames.value.includes(String(route.name))
   ```

但目前的方案（不持久化）是最简单且足够的。

---

**修复完成！** ✅

清除 localStorage 缓存后，登录应该可以正常工作了。
