> 一个非常快速的目录和文件名 linter

一个非常快速的目录和文件名 linter，为您的项目目录带来一些结构。

其特点：

- 在一个. ls-lint.yml 文件中管理简单规则的最小设置
- 适用于目录和文件名 - 支持所有扩展名 - 完全支持 unicode
- 令人难以置信的快速 - 在几毫秒内检查数千个文件和目录
- 支持 Windows、MacOS 和 Linux + [npm](https://www.fly63.com/tag/npm) 包和 Docker 映像
- ARM 支持
- 几乎为零的第三方依赖（仅 go-yaml 和 doublestar）

安装：

```
npm install @ls-lint/ls-lint

```

添加配置文件：

```
ls:
  src:
    .js: kebab-case
    .ts: kebab-case
    .d.ts: kebab-case
    .vue: kebab-case

ignore:
  - .git
  - node_modules

```

ls-lint 的配置非常灵活，可以按照后缀名和子目录分别设置规则。规则包括：lowercase、camelcase、pascalcase、snakecase、screamingsnakecase、regex

执行命令：

```
npx @ls-lint/ls-lint

```
