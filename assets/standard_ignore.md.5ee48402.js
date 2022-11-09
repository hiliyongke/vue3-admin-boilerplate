import{_ as s,c as n,o as a,a as l}from"./app.1cd7dc09.js";const D=JSON.parse('{"title":"ignore \u89C4\u8303","description":"","frontmatter":{},"headers":[{"level":2,"title":".gitignore","slug":"gitignore","link":"#gitignore","children":[]},{"level":2,"title":".eslintignore","slug":"eslintignore","link":"#eslintignore","children":[]},{"level":2,"title":".prettierignore","slug":"prettierignore","link":"#prettierignore","children":[]},{"level":2,"title":".stylelintignore","slug":"stylelintignore","link":"#stylelintignore","children":[]}],"relativePath":"standard/ignore.md"}'),e={name:"standard/ignore.md"},p=l(`<h1 id="ignore-\u89C4\u8303" tabindex="-1">ignore \u89C4\u8303 <a class="header-anchor" href="#ignore-\u89C4\u8303" aria-hidden="true">#</a></h1><ul><li><code>.gitignore</code>\uFF1A\u4E3B\u8981\u662F\u5728 <code>git</code> \u63D0\u4EA4\u7684\u65F6\u5019\u5FFD\u7565\u6389\u67D0\u4E9B\u76EE\u5F55\u6216\u8005\u6587\u4EF6</li><li><code>.eslintignore</code>\uFF1A<code>eslint</code> \u6821\u9A8C\u6267\u884C\u65F6\uFF0C\u5FFD\u7565\u67D0\u4E9B\u6587\u4EF6</li><li><code>.prettierignore</code>\uFF1A\u4E0D\u4F7F\u7528 <code>prettier</code> \u683C\u5F0F\u5316\u7684\u6587\u4EF6\u586B\u5199\u5728\u9879\u76EE\u7684.prettierignore \u6587\u4EF6\u4E2D</li><li><code>.stylelintignore</code>: \u5FFD\u7565\u67D0\u4E9B\u76EE\u5F55\u6216\u8005\u6587\u4EF6\u4E0D\u68C0\u9A8C<code>stylelint</code>\u89C4\u5219</li></ul><h2 id="gitignore" tabindex="-1">.gitignore <a class="header-anchor" href="#gitignore" aria-hidden="true">#</a></h2><div class="language-bash"><button title="Copy Code" class="copy"></button><span class="lang">bash</span><pre class="shiki"><code><span class="line"><span style="color:#676E95;"># gitignore \u5FFD\u7565\u89C4\u8303</span></span>
<span class="line"></span>
<span class="line"><span style="color:#A6ACCD;">.DS_Store</span></span>
<span class="line"><span style="color:#A6ACCD;">node_modules</span></span>
<span class="line"><span style="color:#A6ACCD;">coverage</span></span>
<span class="line"></span>
<span class="line"><span style="color:#676E95;"># local env files</span></span>
<span class="line"><span style="color:#A6ACCD;">.env.local</span></span>
<span class="line"><span style="color:#A6ACCD;">.env.</span><span style="color:#89DDFF;">*</span><span style="color:#A6ACCD;">.local</span></span>
<span class="line"></span>
<span class="line"><span style="color:#676E95;"># Log files</span></span>
<span class="line"><span style="color:#A6ACCD;">npm-debug.log</span><span style="color:#89DDFF;">*</span></span>
<span class="line"><span style="color:#A6ACCD;">yarn-debug.log</span><span style="color:#89DDFF;">*</span></span>
<span class="line"><span style="color:#A6ACCD;">yarn-error.log</span><span style="color:#89DDFF;">*</span></span>
<span class="line"><span style="color:#A6ACCD;">pnpm-debug.log</span><span style="color:#89DDFF;">*</span></span>
<span class="line"></span>
<span class="line"><span style="color:#676E95;"># Editor directories and files</span></span>
<span class="line"><span style="color:#A6ACCD;">.idea</span></span>
<span class="line"><span style="color:#A6ACCD;">.vscode</span></span>
<span class="line"><span style="color:#89DDFF;">*</span><span style="color:#A6ACCD;">.suo</span></span>
<span class="line"><span style="color:#89DDFF;">*</span><span style="color:#A6ACCD;">.ntvs</span><span style="color:#89DDFF;">*</span></span>
<span class="line"><span style="color:#89DDFF;">*</span><span style="color:#A6ACCD;">.njsproj</span></span>
<span class="line"><span style="color:#89DDFF;">*</span><span style="color:#A6ACCD;">.sln</span></span>
<span class="line"><span style="color:#89DDFF;">*</span><span style="color:#A6ACCD;">.sw</span><span style="color:#89DDFF;">?</span></span>
<span class="line"></span>
<span class="line"><span style="color:#676E95;"># test unit</span></span>
<span class="line"><span style="color:#A6ACCD;">/tests/e2e/videos/</span></span>
<span class="line"><span style="color:#A6ACCD;">/tests/e2e/screenshots/</span></span>
<span class="line"></span>
<span class="line"><span style="color:#676E95;"># production</span></span>
<span class="line"><span style="color:#A6ACCD;">/dist</span></span>
<span class="line"></span></code></pre></div><h2 id="eslintignore" tabindex="-1">.eslintignore <a class="header-anchor" href="#eslintignore" aria-hidden="true">#</a></h2><div class="language-bash"><button title="Copy Code" class="copy"></button><span class="lang">bash</span><pre class="shiki"><code><span class="line"><span style="color:#676E95;"># eslintignore \u5FFD\u7565\u89C4\u8303</span></span>
<span class="line"></span>
<span class="line"><span style="color:#A6ACCD;">bash</span></span>
<span class="line"><span style="color:#A6ACCD;">/dist/</span></span>
<span class="line"><span style="color:#A6ACCD;">/node_modules/</span></span>
<span class="line"><span style="color:#A6ACCD;">/public/</span></span>
<span class="line"><span style="color:#A6ACCD;">/coverage/</span></span>
<span class="line"><span style="color:#A6ACCD;">/package.json</span></span>
<span class="line"><span style="color:#A6ACCD;">/package-lock.json</span></span>
<span class="line"><span style="color:#89DDFF;">**</span><span style="color:#A6ACCD;">/</span><span style="color:#89DDFF;">*</span><span style="color:#A6ACCD;">.d.ts</span></span>
<span class="line"></span></code></pre></div><h2 id="prettierignore" tabindex="-1">.prettierignore <a class="header-anchor" href="#prettierignore" aria-hidden="true">#</a></h2><div class="language-bash"><button title="Copy Code" class="copy"></button><span class="lang">bash</span><pre class="shiki"><code><span class="line"><span style="color:#676E95;"># .prettierignore \u5FFD\u7565\u89C4\u5219</span></span>
<span class="line"></span>
<span class="line"><span style="color:#A6ACCD;">node_modules</span></span>
<span class="line"><span style="color:#A6ACCD;">dist</span></span>
<span class="line"><span style="color:#A6ACCD;">build</span></span>
<span class="line"></span>
<span class="line"><span style="color:#A6ACCD;">.DS_Store</span></span>
<span class="line"><span style="color:#A6ACCD;">.eslintignore</span></span>
<span class="line"><span style="color:#A6ACCD;">.gitignore</span></span>
<span class="line"><span style="color:#A6ACCD;">.prettierignore</span></span>
<span class="line"></span>
<span class="line"><span style="color:#A6ACCD;">LICENSE</span></span>
<span class="line"><span style="color:#A6ACCD;">yarn.lock</span></span>
<span class="line"></span></code></pre></div><h2 id="stylelintignore" tabindex="-1">.stylelintignore <a class="header-anchor" href="#stylelintignore" aria-hidden="true">#</a></h2><div class="language-bash"><button title="Copy Code" class="copy"></button><span class="lang">bash</span><pre class="shiki"><code><span class="line"><span style="color:#676E95;"># stylelintignore \u5FFD\u7565\u89C4\u5219</span></span>
<span class="line"></span>
<span class="line"><span style="color:#89DDFF;">**</span><span style="color:#A6ACCD;">/</span><span style="color:#89DDFF;">*</span><span style="color:#A6ACCD;">.min.css</span></span>
<span class="line"><span style="color:#89DDFF;">**</span><span style="color:#A6ACCD;">/dist/</span></span>
<span class="line"><span style="color:#89DDFF;">**</span><span style="color:#A6ACCD;">/public/</span></span>
<span class="line"><span style="color:#89DDFF;">**</span><span style="color:#A6ACCD;">/node_modules/</span></span>
<span class="line"></span></code></pre></div>`,10),o=[p];function i(c,t,r,d,C,y){return a(),n("div",null,o)}const g=s(e,[["render",i]]);export{D as __pageData,g as default};
