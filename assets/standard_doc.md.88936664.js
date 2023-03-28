import{_ as s,c as n,o as a,a as l}from"./app.8a49408b.js";const C=JSON.parse('{"title":"文档规范","description":"","frontmatter":{},"headers":[{"level":2,"title":"项目文档","slug":"项目文档","link":"#项目文档","children":[]},{"level":2,"title":"组件文档","slug":"组件文档","link":"#组件文档","children":[]}],"relativePath":"standard/doc.md"}'),p={name:"standard/doc.md"},o=l(`<h1 id="文档规范" tabindex="-1">文档规范 <a class="header-anchor" href="#文档规范" aria-hidden="true">#</a></h1><p>在多人合作开发下，经常碰到的最头疼的问题是，其他开发者在交接给我们一个项目时只是对项目目前现有的功能简单的描述了下，我们在后续迭代功能时突然发现连最基本的项目如何运行都没有给我们交代，只能去查看 <code>package.json</code> 的 <code>scripts</code>，其他信息还得查看代码去意会。为了避免类似的情况，可想而知一份规范的文档说是多么的重要，所以文档规范的编写就是为了解决文档信息不全、编写杂乱等问题。</p><p>以下推荐项目说明文档和组件使用文档的编写规范。</p><h2 id="项目文档" tabindex="-1">项目文档 <a class="header-anchor" href="#项目文档" aria-hidden="true">#</a></h2><div class="language-md"><button title="Copy Code" class="copy"></button><span class="lang">md</span><pre class="shiki material-theme-palenight" tabindex="0"><code><span class="line"><span style="color:#89DDFF;"># </span><span style="color:#FFCB6B;">背景</span></span>
<span class="line"></span>
<span class="line"><span style="color:#A6ACCD;">每一个项目都必须有</span><span style="color:#89DDFF;">\`</span><span style="color:#C3E88D;">README.md</span><span style="color:#89DDFF;">\`</span><span style="color:#A6ACCD;"> 文档。对于使用项目的人而言，一份好的</span><span style="color:#89DDFF;">\`</span><span style="color:#C3E88D;">README.md</span><span style="color:#89DDFF;">\`</span><span style="color:#A6ACCD;">可以让其他人迅速了解项目内容、技术栈、项目发布流程等，这毫无疑问可以大大减少沟通成本。</span></span>
<span class="line"></span>
<span class="line"><span style="color:#89DDFF;">## </span><span style="color:#FFCB6B;">行文规范</span></span>
<span class="line"></span>
<span class="line"><span style="color:#89DDFF;">\`</span><span style="color:#C3E88D;">README.md</span><span style="color:#89DDFF;">\`</span><span style="color:#A6ACCD;"> 文档 </span><span style="color:#89DDFF;font-weight:bold;">**</span><span style="color:#F07178;font-weight:bold;">应该</span><span style="color:#89DDFF;font-weight:bold;">**</span><span style="color:#A6ACCD;"> 包含以下内容：</span></span>
<span class="line"></span>
<span class="line"><span style="color:#89DDFF;font-weight:bold;">**</span><span style="color:#F07178;font-weight:bold;">项目简介</span><span style="color:#89DDFF;font-weight:bold;">**</span></span>
<span class="line"></span>
<span class="line"><span style="color:#A6ACCD;">主要介绍项目的背景和动机，简单描述项目背景，产品说明、功能描述，以及项目相关链接（立项书，交互稿，需求说明书）</span></span>
<span class="line"></span>
<span class="line"><span style="color:#89DDFF;font-weight:bold;">**</span><span style="color:#F07178;font-weight:bold;">技术栈</span><span style="color:#89DDFF;font-weight:bold;">**</span></span>
<span class="line"><span style="color:#A6ACCD;">描述项目主要的技术栈，列出一些技术文献资料和链接，方便其他人开发人员开始使用那些技术栈。所以理应把项目的语言、依赖和对应的版本写下来。比如:</span></span>
<span class="line"></span>
<span class="line"><span style="color:#89DDFF;">-</span><span style="color:#A6ACCD;"> Vue 全家桶：</span><span style="color:#89DDFF;">\`</span><span style="color:#C3E88D;">Vue + Vue-Router + Pinia(Vuex5)</span><span style="color:#89DDFF;">\`</span></span>
<span class="line"><span style="color:#89DDFF;">-</span><span style="color:#A6ACCD;"> 组件库：</span><span style="color:#89DDFF;">\`</span><span style="color:#C3E88D;">TDesign</span><span style="color:#89DDFF;">\`</span></span>
<span class="line"><span style="color:#89DDFF;">-</span><span style="color:#A6ACCD;"> 图表库：</span><span style="color:#89DDFF;">\`</span><span style="color:#C3E88D;">Echart</span><span style="color:#89DDFF;">\`</span></span>
<span class="line"></span>
<span class="line"><span style="color:#89DDFF;font-weight:bold;">**</span><span style="color:#F07178;font-weight:bold;">运行环境</span><span style="color:#89DDFF;font-weight:bold;">**</span></span>
<span class="line"></span>
<span class="line"><span style="color:#A6ACCD;">项目安装和运行说明，系统环境依赖要求等信息</span></span>
<span class="line"></span>
<span class="line"><span style="color:#89DDFF;">1.</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;font-weight:bold;">**</span><span style="color:#F07178;font-weight:bold;">环境配置</span><span style="color:#89DDFF;font-weight:bold;">**</span><span style="color:#A6ACCD;">， 开发环境依赖安装和配置</span></span>
<span class="line"><span style="color:#89DDFF;">2.</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;font-weight:bold;">**</span><span style="color:#F07178;font-weight:bold;">命令指南</span><span style="color:#89DDFF;font-weight:bold;">**</span><span style="color:#A6ACCD;">，介绍开启本地开发命令，以及构建发布等</span></span>
<span class="line"><span style="color:#89DDFF;">3.</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;font-weight:bold;">**</span><span style="color:#F07178;font-weight:bold;">代理配置</span><span style="color:#89DDFF;font-weight:bold;">**</span><span style="color:#A6ACCD;">，开发使用到一些接口代理</span></span>
<span class="line"></span>
<span class="line"><span style="color:#89DDFF;font-weight:bold;">**</span><span style="color:#F07178;font-weight:bold;">发布流程</span><span style="color:#89DDFF;font-weight:bold;">**</span></span>
<span class="line"><span style="color:#A6ACCD;">介绍代码上线流程，需要执行哪些步骤；</span></span>
<span class="line"></span>
<span class="line"><span style="color:#89DDFF;font-weight:bold;">**</span><span style="color:#F07178;font-weight:bold;">目录结构</span><span style="color:#89DDFF;font-weight:bold;">**</span></span>
<span class="line"><span style="color:#A6ACCD;">使用 </span><span style="color:#89DDFF;">[</span><span style="color:#89DDFF;">\`</span><span style="color:#C3E88D;">tree-cli</span><span style="color:#89DDFF;">\`</span><span style="color:#89DDFF;">](</span><span style="color:#F07178;text-decoration:underline;">https://www.npmjs.com/package/tree-cli</span><span style="color:#89DDFF;">)</span><span style="color:#A6ACCD;"> 列出目录结构，并写上对应文件夹或者文件的简单描述</span></span>
<span class="line"></span>
<span class="line"><span style="color:#89DDFF;font-weight:bold;">**</span><span style="color:#F07178;font-weight:bold;">扩展包说明</span><span style="color:#89DDFF;font-weight:bold;">**</span></span>
<span class="line"><span style="color:#A6ACCD;">使用表格列出所有使用的扩展依赖包，还有在哪些业务逻辑或者用例中使用了此扩展包</span></span>
<span class="line"></span>
<span class="line"><span style="color:#89DDFF;font-weight:bold;">**</span><span style="color:#F07178;font-weight:bold;">外部链接</span><span style="color:#89DDFF;font-weight:bold;">**</span></span>
<span class="line"><span style="color:#A6ACCD;">对于项目有关联的一些链接，例如有项目地址（如tapd）、接口文档地址，或者是开源项目的文档、教程、博客等</span></span>
<span class="line"></span>
<span class="line"><span style="color:#89DDFF;font-weight:bold;">**</span><span style="color:#F07178;font-weight:bold;">FAQ（常见问题解答）</span><span style="color:#89DDFF;font-weight:bold;">**</span></span>
<span class="line"></span>
<span class="line"><span style="color:#89DDFF;">1.</span><span style="color:#A6ACCD;"> 常见问题 1</span></span>
<span class="line"><span style="color:#89DDFF;">2.</span><span style="color:#A6ACCD;"> 常见问题 2</span></span>
<span class="line"></span></code></pre></div><h2 id="组件文档" tabindex="-1">组件文档 <a class="header-anchor" href="#组件文档" aria-hidden="true">#</a></h2><div class="language-md"><button title="Copy Code" class="copy"></button><span class="lang">md</span><pre class="shiki material-theme-palenight" tabindex="0"><code><span class="line"><span style="color:#89DDFF;"># </span><span style="color:#FFCB6B;">组件名称</span></span>
<span class="line"></span>
<span class="line"><span style="color:#89DDFF;">## </span><span style="color:#FFCB6B;">介绍</span></span>
<span class="line"></span>
<span class="line"><span style="color:#A6ACCD;">简单描述组件功能，以及使用的场景</span></span>
<span class="line"></span>
<span class="line"><span style="color:#89DDFF;">## </span><span style="color:#FFCB6B;">代码演示</span></span>
<span class="line"></span>
<span class="line"><span style="color:#A6ACCD;">组件使用说明，一般按不同属性或方法的使用来演示组件使用。以</span><span style="color:#89DDFF;">\`</span><span style="color:#C3E88D;">XIcon</span><span style="color:#89DDFF;">\`</span><span style="color:#A6ACCD;">图标组件为例，比如：基础用法、图标大小、图标颜色使用</span></span>
<span class="line"></span>
<span class="line"><span style="color:#89DDFF;">### </span><span style="color:#FFCB6B;">基础用法</span></span>
<span class="line"></span>
<span class="line"><span style="color:#89DDFF;">## </span><span style="color:#FFCB6B;">API</span></span>
<span class="line"></span>
<span class="line"><span style="color:#A6ACCD;">编写组件 API 使用说明（Props 属性、Slot 插槽、Event 事件）</span></span>
<span class="line"></span>
<span class="line"><span style="color:#89DDFF;">### </span><span style="color:#FFCB6B;">Props</span></span>
<span class="line"></span>
<span class="line"><span style="color:#A6ACCD;">| 参数 | 说明 | 类型 | 默认值 |</span></span>
<span class="line"><span style="color:#A6ACCD;">| ---- | ---- | ---- | ------ |</span></span>
<span class="line"><span style="color:#A6ACCD;">| -    | -    | -    | -      |</span></span>
<span class="line"></span>
<span class="line"><span style="color:#89DDFF;">### </span><span style="color:#FFCB6B;">Slots</span></span>
<span class="line"></span>
<span class="line"><span style="color:#A6ACCD;">| 名称 | 说明 |</span></span>
<span class="line"><span style="color:#A6ACCD;">| ---- | ---- |</span></span>
<span class="line"><span style="color:#A6ACCD;">| -    | -    |</span></span>
<span class="line"></span>
<span class="line"><span style="color:#89DDFF;">### </span><span style="color:#FFCB6B;">Events</span></span>
<span class="line"></span>
<span class="line"><span style="color:#A6ACCD;">| 事件名 | 说明 | 回调参数 |</span></span>
<span class="line"><span style="color:#A6ACCD;">| ------ | ---- | -------- |</span></span>
<span class="line"><span style="color:#A6ACCD;">| -      | -    | -        |</span></span>
<span class="line"></span></code></pre></div>`,7),e=[o];function t(c,r,D,i,F,y){return a(),n("div",null,e)}const A=s(p,[["render",t]]);export{C as __pageData,A as default};
