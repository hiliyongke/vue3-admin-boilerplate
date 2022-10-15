> 一直以来，因为团队项目迭代节奏很快，每次发布的更新日志和版本更新都是通过人肉来完成的。有时候实在忙的团团转，对于手动的写这些更新信息就显得力不从心了。对于团队新来的小伙伴，有时候遇到些紧急情况，就更显的乱糟糟，还是得麻烦团队资深的同学。显然这些工作，用自动化工具再适合不过了。 <br/>

本文是一篇项目自动化方面的使用教程，社区里面针对四类问题的解决方案很多，今天这里主要介绍的是 [conventional-changelog](https://github.com/conventional-changelog) 方案相关的内容。 如果你正在思考或者试图解决这方面的问题的话，不妨了解一下。

# conventional-changelog

[onventional-changelog](https://github.com/conventional-changelog) 是一款可以根据项目的`commit` 和 `metadata`信息自动生成 `changelogs` 和 `release notes`的系列工具，并且在辅助 [standard-version](https://github.com/conventional-changelog/standard-version) 工具的情况下，可以自动帮你完成生成`version`、打`tag`, 生成`CHANGELOG`等系列过程。

### conventional-changelog 生态主要模块

- [conventional-changelog-cli](https://github.com/conventional-changelog/conventional-changelog/tree/master/packages/conventional-changelog-cli) - conventional-changelog 核心命令行工具
- [standard-changelog](https://github.com/conventional-changelog/conventional-changelog/tree/master/packages/standard-changelog) - 针对 angular commit 格式的命令行工具
- [conventional-github-releaser](https://github.com/conventional-changelog/conventional-github-releaser) - 利用 git metadata 针对 Github 的发布工具
- [conventional-commits-detector](https://github.com/conventional-changelog/conventional-commits-detector) - commit message 规范引用检测
- [commitizen](https://github.com/commitizen/cz-cli) - 针对开发者简单的 commit 规范
- [commitlint](https://github.com/marionebl/commitlint) - commit Lint 工具

以上是 [onventional-changelog](https://github.com/conventional-changelog) 生态重要的几个主要模块，实际工作中这几个工具常常是配套使用的，当然也需要根据自己的情况而定。篇幅有限，今天我们就主要介绍 [commitizen](https://github.com/commitizen/cz-cli)、[conventional-changelog-cli](https://github.com/conventional-changelog/conventional-changelog/tree/master/packages/conventional-changelog-cli) 、[standard-version](https://github.com/conventional-changelog/standard-version) 这三工具了。

# commitizen

[commitizen](https://github.com/commitizen/cz-cli) 是一款标准化 git commit 信息的工具。在没有规范的情况下，开发人员的 commit 信息是常常是随意的，这就导致 commit 信息显的很无用。可是当你在做`git log` 、`code review`、编写`changelog`等情况时，良好的 commit 规范就显的尤为重要。

##### commitizen 安装

```
$ npm install -g commitizen
# 或者本地安装
$ npm install --save-dev commitizen

```

##### 安装适配器（Adapter)

因为不同的项目本身的构建方式的不同，commitizen 支持不同适配器的扩展，从而去满足不同的构建需求的。本文主要使用`cz-conventional-changelog`的构建标准，当然你也可以根据具体的情况选择其他的适配器，更多[请看](https://github.com/commitizen/cz-cli)。

```
$ npm install -g cz-conventional-changelog

```

全局安装完成后，我们需要在项目根目录下添加 `.czrc` 配置文件，文件内容如下：

```
// path 用来指定适配器
{ "path": "cz-conventional-changelog" }

```

##### 本地安装

```
$ npm install cz-conventional-changelog --save-dev
# 或者使用 commitizen 工具
$ commitizen init cz-conventional-changelog --save-dev --save-exact

```

commitizen 工具会自动在`package.json`中添加配置相应的配置，具体如下：

```
  "config": {
    "commitizen": {
      "path": "cz-conventional-changelog"
    }
  }

```

安装并添加完后，我们便可以使用 `git cz` 命令替换 `git commit` 来使用了。我们修改一个文件并 `git add` 后，通过 `git cz` 试一下：

![](https://note.youdao.com/yws/api/personal/file/WEBee9436ba77018d27cadecd21329dfd0c?method=download&shareKey=927efb864ac48fcc6e0175bc35d0ed97)

可以看到，git cz 给出了 commit 的几种类型选项，如下：

- feat 新功能
- fix Bug 修复
- docs 文档更新
- style 代码的格式，标点符号的更新
- refactor 代码重构
- perf 性能优化
- test 测试更新
- build 构建系统或者包依赖更新
- ci CI 配置，脚本文件等更新
- chore 非 src 或者 测试文件的更新
- revert commit 回退

使用的时候，我们应该根据项目具体变更情况选择。如果想修改已经打好的 commit 信息，我们可以通过 `git reset`命令来修复。

需要注意的是，仅仅是添加 commit 工具是不够的，为了保证 commit 格式的一致性，这里强烈建议你记得整合 [commitlint](https://github.com/marionebl/commitlint) 工具, 配合 [git commit-msg hook](https://github.com/typicode/husky) 来使用，在这里就不相信介绍了，具体可以查看官方文档。

## conventional-changelog-cli

[conventional-changelog-cli](https://github.com/conventional-changelog/conventional-changelog/tree/master/packages/conventional-changelog-cli) 默认推荐的 commit 标准是来自`angular`项目, 除了 angular 标准以外，目前集成了包括 `atom, codemirror, ember, eslint, express, jquery` 等项目的标准，具体可以根据自己口味来选用。

##### 安装

```
# Help conventional-changelog --help
$ npm install -g conventional-changelog-cli

```

#### 基本使用

```
$ conventional-changelog -p angular -i CHANGELOG.md -s

```

以上命令中参数`-p angular`用来指定使用的 commit message 标准，假如想使用`atom`的标准，则是：

```
$ conventional-changelog -p atom -i CHANGELOG.md -s

```

参数`-i CHANGELOG.md`表示从 [CHANGELOG.md](http://CHANGELOG.md) 读取 changelog, `-s` 表示读写 changelog 为同一文件。需要注意的是，上面这条命令产生的 changelog 是基于上次 tag 版本之后的变更（Feature、Fix、Breaking Changes 等等）所产生的，所以如果你想生成之前所有 commit 信息产生的 changelog 则需要使用这条命令：

```
$ conventional-changelog -p angular -i CHANGELOG.md -s -r 0

```

其中 `-r` 表示生成 changelog 所需要使用的 release 版本数量，默认为 1，全部则是 0。

#### 自定义参数

生成的 changlog 中有些常用内容可以通过自定义参数来根据需求更改，例如版本号、commit 地址等等。 changelog 中生成的版本号即是从 `package.json` 中获取 version 字段来的。commit 连接的仓库地址我们需要修改 `package.json` 中的`repository`地址，changelog 中 issuse 默认的连接地址也是根据 `repository` 来生成的。如果你使用了第三方的协作系统（例如 bitbucket）， 那么你可以使用这个标准 [conventional-changelog-angular-bitbucket](https://github.com/uglow/conventional-changelog-angular-bitbucket)。或者像我们使用 redmine 来管理 isssue ，那么在生成 changelog 后可以使用 [replace](https://www.npmjs.com/package/replace) 工具来处理文本中的原有地址：

```
$ replace 'https://github.com/myproject/issues/' 'https://redmine.example.com' CHANGELOG.md

```

最后看看大致生成的效果：

![](https://note.youdao.com/yws/api/personal/file/WEB60476802c9725abcedd80a5e78a8024f?method=download&shareKey=afee20905f1805a5e6cab8168d97bca6)

conventional-changelog 更多的选项配置可以看[这里。](https://github.com/conventional-changelog/conventional-changelog/tree/master/packages/conventional-changelog-core)

# standard-version

[standard-version](https://github.com/conventional-changelog/standard-version) 是一款遵循[语义化版本（ semver）](https://semver.org/)和 [commit message 标准规范](https://conventionalcommits.org/) 的版本和 changlog 自动化工具。通常情况线下，我们会在 master 分支进行如下的版本发布操作：

```
1. git pull origin master
2. 根据 pacakage.json 中的 version 更新版本号，更新 changelog
3. git add -A, 然后 git commit
4. git tag 打版本操作
5. push 版本 tag 和 master 分支到仓库

```

其中 2，3，4 则是 standard-version 工具会自动完成的工作，配合本地的 shell 脚本，则可以自动完成一系列版本发布的工作了。

#### 安装 & 使用

在这里我仍然推荐的全局安装：

```
$ npm install -g standard-version
# 或者
$ npm install --save-dev standard-version

```

执行：

```
# Help standard-version --help
$ standard-version

```

执行 standard-version 命令，我们会在控制台看到整个执行流程的 log 信息，在这里几个常用的参数需要注意下:

##### –release-as, -r 指定版本号

默认情况下，工具会自动根据 主版本（major）, 次版本（ minor） or 修订版（patch） 规则生成版本号，例如如果你 package.json 中的 version 为 1.0.0, 那么执行后版本号则是：1.0.1。自定义可以通过：

```
$ standard-version -r minor
# output 1.1.0
$ standard-version -r 2.0.0
# output 2.0.0
$ standard-version -r 2.0.0-test
# output 2.0.0-test

```

需要注意的是，这里的版本名称不是随便的字符，而是需要遵循[语义化版本（ semver）](https://semver.org/) 规范的

##### –prerelease, -p 预发版本命名

用来生成预发版本, 如果当期的版本号是 2.0.0，例如

```
$ standard-version --prerelease alpha
# output 2.0.0-alpha.0

```

##### –tag-prefix, -t 版本 tag 前缀

用来给生成 tag 标签添加前缀，例如如果前版本号为 2.0.0，则：

```
$ standard-version --tag-prefix "stable-"
# output tag: stable-v2.0.0

```

以上这几个参数可能我们用的比较多，还有其他选项可以通过 `standard-version --help` 查看。

#### 集成 npm

最后记得把命令集成到 npm `package.json`的 scripts 中, 并配合 shell 脚本使用, 如下：

```
"scripts": {
    "release": "./scripts/release.sh",
    "changelog": "conventional-changelog -p angular -i CHANGELOG.md -s -r 0 && git add CHANGELOG.md && npm run changeissueurl",
    "changeissueurl": "replace 'https://github.com/myproject/issues/' 'https://redmine.example.com/' CHANGELOG.md"
  },

// 配置好后使用 npm run 执行发布
$ npm run release

```

添加 `release.sh` 脚本：

```
#!/bin/bash

# Release branch
master="master"
prefix="DTinsight_v"

git pull origin $master
echo "Current pull origin $master."

# Auto generate version number and tag
standard-version -r $release --tag-prefix $prefix

git push --follow-tags origin $master

echo "Git push origin $master"
echo "Release finished."

```

上面的脚本只是做了简单的分支 `pull`, 执行 `standard-version` 和最后的版本 `push` 工作，如果要做一些定制化的执行参数，则需要做定制修改了。

## 最后

项目的工程化是一件很有意思的事情，通过自动化的工具，可以有效提升项目可维护性和质量，并且避免很多不确定因素。如果你工作中发现了这些问题，而不想继续通过人肉的方法解决这些问题的话，那就赶紧试试~
