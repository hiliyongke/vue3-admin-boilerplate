# [](#git-commit-message-约定)Git Commit Message 约定

## [](#目标)目标

约定 Git Commit Message 格式的目的:

- 根据 commit message 自动生成 CHANGELOG
- 忽略某些不重要 commits
- 最重要的是, 可以让 commit 信息更加易读

## [](#commit-message-格式)Commit Message 格式

```
<type>(<scope>): <subject>
<BLANK LINE>
<body>
<BLANK LINE>
<footer>


```

commit message 每一行的最大长度限制为 _100 个字符_, 这是为了避免自动换行影响美观.

每条 commit message 都包含一个 header, 一个 body 和一个 footer, 中间以一个空行隔开. header 是必须的, body 和 footer 是选填项.

### [](#message-header)Message Header

Message Header 只占一行, 用于简短地描述这次提交的内容, 包含三个字段`<type>`(必须), `<scope>`(可选) 和 `<subject>`(必须).

#### [](#type)`<type>`

`<type>` 用于描述本次 commit 更改内容的类型. 只允许使用下列 7 个标识

- `feat` : 特性 (feature)
- `fix` : 修复 bug
- `perf` : 性能 (performance)
- `refactor` : 重构 (不是新增功能，也不是修改 bug 的代码变动)
- `docs` : 文档
- `style` : 格式, 比如缩进, 丢失分号等不影响代码运行的变动
- `test` : 增加测试
- `chore` : 构建过程或辅助工具的变动
- `ci`: ci 配置文件

#### [](#scope)`<scope>`

`<scope>` 用于描述 commit 影响的范围, 比如控制层, 视图层等, 视项目不同而变

##### [](#example-scope-values)Example `<scope>` values:

- `init`
- `runner`
- `watcher`
- `config`
- `web-server`
- `proxy`
- `etc.`

> 可以为空（全局或者单一且小的模块）

#### [](#subject)`<subject>`

`<subject>`是 commit 目的的简短描述, 不超过 50 个字符

- 开头必须是动词, 使用第一人称现在时, 比如 "change", 而不是 "changed" 或 "changes"
- 首字母小写
- 结尾不加 "."

### [](#message-body)Message Body

Message Body 是对本次 commit 的详细描述

有两个要点:

1.  用第一人称现在时的动词, 比如用 "change", 而不是 "changed" 或 "changes"
2.  应该说明代码变动的动机，以及与以前行为的对比

### [](#message-footer)Message Footer

Message Footer 只用于两种情况:

#### [](#不兼容变动-breaking-changes)不兼容变动 (BREAKING CHANGES)

所有的不兼容变动必须在 Footer 中标注出, 以`BREAKING CHANGE`开头, 后面是对表动的描述, 以及变动理由和迁移方法

```
BREAKING CHANGE: isolate scope bindings definition has changed and
    the inject option for the directive controller injection was removed.

    To migrate the code follow the example below:

    Before:

    scope: {
      myAttr: 'attribute',
      myBind: 'bind',
      myExpression: 'expression',
      myEval: 'evaluate',
      myAccessor: 'accessor'
    }

    After:

    scope: {
      myAttr: '@',
      myBind: '@',
      myExpression: '&',
      // myEval - usually not useful, but in cases where the expression is assignable, you can use '='
      myAccessor: '=' // in directive's template change myAccessor() to myAccessor
    }

    The removed `inject` wasn't generaly useful for directives so there should be no code using it.
```

#### [](#关闭issue)关闭 Issue

如果当前 commit 针对某个 issue, 在 Footer 部分关闭这个 issue, 以`Closes`开头

```
Closes #123


```

也可以一次性关闭多个 issue

```
Closes #123, #124, #125
```

### [](#revert)Revert

存在一种特殊情况, 如果当前 commit 用于撤销之前的 commit, 则 commit header 的内容必须`revert:`开头, 后面跟着被撤销的 commit 的 Header. 比如:

```
revert: feat(pencil): add 'graphiteWidth' option
```

在 commit body 中, 填写`This reverts commit <hash>`, 其中`<hash>`是被撤销的 commit 的 SHA 标识符

### [](#其他)其他

- 必须使用英文撰写 message header, 不允许出现中文, 中文标点符号和汉语拼音.

可以借助 [google translate](https://translate.google.com/), [百度翻译](http://fanyi.baidu.com/)等翻译工具辅助撰写.

message body 和 footer 可以使用中文.

- 本规则主要参考了 `angular.js` 的 [Commit Message Guidelines](https://github.com/angular/angular.js/blob/master/CONTRIBUTING.md#commit), 如有理解不清楚的地方可以参考原文.
