Vue3 已经出来了， Vue3 Devtools 正式版也快出来了，目前我们在用的是 beta 版本，现在我们来看看 Vue3 Devtoolls 有哪些新的功能。

#### 安装

打开谷应用商店，搜索 `vue devtools`，选择 beat 的标识安装，如下所示：

![](https://mmbiz.qpic.cn/mmbiz_png/LDPLltmNy578TcTW92eH34oC0KZvgCvqmfbnRlmCR6nh2HDu2A34oa4TZNxJxWV4oicodRP7FB8rbbWQvsbXY2w/640?wx_fmt=png)

**注意，在使用 Vue3 devtools 时，要把 Vue2 devtools 的关掉，以免造成混淆。**

第一步完成，如果商店打开不了的，自行百度，方法反正你们肯定比我多。

#### 开始使用

安装完成了，我们打开控制台就有一个 Vue 的 tab，如果下所示：

![](https://mmbiz.qpic.cn/mmbiz_png/LDPLltmNy578TcTW92eH34oC0KZvgCvqa8IAz4BNKrbmV5L2attA5ziaLXAHuqRIibcJMfaz1f0aDMB7HTn2l19w/640?wx_fmt=png)

### multi-app (多应用视图)

多应用视图，意思就是我们可以查看多个应用，比如我在项目中添加多个 `createApp` 如下所示：

```
import { createApp } from 'vue'
import App from './App.vue'
import App2 from './App2.vue'
import App3 from './App3.vue'

createApp(App).mount('#app')
createApp(App2).mount('#app1')
createApp(App3).mount('#app2')



```

控制台打开查看:

![](https://mmbiz.qpic.cn/mmbiz_png/LDPLltmNy578TcTW92eH34oC0KZvgCvqjWIWsl6iaqpD0Z1XLqrR2LQHavTg2j5UYJ0r5ia8ApkicjysOGYTpcqCQ/640?wx_fmt=png)

在有多个 Vue 应用程序的浏览器页面中，可以在它们之间快速交换，并有能力检查在`iframe`内的 Vue 应用程序。

### inspector tab (检查器选项卡)

我们可以通过检查器查看每个组件的状态，这个检查器就是罗盘状的图标。

![](https://mmbiz.qpic.cn/mmbiz_png/LDPLltmNy578TcTW92eH34oC0KZvgCvqVcwKAppcicUzAVVNewgIH2sKUHY1icTdTOzyzVZtay5dp7lxWC7FR7bA/640?wx_fmt=png)![](https://mmbiz.qpic.cn/mmbiz_gif/LDPLltmNy578TcTW92eH34oC0KZvgCvqzE1bvNUoZlFELjsGU5kd2XgtjcvIOqMLPpbsUdeM7r0ENsI2mUUUTg/640?wx_fmt=gif)

### 组件操作图标

当选择一个组件时，会看到右上方有一组三个不同的图标。

![](https://mmbiz.qpic.cn/mmbiz_png/LDPLltmNy578TcTW92eH34oC0KZvgCvqy4otj3syJB31uVh8Uze9Z1ibj85GibKI6HxJ9nfoXe9bv4rCQDWap8ibw/640?wx_fmt=png)

第一个眼睛的图标的表示 `Scroll to component`。当点击这个图标时，浏览器将会滚动到组件所在的位置。

![](https://mmbiz.qpic.cn/mmbiz_gif/LDPLltmNy578TcTW92eH34oC0KZvgCvqlMxUhBj2K0dhvneg4gPc2DNSbegOibzPdROiaDudd9X2eqHZia1FdPgDQ/640?wx_fmt=gif)

第二个 `<>` 表示的是 `Show render code`。当点击这个图标时，可以看到当前组件的`Render`函数。

![](https://mmbiz.qpic.cn/mmbiz_gif/LDPLltmNy578TcTW92eH34oC0KZvgCvqpTvDDjB0COSAzaSfThfYOzQIGPpB3nAUNDqjlbcjgYMQtFG8juZX1g/640?wx_fmt=gif)

最后，带有`<`的汉堡包图标表示检查 DOM。点击它时，就会显示组件也表示 Dom 的位置。

![](https://mmbiz.qpic.cn/mmbiz_gif/LDPLltmNy578TcTW92eH34oC0KZvgCvqp3ndCBzbggLh1NEB9GIWAlYxeJlIeDDtKgicZ4MM8fL5icicUsZSWatmg/640?wx_fmt=gif)

### 多根组件

你可能已经注意到了，在我们组件旁边有些小标签，如下所示：

![](https://mmbiz.qpic.cn/mmbiz_png/LDPLltmNy578TcTW92eH34oC0KZvgCvqqpbFeBdZIEU4KkGY9tiaLyeQDTvJpCUTwjMU0frlGu1bkRiaxT0ysxRg/640?wx_fmt=png)

首先可以看到有 `fragment` 标记，它表示多根组件，啥是多根，直接看我们`FragmentComponent.vue` 的内容：

```
<template>
  <div>Fragment1</div>
  <div>Fragment2</div>
</template>


```

多根就是没有像 Vue2 一样，只有一个根元素，不能多个。

### 性能指示

除了多根组件的标识，我们还可以看到一些数字的标识：

![](https://mmbiz.qpic.cn/mmbiz_png/LDPLltmNy578TcTW92eH34oC0KZvgCvqmicCYhA0OfIDpN3VK7ocFV4ARJs6teJ9tjxZNe92qQ9Mp5RiblzwLDOQ/640?wx_fmt=png)

当我们的组件因为其渲染速度慢而表现不佳时，它就会显示出来，告诉我们哪些组件耗时比较严重。

如上图所示，当你把鼠标悬停在它上面时，可以看到有更多信息提示。

![](https://mmbiz.qpic.cn/mmbiz_png/LDPLltmNy578TcTW92eH34oC0KZvgCvq3M0NvEMja3fibzEEdRSfvySEbD2zRBgd0IGTjJM8mMlLH8rJgjIycEQ/640?wx_fmt=png)

### 路由指示器

除了多根和性能指示器外，还有一个路由指示器：

![](https://mmbiz.qpic.cn/mmbiz_png/LDPLltmNy578TcTW92eH34oC0KZvgCvqjqVZ36OBXJicOWOibXp98hjau1niafHo18kwtAzYU4vSNY2UAod2ywqRw/640?wx_fmt=png)

这个新特性在快速查看 links 的设置很方便。但奇怪的是，这个特性并不是由 Vue tools 本身直接添加的，而是由 Vue Router 添加的.

### 插件

新的 Vue dev-tools 还有一个很重要的功能就是它完全可以与外部插件集成。我们可以很方便的查看使用到的插件信息。

我们事例的项目，已经使用两个库：`Vuex`和 `Vue Router`，点击 `Components` 下拉，就可以看到这两兄弟：

![](https://mmbiz.qpic.cn/mmbiz_png/LDPLltmNy578TcTW92eH34oC0KZvgCvqEr15SHnRnbPew5icJqicXHQh4WIMwlicuKGtbMTEH8eBRcxwU42MmE7hQ/640?wx_fmt=png)

点击其它中就会看到该插件的自定义视图。例如，Vue Router 面板向我们展示了当前可用的路由列表。

![](https://mmbiz.qpic.cn/mmbiz_png/LDPLltmNy578TcTW92eH34oC0KZvgCvqxZFGKvn0UCy8v3oARR0DV4fOq4bI8TDlLNia4jkwZbgkO88RzO2RGxw/640?wx_fmt=png)

### Timeline

在检查器的旁边，我们还可以看到这个：

![](https://mmbiz.qpic.cn/mmbiz_png/LDPLltmNy578TcTW92eH34oC0KZvgCvqJh5cf0fN7zquQo2VWkzVwdhdS4tsgX4ibgulBVO6qKORe1ficYepuApw/640?wx_fmt=png)

这个就是 Timeline，我们先叫它**时间线**吧。

当你第一次打开它的时候 (如果你还没有接触过你的应用程序的话)，你会看到一个空白的中央区域，左边有彩色的项目符号。

![](https://mmbiz.qpic.cn/mmbiz_png/LDPLltmNy578TcTW92eH34oC0KZvgCvqwKZJ4dicz61qRbsteMlbHenhOtqErp3dUOmBGjy0gqrSNQ9o000jmsw/640?wx_fmt=png)

每个颜色编码的通道都将显示应用程序实时触发的事件的时间轴。

例如，我们点击一个路由的时候，下面的点会出现在实际时间线的右侧。

![](https://mmbiz.qpic.cn/mmbiz_png/LDPLltmNy578TcTW92eH34oC0KZvgCvqDddszRrk4ID5qdibrEbXuwcyhiatOcxte6RPZGxdLovIO0VG4q8NOibyA/640?wx_fmt=png)

这乍一看好像没啥软用，但这些小点里装着很多信息。

如果我点击其中一个紫色的 `Mouse` 事件，在最右边的第三个面板显示以下信息。

![](https://mmbiz.qpic.cn/mmbiz_png/LDPLltmNy578TcTW92eH34oC0KZvgCvq2cIElbgR5m5wTb4wu0EV80UGrOfUxJFntNcZH4RUg1btndAXtuQZ1g/640?wx_fmt=png)

不仅我的点击事件被注册，而且我的 `mouseup` 和 `mousedown` 事件也包含了点击。我们甚至可以获得鼠标事件捕获的 `x` 和 `y` 坐标。

蓝色的圈表示路由的信息，点击蓝色的圈就可以看到路由的详细信息。如下所示：

![](https://mmbiz.qpic.cn/mmbiz_png/LDPLltmNy578TcTW92eH34oC0KZvgCvqtUgxxpeU4RlvetSYlz8ZfWxSWxu7tnGhc9NJ7Hmo4L3N0HGIehIy1A/640?wx_fmt=png)

组件事件也会显示完整的有效载荷信息。例如，像这样一个简单按钮的点击事件。

```
<button @click="$emit('customEvent', { some: 'data' })">Click me</button>


```

![](https://mmbiz.qpic.cn/mmbiz_png/LDPLltmNy578TcTW92eH34oC0KZvgCvqtPPicvgwOQaU35zj6qMatbHV41FaRX1icnFaLTlYxGZE6PqBzD98icOuw/640?wx_fmt=png)

如果你觉得面板展示太多选项，有点晕，我们可以点击右上角的来关掉一些我们不想的：

![](https://mmbiz.qpic.cn/mmbiz_png/LDPLltmNy578TcTW92eH34oC0KZvgCvq2rd9SRIcibcOFC81Qck6glzyU3RVA5c5uiczN96HwXMeWaaJQuALG1gw/640?wx_fmt=png)

### 在编辑器中打开

当在检查器中选择你的一个自定义组件时，如果我们想它具体的定义，还可以直接在编辑器中打开

![](https://mmbiz.qpic.cn/mmbiz_png/LDPLltmNy578TcTW92eH34oC0KZvgCvqfr70ic8Pmx4WibfprQSIXkQlma72BRyQU9UCtRGp7IrajckXHcZynic1w/640?wx_fmt=png)

如果单击此按钮，编辑器将打开该文件对应的文件!
