---
title: FreeIcon 图标
---

### 介绍

目前 `Icon` 组件仅支持 `svg` 和图片渲染

### 配置

1、安装 `vite-plugin-svg-icons`

```bash
npm i vite-plugin-svg-icons -D
```

2. 添加用于快速创建 SVG 精灵的 Vite 插件 `build/vite/plugins/svgSprite.ts`

```js
/**
 * 用于快速创建 SVG 精灵的 Vite 插件。
 * @param isBuild 是否为生产环境
 */
export function configSvgIconsPlugin(isBuild: boolean) {
  const svgIconsPlugin = SvgIconsPlugin({
    iconDirs: [path.resolve(process.cwd(), 'src/assets/svg')],
    svgoOptions: isBuild,
    // default
    symbolId: 'icon-[dir]-[name]',
  });
  return svgIconsPlugin;
}
```

3. 导入`svg`文件（导入目录`src/assets/svg/svg`）

4. 使用插件应用`svgSprite.ts`

```js
import legacyPlugin from '@vitejs/plugin-legacy';
import vue from '@vitejs/plugin-vue';
import vueJsx from '@vitejs/plugin-vue-jsx';
import type { Plugin } from 'vite';

import { svgBuilder } from '../../svgBuilder';

const vitePlugins: (Plugin | Plugin[])[] = [
    // 必须
    vue(),
    // 必须
    vueJsx(),
    legacyPlugin({
      targets: [
        'Android > 39',
        'Chrome >= 60',
        'Safari >= 10.1',
        'iOS >= 10.3',
        'Firefox >= 54',
        'Edge >= 15',
      ],
    }),
    svgBuilder('./src/assets/svg/'),
  ];

```

5. 引入

```js
import FreeIcon from '@/components/free-icon';
import { useInit } from '@/hooks/useInit';
function setupComponents(app: App) {
  app.component(FreeIcon.name, FreeIcon);
}
async function bootstrap(app) {
  const { router: initRouter } = await useInit();
  // global register local component
  setupComponents(app);

  initRouter.isReady().then(() => app.mount('#app', true));
}
void bootstrap(app);
```

## 代码演示

### 基础用法

通过`name`设置图标

```html
<!-- 支持svg icon -->
<free-icon name="arrow-up" />
<!-- 支持图片链接 -->
<free-icon name="https://www.flaticon.com/svg/static/svg/svg/3468/3468081.svg" />
<!-- 支持element icon -->
<free-icon name="el-icon-success" />
```

### 图标颜色

通过`color`设置图标颜色、仅支持 `Svg Icon` 和 `Element Icon`

```html
<free-icon name="arrow-up" color="#1989fa" />
<free-icon name="arrow-up" color="#07c160" />
```

### 图标大小

通过`size`设置图标大小

```html
<free-icon name="arrow-up" size="2em" />
```

## API

### Props

| 参数  | 说明                                      | 类型               | 默认值    |
| ----- | ----------------------------------------- | ------------------ | --------- |
| name  | 图标名称或图片链接                        | _string_           | -         |
| size  | 图标大小，如 `20px` `2em`，默认单位为`px` | _number \| string_ | `inherit` |
| color | 图标颜色                                  | _string_           | `inherit` |
