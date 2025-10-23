# 🚨 快速修复指南

如果遇到登录或页面显示问题，请按以下步骤操作：

## 1️⃣ 清除浏览器缓存

打开浏览器控制台（按 F12），执行：

```javascript
localStorage.clear();
```

然后刷新页面（Ctrl + Shift + R 或 Cmd + Shift + R）。

## 2️⃣ 确认 Node.js 版本

```bash
node -v
```

如果版本低于 18，请升级：

```bash
nvm use 18
# 或
nvm use 20
```

## 3️⃣ 重新安装依赖

```bash
pnpm install
```

## 4️⃣ 启动开发服务器

```bash
pnpm dev
```

## 常见问题

### ❌ 页面显示异常（组件不显示）

**原因**：TDesign 组件未注册

**解决**：已在 `src/plugins/custom-components.ts` 中修复，清除缓存后刷新即可。

### ❌ 登录报错：has is not a function

**原因**：localStorage 中保存了错误的 Set 对象

**解决**：
```javascript
localStorage.clear();
```

### ❌ pnpm 命令报错

**原因**：Node.js 版本过低

**解决**：
```bash
nvm use 18
```

## 详细文档

- [页面显示问题修复](./docs/guides/URGENT_FIX_SUMMARY.md)
- [登录错误修复](./docs/guides/LOGIN_ERROR_FIX.md)
- [组件注册详细说明](./docs/guides/COMPONENT_REGISTRATION_FIX.md)

---

**如果问题仍未解决，请查看详细文档或联系开发团队。**
