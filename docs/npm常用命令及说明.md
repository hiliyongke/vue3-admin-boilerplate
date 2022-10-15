```js
// 查看npm版本
npm -v

// 初始化一个项目，会出现一个package.json配置文件，可以在后面加上-y ，快速跳过问答式界面
npm init

// 安装依赖包
npm install // 根据项目中的package.json文件自动下载项目所需的全部依赖
npm install 包名 --save-dev (npm install 包名 -D) // 安装的包只用于开发环境，不用于生产环境，会出现在package.json文件中的devDependencies属性中。
npm install 包名 --save (npm install 包名 -S) // 安装的包需要发布到生产环境的，会出现在package.json文件中的dependencies属性中

// 更新
npm update 包名 // 更新指定包

// 移除依赖包
npm uninstall 包名 // 卸载指定包

// 查看
npm list // 查看当前目录下已安装的node包
npm list -g // 查看全局已经安装过的node包
npm info 指定包名 // 查看远程npm上指定包的所有版本信息
npm config list // 查看配置信息
npm ls 包名 // 查看本地安装的指定包及版本信息，没有显示empty
npm ls 包名 -g // 查看全局安装的指定包及版本信息，没有显示empty
npm root // 查看当前包的安装路径
npm root -g // 查看全局的包的安装路径

// 其他
npm config set registry https://registry.npm.taobao.org //  修改包下载源，此处修改为了淘宝镜像
npm --help // 查看npm帮助命令
npm 指定命令 --help // 查看指定命令的帮助

```
