# 样式方案

目前所有社区主流样式方案，包括 Sass、Less、CSS Modules、Stylus 等方案，而作为框架配套的模板我们推荐使用 `LESS` 为主方案，可以自由结合其他方案。

## 全局样式

对于整个项目的全局样式，统一定义在 `src/[name].[less]` 文件中，我们推荐每一个样式文件跟组件设计思路一样是`原子性`的，例如滚动条样式`scrollbar.less`，动画样式`transition.less`等各自一个样式文件，最后全局样式会默认引入该文件：

main.less 文件

```less
@import './variables.less'; // 全局变量
@import './mixin.less'; // 动画
@import './font.less'; // 字体
@import './scrollbar.less'; // 滚动条
@import './transition.less'; // 动画
@import './normalize.less'; // 重置样式
@import './common.less'; // 公共样式
@import './tdesign-variables.less'; // tdesign 组件库样式
@import './tdesign-override.less'; // tdesign 重写tdesign组件库样式
@import '~nprogress/nprogress.css'; // 进度条样式
```

```js
// 引入默认全局样式
import '@/styles/main.less';
```

## 局部样式

对于页面级和组件级的样式，我们推荐使用 `css scoped` 的方案，这能有效解决样式开发中的两个痛点问题：

- 全局污染：有效保护避免全局样式被局部样式的污染。
- 命名混乱：有效控制样式命名，导致的难统一，样式变多。

```html
<template>
  <div class="home">
    <img src="@/assets/images//Boss-Cartoon-Characters_B&W.jpg" />
  </div>
</template>

<script lang="ts">
  import { defineComponent } from 'vue';

  export default defineComponent({
    name: 'Home',
    components: {},
  });
</script>

<style lang="less" scoped>
  .home {
    text-align: center;
    margin: 10vh auto 0;

    img {
      width: 60vw;
    }
  }
</style>
```

使用该方案之后，上文中的 `home` 样式都会被编译为唯一性的名字，避免因为重名而产生样式冲突，如果在浏览器里查看这个示例的 dom 结构，你会发现实际渲染出来是这样的：

```html
<div class="home" data-v-fae5bece="">
  <img src="img/Boss-Cartoon-Characters_B&amp;W.6e8d941d.jpg" data-v-fae5bece="" />
</div>
```

```css
.home[data-v-fae5bece] {
  text-align: center;
  margin: 10vh auto 0;
}

.home img[data-v-fae5bece] {
  width: 60vw;
}
```

## 混用本地和全局样式

你可以在一个组件中同时使用有 scoped 和非 scoped 样式：

```html
<style>
  /* 全局样式 */
</style>

<style lang="less" scoped>
  /* 本地样式 */
</style>
```

## 深度作用选择器

如果你希望 scoped 样式中的一个选择器能够作用得“更深”，例如影响子组件，你可以使用 `:deep` 操作符：

```html
<style scoped>
  .a :deep .b {
    /* ... */
  }
</style>
```

上述代码将会编译成：

```html
.a[data-v-f3f3eg9] .b { /_ ... _/ }
```

目前 `@vue/compiler-sfc` 情况下禁止使用`/deep/`、`::v-deep` 、`>>>`

```
@vue/compiler-sfc] the >>> and /deep/ combinators have been deprecated. Use :deep() instead.
```

更多关于 `Scoped CSS`。[详见 Vue Loader](https://vue-loader.vuejs.org/zh/guide/scoped-css.html)
