# 命名规范

由历史原因及个人习惯引起的 DOM 结构、命名不统一，导致不同成员在维护同一页面时，效率低下，迭代、维护成本极高。

### 项目命名

**1. 全部采用小写方式， 以中划线分隔**

正例：`permission-management-system`

反例：`permission_management-system / permissionManagementSystem`

### 目录命名

**1. 全部采用小写方式， 以中划线分隔，有复数结构时，要采用复数命名法， 缩写不用复数**

正例：`hooks / components / utils / layouts / styles`

反例： `Hooks / Utils / demoStyles / demo_styles`

**2. Vue 项目命名**
_【特殊】`Vue` 的项目中的 `components` 中的组件目录，使用 `kebab-case` 命名_

正例： `head-search / page-loading / chart / pro-table`

反例： `HeadSearch / PageLoading / ProTable`

_【特殊】`Vue` 的项目中的 `components` 中的组件目录，分成两类：全局基本组件(`base-[component-name]`)、全局业务组件(`biz-[component-name]`)_

正例： `pro-table / pro-form / biz-query / biz-layouts`

反例： `ProTable / ProForm / BizQuery / BizLayouts`

_【特殊】`Vue` 的项目中的除 `components` 组件目录外的所有目录也使用 `kebab-case` 命名_

正例： `shopping-car / user-management / system-management`

反例： `ShoppingCar / UserManagement / SystemManagement`

### Style 命名

**1. 全部采用小写方式， 以中划线分隔**

正例： `element-override.css / common.less`

反例： `elementOverride.css / Common.less`

### Image 命名

**1. 全部采用小写方式， 以中划线分隔**

正例： `icon-home.png / logo.png`

反例： `iconHome.png / icon_home / Logo.png`

### Javascript 命名

**1. `js / ts`文件统一全部采用小写方式或者 `kebab-case` 风格**

正例： `http.js / watermark.ts / load-image.ts / is-string.ts`

反例： `Http.js / Watermark.ts / load-image.less / is_string.ts`

**2. 方法名、参数名、成员变量、局部变量都统一使用 `lowerCamelCase` 风格，必须遵从驼峰形式。**

正例： `localValue / getHttpMessage() / inputUserId`

**_其中 method 方法命名必须是 动词 或者 动词+名词 形式_**

正例：`saveShopCarData /openShopCarInfoDialog`

反例：`save / open / show / go`

**_特此说明，增删查改，详情统一使用如下 5 个单词，不得使用其他（目的是为了统一各个端）_**

`add / update / delete / detail / get`

**附： 函数方法常用的动词:**

```
get 获取 / set 设置,
add 增加 / remove 删除
create 创建 / destory 移除
start 启动 / stop 停止
open 打开 / close 关闭
read 读取 / write 写入
load 载入 / save 保存
create 创建 / destroy 销毁
begin 开始 / end 结束
backup 备份 / restore 恢复
import 导入 / export 导出
split 分割 / merge 合并
inject 注入 / extract 提取
attach 附着 / detach 脱离
bind 绑定 / separate 分离
view 查看 / browse 浏览
edit 编辑 / modify 修改
select 选取 / mark 标记
copy 复制 / paste 粘贴
undo 撤销 / redo 重做
insert 插入 / delete 移除
add 加入 / append 添加
clean 清理 / clear 清除
index 索引 / sort 排序
find 查找 / search 搜索
increase 增加 / decrease 减少
play 播放 / pause 暂停
launch 启动 / run 运行
compile 编译 / execute 执行
debug 调试 / trace 跟踪
observe 观察 / listen 监听
build 构建 / publish 发布
input 输入 / output 输出
encode 编码 / decode 解码
encrypt 加密 / decrypt 解密
compress 压缩 / decompress 解压缩
pack 打包 / unpack 解包
parse 解析 / emit 生成
connect 连接 / disconnect 断开
send 发送 / receive 接收
download 下载 / upload 上传
refresh 刷新 / synchronize 同步
update 更新 / revert 复原
lock 锁定 / unlock 解锁
check out 签出 / check in 签入
submit 提交 / commit 交付
push 推 / pull 拉
expand 展开 / collapse 折叠
begin 起始 / end 结束
start 开始 / finish 完成
enter 进入 / exit 退出
abort 放弃 / quit 离开
obsolete 废弃 / depreciate 废旧
collect 收集 / aggregate 聚集
```

**3. 常量命名全部大写，单词间用下划线隔开，力求语义表达完整清楚，不要嫌名字长**

正例： `MAX_STOCK_COUNT`

反例： `MAX_COUNT`

**4. ts 类型名称命名全部采用 KebabCase**

正例：

```js
export type IObject<T extends any = any> = Record<string, T>;

export type Fn = () => void;

export interface UserInfo {
  name: string;
  age: number;
}
```

反例：

```js
export type iObject<T extends any = any> = Record<string, T>;

export type fn = () => void;

export interface userInfo {
  name: string;
  age: number;
}
```

### Vue 命名

vue 项目规范以 Vue 官方规范 （<https://v3.cn.vuejs.org/style-guide/>） 中的 **优先级 A** 命名为基础，在其上面进行项目开发，故所有代码均遵守该规范。

> 请仔仔细细阅读 Vue 官方规范，切记，此为第一步。

**1. vue 文件命名除了 `index.vue` 文件，其他 `vue` 文件, 其他都是统一使用`kebab-case`命名**

正例： `edit.vue` / `home.vue` / `user-info.vue`

反例： `Edit.vue` / `Home.vue` / `UserInfo.vue`/ `userInfo.vue`

**2. 组件名应该始终是多个单词组成（大于等于 2），且命名规范为 `KebabCase` 格式。**

这样做可以避免跟现有的以及未来的 `HTML` 元素相冲突，因为所有的 `HTML` 元素名称都是单个单词的。

正例：

```js
export default {
  name: 'TodoItem',
  // ...
};
```

反例：

```js
export default {
  name: 'Todo',
  // ...
};

export default {
  name: 'todo-item',
  // ...
};
```

**3. 页面模块目录的规范, 采用业务逻辑独立解构**

比如这样：

```
user/
├── detail.vue    详情页
├── edit.vue      编辑页
├── components/   业务组件
├── directives/   业务指令
├── hooks/        业务hooks
├── index.vue     展示页
├── types/        业务ts类型
└── utils/        业务工具函数
```
