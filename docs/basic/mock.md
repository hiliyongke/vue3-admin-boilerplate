# Mock 数据

我们在项目初期开发的过程中，后端同学还未开发完接口，前端可以选择 Mock 数据模拟，不必强依赖后端接口，通过预先跟服务器端约定好的接口，模拟请求数据甚至逻辑，这样能够让前端开发更加独立自主，不会被服务端的开发所阻塞，提高开发效率。在后端接口开发完成后，只需要切换对应的接口地址即可，可以保证项目的同步开发。

## 编写 mock 接口

1. 在项目根目录下新建 `mock/module/user.ts` 文件，并写入以下示例代码：

```js
module.exports = [
  {
    url: '/v1/user/list',
    type: 'get',
    response: () => {
      return {
        code: 0,
        message: 'ok',
        data: {
          list: [
            {
              type: 2,
              nick: '张三',
              avatar: 'https://xx/avatar.png',
              phone: '156xxxxxx',
              email: '110@qq.com',
              createAt: '2022-02-06 17:47:48',
              updateAt: '2022-10-24 15:55:26',
              id: 18,
            },
            {
              type: 2,
              nick: '李四',
              avatar: 'https://xx/avatar.png',
              phone: '',
              email: 'asasaas@qq.com',
              createAt: '2021-02-07 15:50:01',
              updateAt: '2022-10-07 15:50:01',
              id: 38,
            },
          ],
        },
      };
    },
  },
];
```

2. 在项目根目录下`mock/index.ts`引入刚刚创建`user`接口 Mock 数据

```js
const user = require('./module/user');

module.exports = [...user];
```

启动调试服务后，假设启动的端口是 `8080`，直接在浏览器里访问 `http://127.0.0.1:3333/api/user/list` 即可看到接口返回数据。

## 请求数据

```
未完待续
```

## 使用 Mock.js

`Mock.js` 是一个随机生成 Mock 数据的工具库：

```js
const Mock = require('mockjs');

const List = Mock.mock({
  'list|1-100': [
    {
      'id|+1': 1,
      email: '@email',
      nick: '@name',
      created_at: Mock.Random.now('day', 'yyyy-MM-dd HH:mm'),
      updated_at: Mock.Random.now('day', 'yyyy-MM-dd HH:mm'),
    },
  ],
});

module.exports = [
  {
    url: '/v1/user/list',
    type: 'get',
    response: () => {
      const { page = 1, size = 10 } = config.query;

      const pageList = List.filter(
        (item, index) => index < size * page && index >= size * (page - 1)
      );

      return {
        code: 0,
        message: 'ok',
        data: {
          total: List.length,
          items: pageList,,
        },
      };
    },
  },
];
```

完整的语法情参考 [Mock.js 文档](http://mockjs.com/examples.html) 。
