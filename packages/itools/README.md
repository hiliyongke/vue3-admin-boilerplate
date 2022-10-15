> itools 项目是一个实用的 js 函数工具库。

使用 node，react，vue，angular，webpack 等进行项目开发时，需要编写许多 utils 方法，并且开发中还需要不断重写很多函数，使用 itools 可以简单地解决这些问题。

### 概述

每个前端开发人员都有自己的 utils 库, 这些方法我们高频使用，但又要在每个项目中重写。 [itools](https://github.com/tnfe/itools.git) 是一款超小且实用的函数工具库，而且不同于 [lodash](https://github.com/lodash/lodash) [underscore](https://github.com/jashkenas/underscore) [lazy.js](https://github.com/dtao/lazy.js).

项目整理了日常开发中最常用的功能。 这些功能在您的开发中几乎无处不在，并且在主流的函数工具库中找不到。大多数代码来自于高分答案中的[stackoverflow.com](https://stackoverflow.com/) 网站，向原始作者表示敬意。项目在 gzip 压缩下只有 7K, 所以你可以随时随地使用。

## 功能

| device                               | args                                   | http                               | string                         | array                                |
| :----------------------------------- | :------------------------------------- | :--------------------------------- | :----------------------------- | :----------------------------------- |
| [ua][ua]                             | [args][args]                           | [open][open]                       | [trim][trim]                   | [unique][unique]                     |
| [isIos][isios]                       | [noop][noop]                           | [getUrlParam][geturlparam]         | [fillZero][fillzero]           | [uniqueBy][uniqueby]                 |
| [isiPhone][isiphone]                 | [merge][merge]                         | [setUrlParam][seturlparam]         | [longUnique][longunique]       | [uniqueFrom][uniquefrom]             |
| [isIPad][isipad]                     | [over][over]                           | [deleteUrlParam][deleteurlparam]   | [stripTags][striptags]         | [random][random]                     |
| [isAndroid][isandroid]               | [call][call]                           | [objectParam][objectparam]         | [capitalize][capitalize]       | [randomSize][randomsize]             |
| [isMobile][ismobile]                 | [hasOwnProperty][hasownproperty]       | [httpGet][httpget]                 | [deCapitalize][decapitalize]   | [shuffle][shuffle]                   |
| [isPC][ispc]                         | **bom**                                | [httpPost][httppost]               | [isAbsoluteURL][isabsoluteurl] | [contains][contains]                 |
| [isWeixin][isweixin]                 | [stopPropagation][stoppropagation]     | **random**                         | [mapString][mapstring]         | [includesAll][includesall]           |
| [isNewsApp][isnewsapp]               | [g][g]                                 | [randomColor][randomcolor]         | [mask][mask]                   | [includesAny][includesany]           |
| [isQQ][isqq]                         | [gc][gc]                               | [randomA2B][randoma2b]             | [splitLines][splitlines]       | [removeAt][removeat]                 |
| [isQQbrowser][isqqbrowser]           | [c][c]                                 | [randomKey][randomkey]             | [camelize][camelize]           | [remove][remove]                     |
| [isTenvideo][istenvideo]             | [query][query]                         | **behavior**                       | [underscored][underscored]     | [compact][compact]                   |
| [isWeiShi][isweishi]                 | [show][show]                           | [trigger][trigger]                 | [dasherize][dasherize]         | [pluck][pluck]                       |
| [isIphoneXmodel][isiphonexmodel]     | [hide][hide]                           | [lockTouch][locktouch]             | [truncate][truncate]           | [union][union]                       |
| [isIE][isie]                         | [elementContains][elementcontains]     | [copyToClipboard][copytoclipboard] | [byteSize][bytesize]           | [unionBy][unionby]                   |
| [ieVersion][ieversion]               | [formToObject][formtoobject]           | **mlodash**                        | [byteLen][bytelen]             | [unionWith][unionwith]               |
| **log**                              | [getStyle][getstyle]                   | [getTag][gettag]                   | [repeat][repeat]               | [intersect][intersect]               |
| [log][log]                           | [setStyle][setstyle]                   | [is][is]                           | [endsWith][endswith]           | [intersectBy][intersectby]           |
| [logs][logs]                         | [attr][attr]                           | [isObject][isobject]               | [startsWith][startswith]       | [difference][difference]             |
| [removeConsole][removeconsole]       | **load**                               | [isArray][isarray]                 | [containsWith][containswith]   | [differenceBy][differenceby]         |
| [trash][trash]                       | [loadImages][loadimages]               | [isString][isstring]               | [xssFilter][xssfilter]         | [max][max]                           |
| **other**                            | [loadjs][loadjs]                       | [isBoolean][isboolean]             | [effortIndex][effortindex]     | [min][min]                           |
| [uuid][uuid]                         | [loadcss][loadcss]                     | [isNumber][isnumber]               | [capwords]                     | [equal][equal]                       |
| [hash][hash]                         | **fill**                               | [isMap][ismap]                     | **object**                     | [allEqual][allequal]                 |
| [judge][judge]                       | [fill0][fill0]                         | [isSet][isset]                     | [properObject][properobject]   | [all][all]                           |
| [getType][gettype]                   | [floor][floor]                         | [isFunction][isfunction]           | [objectDiff][objectdiff]       | [any][any]                           |
| [isTypeof][istypeof]                 | [chainAsync][chainasync]               | [isEmpty][isempty]                 | [addedDiff][addeddiff]         | [chunk][chunk]                       |
| [construct][construct]               | [numberFormat][numberformat]           | [isShallowEqual][isshallowequal]   | [deletedDiff][deleteddiff]     | [countBy][countby]                   |
| [paramsName][paramsname]             | [modulo][modulo]                       | [has][has]                         | [detailedDiff][detaileddiff]   | [countOccurrences][countoccurrences] |
| [eventEmitter][eventemitter]         | **cookie**                             | [toPath][topath]                   | [updatedDiff][updateddiff]     | [drop][drop]                         |
| **times**                            | [cookie][cookie]                       | [reduce][reduce]                   | **collection**                 | [dropRight][dropright]               |
| [setTimesout][settimesout]           | [setCookie][setcookie]                 | [forEach][foreach]                 | [clone][clone]                 | [dropWhile][dropwhile]               |
| [clearTimesout][cleartimesout]       | [getCookie][getcookie]                 | [map][map]                         | [entries][entries]             | [dropRightWhile][droprightwhile]     |
| [getDate][getdate]                   | [deleteCookie][deletecookie]           | [find][find]                       | [extend][extend]               | [column][column]                     |
| [formatPassTime][formatpasstime]     | [parseCookie][parsecookie]             | [findIndex][findindex]             | [flush][flush]                 | [split][split]                       |
| [formatRemainTime][formatremaintime] | **image**                              | [get][get]                         | [values][values]               | [unary][unary]                       |
| [formatDuration][formatduration]     | [checkImageSize][checkimagesize]       | [set][set]                         | [size][size]                   | [indexBy][indexby]                   |
| [sleep][sleep]                       | [imageOptimization][imageoptimization] | [debounce][debounce]               | [search][search]               |                                      |
| [retry][retry]                       | [toDataUrl][todataurl]                 | [throttle][throttle]               |                                |                                      |
| **json**                             |                                        | [pick][pick]                       |                                |                                      |
| [toJson][tojson]                     |                                        | [omit][omit]                       |                                |                                      |
| [jsonp][jsonp]                       |                                        | [isSymbol][issymbol]               |                                |                                      |
| **storage**                          |                                        | [isDate][isdate]                   |                                |                                      |
| [storage][storage]                   |                                        | [mapValues][mapvalues]             |                                |                                      |

### 使用

#### 范例

```js
// base case
itools.getCookie('username'); // => 'userName'
itools.cookie().getJson(); //  => {a: 1, b: 2}
itools.isiPhone(); // => true or false
itools.numberFormat(1234.56, 2, ',', ' '); // => '1 234,56';
itools.split([1, 2, 3, 4, 5], 2); // => [[1,2], [3,4], [5]]
itools.entries({ c: 8, a: 4 }); // => [['c', 8], ['a', 4]]
itools.toPath("a.b.c"); // => ['a', 'b', 'c']
itools.get({ a: { aa: { aaa: 2 } }, b: 4 }, "a.aa.aaa"); // => 2
itools.union([1, 2, 3], [4, 3, 2]); // => [1, 2, 3, 4]
itools.intersect([1, 2, 3], [4, 3, 2]); // => [2, 3]
itools.unionBy([2.1], [1.2, 2.3], Math.floor); // [2.1, 1.2]
itools.mapValues({ a: 3, b: 5, c: 9 }, (value) => value + 1); //=> {a: 4, b: 6, c: 10}
itools.compact([0, 1, false, 2, "", 3]); // [1, 2, 3]
itools.flush({a: 2, b: null, c: 4, d: undefined}); // => {a: 2, c: 4}
itools.differenceBy([2.1, 1.2], [2.3, 3.4], Math.floor); // => [1]
itools.search("3", { a: 3, b: 5, c: 7 }); // => 'a'
itools.size({ a: 1, b: 2 }); // => 2

var users = [
  { user: "barney", age: 36, active: true },
  { user: "fred", age: 40, active: false },
];
itools.find(users, { age: 1, active: true }); // => {"active": true, "age": 36, "user": "barney"}
itools.findIndex(users, ["active", false]); // => 1

// chain case
var array1 = [1, 2, 3, null];
var array2 = [3, 4, 5, ''];
var object1 = { a: 6, b: 7 };
var object2 = { c: 8, d: 9 };

itools
  .chain(object1)
  .extend(object2) // => {a: 6, b: 7, c: 8, d: 9}
  .entries() // =>  [["a", 6], ["b", 7], ["c", 8], ["d", 9]]
  .thru((words) => {
    const temp = [];
    itools.forEach(words, (item, index) => {
      temp.push(item[1]);
    });
    return temp;
  }) // => [6, 7, 8, 9]
  .union(array1) // => [6, 7, 8, 9, 1, 2, 3, null]
  .union(array2) // => [6, 7, 8, 9, 1, 2, 3, null, 4, 5, ""]
  .compact() // => [6, 7, 8, 9, 1, 2, 3, 4, 5]
  .thru((array) => {
    return array.sort();
  }) // => [1, 2, 3, 4, 5, 6, 7, 8, 9]
  .value();
// return  => [1, 2, 3, 4, 5, 6, 7, 8, 9]

... ∞
```

#### CommonJS

使用整个库

```js
const itools = require('itools');
itools.isiPhone(); // => 'true'
```

个别功能：

```js
const cookie = require('itools/cookie');
```

#### ES2015

```js
import itools from 'itools';
```

导入单个功能：

```js
import storage from 'itools/storage';
```

#### 浏览器

直接将 js 引入到浏览器中

- [dist/itools.min.js](./dist/itools.min.js) , [source map](./dist/itools.min.js.map) 混淆压缩
- [dist/itools.js](./dist/itools.js) 未压缩

```js
<script
  src="itools.min.js"
  type="text/javascript"
></script>
```

使用`itools`为全局变量

```js
<script type="text/javascript">
  itools.cookie().getJson(); // => {a: 1, b: 2}
</script>
```

### 开发

**依赖 nodejs, 请使用 terminal/iTerm 安装环境。**

构建项目

```js
npm install
npm run lint
npm run build
```

运行项目

```js
npm run start
// 访问 http://localhost:8080
```
