```js
// 初始化一个新项目
yarn init

// 运行脚本
yarn run // 用来执行在 package.json 中 scripts 属性下定义的脚本

// 发布包
yarn publish

// 添加依赖包
yarn add [package] // 会自动安装最新版本，会覆盖指定版本号
yarn add [package] [package] [package] // 一次性添加多个包
yarn add [package]@[version] // 添加指定版本的包
yarn add [package]@[tag] // 安装某个tag（比如beta,next或者latest）

// 将依赖项添加到不同依赖项类别，不添加则默认安装到package.json中的dependencies里
yarn add [package] --dev 或 yarn add [package] -D // 加到 devDependencies
yarn add [package] --peer 或 yarn add [package] -P // 加到 peerDependencies
yarn add [package] --optional 或 yarn add [package] -O // 加到 optionalDependencies

// 升级依赖包
yarn upgrade [package] // 升级到最新版本
yarn upgrade [package]@[version] // 升级到指定版本
yarn upgrade [package]@[tag] // 升级到指定tag

// 移除依赖包
yarn remove [package] // 移除包

// 安装package.json里的包依赖，并将包及它的所有依赖项保存进yarn.lock
yarn 或 yarn install // 安装所有依赖
yarn install --flat // 安装一个包的单一版本
yarn install --force // 强制重新下载所有包
yarn install --production // 只安装生产环境依赖

// 显示某个包的信息
yarn info [package] // 可以用来查看某个模块的最新版本信息

// 缓存相关
yarn cache
yarn cache list // 列出已缓存的每个包
yarn cache dir // 返回全局缓存位置
yarn cache clean // 清除缓存
```
