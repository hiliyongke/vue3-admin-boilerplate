import{_ as s,c as a,o as n,a as e}from"./app.8a49408b.js";const d=JSON.parse('{"title":"","description":"","frontmatter":{},"headers":[{"level":2,"title":"安装","slug":"安装","link":"#安装","children":[]},{"level":2,"title":"vite-plugin-pages","slug":"vite-plugin-pages","link":"#vite-plugin-pages","children":[]},{"level":2,"title":"vite-plugin-vue-layouts","slug":"vite-plugin-vue-layouts","link":"#vite-plugin-vue-layouts","children":[]},{"level":2,"title":"总结","slug":"总结","link":"#总结","children":[]}],"relativePath":"vite-plugins/pages&layouts.md"}'),l={name:"vite-plugins/pages&layouts.md"},p=e(`<blockquote><p>做 Vue 开发脱离不了路由，尤其是中大型项目，页面多且杂，在配置路由的时候总是会变得逐渐暴躁，因为费时，并且又没有什么太多技术含量，总觉得是在浪费时间。</p></blockquote><p>做 Vue 开发脱离不了路由，尤其是中大型项目，页面多且杂，在配置路由的时候总是会变得逐渐暴躁，因为费时，并且又没有什么太多技术含量，总觉得是在浪费时间。</p><p>另外如果接手了别人的项目，当业务有变更，或者测试反馈有 bug 。通常需要先要根据页面 URL 去找到对应配置的路由，然后对照 <code>component</code> 参数对应的 <code>.vue</code> 文件，操作繁琐，效率也不高。</p><p>那有没有一种办法可以根据 <code>.vue</code> 文件自动生成路由，并且路由的 <code>path</code> 就是文件所在的文件夹路径，这样即节省了路由配置的时间，也提高了根据 URL 定位页面文件的效率。</p><p>经过我的一番查找，还真找到了，就是下面这两个插件：</p><ul><li><a href="https://github.com/hannoeru/vite-plugin-pages" target="_blank" rel="noreferrer">vite-plugin-pages</a></li><li><a href="https://github.com/JohnCampionJr/vite-plugin-vue-layouts" target="_blank" rel="noreferrer">vite-plugin-vue-layouts</a></li></ul><h2 id="安装" tabindex="-1">安装 <a class="header-anchor" href="#安装" aria-hidden="true">#</a></h2><p>从这两款插件的名字可以看出，这俩是 vite 的插件，并且仅支持 Vue3 ，那我就搬出我的项目模版拿来测试了。</p><p>首先先安装依赖。因为模版里自带了 vue-router ，所以不需要再安装。</p><div class="language-"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki material-theme-palenight" tabindex="0"><code><span class="line"><span style="color:#A6ACCD;">pnpm add vite-plugin-pages vite-plugin-vue-layouts -D</span></span>
<span class="line"><span style="color:#A6ACCD;"></span></span>
<span class="line"><span style="color:#A6ACCD;"></span></span></code></pre></div><p>安装好依赖后，需要在 <code>vite.config.js</code> 里进行配置，由于这两个插件作用不同，我们一个个来介绍如何使用。</p><h2 id="vite-plugin-pages" tabindex="-1">vite-plugin-pages <a class="header-anchor" href="#vite-plugin-pages" aria-hidden="true">#</a></h2><p>这个是本次介绍的核心，它能够将文件系统生成对应的路由，从而省去手动配置路由的时间。</p><p>首先在 <code>vite.config.js</code> 增加以下配置：</p><div class="language-"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki material-theme-palenight" tabindex="0"><code><span class="line"><span style="color:#A6ACCD;">import Pages from &#39;vite-plugin-pages&#39;</span></span>
<span class="line"><span style="color:#A6ACCD;">export default {</span></span>
<span class="line"><span style="color:#A6ACCD;">    plugins: [</span></span>
<span class="line"><span style="color:#A6ACCD;">        Pages({</span></span>
<span class="line"><span style="color:#A6ACCD;">            dirs: &#39;src/pages&#39;,  // 需要生成路由的文件目录</span></span>
<span class="line"><span style="color:#A6ACCD;">            exclude: [&#39;**/components/*.vue&#39;]  // 排除在外的目录，即不将所有 components 目录下的 .vue 文件生成路由</span></span>
<span class="line"><span style="color:#A6ACCD;">        })</span></span>
<span class="line"><span style="color:#A6ACCD;">    ]</span></span>
<span class="line"><span style="color:#A6ACCD;">}</span></span>
<span class="line"><span style="color:#A6ACCD;"></span></span>
<span class="line"><span style="color:#A6ACCD;"></span></span></code></pre></div><p>目前只需要配置这 2 个参数就够了，其它还有更多参数可以去 <a href="https://github.com/hannoeru/vite-plugin-pages" target="_blank" rel="noreferrer">vite-plugin-pages</a> 项目页了解。</p><p>接着在页面中引入就可以使用了。</p><div class="language-"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki material-theme-palenight" tabindex="0"><code><span class="line"><span style="color:#A6ACCD;">import { createRouter } from &#39;vue-router&#39;</span></span>
<span class="line"><span style="color:#A6ACCD;">import routes from &#39;~pages&#39;</span></span>
<span class="line"><span style="color:#A6ACCD;">const router = createRouter({</span></span>
<span class="line"><span style="color:#A6ACCD;">    // ...</span></span>
<span class="line"><span style="color:#A6ACCD;">    routes</span></span>
<span class="line"><span style="color:#A6ACCD;">})</span></span>
<span class="line"><span style="color:#A6ACCD;"></span></span>
<span class="line"><span style="color:#A6ACCD;"></span></span></code></pre></div><p>没错，就是这么简单，当然也有一些高阶用法。比如通过 params 传参的路由，要怎么配置呢？</p><p>在 vite-plugin-pages 里提供了一种专用的写法，就是 <code>[ ]</code> 。例如 <code>src/views/example/[id].vue</code> 这个文件，最终生成的路由 <code>path</code> 就是 <code>/example/:id</code> 。</p><p>针对 404 页面，我们可以在创建个这样的文件 <code>src/views/[...all].vue</code> ，它生成的路由就是 <code>/:all(.*)*</code> 。</p><p>除此之外，我们还可以在 <code>.vue</code> 文件中增加 <code>&lt;route&gt;&lt;/route&gt;</code> 代码块，这里面默认接收 <code>json5</code> 格式的路由配置。需要注意的是，如果在 <code>&lt;route&gt;&lt;/route&gt;</code> 里配置了 <code>path</code> 和 <code>name</code> ，将会覆盖自动生成的 <code>path</code> 和 <code>name</code> 。</p><div class="language-"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki material-theme-palenight" tabindex="0"><code><span class="line"><span style="color:#A6ACCD;">&lt;route&gt;</span></span>
<span class="line"><span style="color:#A6ACCD;">{</span></span>
<span class="line"><span style="color:#A6ACCD;">    path: &#39;/xxx/yyy&#39;,</span></span>
<span class="line"><span style="color:#A6ACCD;">    name: &#39;zzz&#39;,</span></span>
<span class="line"><span style="color:#A6ACCD;">    meta: {</span></span>
<span class="line"><span style="color:#A6ACCD;">        title: &#39;test page&#39;</span></span>
<span class="line"><span style="color:#A6ACCD;">    }</span></span>
<span class="line"><span style="color:#A6ACCD;">}</span></span>
<span class="line"><span style="color:#A6ACCD;">&lt;/route&gt;</span></span>
<span class="line"><span style="color:#A6ACCD;">&lt;template&gt;</span></span>
<span class="line"><span style="color:#A6ACCD;">	&lt;div&gt;</span></span>
<span class="line"><span style="color:#A6ACCD;">        This is a test page.</span></span>
<span class="line"><span style="color:#A6ACCD;">    &lt;/div&gt;</span></span>
<span class="line"><span style="color:#A6ACCD;">&lt;/template&gt;</span></span>
<span class="line"><span style="color:#A6ACCD;"></span></span>
<span class="line"><span style="color:#A6ACCD;"></span></span></code></pre></div><p>这时候似乎还缺点什么，对的，那就是嵌套路由。通过 vite-plugin-pages 自动生成的路由，都是一级路由。而实际项目开发中，我们会使用嵌套路由的特性，搭配 <code>&lt;router-view&gt;&lt;/router-view&gt;</code> 组件实现一些布局效果。</p><p>这时候就要介绍下面这款插件了</p><h2 id="vite-plugin-vue-layouts" tabindex="-1">vite-plugin-vue-layouts <a class="header-anchor" href="#vite-plugin-vue-layouts" aria-hidden="true">#</a></h2><p>首先在 <code>vite.config.js</code> 修改下配置：</p><div class="language-"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki material-theme-palenight" tabindex="0"><code><span class="line"><span style="color:#A6ACCD;">import Pages from &#39;vite-plugin-pages&#39;</span></span>
<span class="line"><span style="color:#A6ACCD;">import Layouts from &#39;vite-plugin-vue-layouts&#39;</span></span>
<span class="line"><span style="color:#A6ACCD;">export default {</span></span>
<span class="line"><span style="color:#A6ACCD;">    plugins: [</span></span>
<span class="line"><span style="color:#A6ACCD;">        Pages({</span></span>
<span class="line"><span style="color:#A6ACCD;">            dirs: &#39;src/pages&#39;,  // 需要生成路由的文件目录</span></span>
<span class="line"><span style="color:#A6ACCD;">            exclude: [&#39;**/components/*.vue&#39;]  // 排除在外的目录，即所有 components 目录下的 .vue 文件都不会生成路由</span></span>
<span class="line"><span style="color:#A6ACCD;">        }),</span></span>
<span class="line"><span style="color:#A6ACCD;">        Layouts({</span></span>
<span class="line"><span style="color:#A6ACCD;">            layoutsDirs: &#39;src/layouts&#39;,  // 布局文件存放目录</span></span>
<span class="line"><span style="color:#A6ACCD;">            defaultLayout: &#39;index&#39;  // 默认布局，对应 src/layouts/index.vue</span></span>
<span class="line"><span style="color:#A6ACCD;">        })</span></span>
<span class="line"><span style="color:#A6ACCD;">    ]</span></span>
<span class="line"><span style="color:#A6ACCD;">}</span></span>
<span class="line"><span style="color:#A6ACCD;"></span></span>
<span class="line"><span style="color:#A6ACCD;"></span></span></code></pre></div><p>更多配置参数请查看 <a href="https://github.com/JohnCampionJr/vite-plugin-vue-layouts" target="_blank" rel="noreferrer">vite-plugin-vue-layouts</a> 项目页。</p><p>也还是一样，配置好后，就可以直接使用了。</p><div class="language-"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki material-theme-palenight" tabindex="0"><code><span class="line"><span style="color:#A6ACCD;">import { createRouter } from &#39;vue-router&#39;</span></span>
<span class="line"><span style="color:#A6ACCD;">import { setupLayouts } from &#39;virtual:generated-layouts&#39;</span></span>
<span class="line"><span style="color:#A6ACCD;">import generatedRoutes from &#39;virtual:generated-pages&#39;</span></span>
<span class="line"><span style="color:#A6ACCD;">const routes = setupLayouts(generatedRoutes)</span></span>
<span class="line"><span style="color:#A6ACCD;">const router = createRouter({</span></span>
<span class="line"><span style="color:#A6ACCD;">    // ...</span></span>
<span class="line"><span style="color:#A6ACCD;">    routes</span></span>
<span class="line"><span style="color:#A6ACCD;">})</span></span>
<span class="line"><span style="color:#A6ACCD;"></span></span>
<span class="line"><span style="color:#A6ACCD;"></span></span></code></pre></div><p>这个插件只做一件事，就是把通过 vite-plugin-pages 生成的一级路由处理成嵌套路由，大概就是这样：</p><div class="language-"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki material-theme-palenight" tabindex="0"><code><span class="line"><span style="color:#A6ACCD;">// 处理前</span></span>
<span class="line"><span style="color:#A6ACCD;">{</span></span>
<span class="line"><span style="color:#A6ACCD;">    path: &#39;/login&#39;,</span></span>
<span class="line"><span style="color:#A6ACCD;">    component: () =&gt; import(&#39;/src/views/login.vue&#39;),</span></span>
<span class="line"><span style="color:#A6ACCD;">    name: &#39;login&#39;</span></span>
<span class="line"><span style="color:#A6ACCD;">}</span></span>
<span class="line"><span style="color:#A6ACCD;">// 处理后</span></span>
<span class="line"><span style="color:#A6ACCD;">{</span></span>
<span class="line"><span style="color:#A6ACCD;">    path: &#39;/login&#39;,</span></span>
<span class="line"><span style="color:#A6ACCD;">    component: () =&gt; import(&#39;/src/layout/index.vue&#39;),</span></span>
<span class="line"><span style="color:#A6ACCD;">    children: [</span></span>
<span class="line"><span style="color:#A6ACCD;">        {</span></span>
<span class="line"><span style="color:#A6ACCD;">            path: &#39;&#39;,</span></span>
<span class="line"><span style="color:#A6ACCD;">            component: () =&gt; import(&#39;/src/views/login.vue&#39;),</span></span>
<span class="line"><span style="color:#A6ACCD;">            name: &#39;login&#39;</span></span>
<span class="line"><span style="color:#A6ACCD;">        }</span></span>
<span class="line"><span style="color:#A6ACCD;">    ]</span></span>
<span class="line"><span style="color:#A6ACCD;">}</span></span>
<span class="line"><span style="color:#A6ACCD;"></span></span>
<span class="line"><span style="color:#A6ACCD;"></span></span></code></pre></div><p>如果你有多种布局，可以在 <code>&lt;route&gt;&lt;route&gt;</code> 里进行设置：</p><div class="language-"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki material-theme-palenight" tabindex="0"><code><span class="line"><span style="color:#A6ACCD;">&lt;route&gt;</span></span>
<span class="line"><span style="color:#A6ACCD;">{</span></span>
<span class="line"><span style="color:#A6ACCD;">    meta: {</span></span>
<span class="line"><span style="color:#A6ACCD;">        layout: &#39;other&#39;</span></span>
<span class="line"><span style="color:#A6ACCD;">    }</span></span>
<span class="line"><span style="color:#A6ACCD;">}</span></span>
<span class="line"><span style="color:#A6ACCD;">&lt;/route&gt;</span></span>
<span class="line"><span style="color:#A6ACCD;"></span></span>
<span class="line"><span style="color:#A6ACCD;"></span></span></code></pre></div><p>甚至还可以做一些魔改，比如项目中有的路由是需要用到布局页面的，有的则不需要，那我们可以将不需要的页面设置为 <code>layout: false</code> ：</p><div class="language-"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki material-theme-palenight" tabindex="0"><code><span class="line"><span style="color:#A6ACCD;">&lt;route&gt;</span></span>
<span class="line"><span style="color:#A6ACCD;">{</span></span>
<span class="line"><span style="color:#A6ACCD;">    meta: {</span></span>
<span class="line"><span style="color:#A6ACCD;">        layout: false</span></span>
<span class="line"><span style="color:#A6ACCD;">    }</span></span>
<span class="line"><span style="color:#A6ACCD;">}</span></span>
<span class="line"><span style="color:#A6ACCD;">&lt;/route&gt;</span></span>
<span class="line"><span style="color:#A6ACCD;"></span></span>
<span class="line"><span style="color:#A6ACCD;"></span></span></code></pre></div><p>同时在路由文件处使用下面这段代码：</p><div class="language-"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki material-theme-palenight" tabindex="0"><code><span class="line"><span style="color:#A6ACCD;">import { createRouter } from &#39;vue-router&#39;</span></span>
<span class="line"><span style="color:#A6ACCD;">import { setupLayouts } from &#39;virtual:generated-layouts&#39;</span></span>
<span class="line"><span style="color:#A6ACCD;">import generatedRoutes from &#39;virtual:generated-pages&#39;</span></span>
<span class="line"><span style="color:#A6ACCD;">let routes = []</span></span>
<span class="line"><span style="color:#A6ACCD;">generatedRoutes.forEach(v =&gt; {</span></span>
<span class="line"><span style="color:#A6ACCD;">    routes.push(v?.meta?.layout != false ? setupLayouts([v])[0] : v)</span></span>
<span class="line"><span style="color:#A6ACCD;">})</span></span>
<span class="line"><span style="color:#A6ACCD;">const router = createRouter({</span></span>
<span class="line"><span style="color:#A6ACCD;">    // ...</span></span>
<span class="line"><span style="color:#A6ACCD;">    routes</span></span>
<span class="line"><span style="color:#A6ACCD;">})</span></span>
<span class="line"><span style="color:#A6ACCD;"></span></span>
<span class="line"><span style="color:#A6ACCD;"></span></span></code></pre></div><h2 id="总结" tabindex="-1">总结 <a class="header-anchor" href="#总结" aria-hidden="true">#</a></h2><p>通过下面这张图配合总结吧：</p><div class="language-"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki material-theme-palenight" tabindex="0"><code><span class="line"><span style="color:#A6ACCD;">文件系统                           路由地址                          路由 name</span></span>
<span class="line"><span style="color:#A6ACCD;">views</span></span>
<span class="line"><span style="color:#A6ACCD;">├─ example</span></span>
<span class="line"><span style="color:#A6ACCD;">│    ├─ components</span></span>
<span class="line"><span style="color:#A6ACCD;">│    │    └─ List</span></span>
<span class="line"><span style="color:#A6ACCD;">│    │         └─ index.vue</span></span>
<span class="line"><span style="color:#A6ACCD;">│    ├─ params</span></span>
<span class="line"><span style="color:#A6ACCD;">│    │    └─ [id].vue              /example/params/:id              example-params</span></span>
<span class="line"><span style="color:#A6ACCD;">│    ├─ axios.vue                  /example/axios                   example-axios</span></span>
<span class="line"><span style="color:#A6ACCD;">│    ├─ cookie.vue                 /example/cookie                  example-cookie</span></span>
<span class="line"><span style="color:#A6ACCD;">│    └─ svgicon.vue                /example/svgicon                 example-svgicon</span></span>
<span class="line"><span style="color:#A6ACCD;">├─ [...all].vue                    /:all(.*)*                       all</span></span>
<span class="line"><span style="color:#A6ACCD;">├─ index.vue                       /                                index</span></span>
<span class="line"><span style="color:#A6ACCD;">└─ login.vue                       /login                           login</span></span>
<span class="line"><span style="color:#A6ACCD;"></span></span>
<span class="line"><span style="color:#A6ACCD;"></span></span></code></pre></div><ul><li>使用路由参数需通过 <code>[ ]</code> 将参数名包裹，并设为文件名</li><li>文件夹不会生成路由，例如 example 文件夹并没有生成 <code>/example</code> 路由</li><li>路由 name 会根据文件的目录结构自动生成，并用 <code>-</code> 连接，可确保 name 的唯一性</li><li>所有 components 目录均不会生成路由</li></ul>`,43),o=[p];function t(c,i,r,C,A,u){return n(),a("div",null,o)}const g=s(l,[["render",t]]);export{d as __pageData,g as default};
