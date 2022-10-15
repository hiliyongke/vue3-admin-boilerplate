### 写在前面

对于写 JS 的程序员来说，可能没有人不知道 npm，但是有些同学对他的配置文件 (即. npmrc 文件) 并不了解。结合我的学习心得，跟大家分享一些该配置文件的知识。

### .npmrc 的作用

.npmrc，可以理解成 npm running cnfiguration, 即 npm 运行时配置文件。我们知道，npm 最大的作用就是帮助开发者安装需要的依赖包，但是要从哪里下载？下载哪一个版本的包，把包下载到电脑的哪个路径下？

这些都可以在. npmrc 中进行配置。

在设置. npmrc 之前，我们需要知道：在你的电脑上，不止存在一个. npmrc 文件，而是有多个。在我们安装包的时候，npm 按照如下顺序读取这些配置文件：

1.  项目配置文件：你可以在项目的根目录下创建一个. npmrc 文件，只用于管理这个项目的 npm 安装。
2.  用户配置文件：在你使用一个账号登陆的电脑的时候，可以为当前用户创建一个. npmrc 文件，之后用该用户登录电脑，就可以使用该配置文件。可以通过 **npm config get userconfig** 来获取该文件的位置。
3.  全局配置文件： 一台电脑可能有多个用户，在这些用户之上，你可以设置一个公共的. npmrc 文件，供所有用户使用。该文件的路径为：**$PREFIX/etc/npmrc**，使用 **npm config get prefix** 获取 $PREFIX。如果你不曾配置过全局文件，该文件不存在。
4.  npm 内嵌配置文件：最后还有 npm 内置配置文件，基本上用不到，不用过度关注。

### 如何设置. npmrc

#### 1. **设置项目配置文件**

在项目的根目录下新建 .npmrc 文件，在里面以 **key=value** 的格式进行配置。比如要把 npm 的源配置为淘宝源，可以参考一下代码：

```
registry=https://registry.npm.taobao.org
```

如果你想删除一些配置，可以直接把对应的代码行给删除。

#### 2. **设置用户配置文件**

你可以直接通过 **npm config get userconfig** 命令找到该文件的路径，然后直接仿照上述方法该文件，也可以通过 **npm config set** 命令继续设置，命令如下：

```
config set registry https://registry.npm.taobao.org
```

最终，命令行会帮助我们修改对应的配置文件。只不过使用命令行更加快捷。

如果想要删除一些配置，可以直接编辑. npmrc 文件，也可以使用命令进行删除，比如：

```
npm config delete registry
```

#### 3. **设置全局配置文件**

方法和设置用户配置文件如出一辙，只不过在使用命令行时需要加上 **-g** 参数。

```
npm config set registry https://registry.npm.taobao.org -g
```

除此之外，这里列出一些常用的 npm 设置命令，有兴趣的话，可以了解一下，挺好玩的：

```
npm config set <key> <value> [-g|--global]  //给配置参数key设置值为value；
npm config get <key>          //获取配置参数key的值；
npm config delete <key>       //删除置参数key及其值；
npm config list [-l]      //显示npm的所有配置参数的信息；
npm config edit     //编辑配置文件
npm get <key>     //获取配置参数key的值；
npm set <key> <value> [-g|--global]    //给配置参数key设置值为value；
```

### 写在最后

以上就是关于. npmrc 的一些常识，其实你在开发过程中，很少会继续配置该文件。不过在你安装依赖包出错的时候，可以思考一下：是不是 npm 的配置参数有问题，这样就多一种解决问题的思路了。
