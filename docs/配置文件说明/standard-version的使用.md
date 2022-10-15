## 这个东西可以做什么?

- 自动升级版本
- 自动打 tag
- 自动生成 changelog

## 自动升级版本

### 版本构成

版本号  `major.minor.patch`

### 默认的版本更新规则

- feature 会更新 minor
- bug fix 会更新 patch
- BREAKING CHANGES 会更新 major

### 手动控制版本更新

#### 直接升级`major`

`package.json`

```
"scripts": {
"release-major": "standard-version --release-as major",
}
```

#### 直接升级`minor`

`package.json`

```
"scripts": {
"release-minor": "standard-version --release-as minor",
}


```

#### 直接升级`patch`

`package.json`

```
"scripts": {
"release-patch": "standard-version --release-as patch",
}


```

#### 按默认规则升级版本号

`package.json`

```
"scripts": {
"release": "standard-version",
}


```

#### 强制打一个静态版本号

`package.json`

```
"scripts": {
"release-static": "standard-version --release-as 3.3.3",
}


```

#### 第一个版本 (该方式不会升级版本号)

```
# npm run script
npm run release -- --first-release
# global bin
standard-version --first-release
# npx
npx standard-version --first-release


```

## 配置哪些 commit 消息写入 changelog

`hidden`属性值控制是否将该类型的 commit 消息写入 changlog, 不填的情况下默认是: false

`.versionrc.js`

```
module.exports = {
    "types": [
      { "type": "feat", "section": "✨ Features | 新功能" },
      { "type": "fix", "section": "🐛 Bug Fixes | Bug 修复" },
      { "type": "init", "section": "🎉 Init | 初始化" },
      { "type": "docs", "section": "✏️ Documentation | 文档" },
      { "type": "style", "section": "💄 Styles | 风格" },
      { "type": "refactor", "section": "♻️ Code Refactoring | 代码重构" },
      { "type": "perf", "section": "⚡ Performance Improvements | 性能优化" },
      { "type": "test", "section": "✅ Tests | 测试" },
      { "type": "revert", "section": "⏪ Revert | 回退", "hidden": true },
      { "type": "build", "section": "📦‍ Build System | 打包构建" },
      { "type": "chore", "section": "🚀 Chore | 构建/工程依赖/工具" },
      { "type": "ci", "section": "👷 Continuous Integration | CI 配置" }
    ]
  }
```

## 配置跳过生成 changelog 这个步骤

`package.json`

所有可配置跳过的有: `bump`, `changelog`, `commit`, `tag`

```
{
  "standard-version": {
    "skip": {
      "changelog": true
    }
  }
}


```
