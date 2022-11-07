import{_ as s,c as a,o as n,a as l}from"./app.caf8618e.js";const h=JSON.parse('{"title":"\u5BFC\u8BED","description":"","frontmatter":{},"headers":[{"level":2,"title":"\u91CD\u65B0\u62F7\u8D1D","slug":"\u91CD\u65B0\u62F7\u8D1D","link":"#\u91CD\u65B0\u62F7\u8D1D","children":[]}],"relativePath":"other/\u4EE3\u7801\u8131\u654F.md"}'),e={name:"other/\u4EE3\u7801\u8131\u654F.md"},p=l(`<h1 id="\u5BFC\u8BED" tabindex="-1">\u5BFC\u8BED <a class="header-anchor" href="#\u5BFC\u8BED" aria-hidden="true">#</a></h1><p>\u5728\u5BF9\u5916\u5F00\u6E90\uFF0C\u6216\u8005\u4EE3\u7801\u8F6C\u4EA4\u65F6\uFF0C\u5BF9\u4E8E\u9879\u76EE\u90E8\u5206\u654F\u611F\u6587\u4EF6\u4EE3\u7801\uFF0C\u5982\u6570\u636E\u5E93\u8D26\u53F7\u3001\u5BC6\u7801\u7B49\u5FC5\u987B\u8981\u8131\u654F\u3002 \u56E0\u6B64\uFF0C\u4EE5\u4E0B\u603B\u7ED3\u4E86\u4E00\u4E0B\u5E94\u7528\u5F00\u6E90\u524D\u8131\u654F\u7684\u51E0\u79CD\u65B9\u6848</p><blockquote><p>\u65B9\u6848\u4E00.<br> \u53E6\u8D77\u7089\u7076</p></blockquote><h2 id="\u91CD\u65B0\u62F7\u8D1D" tabindex="-1">\u91CD\u65B0\u62F7\u8D1D <a class="header-anchor" href="#\u91CD\u65B0\u62F7\u8D1D" aria-hidden="true">#</a></h2><p>1\u3001\u539F\u6709\u4ED3\u5E93\u5220\u9664<br> 2\u3001\u6570\u636E\u8131\u654F\u5904\u7406<br> 3\u3001\u5EFA\u7ACB\u5E76\u4E0A\u4F20\u65B0\u4ED3\u5E93</p><ul><li>\u4F18\u70B9 <ul><li>\u7B80\u5355\u7C97\u66B4</li></ul></li><li>\u7F3A\u70B9 <ul><li>\u5386\u53F2\u63D0\u4EA4\u8BB0\u5F55\u4E22\u5931</li></ul></li></ul><blockquote><p>\u65B9\u6848\u4E8C.<br> \u4F18\u96C5\u8131\u654F</p></blockquote><ul><li><p>\u5BF9\u67D0\u4E2A\u6587\u4EF6\u8FDB\u884C\u8131\u654F\u547D\u4EE4</p><div class="language-bash"><button title="Copy Code" class="copy"></button><span class="lang">bash</span><pre class="shiki"><code><span class="line"><span style="color:#A6ACCD;">git filter-branch --force --index-filter </span><span style="color:#89DDFF;">&#39;</span><span style="color:#C3E88D;">git rm --cached --ignore-unmatch path-of-remove-file</span><span style="color:#89DDFF;">&#39;</span><span style="color:#A6ACCD;"> --prune-empty --tag-name-filter cat --all</span></span>
<span class="line"></span>
<span class="line"></span>
<span class="line"></span></code></pre></div><p>\u53C2\u6570\u8BF4\u660E\uFF1A</p><div class="language-bash"><button title="Copy Code" class="copy"></button><span class="lang">bash</span><pre class="shiki"><code><span class="line"><span style="color:#A6ACCD;">path-of-remove-file \u662F\u8981\u5220\u9664\u7684\u6587\u4EF6\u7684\u76F8\u5BF9\u76EE\u5F55</span><span style="color:#89DDFF;">(</span><span style="color:#A6ACCD;">\u76F8\u5BF9\u4E8Egit repo\u7684\u6839\u76EE\u5F55</span><span style="color:#89DDFF;">)</span><span style="color:#A6ACCD;">,\u53EF\u4EE5\u4F7F\u7528\u901A\u914D\u7B26</span><span style="color:#89DDFF;">*</span><span style="color:#A6ACCD;">\u5339\u914D\u6587\u4EF6\u8FDB\u884C\u6279\u91CF\u5220\u9664.</span></span>
<span class="line"></span>
<span class="line"></span>
<span class="line"></span></code></pre></div><p>\u7136\u540E\u63A8\u9001\u4FEE\u6539\u7ED3\u679C</p><div class="language-bash"><button title="Copy Code" class="copy"></button><span class="lang">bash</span><pre class="shiki"><code><span class="line"><span style="color:#A6ACCD;">git push origin </span></span>
<span class="line"></span>
<span class="line"></span>
<span class="line"></span></code></pre></div><p>\u5B9E\u64CD\u5982\uFF1A</p><div class="language-bash"><button title="Copy Code" class="copy"></button><span class="lang">bash</span><pre class="shiki"><code><span class="line"><span style="color:#A6ACCD;">git filter-branch --force --index-filter </span><span style="color:#89DDFF;">&#39;</span><span style="color:#C3E88D;">git rm --cached --ignore-unmatch .-env</span><span style="color:#89DDFF;">&#39;</span><span style="color:#A6ACCD;"> --prune-empty --tag-name-filter cat --all</span></span>
<span class="line"></span>
<span class="line"></span>
<span class="line"></span></code></pre></div><p>\u5F53\u770B\u5230\u7C7B\u4F3C\u4E8E\u4E0B\u9762\u7684\u63D0\u793A\u4FE1\u606F\u8BF4\u660E\u5220\u9664\u6210\u529F\u4E86</p><div class="language-bash"><button title="Copy Code" class="copy"></button><span class="lang">bash</span><pre class="shiki"><code><span class="line"><span style="color:#A6ACCD;">Rewrite 75d09816e8a5e48d3f633b5b4545259b055ab1c6 </span><span style="color:#89DDFF;">(</span><span style="color:#A6ACCD;">1/1</span><span style="color:#89DDFF;">)</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">(</span><span style="color:#A6ACCD;">0 seconds passed, remaining 0 predicted</span><span style="color:#89DDFF;">)</span><span style="color:#A6ACCD;">    rm </span><span style="color:#89DDFF;">&#39;</span><span style="color:#C3E88D;">.env</span><span style="color:#89DDFF;">&#39;</span></span>
<span class="line"><span style="color:#A6ACCD;">Ref </span><span style="color:#89DDFF;">&#39;</span><span style="color:#C3E88D;">refs/heads/master</span><span style="color:#89DDFF;">&#39;</span><span style="color:#A6ACCD;"> was rewritten</span></span>
<span class="line"><span style="color:#A6ACCD;">Ref </span><span style="color:#89DDFF;">&#39;</span><span style="color:#C3E88D;">refs/remotes/origin/master</span><span style="color:#89DDFF;">&#39;</span><span style="color:#A6ACCD;"> was rewritten</span></span>
<span class="line"></span>
<span class="line"></span>
<span class="line"></span></code></pre></div><p>project \u76EE\u5F55\u4E0B\u7684 env \u6587\u4EF6\u5C31\u8131\u654F\u4E86\u3002<br><strong>\u6CE8\u610F \uFF1A\u8FD9\u91CC\u7684\u6587\u4EF6\u540C\u65F6\u4E5F\u4F1A\u88AB\u5220\u9664 \u3002\u64CD\u4F5C\u524D\u53EF\u4EE5\u62F7\u8D1D\u4E00\u4EFD\u65B0\u6587\u4EF6, \u4E14\u8FDB\u884C\u8131\u654F\u5904\u7406\u5373\u53EF</strong></p></li><li><p>\u4F18\u70B9</p><ul><li>\u4FDD\u7559\u4E86\u5176\u5B83\u975E\u8131\u654F\u6587\u4EF6\u7684\u5386\u53F2\u63D0\u4EA4\u8BB0\u5F55</li></ul></li><li><p>\u7F3A\u70B9</p><ul><li>\u76F8\u5BF9\u6765\u8BF4\u590D\u6742\u4E86\u70B9</li></ul></li></ul>`,8),o=[p];function t(c,r,i,d,D,C){return n(),a("div",null,o)}const u=s(e,[["render",t]]);export{h as __pageData,u as default};
