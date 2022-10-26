# 编写组件

## 组件命名规范

- 组件名应该始终是多个单词的，根组件 App 除外
- 有意义的名词、简短、具有可读性
- 命名遵循 `PascalCase`(大驼峰：单词首字母大写命名) 约定
- 公用组件以 Abcd (公司名缩写简称) 开头，如（`AbcdDatePicker`,`AbcdTable`）
- 页面内部组件以组件模块名简写为开头，列举了下面几种形式结尾:
  - 列表项(Item)，如（`ProjectItem`，`StaffItem`）
  - 弹窗(Dialog)，如（`BaseDialog`）
  - 表单(Form)，如（`BaseForm`）
  - 卡片(Card)，如（`BaseCard`）

具体的组件编写风格，可以参考下官方的[风格指南](https://cn.vuejs.org/v2/style-guide/index.html)

## 组件使用规范

- 导入、注册以及使用组件时，遵循 `PascalCase`(大驼峰：单词首字母大写命名) 约定
- 同时还需要注意：必须符合自定义元素规范: 切勿使用保留字。
