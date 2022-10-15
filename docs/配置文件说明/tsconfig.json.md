// 常用配置

```json
{
/_
tsconfig.json 是 ts 编译器的配置文件，ts 可以根据它的信息来对代码进行编译 可以在 tsconfig 中写注释
include : 用来指定哪些文件需要被编译
exclude : 用来指定哪些文件不需要被编译 ：默认 node_module
extends : 用来指定继承的配置文件
files : 用来指定被编译的文件列表，只有编译少量文件才使用
compilerOptions : 编译器的选项是配置文件中非常重要也是非常复杂的配置选项
_/
"include":[
// ** : 任意目录 ， * : 任意文件
"./src/**/*"
],
"exclude": [
"./src/hello/**/*"
],
// "extends": "./configs/base",
"files": [
"1.ts",
// "2.ts"
],
"compilerOptions": {
// 用来指定 ES 版本 ESNext : 最新版。 'ES3', 'ES5', 'ES6'/'ES2015', 'ES2016', 'ES2017', 'ES2018', 'ES2019', 'ES2020', 'ESNext'
"target": "ES2020",
// 指定要使用模块化的规范 : 'None', 'CommonJS', 'AMD', 'System', 'UMD', 'ES6'/'ES2015', 'ES2020' or 'ESNext'
"module": "ESNext",
// 用来指定项目中要使用的库 'ES5', 'ES6', 'ES2015', 'ES7', 'ES2016', 'ES2017', 'ES2018', 'ESNext', 'DOM', 'DOM.Iterable',
// 'WebWorker', 'ScriptHost', 'ES2015.Core', 'ES2015.Collection', 'ES2015.Generator', 'ES2015.Iterable',
// 'ES2015.Promise', 'ES2015.Proxy', 'ES2015.Reflect', 'ES2015.Symbol', 'ES2015.Symbol.WellKnown',
// 'ES2016.Array.Include', 'ES2017.object', 'ES2017.Intl', 'ES2017.SharedMemory', 'ES2017.String',
// 'ES2017.TypedArrays', 'ES2018.Intl', 'ES2018.Promise', 'ES2018.RegExp', 'ESNext.AsyncIterable',
// 'ESNext.Array', 'ESNext.Intl', 'ESNext.Symbol'
// 运行在浏览器中不用设置，运行在 node 或其他中才需要设置
// "lib":[]，
// 用来指定编译后文件的存放位置
"outDir":"./dist",
// 将代码合并为一个文件,设置之后所有的全局作用域中的代码会合并到同一个文件中 但是只能在 'amd' and 'system' 中才能使用
// "outFile": "./dist/app.js",
// 是否对 js 文件进行编译，默认 false
"allowJs": false,
// 是否检查 js 代码是否符合语法规范，默认 false
"checkJs": false,
// 是否移除注释，默认 false
"removeComments":false,
// 是否不生成编译后文件，默认 false
"noEmit": false,
// 当有错误时是否生成文件，默认 false
"noEmitOnError": false,
// 是否生成 sourceMap，默认 false 这个文件里保存的，是转换后代码的位置，和对应的转换前的位置。有了它，出错的时候，通过断点工具可以直接显示原始代码，而不是转换后的代码。
"sourceMap":false,

    // 所有的严格检查的总开关，默认false
    "strict": false,
    // 编译后的文件是否开启严格模式，默认false
    "alwaysStrict": false,
    // 不允许隐式的any，默认false(允许)
    "noImplicitAny": false,
    // 不允许隐式的this，默认false(允许)
    "noImplicitThis": false,
    // 是否严格的检查空值，默认false 检查有可能为null的地方
    "strictNullChecks": true,
    // 是否严格检查bind、call和apply的参数列表，默认false  检查是否有多余参数
    "strictBindCallApply":false,
    // 是否严格检查函数的类型，
    "strictFunctionTypes":false,
    // 是否严格检查属性是否初始化，默认false
    "strictPropertyInitialization":false,

    // 是否检查switch语句包含正确的break，默认false
    "noFallthroughCasesInSwitch":false,
    // 检查函数没有隐式的返回值，默认false
    "noImplicitReturns":false,
    // 是否检查检查未使用的局部变量，默认false
    "noUnusedLocals":false,
    // 是否检查未使用的参数，默认false
    "noUnusedParameters":false,

    // 是否检查不可达代码报错，默认false   true，忽略不可达代码 false，不可达代码将引起错误
    "allowUnreachableCode":false

}
}
// 最全配置
// https://www.tslang.cn/docs/handbook/compiler-options.html
```
