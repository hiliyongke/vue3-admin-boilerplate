# Svg 图标

把预先下载好的`svg`文件，导入目录`src/assets/icons/`，使用`BaseIcon`组件。具体详情说明和使用

## 介绍

目前 `Icon` 组件仅支持 `svg` 和图片渲染

## 配置

<!-- 1、安装 `svg-sprite-loader`

```bash
npm i svg-sprite-loader
```

2. 配置 `vue.config.js`

```js
const path = require('path');
const resolve = (filePath) => path.join(__dirname, './', filePath);

module.exports = {
  chainWebpack: (config) => {
    config.module
      .rule('svg')
      .exclude.add(resolve('src/assets/svg'))
      .end();

    config.module
      .rule('icons')
      .test(/\.svg$/)
      .include.add(resolve('src/assets/svg'))
      .end()
      .use('svg-sprite-loader')
      .loader('svg-sprite-loader')
      .options({
        symbolId: 'icon-[name]',
      });
  },
};
``` -->

1. 安装依赖插件

```bash
npm install --save-dev vue-loader-v16  vue-svg-loader
```

2. 配置 `vue.config.js`

```js
const path = require('path');
const resolve = (filePath) => path.join(__dirname, './', filePath);

module.exports = {
  chainWebpack: (config) => {
    config.module
      .rule('svg')
      .exclude.add(resolve('src/assets/svg'))
      .end();

    config.module
      .rule('icons')
      .test(/\.svg$/)
      .include.add(resolve('src/assets/svg'))
      .end()
      .use('vue-loader')
      .loader('vue-loader-v16')
      .end()
      .use('vue-svg-loader')
      .loader('vue-svg-loader');
  },
};
```

1. 导入`svg`文件（导入目录`src/assets/icons`）

2. 编写插件应用`Icon.ts`

```js
import BaseIcon from '@/components/BaseIcon/index.vue';
import { Plugin } from 'vue';

const IconPlugin: Plugin = {
  install(vue) {
    vue.component(BaseIcon.name, BaseIcon);
  },
};

export default IconPlugin;
```

5. 引入

```js
import { createApp } from 'vue';
import Icon from './plugin/Icon';

const app = createApp(App);
app.use(Icon).mount('#app');
```

## 代码演示

### 基础用法

通过`name`设置图标

```html
<!-- 支持svg icon -->
<BaseIcon name="arrow-up" />
<!-- 支持图片链接 -->
<BaseIcon name="https://www.flaticon.com/svg/static/icons/svg/3468/3468081.svg" />
<!-- 支持TDesign icon -->
<BaseIcon name="icon-success" />
```

### 图标颜色

通过`color`设置图标颜色、仅支持 `Svg Icon` 和 `TDesign Icon`

```html
<BaseIcon name="arrow-up" color="#1989fa" />
<BaseIcon name="arrow-up" color="#07c160" />
```

### 图标大小

通过`size`设置图标大小

```html
<BaseIcon name="arrow-up" size="2em" />
```

## API

### Props

| 参数  | 说明                                      | 类型               | 默认值    |
| ----- | ----------------------------------------- | ------------------ | --------- |
| name  | 图标名称或图片链接                        | _string_           | -         |
| size  | 图标大小，如 `20px` `2em`，默认单位为`px` | _number \| string_ | `inherit` |
| color | 图标颜色                                  | _string_           | `inherit` |
