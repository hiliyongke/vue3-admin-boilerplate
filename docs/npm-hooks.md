> npm 脚本有 pre 和 post 两个钩子。举例来说，build 脚本命令的钩子就是 prebuild 和 postbuild:

```


{
    "scripts": {
        "prebuild": "echo I run before the build script",
        "build": "webpack",
        "postbuild": "echo I run after the build script"
    }
}
```

> 用户执行 npm run build 的时候，会自动按照下面的顺序执行。
>
> npm run prebuild && npm run build && npm run postbuild （&&代表继发执行，执行完前面再执行后面；&代表并行执行，同时执行）

> 因此，可以在这两个钩子里面，完成一些准备工作和清理工作。eg：

```
{
    "scripts": {
        "clean": "rm -rf ./dist && mkdir dist",
        "prebuild": "npm run clean",
        "build": "webpack"
    }
}
```

> 执行 npm run build 时就会执行 npm run prebuild && npm run build

npm 默认提供下面这些钩子:

```
prepublish, publish, postpublish：发布模块

preinstall, install, postinstall：安装模块

preuninstall, uninstall, postuninstall：卸载模块

preversion, version, postversion：在使用 npm version 修改版本号的时候执行

pretest, test, posttest：执行 npm test 的时候

prestop, stop, poststop：执行 npm stop 的时候

prestart, start, poststart：执行 npm start 的时候

prerestart, restart, postrestart：执行 npm restart 的时候

preshrinkwrap, shrinkwrap, postshrinkwrap 执行 npm shrinkwrap 的时候
```
