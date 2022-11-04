import{_ as s,c as n,o as a,a as l}from"./app.caf8618e.js";const A=JSON.parse('{"title":"\u683C\u5F0F\u89C4\u8303","description":"","frontmatter":{},"headers":[{"level":2,"title":"Prettier","slug":"prettier","link":"#prettier","children":[]}],"relativePath":"standard/format.md"}'),p={name:"standard/format.md"},o=l(`<h1 id="\u683C\u5F0F\u89C4\u8303" tabindex="-1">\u683C\u5F0F\u89C4\u8303 <a class="header-anchor" href="#\u683C\u5F0F\u89C4\u8303" aria-hidden="true">#</a></h1><h2 id="prettier" tabindex="-1">Prettier <a class="header-anchor" href="#prettier" aria-hidden="true">#</a></h2><p><a href="https://prettier.io/" target="_blank" rel="noreferrer"><code>Prettier</code></a> - Code formatter \u662F\u4E00\u6B3E\u5F3A\u5927\u7684\u4EE3\u7801\u683C\u5F0F\u5316\u5DE5\u5177\uFF0C\u53EF\u4EE5\u6839\u636E\u81EA\u5DF1\u8BBE\u5B9A\u7684\u89C4\u5219\u6765\u683C\u5F0F\u89C4\u8303\u7684\u4EE3\u7801\u3002</p><ol><li>\u5B89\u88C5\u4F9D\u8D56</li></ol><div class="language-bash"><button title="Copy Code" class="copy"></button><span class="lang">bash</span><pre class="shiki"><code><span class="line"><span style="color:#A6ACCD;">npm install prettier eslint-config-prettier @vue/eslint-config-prettier --save-dev</span></span>
<span class="line"></span></code></pre></div><ol start="2"><li>\u914D\u7F6E <code>.prettierrc.js</code> \u6587\u4EF6</li></ol><div class="language-js"><button title="Copy Code" class="copy"></button><span class="lang">js</span><pre class="shiki"><code><span class="line"><span style="color:#89DDFF;">module.exports</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">=</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">{</span></span>
<span class="line"><span style="color:#89DDFF;">  </span><span style="color:#676E95;">// ES5\u4E2D\u6709\u6548\u7684\u7ED3\u5C3E\u9017\u53F7\uFF08\u5BF9\u8C61\uFF0C\u6570\u7EC4\u7B49\uFF09</span></span>
<span class="line"><span style="color:#A6ACCD;">  </span><span style="color:#F07178;">trailingComma</span><span style="color:#89DDFF;">:</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">&#39;</span><span style="color:#C3E88D;">es5</span><span style="color:#89DDFF;">&#39;</span><span style="color:#89DDFF;">,</span></span>
<span class="line"><span style="color:#89DDFF;">  </span><span style="color:#676E95;">// \u4E0D\u4F7F\u7528\u7F29\u8FDB\u7B26\uFF0C\u800C\u4F7F\u7528\u7A7A\u683C</span></span>
<span class="line"><span style="color:#A6ACCD;">  </span><span style="color:#F07178;">useTabs</span><span style="color:#89DDFF;">:</span><span style="color:#A6ACCD;"> </span><span style="color:#FF9CAC;">false</span><span style="color:#89DDFF;">,</span></span>
<span class="line"><span style="color:#89DDFF;">  </span><span style="color:#676E95;">// tab \u7528\u4E24\u4E2A\u7A7A\u683C\u4EE3\u66FF</span></span>
<span class="line"><span style="color:#A6ACCD;">  </span><span style="color:#F07178;">tabWidth</span><span style="color:#89DDFF;">:</span><span style="color:#A6ACCD;"> </span><span style="color:#F78C6C;">2</span><span style="color:#89DDFF;">,</span></span>
<span class="line"><span style="color:#89DDFF;">  </span><span style="color:#676E95;">// \u6DFB\u52A0\u5206\u53F7</span></span>
<span class="line"><span style="color:#A6ACCD;">  </span><span style="color:#F07178;">semi</span><span style="color:#89DDFF;">:</span><span style="color:#A6ACCD;"> </span><span style="color:#FF9CAC;">true</span><span style="color:#89DDFF;">,</span></span>
<span class="line"><span style="color:#89DDFF;">  </span><span style="color:#676E95;">// \u4F7F\u7528\u5355\u5F15\u53F7</span></span>
<span class="line"><span style="color:#A6ACCD;">  </span><span style="color:#F07178;">singleQuote</span><span style="color:#89DDFF;">:</span><span style="color:#A6ACCD;"> </span><span style="color:#FF9CAC;">true</span><span style="color:#89DDFF;">,</span></span>
<span class="line"><span style="color:#89DDFF;">  </span><span style="color:#676E95;">// \u4E00\u884C\u6700\u591A 100 \u5B57\u7B26</span></span>
<span class="line"><span style="color:#A6ACCD;">  </span><span style="color:#F07178;">printWidth</span><span style="color:#89DDFF;">:</span><span style="color:#A6ACCD;"> </span><span style="color:#F78C6C;">100</span><span style="color:#89DDFF;">,</span></span>
<span class="line"><span style="color:#89DDFF;">  </span><span style="color:#676E95;">// \u5BF9\u8C61\u7684 key \u4EC5\u5728\u5FC5\u8981\u65F6\u7528\u5F15\u53F7</span></span>
<span class="line"><span style="color:#A6ACCD;">  </span><span style="color:#F07178;">quoteProps</span><span style="color:#89DDFF;">:</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">&#39;</span><span style="color:#C3E88D;">as-needed</span><span style="color:#89DDFF;">&#39;</span><span style="color:#89DDFF;">,</span></span>
<span class="line"><span style="color:#89DDFF;">  </span><span style="color:#676E95;">// jsx \u4E0D\u4F7F\u7528\u5355\u5F15\u53F7\uFF0C\u800C\u4F7F\u7528\u53CC\u5F15\u53F7</span></span>
<span class="line"><span style="color:#A6ACCD;">  </span><span style="color:#F07178;">jsxSingleQuote</span><span style="color:#89DDFF;">:</span><span style="color:#A6ACCD;"> </span><span style="color:#FF9CAC;">false</span><span style="color:#89DDFF;">,</span></span>
<span class="line"><span style="color:#89DDFF;">  </span><span style="color:#676E95;">// \u5927\u62EC\u53F7\u5185\u7684\u9996\u5C3E\u9700\u8981\u7A7A\u683C</span></span>
<span class="line"><span style="color:#A6ACCD;">  </span><span style="color:#F07178;">bracketSpacing</span><span style="color:#89DDFF;">:</span><span style="color:#A6ACCD;"> </span><span style="color:#FF9CAC;">true</span><span style="color:#89DDFF;">,</span></span>
<span class="line"><span style="color:#89DDFF;">  </span><span style="color:#676E95;">// jsx \u6807\u7B7E\u7684\u53CD\u5C16\u62EC\u53F7\u9700\u8981\u6362\u884C</span></span>
<span class="line"><span style="color:#A6ACCD;">  </span><span style="color:#F07178;">jsxBracketSameLine</span><span style="color:#89DDFF;">:</span><span style="color:#A6ACCD;"> </span><span style="color:#FF9CAC;">false</span><span style="color:#89DDFF;">,</span></span>
<span class="line"><span style="color:#89DDFF;">  </span><span style="color:#676E95;">// \u7BAD\u5934\u51FD\u6570\uFF0C\u53EA\u6709\u4E00\u4E2A\u53C2\u6570\u7684\u65F6\u5019\uFF0C\u4E5F\u9700\u8981\u62EC\u53F7</span></span>
<span class="line"><span style="color:#A6ACCD;">  </span><span style="color:#F07178;">arrowParens</span><span style="color:#89DDFF;">:</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">&#39;</span><span style="color:#C3E88D;">always</span><span style="color:#89DDFF;">&#39;</span><span style="color:#89DDFF;">,</span></span>
<span class="line"><span style="color:#89DDFF;">  </span><span style="color:#676E95;">// \u6BCF\u4E2A\u6587\u4EF6\u683C\u5F0F\u5316\u7684\u8303\u56F4\u662F\u6587\u4EF6\u7684\u5168\u90E8\u5185\u5BB9</span></span>
<span class="line"><span style="color:#A6ACCD;">  </span><span style="color:#F07178;">rangeStart</span><span style="color:#89DDFF;">:</span><span style="color:#A6ACCD;"> </span><span style="color:#F78C6C;">0</span><span style="color:#89DDFF;">,</span></span>
<span class="line"><span style="color:#A6ACCD;">  </span><span style="color:#F07178;">rangeEnd</span><span style="color:#89DDFF;">:</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">Infinity,</span></span>
<span class="line"><span style="color:#89DDFF;">  </span><span style="color:#676E95;">// \u4E0D\u9700\u8981\u5199\u6587\u4EF6\u5F00\u5934\u7684 @prettier</span></span>
<span class="line"><span style="color:#A6ACCD;">  </span><span style="color:#F07178;">requirePragma</span><span style="color:#89DDFF;">:</span><span style="color:#A6ACCD;"> </span><span style="color:#FF9CAC;">false</span><span style="color:#89DDFF;">,</span></span>
<span class="line"><span style="color:#89DDFF;">  </span><span style="color:#676E95;">// \u4E0D\u9700\u8981\u81EA\u52A8\u5728\u6587\u4EF6\u5F00\u5934\u63D2\u5165 @prettier</span></span>
<span class="line"><span style="color:#A6ACCD;">  </span><span style="color:#F07178;">insertPragma</span><span style="color:#89DDFF;">:</span><span style="color:#A6ACCD;"> </span><span style="color:#FF9CAC;">false</span><span style="color:#89DDFF;">,</span></span>
<span class="line"><span style="color:#89DDFF;">  </span><span style="color:#676E95;">// \u4F7F\u7528\u9ED8\u8BA4\u7684\u6298\u884C\u6807\u51C6</span></span>
<span class="line"><span style="color:#A6ACCD;">  </span><span style="color:#F07178;">proseWrap</span><span style="color:#89DDFF;">:</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">&#39;</span><span style="color:#C3E88D;">preserve</span><span style="color:#89DDFF;">&#39;</span><span style="color:#89DDFF;">,</span></span>
<span class="line"><span style="color:#89DDFF;">  </span><span style="color:#676E95;">// \u6362\u884C\u7B26\u4F7F\u7528 lf</span></span>
<span class="line"><span style="color:#A6ACCD;">  </span><span style="color:#F07178;">endOfLine</span><span style="color:#89DDFF;">:</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">&#39;</span><span style="color:#C3E88D;">lf</span><span style="color:#89DDFF;">&#39;</span><span style="color:#89DDFF;">,</span></span>
<span class="line"><span style="color:#A6ACCD;">  </span><span style="color:#676E95;">/* \u4F18\u5316html\u95ED\u5408\u6807\u7B7E\u4E0D\u6362\u884C\u7684\u95EE\u9898 */</span></span>
<span class="line"><span style="color:#A6ACCD;">  </span><span style="color:#F07178;">htmlWhitespaceSensitivity</span><span style="color:#89DDFF;">:</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">&#39;</span><span style="color:#C3E88D;">ignore</span><span style="color:#89DDFF;">&#39;</span><span style="color:#89DDFF;">,</span></span>
<span class="line"><span style="color:#89DDFF;">};</span></span>
<span class="line"></span></code></pre></div><ol start="3"><li>\u914D\u5408\u7F16\u8F91\u5668\u81EA\u52A8\u683C\u5F0F\u5316\u4EE3\u7801 \u4EE5<code>VScode</code>\u7F16\u8F91\u5668\u4E3A\u4F8B\uFF0C\u5728\u9879\u76EE\u4E2D\u521B\u5EFA<code>.vscode</code>\u6587\u4EF6\u5939, \u6B64\u6587\u4EF6\u662F\u9879\u76EE\u4E2D\u5DE5\u4F5C\u533A <code>VScode</code> \u914D\u7F6E\u3002 \u4E4B\u540E\u521B\u5EFA<code>settings.json</code></li></ol><div class="language-json"><button title="Copy Code" class="copy"></button><span class="lang">json</span><pre class="shiki"><code><span class="line"><span style="color:#89DDFF;">{</span></span>
<span class="line"><span style="color:#A6ACCD;">  </span><span style="color:#676E95;">// \u4FDD\u5B58\u65F6\u683C\u5F0F\u5316\u6587\u4EF6</span></span>
<span class="line"><span style="color:#A6ACCD;">  </span><span style="color:#89DDFF;">&quot;</span><span style="color:#C792EA;">editor.formatOnSave</span><span style="color:#89DDFF;">&quot;</span><span style="color:#89DDFF;">:</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">true,</span></span>
<span class="line"><span style="color:#A6ACCD;">  </span><span style="color:#89DDFF;">&quot;</span><span style="color:#C792EA;">editor.codeActionsOnSave</span><span style="color:#89DDFF;">&quot;</span><span style="color:#89DDFF;">:</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">{</span></span>
<span class="line"><span style="color:#A6ACCD;">    </span><span style="color:#89DDFF;">&quot;</span><span style="color:#FFCB6B;">source.fixAll.eslint</span><span style="color:#89DDFF;">&quot;</span><span style="color:#89DDFF;">:</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">true,</span></span>
<span class="line"><span style="color:#A6ACCD;">    </span><span style="color:#89DDFF;">&quot;</span><span style="color:#FFCB6B;">source.fixAll.stylelint</span><span style="color:#89DDFF;">&quot;</span><span style="color:#89DDFF;">:</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">true,</span></span>
<span class="line"><span style="color:#A6ACCD;">    </span><span style="color:#89DDFF;">&quot;</span><span style="color:#FFCB6B;">source.fixAll.markdownlint</span><span style="color:#89DDFF;">&quot;</span><span style="color:#89DDFF;">:</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">true</span></span>
<span class="line"><span style="color:#A6ACCD;">  </span><span style="color:#89DDFF;">}</span></span>
<span class="line"><span style="color:#89DDFF;">}</span></span>
<span class="line"></span></code></pre></div>`,9),e=[o];function t(c,r,D,F,y,C){return a(),n("div",null,e)}const d=s(p,[["render",t]]);export{A as __pageData,d as default};
