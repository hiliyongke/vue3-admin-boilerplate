# 数据请求

基于`axios`请求库封装`request`和`useApi Hook方法`

## 目录约定

目录组织如下：

```bash
api
  ├── user.ts         # 用户模块
  ├── system.ts       # 系统模块
  └── project.ts      # 项目模块
```

## 定义 service

通过调用 `http` 定义数据请求如下：

```js
import http from '@/utils/request';
import { GetUserInfoParams } from './types';

enum Api {
  GetUserList = '/api/user/list',
  GetUserInfo = '/api/user/getUserMsg',
}

export async function getUserList() {
  return http.get({ url: Api.GetUserList, params });
}

export async function getUserInfo(params: GetUserInfoParams) {
  return http.get({ url: Api.GetUserInfo, params });
}
```
