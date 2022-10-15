[pnpm 官网](https://pnpm.io/zh/motivation)  
在今年的项目中，使用了 monorepo 多包管理模式来管理项目，具体使用技术为:

- [pnpm](https://pnpm.io/zh/motivation)
- [vue3](https://v3.cn.vuejs.org/)
- [vite](https://cn.vitejs.dev/)
- [typescript](https://www.tslang.cn/index.html)
- [formilyjs 表单解决方案](https://v2.formilyjs.org/zh-CN)

## pnpm

其中：pnpm 可以说是一个多包管理器，有以下优点

- 节约磁盘空间
- 提升安装速度

## workspace 支持

对于 monorepo 类型的项目，pnpm 提供了 workspace 来支持，而且比 [yarn](https://so.csdn.net/so/search?q=yarn&spm=1001.2101.3001.7020) workspace 配置更简单，只需在项目根目录下创建一个 pnpm-workspace.yaml 文件。 具体可以参考[官网文档](https://pnpm.io/zh/motivation)

## 使用指南

1. 安装：  
   `npm install pnpm -g`
2. 初始化 pnpm 项目, 新建一个文件夹作为项目目录，在目录下执行指令（和 npm init 一致）：  
   `pnpm init`
3. 安装依赖:  
   `pnpm i`

4.Workspace 配置:  
在项目下创建一个工作区的文件夹，例如 packages, 里面可以包括多个项目文件，  
在[根目录](https://so.csdn.net/so/search?q=%E6%A0%B9%E7%9B%AE%E5%BD%95&spm=1001.2101.3001.7020)创建一个 workspace 配置文件 pnpm-workspace.yaml，写入：

```
packages:

  # 所有在 packages 子目录下的 package

  - 'packages/**'

  # 不包括在 test 文件夹下的 package

  - '!**/test/**'

```

5.Monorepo 常用指令

名词解释：  
workspace_name：项目名称  
package_name：安装包名称 (vue,axios 等）

```
安装依赖

pnpm add <package_name> --filter <workspace_name> // 安装某个特定属性
pnpm i // 全局安装
pnpm i <package_name> --filter <workspace_name> // 安装某个特定属性


运行脚本

pnpm run serve --filter=<workspace_name>



删除全局和每个workspace的node_modules

pnpm -r exec rm -rf node_modules
pnpm rimraf  **/node_modules


```

## 启动项目命令集成

当有多个项目在 packages 的时候，可能需要在每个项目中寻找项目启动的命令，所以可以集成在根目录下面的 package.json 里面

```
{
  "private": true,
  "name": "pnpm-project",
  "version": "1.0.0",
  "description": "",
  "main": "index.js",
  "scripts": {
    "supervision-task:dev": "pnpm run serve --filter=supervision-task",
    "test": "echo \"Error: no test specified\" && exit 1"
  },
  "author": "",
  "license": "ISC"
}


```

下次启动项目的时候 不用 `pnpm run serve --filter=supervision-task`这么长，可以直接执行 `pnpm supervision-task:dev`

## pacakges 项目关联

1.  当有多个项目集成在 packages 下面时，可以用一个公共的 shared 项目文件夹存放各个项目的公共方法, 通过 index.ts 文件导出方法  
    ![在这里插入图片描述](https://img-blog.csdnimg.cn/4f30983cf82147b28aaa0d7e25014c32.png![](https://img-blog.csdnimg.cn/a294c589f9fa425f92b489e1c35d239a.png?x-oss-process=image/watermark,type_d3F5LXplbmhlaQ,shadow_50,text_Q1NETiBAd2VpeGluXzQzOTYzMzA5,size_20,color_FFFFFF,t_70,g_se,x_16)
2.  然后在需要使用的项目中的 packages.json 里面添加 `"shared": "workspace:*"`，再重新执行`pnpm i`  
    使用：`import { xxx } from 'shared';`![](https://img-blog.csdnimg.cn/d51f896f4bec41f6b261199068b7b94c.png?x-oss-process=image/watermark,type_d3F5LXplbmhlaQ,shadow_50,text_Q1NETiBAd2VpeGluXzQzOTYzMzA5,size_20,color_FFFFFF,t_70,g_se,x_16)

## 碎碎念：

当前 demo 项目使用的 webpack, 不管是安装还是启动项目都非常慢，[vite](https://cn.vitejs.dev/guide/#scaffolding-your-first-vite-project) 的出现解决了这个问题。后续 demo 会更改为 vite

一个 monorepo 往往是一个整体的项目，所以我们需要同时执行多个指令，在 pnpm 中，可以通过-C 进行配置：

```
"scripts": {
    "start": "pnpm -C ./packages/server start:server & pnpm -C ./packages/web dev",
  }
```

这条命令的含义就是同时运行服务端和前端代码。

设置源

```
//查看源
pnpm config get registry
//切换淘宝源
pnpm config set registry https://registry.npmmirror.com/
```

安装包

```
pnpm install 包  //
pnpm i 包
pnpm add 包    // -S  默认写入dependencies
pnpm add -D    // -D devDependencies
pnpm add -g    // 全局安装
```

移除包

```
pnpm remove 包                            //移除包
pnpm remove 包 --global                   //移除全局包
```

更新

```
pnpm up                //更新所有依赖项
pnpm upgrade 包        //更新包
pnpm upgrade 包 --global   //更新全局包
```

设置存储路径

```
pnpm config set store-dir /path/to/.pnpm-store
```
