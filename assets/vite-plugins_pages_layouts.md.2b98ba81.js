import{_ as s,c as n,o as a,a as l}from"./app.850f2e10.js";const d=JSON.parse('{"title":"","description":"","frontmatter":{},"headers":[{"level":2,"title":"\u5B89\u88C5","slug":"\u5B89\u88C5","link":"#\u5B89\u88C5","children":[]},{"level":2,"title":"vite-plugin-pages","slug":"vite-plugin-pages","link":"#vite-plugin-pages","children":[]},{"level":2,"title":"vite-plugin-vue-layouts","slug":"vite-plugin-vue-layouts","link":"#vite-plugin-vue-layouts","children":[]},{"level":2,"title":"\u603B\u7ED3","slug":"\u603B\u7ED3","link":"#\u603B\u7ED3","children":[]}],"relativePath":"vite-plugins/pages&layouts.md"}'),p={name:"vite-plugins/pages&layouts.md"},e=l(`<blockquote><p>\u505A Vue \u5F00\u53D1\u8131\u79BB\u4E0D\u4E86\u8DEF\u7531\uFF0C\u5C24\u5176\u662F\u4E2D\u5927\u578B\u9879\u76EE\uFF0C\u9875\u9762\u591A\u4E14\u6742\uFF0C\u5728\u914D\u7F6E\u8DEF\u7531\u7684\u65F6\u5019\u603B\u662F\u4F1A\u53D8\u5F97\u9010\u6E10\u66B4\u8E81\uFF0C\u56E0\u4E3A\u8D39\u65F6\uFF0C\u5E76\u4E14\u53C8\u6CA1\u6709\u4EC0\u4E48\u592A\u591A\u6280\u672F\u542B\u91CF\uFF0C\u603B\u89C9\u5F97\u662F\u5728\u6D6A\u8D39\u65F6\u95F4\u3002</p></blockquote><p>\u505A Vue \u5F00\u53D1\u8131\u79BB\u4E0D\u4E86\u8DEF\u7531\uFF0C\u5C24\u5176\u662F\u4E2D\u5927\u578B\u9879\u76EE\uFF0C\u9875\u9762\u591A\u4E14\u6742\uFF0C\u5728\u914D\u7F6E\u8DEF\u7531\u7684\u65F6\u5019\u603B\u662F\u4F1A\u53D8\u5F97\u9010\u6E10\u66B4\u8E81\uFF0C\u56E0\u4E3A\u8D39\u65F6\uFF0C\u5E76\u4E14\u53C8\u6CA1\u6709\u4EC0\u4E48\u592A\u591A\u6280\u672F\u542B\u91CF\uFF0C\u603B\u89C9\u5F97\u662F\u5728\u6D6A\u8D39\u65F6\u95F4\u3002</p><p>\u53E6\u5916\u5982\u679C\u63A5\u624B\u4E86\u522B\u4EBA\u7684\u9879\u76EE\uFF0C\u5F53\u4E1A\u52A1\u6709\u53D8\u66F4\uFF0C\u6216\u8005\u6D4B\u8BD5\u53CD\u9988\u6709 bug \u3002\u901A\u5E38\u9700\u8981\u5148\u8981\u6839\u636E\u9875\u9762 URL \u53BB\u627E\u5230\u5BF9\u5E94\u914D\u7F6E\u7684\u8DEF\u7531\uFF0C\u7136\u540E\u5BF9\u7167 <code>component</code> \u53C2\u6570\u5BF9\u5E94\u7684 <code>.vue</code> \u6587\u4EF6\uFF0C\u64CD\u4F5C\u7E41\u7410\uFF0C\u6548\u7387\u4E5F\u4E0D\u9AD8\u3002</p><p>\u90A3\u6709\u6CA1\u6709\u4E00\u79CD\u529E\u6CD5\u53EF\u4EE5\u6839\u636E <code>.vue</code> \u6587\u4EF6\u81EA\u52A8\u751F\u6210\u8DEF\u7531\uFF0C\u5E76\u4E14\u8DEF\u7531\u7684 <code>path</code> \u5C31\u662F\u6587\u4EF6\u6240\u5728\u7684\u6587\u4EF6\u5939\u8DEF\u5F84\uFF0C\u8FD9\u6837\u5373\u8282\u7701\u4E86\u8DEF\u7531\u914D\u7F6E\u7684\u65F6\u95F4\uFF0C\u4E5F\u63D0\u9AD8\u4E86\u6839\u636E URL \u5B9A\u4F4D\u9875\u9762\u6587\u4EF6\u7684\u6548\u7387\u3002</p><p>\u7ECF\u8FC7\u6211\u7684\u4E00\u756A\u67E5\u627E\uFF0C\u8FD8\u771F\u627E\u5230\u4E86\uFF0C\u5C31\u662F\u4E0B\u9762\u8FD9\u4E24\u4E2A\u63D2\u4EF6\uFF1A</p><ul><li><a href="https://github.com/hannoeru/vite-plugin-pages" target="_blank" rel="noreferrer">vite-plugin-pages</a></li><li><a href="https://github.com/JohnCampionJr/vite-plugin-vue-layouts" target="_blank" rel="noreferrer">vite-plugin-vue-layouts</a></li></ul><h2 id="\u5B89\u88C5" tabindex="-1">\u5B89\u88C5 <a class="header-anchor" href="#\u5B89\u88C5" aria-hidden="true">#</a></h2><p>\u4ECE\u8FD9\u4E24\u6B3E\u63D2\u4EF6\u7684\u540D\u5B57\u53EF\u4EE5\u770B\u51FA\uFF0C\u8FD9\u4FE9\u662F vite \u7684\u63D2\u4EF6\uFF0C\u5E76\u4E14\u4EC5\u652F\u6301 Vue3 \uFF0C\u90A3\u6211\u5C31\u642C\u51FA\u6211\u7684\u9879\u76EE\u6A21\u7248\u62FF\u6765\u6D4B\u8BD5\u4E86\u3002</p><p>\u9996\u5148\u5148\u5B89\u88C5\u4F9D\u8D56\u3002\u56E0\u4E3A\u6A21\u7248\u91CC\u81EA\u5E26\u4E86 vue-router \uFF0C\u6240\u4EE5\u4E0D\u9700\u8981\u518D\u5B89\u88C5\u3002</p><div class="language-"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki"><code><span class="line"><span style="color:#A6ACCD;">pnpm add vite-plugin-pages vite-plugin-vue-layouts -D</span></span>
<span class="line"><span style="color:#A6ACCD;"></span></span>
<span class="line"><span style="color:#A6ACCD;"></span></span></code></pre></div><p>\u5B89\u88C5\u597D\u4F9D\u8D56\u540E\uFF0C\u9700\u8981\u5728 <code>vite.config.js</code> \u91CC\u8FDB\u884C\u914D\u7F6E\uFF0C\u7531\u4E8E\u8FD9\u4E24\u4E2A\u63D2\u4EF6\u4F5C\u7528\u4E0D\u540C\uFF0C\u6211\u4EEC\u4E00\u4E2A\u4E2A\u6765\u4ECB\u7ECD\u5982\u4F55\u4F7F\u7528\u3002</p><h2 id="vite-plugin-pages" tabindex="-1">vite-plugin-pages <a class="header-anchor" href="#vite-plugin-pages" aria-hidden="true">#</a></h2><p>\u8FD9\u4E2A\u662F\u672C\u6B21\u4ECB\u7ECD\u7684\u6838\u5FC3\uFF0C\u5B83\u80FD\u591F\u5C06\u6587\u4EF6\u7CFB\u7EDF\u751F\u6210\u5BF9\u5E94\u7684\u8DEF\u7531\uFF0C\u4ECE\u800C\u7701\u53BB\u624B\u52A8\u914D\u7F6E\u8DEF\u7531\u7684\u65F6\u95F4\u3002</p><p>\u9996\u5148\u5728 <code>vite.config.js</code> \u589E\u52A0\u4EE5\u4E0B\u914D\u7F6E\uFF1A</p><div class="language-"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki"><code><span class="line"><span style="color:#A6ACCD;">import Pages from &#39;vite-plugin-pages&#39;</span></span>
<span class="line"><span style="color:#A6ACCD;">export default {</span></span>
<span class="line"><span style="color:#A6ACCD;">    plugins: [</span></span>
<span class="line"><span style="color:#A6ACCD;">        Pages({</span></span>
<span class="line"><span style="color:#A6ACCD;">            dirs: &#39;src/pages&#39;,  // \u9700\u8981\u751F\u6210\u8DEF\u7531\u7684\u6587\u4EF6\u76EE\u5F55</span></span>
<span class="line"><span style="color:#A6ACCD;">            exclude: [&#39;**/components/*.vue&#39;]  // \u6392\u9664\u5728\u5916\u7684\u76EE\u5F55\uFF0C\u5373\u4E0D\u5C06\u6240\u6709 components \u76EE\u5F55\u4E0B\u7684 .vue \u6587\u4EF6\u751F\u6210\u8DEF\u7531</span></span>
<span class="line"><span style="color:#A6ACCD;">        })</span></span>
<span class="line"><span style="color:#A6ACCD;">    ]</span></span>
<span class="line"><span style="color:#A6ACCD;">}</span></span>
<span class="line"><span style="color:#A6ACCD;"></span></span>
<span class="line"><span style="color:#A6ACCD;"></span></span></code></pre></div><p>\u76EE\u524D\u53EA\u9700\u8981\u914D\u7F6E\u8FD9 2 \u4E2A\u53C2\u6570\u5C31\u591F\u4E86\uFF0C\u5176\u5B83\u8FD8\u6709\u66F4\u591A\u53C2\u6570\u53EF\u4EE5\u53BB <a href="https://github.com/hannoeru/vite-plugin-pages" target="_blank" rel="noreferrer">vite-plugin-pages</a> \u9879\u76EE\u9875\u4E86\u89E3\u3002</p><p>\u63A5\u7740\u5728\u9875\u9762\u4E2D\u5F15\u5165\u5C31\u53EF\u4EE5\u4F7F\u7528\u4E86\u3002</p><div class="language-"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki"><code><span class="line"><span style="color:#A6ACCD;">import { createRouter } from &#39;vue-router&#39;</span></span>
<span class="line"><span style="color:#A6ACCD;">import routes from &#39;~pages&#39;</span></span>
<span class="line"><span style="color:#A6ACCD;">const router = createRouter({</span></span>
<span class="line"><span style="color:#A6ACCD;">    // ...</span></span>
<span class="line"><span style="color:#A6ACCD;">    routes</span></span>
<span class="line"><span style="color:#A6ACCD;">})</span></span>
<span class="line"><span style="color:#A6ACCD;"></span></span>
<span class="line"><span style="color:#A6ACCD;"></span></span></code></pre></div><p>\u6CA1\u9519\uFF0C\u5C31\u662F\u8FD9\u4E48\u7B80\u5355\uFF0C\u5F53\u7136\u4E5F\u6709\u4E00\u4E9B\u9AD8\u9636\u7528\u6CD5\u3002\u6BD4\u5982\u901A\u8FC7 params \u4F20\u53C2\u7684\u8DEF\u7531\uFF0C\u8981\u600E\u4E48\u914D\u7F6E\u5462\uFF1F</p><p>\u5728 vite-plugin-pages \u91CC\u63D0\u4F9B\u4E86\u4E00\u79CD\u4E13\u7528\u7684\u5199\u6CD5\uFF0C\u5C31\u662F <code>[ ]</code> \u3002\u4F8B\u5982 <code>src/views/example/[id].vue</code> \u8FD9\u4E2A\u6587\u4EF6\uFF0C\u6700\u7EC8\u751F\u6210\u7684\u8DEF\u7531 <code>path</code> \u5C31\u662F <code>/example/:id</code> \u3002</p><p>\u9488\u5BF9 404 \u9875\u9762\uFF0C\u6211\u4EEC\u53EF\u4EE5\u5728\u521B\u5EFA\u4E2A\u8FD9\u6837\u7684\u6587\u4EF6 <code>src/views/[...all].vue</code> \uFF0C\u5B83\u751F\u6210\u7684\u8DEF\u7531\u5C31\u662F <code>/:all(.*)*</code> \u3002</p><p>\u9664\u6B64\u4E4B\u5916\uFF0C\u6211\u4EEC\u8FD8\u53EF\u4EE5\u5728 <code>.vue</code> \u6587\u4EF6\u4E2D\u589E\u52A0 <code>&lt;route&gt;&lt;/route&gt;</code> \u4EE3\u7801\u5757\uFF0C\u8FD9\u91CC\u9762\u9ED8\u8BA4\u63A5\u6536 <code>json5</code> \u683C\u5F0F\u7684\u8DEF\u7531\u914D\u7F6E\u3002\u9700\u8981\u6CE8\u610F\u7684\u662F\uFF0C\u5982\u679C\u5728 <code>&lt;route&gt;&lt;/route&gt;</code> \u91CC\u914D\u7F6E\u4E86 <code>path</code> \u548C <code>name</code> \uFF0C\u5C06\u4F1A\u8986\u76D6\u81EA\u52A8\u751F\u6210\u7684 <code>path</code> \u548C <code>name</code> \u3002</p><div class="language-"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki"><code><span class="line"><span style="color:#A6ACCD;">&lt;route&gt;</span></span>
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
<span class="line"><span style="color:#A6ACCD;"></span></span></code></pre></div><p>\u8FD9\u65F6\u5019\u4F3C\u4E4E\u8FD8\u7F3A\u70B9\u4EC0\u4E48\uFF0C\u5BF9\u7684\uFF0C\u90A3\u5C31\u662F\u5D4C\u5957\u8DEF\u7531\u3002\u901A\u8FC7 vite-plugin-pages \u81EA\u52A8\u751F\u6210\u7684\u8DEF\u7531\uFF0C\u90FD\u662F\u4E00\u7EA7\u8DEF\u7531\u3002\u800C\u5B9E\u9645\u9879\u76EE\u5F00\u53D1\u4E2D\uFF0C\u6211\u4EEC\u4F1A\u4F7F\u7528\u5D4C\u5957\u8DEF\u7531\u7684\u7279\u6027\uFF0C\u642D\u914D <code>&lt;router-view&gt;&lt;/router-view&gt;</code> \u7EC4\u4EF6\u5B9E\u73B0\u4E00\u4E9B\u5E03\u5C40\u6548\u679C\u3002</p><p>\u8FD9\u65F6\u5019\u5C31\u8981\u4ECB\u7ECD\u4E0B\u9762\u8FD9\u6B3E\u63D2\u4EF6\u4E86</p><h2 id="vite-plugin-vue-layouts" tabindex="-1">vite-plugin-vue-layouts <a class="header-anchor" href="#vite-plugin-vue-layouts" aria-hidden="true">#</a></h2><p>\u9996\u5148\u5728 <code>vite.config.js</code> \u4FEE\u6539\u4E0B\u914D\u7F6E\uFF1A</p><div class="language-"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki"><code><span class="line"><span style="color:#A6ACCD;">import Pages from &#39;vite-plugin-pages&#39;</span></span>
<span class="line"><span style="color:#A6ACCD;">import Layouts from &#39;vite-plugin-vue-layouts&#39;</span></span>
<span class="line"><span style="color:#A6ACCD;">export default {</span></span>
<span class="line"><span style="color:#A6ACCD;">    plugins: [</span></span>
<span class="line"><span style="color:#A6ACCD;">        Pages({</span></span>
<span class="line"><span style="color:#A6ACCD;">            dirs: &#39;src/pages&#39;,  // \u9700\u8981\u751F\u6210\u8DEF\u7531\u7684\u6587\u4EF6\u76EE\u5F55</span></span>
<span class="line"><span style="color:#A6ACCD;">            exclude: [&#39;**/components/*.vue&#39;]  // \u6392\u9664\u5728\u5916\u7684\u76EE\u5F55\uFF0C\u5373\u6240\u6709 components \u76EE\u5F55\u4E0B\u7684 .vue \u6587\u4EF6\u90FD\u4E0D\u4F1A\u751F\u6210\u8DEF\u7531</span></span>
<span class="line"><span style="color:#A6ACCD;">        }),</span></span>
<span class="line"><span style="color:#A6ACCD;">        Layouts({</span></span>
<span class="line"><span style="color:#A6ACCD;">            layoutsDirs: &#39;src/layouts&#39;,  // \u5E03\u5C40\u6587\u4EF6\u5B58\u653E\u76EE\u5F55</span></span>
<span class="line"><span style="color:#A6ACCD;">            defaultLayout: &#39;index&#39;  // \u9ED8\u8BA4\u5E03\u5C40\uFF0C\u5BF9\u5E94 src/layouts/index.vue</span></span>
<span class="line"><span style="color:#A6ACCD;">        })</span></span>
<span class="line"><span style="color:#A6ACCD;">    ]</span></span>
<span class="line"><span style="color:#A6ACCD;">}</span></span>
<span class="line"><span style="color:#A6ACCD;"></span></span>
<span class="line"><span style="color:#A6ACCD;"></span></span></code></pre></div><p>\u66F4\u591A\u914D\u7F6E\u53C2\u6570\u8BF7\u67E5\u770B <a href="https://github.com/JohnCampionJr/vite-plugin-vue-layouts" target="_blank" rel="noreferrer">vite-plugin-vue-layouts</a> \u9879\u76EE\u9875\u3002</p><p>\u4E5F\u8FD8\u662F\u4E00\u6837\uFF0C\u914D\u7F6E\u597D\u540E\uFF0C\u5C31\u53EF\u4EE5\u76F4\u63A5\u4F7F\u7528\u4E86\u3002</p><div class="language-"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki"><code><span class="line"><span style="color:#A6ACCD;">import { createRouter } from &#39;vue-router&#39;</span></span>
<span class="line"><span style="color:#A6ACCD;">import { setupLayouts } from &#39;virtual:generated-layouts&#39;</span></span>
<span class="line"><span style="color:#A6ACCD;">import generatedRoutes from &#39;virtual:generated-pages&#39;</span></span>
<span class="line"><span style="color:#A6ACCD;">const routes = setupLayouts(generatedRoutes)</span></span>
<span class="line"><span style="color:#A6ACCD;">const router = createRouter({</span></span>
<span class="line"><span style="color:#A6ACCD;">    // ...</span></span>
<span class="line"><span style="color:#A6ACCD;">    routes</span></span>
<span class="line"><span style="color:#A6ACCD;">})</span></span>
<span class="line"><span style="color:#A6ACCD;"></span></span>
<span class="line"><span style="color:#A6ACCD;"></span></span></code></pre></div><p>\u8FD9\u4E2A\u63D2\u4EF6\u53EA\u505A\u4E00\u4EF6\u4E8B\uFF0C\u5C31\u662F\u628A\u901A\u8FC7 vite-plugin-pages \u751F\u6210\u7684\u4E00\u7EA7\u8DEF\u7531\u5904\u7406\u6210\u5D4C\u5957\u8DEF\u7531\uFF0C\u5927\u6982\u5C31\u662F\u8FD9\u6837\uFF1A</p><div class="language-"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki"><code><span class="line"><span style="color:#A6ACCD;">// \u5904\u7406\u524D</span></span>
<span class="line"><span style="color:#A6ACCD;">{</span></span>
<span class="line"><span style="color:#A6ACCD;">    path: &#39;/login&#39;,</span></span>
<span class="line"><span style="color:#A6ACCD;">    component: () =&gt; import(&#39;/src/views/login.vue&#39;),</span></span>
<span class="line"><span style="color:#A6ACCD;">    name: &#39;login&#39;</span></span>
<span class="line"><span style="color:#A6ACCD;">}</span></span>
<span class="line"><span style="color:#A6ACCD;">// \u5904\u7406\u540E</span></span>
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
<span class="line"><span style="color:#A6ACCD;"></span></span></code></pre></div><p>\u5982\u679C\u4F60\u6709\u591A\u79CD\u5E03\u5C40\uFF0C\u53EF\u4EE5\u5728 <code>&lt;route&gt;&lt;route&gt;</code> \u91CC\u8FDB\u884C\u8BBE\u7F6E\uFF1A</p><div class="language-"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki"><code><span class="line"><span style="color:#A6ACCD;">&lt;route&gt;</span></span>
<span class="line"><span style="color:#A6ACCD;">{</span></span>
<span class="line"><span style="color:#A6ACCD;">    meta: {</span></span>
<span class="line"><span style="color:#A6ACCD;">        layout: &#39;other&#39;</span></span>
<span class="line"><span style="color:#A6ACCD;">    }</span></span>
<span class="line"><span style="color:#A6ACCD;">}</span></span>
<span class="line"><span style="color:#A6ACCD;">&lt;/route&gt;</span></span>
<span class="line"><span style="color:#A6ACCD;"></span></span>
<span class="line"><span style="color:#A6ACCD;"></span></span></code></pre></div><p>\u751A\u81F3\u8FD8\u53EF\u4EE5\u505A\u4E00\u4E9B\u9B54\u6539\uFF0C\u6BD4\u5982\u9879\u76EE\u4E2D\u6709\u7684\u8DEF\u7531\u662F\u9700\u8981\u7528\u5230\u5E03\u5C40\u9875\u9762\u7684\uFF0C\u6709\u7684\u5219\u4E0D\u9700\u8981\uFF0C\u90A3\u6211\u4EEC\u53EF\u4EE5\u5C06\u4E0D\u9700\u8981\u7684\u9875\u9762\u8BBE\u7F6E\u4E3A <code>layout: false</code> \uFF1A</p><div class="language-"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki"><code><span class="line"><span style="color:#A6ACCD;">&lt;route&gt;</span></span>
<span class="line"><span style="color:#A6ACCD;">{</span></span>
<span class="line"><span style="color:#A6ACCD;">    meta: {</span></span>
<span class="line"><span style="color:#A6ACCD;">        layout: false</span></span>
<span class="line"><span style="color:#A6ACCD;">    }</span></span>
<span class="line"><span style="color:#A6ACCD;">}</span></span>
<span class="line"><span style="color:#A6ACCD;">&lt;/route&gt;</span></span>
<span class="line"><span style="color:#A6ACCD;"></span></span>
<span class="line"><span style="color:#A6ACCD;"></span></span></code></pre></div><p>\u540C\u65F6\u5728\u8DEF\u7531\u6587\u4EF6\u5904\u4F7F\u7528\u4E0B\u9762\u8FD9\u6BB5\u4EE3\u7801\uFF1A</p><div class="language-"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki"><code><span class="line"><span style="color:#A6ACCD;">import { createRouter } from &#39;vue-router&#39;</span></span>
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
<span class="line"><span style="color:#A6ACCD;"></span></span></code></pre></div><h2 id="\u603B\u7ED3" tabindex="-1">\u603B\u7ED3 <a class="header-anchor" href="#\u603B\u7ED3" aria-hidden="true">#</a></h2><p>\u901A\u8FC7\u4E0B\u9762\u8FD9\u5F20\u56FE\u914D\u5408\u603B\u7ED3\u5427\uFF1A</p><div class="language-"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki"><code><span class="line"><span style="color:#A6ACCD;">\u6587\u4EF6\u7CFB\u7EDF                           \u8DEF\u7531\u5730\u5740                          \u8DEF\u7531 name</span></span>
<span class="line"><span style="color:#A6ACCD;">views</span></span>
<span class="line"><span style="color:#A6ACCD;">\u251C\u2500 example</span></span>
<span class="line"><span style="color:#A6ACCD;">\u2502    \u251C\u2500 components</span></span>
<span class="line"><span style="color:#A6ACCD;">\u2502    \u2502    \u2514\u2500 List</span></span>
<span class="line"><span style="color:#A6ACCD;">\u2502    \u2502         \u2514\u2500 index.vue</span></span>
<span class="line"><span style="color:#A6ACCD;">\u2502    \u251C\u2500 params</span></span>
<span class="line"><span style="color:#A6ACCD;">\u2502    \u2502    \u2514\u2500 [id].vue              /example/params/:id              example-params</span></span>
<span class="line"><span style="color:#A6ACCD;">\u2502    \u251C\u2500 axios.vue                  /example/axios                   example-axios</span></span>
<span class="line"><span style="color:#A6ACCD;">\u2502    \u251C\u2500 cookie.vue                 /example/cookie                  example-cookie</span></span>
<span class="line"><span style="color:#A6ACCD;">\u2502    \u2514\u2500 svgicon.vue                /example/svgicon                 example-svgicon</span></span>
<span class="line"><span style="color:#A6ACCD;">\u251C\u2500 [...all].vue                    /:all(.*)*                       all</span></span>
<span class="line"><span style="color:#A6ACCD;">\u251C\u2500 index.vue                       /                                index</span></span>
<span class="line"><span style="color:#A6ACCD;">\u2514\u2500 login.vue                       /login                           login</span></span>
<span class="line"><span style="color:#A6ACCD;"></span></span>
<span class="line"><span style="color:#A6ACCD;"></span></span></code></pre></div><ul><li>\u4F7F\u7528\u8DEF\u7531\u53C2\u6570\u9700\u901A\u8FC7 <code>[ ]</code> \u5C06\u53C2\u6570\u540D\u5305\u88F9\uFF0C\u5E76\u8BBE\u4E3A\u6587\u4EF6\u540D</li><li>\u6587\u4EF6\u5939\u4E0D\u4F1A\u751F\u6210\u8DEF\u7531\uFF0C\u4F8B\u5982 example \u6587\u4EF6\u5939\u5E76\u6CA1\u6709\u751F\u6210 <code>/example</code> \u8DEF\u7531</li><li>\u8DEF\u7531 name \u4F1A\u6839\u636E\u6587\u4EF6\u7684\u76EE\u5F55\u7ED3\u6784\u81EA\u52A8\u751F\u6210\uFF0C\u5E76\u7528 <code>-</code> \u8FDE\u63A5\uFF0C\u53EF\u786E\u4FDD name \u7684\u552F\u4E00\u6027</li><li>\u6240\u6709 components \u76EE\u5F55\u5747\u4E0D\u4F1A\u751F\u6210\u8DEF\u7531</li></ul>`,43),o=[e];function t(c,i,r,C,A,u){return a(),n("div",null,o)}const g=s(p,[["render",t]]);export{d as __pageData,g as default};
