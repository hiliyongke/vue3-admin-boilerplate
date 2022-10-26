# Git 规范

作为一个开发人员必不可少的工具，代码提交日常一个非常频繁的操作，而对于团队规范建设来说，`Git` 提交信息的规范是一件很有必要的工作。

**为什么要规范提交信息**
首先规范提交信息肯定是有必要的，简单总结下几点好处：

- 让项目的维护或使用人员能了解提交了哪些更改
- 清晰的历史记录，可能某天自己就需要查到呢
- 规范的提交记录可用于自动生成修改日志(`CHANGELOG.MD`)
- 基于提交类型，触发构建和部署流程

**使用什么规范**
`Conventional Commits`(约定式提交规范)，是目前使用最广泛的提交信息规范，其主要受 [`AngularJS`](https://github.com/angular/angular.js/blob/master/DEVELOPERS.md#-git-commit-guidelines) 规范 的启发,下面是一个规范信息的结构：

```
<type>[optional scope]: <subject>
//空一行
[optional body]
//空一行
[optional footer(s)]
```

**规范说明**
type 提交的类别，必须是以下类型中的一个

```
feat：新增功能（feature）
fix：修复 bug
docs：文档变更
style：代码格式（不影响功能，例如空格，格式，缺少分号等修正）
refactor：代码重构，（既不是新增功能，也不是修复bug的代码变动）
perf：改进性能
test：增加测试或更新已有的测试
chore：构建或辅助工具或依赖库的更新
build: 构建编译相关的变动或打包
revert：回滚提交
ci: CI配置文件和脚本的更改（示例范围：Travis，Circle，BrowserStack，SauceLabs）
```

- scope 可选，表示影响的范围、功能、模块
- subject 必填，简单说明，不超过 50 个字
- body 选填，用于填写更详细的描述
- footer 选填，用于填关联 issus,或 BREAK CHANGE
- BREAKING CHANGE, 必须是大写，表示引入了破坏性 API 变更，通常是一个大版本的改动，BREAKING CHANGE: 之后必须提供描述，下面一个包含破坏性变更的提交示例

更详细的说明请看 [约定式提交规范](https://www.conventionalcommits.org/zh-hans/v1.0.0-beta.4/#%e7%ba%a6%e5%ae%9a%e5%bc%8f%e6%8f%90%e4%ba%a4%e8%a7%84%e8%8c%83)

## 约定式提交规范

怎么确保每个提交都能符合规范呢，最好的方式就是通过工具来生成和校验，`commitizen` 是一个 `nodejs` 命令行工具，通过交互的方式，生成符合规范的 `git commit`，界面如下：

```bash
➜  OS-admin git:(develop) ✗ git cz
cz-cli@4.2.3, cz-conventional-changelog@3.2.0

? Select the type of change that you're committing: (Use arrow keys)
❯ feat:     A new feature
  fix:      A bug fix
  docs:     Documentation only changes
  style:    Changes that do not affect the meaning of the code (white-space, for
matting, missing semi-colons, etc)
  refactor: A code change that neither fixes a bug nor adds a feature
  perf:     A code change that improves performance
(Move up and down to reveal more choices)

```

1. 校验提交说明是否符合规范，安装校验工具 [`commitlint`](https://github.com/conventional-changelog/commitlint)：

```bash
# 全局安装commitizen，本地安装 git-cz
npm install -g commitizen
npm install --save-dev git-cz

# 或者本地安装
npm install --save-dev commitizen git-cz
```

安装完成后可以使用 `git cz` 或者 `git-cz` 来代替 `git commit`,然后根据提示一步步输入即可

```bash
# Install commitlint cli and conventional config
npm install --save-dev @commitlint/{config-conventional,cli}
# For Windows:
npm install --save-dev @commitlint/config-conventional @commitlint/cli
```

2. 配置 `.commitlintrc.js`

```js
module.exports = {
  extends: ['@commitlint/config-conventional'],
  rules: {
    // 其他规则可自定义
  },
};
```

4. `package.json`增加相关配置

```bash
"config": {
  "commitizen": {
    "path": "git-cz"
  }
}
```

4. 测试提交规范

```bash
➜  OS-admin git:(develop) ✗ git add .
➜  OS-admin git:(develop) ✗ git commit -m "完善Git规范使用文档"
 > running pre-commit hook: lint-staged
No staged files match any of provided globs.
 > running commit-msg hook: commitlint -e $HUSKY_GIT_PARAMS
⧗   input: 完善Git规范使用文档
✖   subject may not be empty [subject-empty]
✖   type may not be empty [type-empty]

✖   found 2 problems, 0 warnings
ⓘ   Get help: https://github.com/conventional-changelog/commitlint/#what-is-commitlint


commit-msg hook failed (add --no-verify to bypass)
```

每次`git commit`提交，都会检查提交信息是否规范。上述提交缺少了提交类型，就终止此次代码提交。

## 预提交检查（hook）

什么是预提交检查 `(pre-commit)` 预提交检查在提交更改并运行 `git commit` 之后和完成提交之前运行。如果检查失败，则不进行提交并显示错误，而如果所有检查都通过，则正常进行提交。

- 可以在 `git commit` 之前检查代码，保证所有提交到版本库中的代码都是符合规范的
- 可以在 `git push` 之前执行单元测试,保证所有的提交的代码经过的单元测试
- `Commitlint` 可以规范 `git commit -m ""` 中的描述信息

**`husky` 和 `lint-staged` 钩子校验**

- [`husky`](https://github.com/typicode/husky) 是控制代码提交的钩子，在代码被提交到 Git 仓库之前，我们可以在这里做一些预检查，提供代码质量。并且可以让我们向项目中方便添加 `git hooks`
- [`lint-staged`](https://github.com/okonet/lint-staged) 对暂存的 `git` 文件运行 `linters`检查，不要让 💩 进入您的代码库！

1. 安装依赖

```bash
npm i husky lint-staged @commitlint/cli @commitlint/config-conventional --save-dev
```

2. 在`package.json`添加配置脚本

- `prepare` 脚本会在 `npm install`(不带参数)之后自动执行
- 当我们执行 `npm install` 安装完项目依赖后会执行 `husky install` 命令，该命令会创建`.husky/`目录并指定该目录为 `git hooks` 所在的目录

使用 `bash` 命令创建

```bash
npm i husky -g
husky install
```

or

```bash
npm i husky -g
npm set-script prepare "husky install"
npm run prepare
```

也可以手动在`package.json`中添加

```json
"scripts": {
  "prepare": "husky install"
}
```

3. 创建 hooks

```bash
npx husky add .husky/pre-commit "lint-staged"
npx husky add .husky/commit-msg "npx --no-install commitlint --edit $1"
npx husky add .husky/pre-push "npm run test"
```

> 项目中已经创建完毕，无需再次创建，这边只是为了说明

4. 测试检查代码质量

```bash
➜  OS-admin git:(develop) ✗ git commit -m "docs:完善Git规范使用文档"

> ip-commercialize-admin@1.0.0 lint-staged
> lint-staged -c ./.husky/.lintstagedrc.js

⚠ Some of your tasks use `git add` command. Please remove it from the config since all modifications made by tasks will be automatically added to the git commit index.

✔ Preparing...
⚠ Running tasks...
  ❯ Running tasks for src/**/*.{js,jsx,vue,ts,tsx}
    ✖ eslint --fix [FAILED]
    ◼ git add
  ↓ No staged files match src/**/*.{html,vue,css,sass,scss} [SKIPPED]
↓ Skipped because of errors from tasks. [SKIPPED]
✔ Reverting to original state because of errors...
✔ Cleaning up...

✖ eslint --fix:

/Users/zhangyaohuang/Desktop/james/work/code/ip-commercialize-admin/src/main.ts
  8:7  error  'abc' is assigned a value but never used  @typescript-eslint/no-unused-vars

✖ 1 problem (1 error, 0 warnings)

husky - pre-commit hook exited with code 1 (error)
```

上述提交报错信息来看，在`src/main.ts`文件中的第 8 行出现规范错误：`error 'abc' is assigned a value but never used`，禁止代码提交，从而有效控制错误性代码提交到远程仓库。

## 提交规范使用 🌟(暂时没使用就可忽略 ⚠️⚠️)

**约定式提交规范**

关于提交预检查和提交信息规范的规则，我们都已经内置在我们项目中，无须再次配置。所以每次提交都是一次约定式的`Git Commit`，需要遵循提交规则，使用如下：

```bash
# 暂存文件
git add .
# 提交规范格式
npm run commit  # or git cz
# 推送代码
git push
```

其中 `git cz`，需要全局安装 `commitizen`，推荐后续都使用`git cz`

```bash
npm install commitizen -g
```

**跳过校验**
使用 `--no-verify` 指令可以跳过检验规则 **(不推荐使用)**

```bash
git add . && git commit --no-verify -m "代码规范强制提交测试"
```

**效果**

```bash
➜  OS-admin git:(develop) ✗ git add .
➜  OS-admin git:(develop) ✗ git cz
cz-cli@4.2.3, cz-conventional-changelog@3.2.0

? Select the type of change that you're committing: docs:     Documentation only changes
? What is the scope of this change (e.g. component or file name): (press enter to skip) docs
? Write a short, imperative tense description of the change (max 88 chars):
 (11) 完善Git规范说明文档
? Provide a longer description of the change: (press enter to skip)

? Are there any breaking changes? No
? Does this change affect any open issues? No
 > running pre-commit hook: lint-staged
No staged files match any of provided globs.
 > running commit-msg hook: commitlint -e $HUSKY_GIT_PARAMS
[develop 4b73971] docs(docs): 完善Git规范说明文档
 1 file changed, 105 insertions(+), 19 deletions(-)
```

## 自定义提交信息

`Commitizen`的提交信息的文案默认是英文，我们可以使用 `cz-customizable` 插件实现可自定义的的提交消息的，修改成中文，方便小伙伴更容易上手。

1. 安装

```bash
npm install cz-customizable --save-dev
```

```bash
# 全局安装
npm install commitizen -g
# 项目目录下安装
npm install commitizen --save-dev

# 如果已安装了`commitizen`, 则直接执行此命令
commitizen init cz-customizable --save --save-exact
```

2. `package.json`增加相关配置

```bash
"config": {
  "commitizen": {
    "path": "./node_modules/cz-customizable"
  }
}
```

3. 在项目目录下，新建配置文件 `.cz-config.js`

```js
module.exports = {
  types: [
    { value: 'feat', name: 'feat:     新增功能（feature）' },
    { value: 'fix', name: 'fix:      修复 bug' },
    { value: 'docs', name: 'docs:     文档变更' },
    { value: 'style', name: 'style:    不会影响代码含义的更改（空格，格式，缺少分号等）' },
    { value: 'refactor', name: 'refactor: 代码重构，（既不是新增功能，也不是修复bug的代码变动）' },
    { value: 'perf', name: 'perf:     改进性能' },
    { value: 'test', name: 'test:     增加测试或更新已有的测试' },
    { value: 'chore', name: 'chore:    构建或辅助工具或依赖库的更新' },
    { value: 'revert', name: 'revert:   回滚提交' },
    { value: 'build', name: 'build:    构建编译相关的变动或打包' },
    {
      value: 'ci',
      name: 'ci:       CI配置文件和脚本的更改（示例范围：Travis，Circle，BrowserStack，SauceLabs）',
    },
  ],
  messages: {
    type: '请选择提交类型:',
    customScope: '请输入修改范围(可选):',
    subject: '请简要描述提交(必填):',
    body: '请输入详细描述(可选，待优化去除，跳过即可):',
    // breaking: 'List any BREAKING CHANGES (optional):\n',
    footer: '请输入要关闭的issue选填，或 BREAK CHANGE(待优化去除，跳过即可):',
    confirmCommit: '确认使用以上信息提交？(y/n/e/h)',
  },
  allowCustomScopes: true,
  // allowBreakingChanges: ['feat', 'fix'],
  skipQuestions: ['body', 'footer'],
  subjectLimit: 72,
};
```

4. 执行效果

```bash
➜  OS-admin git:(develop) ✗ git cz
cz-cli@4.2.2, cz-customizable@6.3.0

All lines except first will be wrapped after 100 characters.
? 请选择提交类型: (Use arrow keys)
❯ feat:     新增功能（feature）
  fix:      修复 bug
  docs:     文档变更
  style:    不会影响代码含义的更改（空格，格式，缺少分号等）
  refactor: 代码重构，（既不是新增功能，也不是修复bug的代码变动）
  perf:     改进性能
  test:     增加测试或更新已有的测试
(Move up and down to reveal more choices)
```
