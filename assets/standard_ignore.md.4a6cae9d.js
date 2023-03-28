import{_ as s,c as n,o as a,a as l}from"./app.8a49408b.js";const C=JSON.parse('{"title":"ignore 规范","description":"","frontmatter":{},"headers":[{"level":2,"title":".gitignore","slug":"gitignore","link":"#gitignore","children":[]},{"level":2,"title":".eslintignore","slug":"eslintignore","link":"#eslintignore","children":[]},{"level":2,"title":".prettierignore","slug":"prettierignore","link":"#prettierignore","children":[]},{"level":2,"title":".stylelintignore","slug":"stylelintignore","link":"#stylelintignore","children":[]}],"relativePath":"standard/ignore.md"}'),e={name:"standard/ignore.md"},p=l(`<h1 id="ignore-规范" tabindex="-1">ignore 规范 <a class="header-anchor" href="#ignore-规范" aria-hidden="true">#</a></h1><ul><li><code>.gitignore</code>：主要是在 <code>git</code> 提交的时候忽略掉某些目录或者文件</li><li><code>.eslintignore</code>：<code>eslint</code> 校验执行时，忽略某些文件</li><li><code>.prettierignore</code>：不使用 <code>prettier</code> 格式化的文件填写在项目的.prettierignore 文件中</li><li><code>.stylelintignore</code>: 忽略某些目录或者文件不检验<code>stylelint</code>规则</li></ul><h2 id="gitignore" tabindex="-1">.gitignore <a class="header-anchor" href="#gitignore" aria-hidden="true">#</a></h2><div class="language-bash"><button title="Copy Code" class="copy"></button><span class="lang">bash</span><pre class="shiki material-theme-palenight" tabindex="0"><code><span class="line"><span style="color:#676E95;font-style:italic;"># gitignore 忽略规范</span></span>
<span class="line"></span>
<span class="line"><span style="color:#FFCB6B;">.DS_Store</span></span>
<span class="line"><span style="color:#FFCB6B;">node_modules</span></span>
<span class="line"><span style="color:#FFCB6B;">coverage</span></span>
<span class="line"></span>
<span class="line"><span style="color:#676E95;font-style:italic;"># local env files</span></span>
<span class="line"><span style="color:#FFCB6B;">.env.local</span></span>
<span class="line"><span style="color:#FFCB6B;">.env.*.local</span></span>
<span class="line"></span>
<span class="line"><span style="color:#676E95;font-style:italic;"># Log files</span></span>
<span class="line"><span style="color:#FFCB6B;">npm-debug.log*</span></span>
<span class="line"><span style="color:#FFCB6B;">yarn-debug.log*</span></span>
<span class="line"><span style="color:#FFCB6B;">yarn-error.log*</span></span>
<span class="line"><span style="color:#FFCB6B;">pnpm-debug.log*</span></span>
<span class="line"></span>
<span class="line"><span style="color:#676E95;font-style:italic;"># Editor directories and files</span></span>
<span class="line"><span style="color:#FFCB6B;">.idea</span></span>
<span class="line"><span style="color:#FFCB6B;">.vscode</span></span>
<span class="line"><span style="color:#89DDFF;">*</span><span style="color:#A6ACCD;">.suo</span></span>
<span class="line"><span style="color:#89DDFF;">*</span><span style="color:#A6ACCD;">.ntvs</span><span style="color:#89DDFF;">*</span></span>
<span class="line"><span style="color:#89DDFF;">*</span><span style="color:#A6ACCD;">.njsproj</span></span>
<span class="line"><span style="color:#89DDFF;">*</span><span style="color:#A6ACCD;">.sln</span></span>
<span class="line"><span style="color:#89DDFF;">*</span><span style="color:#A6ACCD;">.sw</span><span style="color:#89DDFF;">?</span></span>
<span class="line"></span>
<span class="line"><span style="color:#676E95;font-style:italic;"># test unit</span></span>
<span class="line"><span style="color:#FFCB6B;">/tests/e2e/videos/</span></span>
<span class="line"><span style="color:#FFCB6B;">/tests/e2e/screenshots/</span></span>
<span class="line"></span>
<span class="line"><span style="color:#676E95;font-style:italic;"># production</span></span>
<span class="line"><span style="color:#FFCB6B;">/dist</span></span>
<span class="line"></span></code></pre></div><h2 id="eslintignore" tabindex="-1">.eslintignore <a class="header-anchor" href="#eslintignore" aria-hidden="true">#</a></h2><div class="language-bash"><button title="Copy Code" class="copy"></button><span class="lang">bash</span><pre class="shiki material-theme-palenight" tabindex="0"><code><span class="line"><span style="color:#676E95;font-style:italic;"># eslintignore 忽略规范</span></span>
<span class="line"></span>
<span class="line"><span style="color:#FFCB6B;">bash</span></span>
<span class="line"><span style="color:#FFCB6B;">/dist/</span></span>
<span class="line"><span style="color:#FFCB6B;">/node_modules/</span></span>
<span class="line"><span style="color:#FFCB6B;">/public/</span></span>
<span class="line"><span style="color:#FFCB6B;">/coverage/</span></span>
<span class="line"><span style="color:#FFCB6B;">/package.json</span></span>
<span class="line"><span style="color:#FFCB6B;">/package-lock.json</span></span>
<span class="line"><span style="color:#89DDFF;">**</span><span style="color:#A6ACCD;">/</span><span style="color:#89DDFF;">*</span><span style="color:#A6ACCD;">.d.ts</span></span>
<span class="line"></span></code></pre></div><h2 id="prettierignore" tabindex="-1">.prettierignore <a class="header-anchor" href="#prettierignore" aria-hidden="true">#</a></h2><div class="language-bash"><button title="Copy Code" class="copy"></button><span class="lang">bash</span><pre class="shiki material-theme-palenight" tabindex="0"><code><span class="line"><span style="color:#676E95;font-style:italic;"># .prettierignore 忽略规则</span></span>
<span class="line"></span>
<span class="line"><span style="color:#FFCB6B;">node_modules</span></span>
<span class="line"><span style="color:#FFCB6B;">dist</span></span>
<span class="line"><span style="color:#FFCB6B;">build</span></span>
<span class="line"></span>
<span class="line"><span style="color:#FFCB6B;">.DS_Store</span></span>
<span class="line"><span style="color:#FFCB6B;">.eslintignore</span></span>
<span class="line"><span style="color:#FFCB6B;">.gitignore</span></span>
<span class="line"><span style="color:#FFCB6B;">.prettierignore</span></span>
<span class="line"></span>
<span class="line"><span style="color:#FFCB6B;">LICENSE</span></span>
<span class="line"><span style="color:#FFCB6B;">yarn.lock</span></span>
<span class="line"></span></code></pre></div><h2 id="stylelintignore" tabindex="-1">.stylelintignore <a class="header-anchor" href="#stylelintignore" aria-hidden="true">#</a></h2><div class="language-bash"><button title="Copy Code" class="copy"></button><span class="lang">bash</span><pre class="shiki material-theme-palenight" tabindex="0"><code><span class="line"><span style="color:#676E95;font-style:italic;"># stylelintignore 忽略规则</span></span>
<span class="line"></span>
<span class="line"><span style="color:#89DDFF;">**</span><span style="color:#A6ACCD;">/</span><span style="color:#89DDFF;">*</span><span style="color:#A6ACCD;">.min.css</span></span>
<span class="line"><span style="color:#89DDFF;">**</span><span style="color:#A6ACCD;">/dist/</span></span>
<span class="line"><span style="color:#89DDFF;">**</span><span style="color:#A6ACCD;">/public/</span></span>
<span class="line"><span style="color:#89DDFF;">**</span><span style="color:#A6ACCD;">/node_modules/</span></span>
<span class="line"></span></code></pre></div>`,10),o=[p];function i(t,c,r,d,y,F){return a(),n("div",null,o)}const B=s(e,[["render",i]]);export{C as __pageData,B as default};
