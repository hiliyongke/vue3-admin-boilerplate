> 对于一个多人团队来说，每次发布的日志更新和版本更新如果通过人肉完成，没有统一的流程和规范，则容易造成混乱；尤其对于团队的新同学，有时遇到紧急情况，则会更显慌乱。这时候，用自动化工具再合适不过了！

# conventional-changelog

[conventional-changelog](https://links.jianshu.com/go?to=https%253A%2F%2Fgithub.com%2Fconventional-changelog) 可以根据项目的`commit` 自动生成 `changelogs`，并且和 [standard-version](https://links.jianshu.com/go?to=https%253A%2F%2Fgithub.com%2Fconventional-changelog%2Fstandard-version) 结合，可以自动完成生成`version`、打`tag`, 生成`CHANGELOG`等。

# conventional-changelog 模块

- [conventional-changelog-cli](https://links.jianshu.com/go?to=https%253A%2F%2Fgithub.com%2Fconventional-changelog%2Fconventional-changelog%2Ftree%2Fmaster%2Fpackages%2Fconventional-changelog-cli) - conventional-changelog 核心命令行工具
- [cz-conventional-changelog](https://links.jianshu.com/go?to=https%3A%2F%2Fgithub.com%2Fcommitizen%2Fcz-conventional-changelog) - changelog 适配器, commitizen 家族一员，标准提交提示
- [standard-changelog](https://links.jianshu.com/go?to=https%253A%2F%2Fgithub.com%2Fconventional-changelog%2Fconventional-changelog%2Ftree%2Fmaster%2Fpackages%2Fstandard-changelog) - 针对 angular commit 格式的命令行工具
- [commitizen](https://links.jianshu.com/go?to=https%253A%2F%2Fgithub.com%2Fcommitizen%2Fcz-cli) - 针对开发者简单的 commit 规范

# commitizen

全局安装：`npm install -g commitizen`  
或 本地安装： `npm install --save-dev commitizen`

# 安装适配器（cz-conventional-changelog)

全局安装：`npm install -g cz-conventional-changelog`  
在根目录下添加`.czrc`，内容为： {"path": "cz-conventional-changelog"}

或 本地安装： `npm install --save-dev cz-conventional-changelo`  
在 package.json 中添加配置：

```
"config": {
   "commitizen": {
     "path": "cz-conventional-changelog"
   }
 }


```

此时，提交 commit 过程如下：

- `git add .`
- `git cz`或`cz`  
  ![](http://upload-images.jianshu.io/upload_images/159590-420542cbd5edc554.png) 标准提交提示 第一行可看到 `cz-cli@4.2.2, cz-conventional-changelog@3.3.0`

# conventional-changelog-cli

- 安装 `npm install -g conventional-changelog-cli`
- 使用 `conventional-changelog -p angular -i CHANGELOG.md -s`  
  该命令会在 CHANGELOG.md 文件头部添加上次`tag`之后的 commit 信息

![](http://upload-images.jianshu.io/upload_images/159590-903c5f4338c74441.png) 第一次 changelog 信息

版本号读取的是 package.json 中的 version

更多选项配置查看[这里](https://links.jianshu.com/go?to=https%3A%2F%2Fgithub.com%2Fconventional-changelog%2Fconventional-changelog%2Ftree%2Fmaster%2Fpackages%2Fconventional-changelog-core)

则，一次 changelog 的过程如下：

- 修改代码
- git add . / git cz
- 修改 package.json 中的 version
- 运行生成 changelog 命令，最好将命令集成到 package.json 的 scripts 中
- 手动 Tag， Push 等

# standard-version

该工具帮助我们实现自动发布等功能，通常我们基于 master 发布时，流程如下：

- git pull origin master
- 前面的流程
- 手动 Tag, Push 等

## 安装

`npm install -g standard-version`  
常用的命令如下：

![](http://upload-images.jianshu.io/upload_images/159590-56308d64460c67e7.png) 自动化发布

会自动生成 tag：

![](http://upload-images.jianshu.io/upload_images/159590-7e9381491988f137.png) tag

则，基于以上工具，发布流程如下：

- changes
- git add . / git cz
- npm run release

  ![](http://upload-images.jianshu.io/upload_images/159590-dcfb7c56901984dc.png) scrpits

也可以指定发布的版本：

![](http://upload-images.jianshu.io/upload_images/159590-f563261aef2489b6.png) 指定版本
