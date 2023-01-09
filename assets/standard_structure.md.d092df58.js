import{_ as s,c as n,o as a,a as p}from"./app.84281fb6.js";const d=JSON.parse('{"title":"目录结构","description":"","frontmatter":{},"headers":[],"relativePath":"standard/structure.md"}'),l={name:"standard/structure.md"},o=p(`<h1 id="目录结构" tabindex="-1">目录结构 <a class="header-anchor" href="#目录结构" aria-hidden="true">#</a></h1><p>目录结构足够清晰的话，能够让开发者一目了然，知道什么文件夹是存在什么内容，做的是什么功能，也便于维护者的对代码的良好阅读，也能让开发者快速了解项目的基础架构的情况。</p><p>目前默认应用目录架构提供了良好的代码分层结构，适用于开发或大或小的应用，约定的目录结构如下：</p><div class="language-"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki material-palenight"><code><span class="line"><span style="color:#A6ACCD;">.</span></span>
<span class="line"><span style="color:#A6ACCD;">├── .browserslistrc       # 指定项目的目标浏览器范围</span></span>
<span class="line"><span style="color:#A6ACCD;">├── .commitlintrc.js      # Git Commit提交规则配置</span></span>
<span class="line"><span style="color:#A6ACCD;">├── .editorconfig         # 编辑器设置</span></span>
<span class="line"><span style="color:#A6ACCD;">├── .env                  # 所有的环境中被载入</span></span>
<span class="line"><span style="color:#A6ACCD;">├── .env.development      # 开发环境模式</span></span>
<span class="line"><span style="color:#A6ACCD;">├── .env.productiont      # 正式环境模式</span></span>
<span class="line"><span style="color:#A6ACCD;">├── .eslintignore         # Eslint 忽略规则</span></span>
<span class="line"><span style="color:#A6ACCD;">├── .eslintrc.js          # Eslint 规则配置</span></span>
<span class="line"><span style="color:#A6ACCD;">├── .gitignore            # Git 忽略规则</span></span>
<span class="line"><span style="color:#A6ACCD;">├── .prettierignore       # Prettier 忽略规则</span></span>
<span class="line"><span style="color:#A6ACCD;">├── .prettierrc.js        # Prettier 格式规则配置</span></span>
<span class="line"><span style="color:#A6ACCD;">├── .stylelintignore      # 样式忽略规则</span></span>
<span class="line"><span style="color:#A6ACCD;">├── .stylelintrc.js       # 样式格式规则配置</span></span>
<span class="line"><span style="color:#A6ACCD;">├── .vscode               # vscode 配置</span></span>
<span class="line"><span style="color:#A6ACCD;">├── babel.config.js       # babel 配置文件</span></span>
<span class="line"><span style="color:#A6ACCD;">├── jest.config.js        # 单元测试配置文件</span></span>
<span class="line"><span style="color:#A6ACCD;">├── package.json          # 项目依赖配置文件</span></span>
<span class="line"><span style="color:#A6ACCD;">├── mock                  # 数据模拟</span></span>
<span class="line"><span style="color:#A6ACCD;">├── public                # 项目静态资源，不经过编译，适合存放第三方的资源</span></span>
<span class="line"><span style="color:#A6ACCD;">├── plop-templates        # plop 快速生成模板文件夹</span></span>
<span class="line"><span style="color:#A6ACCD;">├── plopfile.js           # 模板配置文件</span></span>
<span class="line"><span style="color:#A6ACCD;">├── docs                  # 项目文档</span></span>
<span class="line"><span style="color:#A6ACCD;">├── src</span></span>
<span class="line"><span style="color:#A6ACCD;">│   ├── app.vue           # vue根组件</span></span>
<span class="line"><span style="color:#A6ACCD;">│   ├── api               # 网络请求层</span></span>
<span class="line"><span style="color:#A6ACCD;">│   ├── assets            # 静态资源</span></span>
<span class="line"><span style="color:#A6ACCD;">│   ├── directives        # 指令</span></span>
<span class="line"><span style="color:#A6ACCD;">│   ├── components        # 公共组件 (基础/业务)</span></span>
<span class="line"><span style="color:#A6ACCD;">│   ├── config            # 配置 (样式/组件/其他)</span></span>
<span class="line"><span style="color:#A6ACCD;">│   ├── directives        # 指令</span></span>
<span class="line"><span style="color:#A6ACCD;">│   ├── enums             # 公共枚举值</span></span>
<span class="line"><span style="color:#A6ACCD;">│   ├── hooks             # hooks方法</span></span>
<span class="line"><span style="color:#A6ACCD;">│   ├── i18n              # 国际化</span></span>
<span class="line"><span style="color:#A6ACCD;">│   ├── layouts           # 页面布局</span></span>
<span class="line"><span style="color:#A6ACCD;">│   ├── plugins           # 插件</span></span>
<span class="line"><span style="color:#A6ACCD;">│   ├── main.ts           # vue入口主文件</span></span>
<span class="line"><span style="color:#A6ACCD;">│   ├── router            # 路由目录</span></span>
<span class="line"><span style="color:#A6ACCD;">│   ├── shims-vue.d.ts    # vue 文件类型的 type</span></span>
<span class="line"><span style="color:#A6ACCD;">│   ├── store             # 数据流状态管理层</span></span>
<span class="line"><span style="color:#A6ACCD;">│   ├── style             # 公共样式</span></span>
<span class="line"><span style="color:#A6ACCD;">│   ├── types             # 公共ts类型</span></span>
<span class="line"><span style="color:#A6ACCD;">│   ├── utils             # 工具函数集合</span></span>
<span class="line"><span style="color:#A6ACCD;">│   └── pages             # 视图层页面</span></span>
<span class="line"><span style="color:#A6ACCD;">├── tests                 # 测试用例</span></span>
<span class="line"><span style="color:#A6ACCD;">├── types                 # 公共ts类型</span></span>
<span class="line"><span style="color:#A6ACCD;">├── tsconfig.json         # typescript 配置文件</span></span>
<span class="line"><span style="color:#A6ACCD;">└── vite.config.js        # vite 脚手架配置文件</span></span>
<span class="line"><span style="color:#A6ACCD;"></span></span></code></pre></div><p><strong>mock/</strong></p><p>本地模拟数据的目录。</p><p><strong>public/</strong></p><p>静态资源目录，默认包含 <code>index.html</code> 和 <code>favicon.png</code></p><p><strong>plop-templates</strong></p><p>基于 <a href="https://github.com/plopjs/plop" target="_blank" rel="noreferrer"><code>plop</code></a> 生成器框架，快速生成模板文件</p><p><strong>src/</strong></p><p>源码目录</p><p><strong>assets/</strong></p><p>项目的静态资源目录，通常包括图片、<code>Svg</code> 图标、<code>Font</code> 字体三部分，目录形式如下：</p><div class="language-bash"><button title="Copy Code" class="copy"></button><span class="lang">bash</span><pre class="shiki material-palenight"><code><span class="line"><span style="color:#FFCB6B;">assets</span></span>
<span class="line"><span style="color:#A6ACCD;">  </span><span style="color:#FFCB6B;">├──</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">fonts</span><span style="color:#A6ACCD;">       </span><span style="color:#676E95;font-style:italic;"># 字体文件</span></span>
<span class="line"><span style="color:#A6ACCD;">  </span><span style="color:#FFCB6B;">├──</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">icons</span><span style="color:#A6ACCD;">       </span><span style="color:#676E95;font-style:italic;"># 图标</span></span>
<span class="line"><span style="color:#A6ACCD;">  </span><span style="color:#FFCB6B;">└──</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">statics</span><span style="color:#A6ACCD;">     </span><span style="color:#676E95;font-style:italic;"># 其他静态文件</span></span>
<span class="line"></span></code></pre></div><p><strong>layouts/</strong></p><p>项目的布局文件目录，布局通常包含导航配置，布局组件，样式三部分，推荐的目录形式如下：</p><p><strong>components/</strong></p><p>项目通用的组件目录，其中如基础类型的组件，命名<code>x-[component-name]</code>，目录推荐形式如下：</p><div class="language-bash"><button title="Copy Code" class="copy"></button><span class="lang">bash</span><pre class="shiki material-palenight"><code><span class="line"><span style="color:#FFCB6B;">XIcon</span></span>
<span class="line"><span style="color:#A6ACCD;">  </span><span style="color:#FFCB6B;">├──</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">demo</span><span style="color:#A6ACCD;">           </span><span style="color:#676E95;font-style:italic;"># 测试案例</span></span>
<span class="line"><span style="color:#A6ACCD;">  </span><span style="color:#FFCB6B;">├──</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">tests</span><span style="color:#A6ACCD;">          </span><span style="color:#676E95;font-style:italic;"># 测试用例</span></span>
<span class="line"><span style="color:#A6ACCD;">  </span><span style="color:#FFCB6B;">├──</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">x-icon.vue</span></span>
<span class="line"><span style="color:#A6ACCD;">  </span><span style="color:#FFCB6B;">├──</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">index.ts</span><span style="color:#A6ACCD;">       </span><span style="color:#676E95;font-style:italic;"># 组件入口</span></span>
<span class="line"><span style="color:#A6ACCD;">  </span><span style="color:#FFCB6B;">└──</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">README.md</span><span style="color:#A6ACCD;">      </span><span style="color:#676E95;font-style:italic;"># 使用文档</span></span>
<span class="line"></span></code></pre></div><p><strong>views/</strong></p><p>项目的页面文件目录，页面通常包页面、业务组件，目录形式推荐如下:</p><div class="language-bash"><button title="Copy Code" class="copy"></button><span class="lang">bash</span><pre class="shiki material-palenight"><code><span class="line"><span style="color:#FFCB6B;">user</span><span style="color:#A6ACCD;">                     </span><span style="color:#676E95;font-style:italic;"># uer 页面</span></span>
<span class="line"><span style="color:#A6ACCD;">  </span><span style="color:#FFCB6B;">├──</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">components</span><span style="color:#A6ACCD;">         </span><span style="color:#676E95;font-style:italic;"># 业务组件</span></span>
<span class="line"><span style="color:#A6ACCD;">  </span><span style="color:#FFCB6B;">└──</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">index.vue</span><span style="color:#A6ACCD;">          </span><span style="color:#676E95;font-style:italic;"># 页面</span></span>
<span class="line"></span></code></pre></div><p><strong>store/</strong></p><p>基于<code>Pinia(Vuex5)</code>的数据状态管理层，目录形式推荐如下:</p><div class="language-bash"><button title="Copy Code" class="copy"></button><span class="lang">bash</span><pre class="shiki material-palenight"><code><span class="line"><span style="color:#FFCB6B;">store</span></span>
<span class="line"><span style="color:#A6ACCD;">  </span><span style="color:#FFCB6B;">├──</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">modules</span><span style="color:#A6ACCD;">           </span><span style="color:#676E95;font-style:italic;"># 数据模块</span></span>
<span class="line"><span style="color:#A6ACCD;">  </span><span style="color:#FFCB6B;">└──</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">index.ts</span><span style="color:#A6ACCD;">          </span><span style="color:#676E95;font-style:italic;"># 入口</span></span>
<span class="line"></span></code></pre></div><p><strong>style/</strong></p><p>全局样式目录。[详见]</p><p><strong>api/</strong></p><p>数据请求，基于<code>axios</code>强大的请求库封装<code>request</code>。 [详见]</p><p><strong>directives/</strong></p><p>公共的指令函数</p><p><strong>hooks/</strong></p><p>基于 Vue 组合式 API 编写的<code>Hooks</code>工具函数目录，具体编写规则和使用。[详见]</p><p><strong>plugins/</strong></p><p>第三方插件</p><p><strong>router/</strong></p><p>应用的路由配置文件。[详见]</p><p><strong>utils/</strong></p><p>工具函数集合</p><p><strong>main.ts</strong></p><p><strong>.vscode/</strong></p><p><code>vscode</code> 编辑器配置</p><p><strong>package.json</strong></p><p>应用所需要的各种模块，以及配置信息（比如名称、版本、许可证等元数据）。</p><p><strong>tsconfig.json</strong></p><p>TypeScript 编译所需的配置文件。</p>`,47),e=[o];function t(c,r,C,i,A,y){return a(),n("div",null,e)}const g=s(l,[["render",t]]);export{d as __pageData,g as default};
