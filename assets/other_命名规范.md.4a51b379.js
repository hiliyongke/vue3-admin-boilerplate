import{_ as s,c as n,o as a,a as e}from"./app.8a49408b.js";const p="/vue3-admin-boilerplate/assets/1626422780_69_w1690_h1078.f8453024.png",l="/vue3-admin-boilerplate/assets/1626423491_41_w1092_h237.260d2b4e.png",h=JSON.parse('{"title":"命名规范","description":"","frontmatter":{},"headers":[{"level":3,"title":"目录命名","slug":"目录命名","link":"#目录命名","children":[]},{"level":3,"title":"组件文件命名","slug":"组件文件命名","link":"#组件文件命名","children":[]},{"level":3,"title":"Style 命名","slug":"style-命名","link":"#style-命名","children":[]},{"level":3,"title":"Image 命名","slug":"image-命名","link":"#image-命名","children":[]},{"level":3,"title":"Javascript 命名","slug":"javascript-命名","link":"#javascript-命名","children":[]},{"level":2,"title":"JavaScript 编码规范","slug":"javascript-编码规范","link":"#javascript-编码规范","children":[]}],"relativePath":"other/命名规范.md"}'),o={name:"other/命名规范.md"},c=e(`<h1 id="命名规范" tabindex="-1">命名规范 <a class="header-anchor" href="#命名规范" aria-hidden="true">#</a></h1><p>由历史原因及个人习惯引起的命名不统一，导致不同成员在维护同一页面时，效率低下，迭代、维护成本极高。</p><h3 id="目录命名" tabindex="-1">目录命名 <a class="header-anchor" href="#目录命名" aria-hidden="true">#</a></h3><p><strong>全部采用小写方式， 以中划线分隔，有复数结构时，要采用复数命名法， 缩写不用复数</strong></p><p>✅ 正例：<code>components / utils / layouts / styles / card-item</code> ❌ 反例：<code>Utils / demoStyles / demo_styles / cardItem</code></p><h3 id="组件文件命名" tabindex="-1">组件文件命名 <a class="header-anchor" href="#组件文件命名" aria-hidden="true">#</a></h3><p><strong>全部采用<code>大驼峰</code>方式，有复数结构时，要采用复数命名法， 缩写不用复数</strong></p><p>比如 <code>src/components</code> 下的组件文件命名</p><p>✅ 正例：<code>FreeDialog / FreeException / FreeForm / FreeFullscreen / FreeIcon</code> ❌ 反例：<code>free-dialog / free-exception / free-form / free-fullscreen / free-icon</code></p><h3 id="style-命名" tabindex="-1">Style 命名 <a class="header-anchor" href="#style-命名" aria-hidden="true">#</a></h3><p><strong>全部采用小写方式， 以中划线分隔</strong></p><p>✅ 正例：<code>element-override.css / common.scss</code> ❌ 反例：<code>elementOverride.css / Common.scss</code></p><h3 id="image-命名" tabindex="-1">Image 命名 <a class="header-anchor" href="#image-命名" aria-hidden="true">#</a></h3><p><strong>全部采用小写 <code>kebab-case</code> 命名方式， 以中划线分隔</strong></p><p>✅ 正例：<code>icon-home.png / logo.png</code> ❌ 反例：<code>iconHome.png / icon_home / Logo.png</code></p><h3 id="javascript-命名" tabindex="-1">Javascript 命名 <a class="header-anchor" href="#javascript-命名" aria-hidden="true">#</a></h3><p><strong>js / ts 文件统一全部采用小写方式或者小驼峰 <code>lowerCamelCase</code> 风格</strong></p><p>✅ 正例：<code>http.js / loadImage.ts / isString.ts</code> ❌ 反例：<code>Http.js / load-image.scss / is_string.ts</code></p><p><strong>方法名、参数名、成员变量、局部变量都统一使用小驼峰 <code>lowerCamelCase</code> 风格，必须遵从驼峰形式</strong></p><p>✅ 正例：<code>hasAccess / getUserInfoById() / currentUserId</code></p><p><strong>其中 method 方法命名必须是 <code>动词</code> 或者 <code>动词+名词</code> 形式</strong></p><p>✅ 正例：<code>saveShopCarData /openShopCarInfoDialog</code> ❌ 反例：<code>save / open / show / go</code></p><p>特此说明，增删查改，详情统一使用如下 5 个单词，不得使用其他（目的是为了统一）</p><p><code>add / update / delete / detail / get</code></p><p><strong>附： 函数方法常用的动词:</strong></p><div class="language-"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki material-theme-palenight" tabindex="0"><code><span class="line"><span style="color:#A6ACCD;">get 获取 / set 设置,</span></span>
<span class="line"><span style="color:#A6ACCD;">add 增加 / remove 删除</span></span>
<span class="line"><span style="color:#A6ACCD;">create 创建 / destory 移除</span></span>
<span class="line"><span style="color:#A6ACCD;">start 启动 / stop 停止</span></span>
<span class="line"><span style="color:#A6ACCD;">open 打开 / close 关闭</span></span>
<span class="line"><span style="color:#A6ACCD;">read 读取 / write 写入</span></span>
<span class="line"><span style="color:#A6ACCD;">load 载入 / save 保存</span></span>
<span class="line"><span style="color:#A6ACCD;">create 创建 / destroy 销毁</span></span>
<span class="line"><span style="color:#A6ACCD;">begin 开始 / end 结束</span></span>
<span class="line"><span style="color:#A6ACCD;">backup 备份 / restore 恢复</span></span>
<span class="line"><span style="color:#A6ACCD;">import 导入 / export 导出</span></span>
<span class="line"><span style="color:#A6ACCD;">split 分割 / merge 合并</span></span>
<span class="line"><span style="color:#A6ACCD;">inject 注入 / extract 提取</span></span>
<span class="line"><span style="color:#A6ACCD;">attach 附着 / detach 脱离</span></span>
<span class="line"><span style="color:#A6ACCD;">bind 绑定 / separate 分离</span></span>
<span class="line"><span style="color:#A6ACCD;">view 查看 / browse 浏览</span></span>
<span class="line"><span style="color:#A6ACCD;">edit 编辑 / modify 修改</span></span>
<span class="line"><span style="color:#A6ACCD;">select 选取 / mark 标记</span></span>
<span class="line"><span style="color:#A6ACCD;">copy 复制 / paste 粘贴</span></span>
<span class="line"><span style="color:#A6ACCD;">undo 撤销 / redo 重做</span></span>
<span class="line"><span style="color:#A6ACCD;">insert 插入 / delete 移除</span></span>
<span class="line"><span style="color:#A6ACCD;">add 加入 / append 添加</span></span>
<span class="line"><span style="color:#A6ACCD;">clean 清理 / clear 清除</span></span>
<span class="line"><span style="color:#A6ACCD;">index 索引 / sort 排序</span></span>
<span class="line"><span style="color:#A6ACCD;">find 查找 / search 搜索</span></span>
<span class="line"><span style="color:#A6ACCD;">increase 增加 / decrease 减少</span></span>
<span class="line"><span style="color:#A6ACCD;">play 播放 / pause 暂停</span></span>
<span class="line"><span style="color:#A6ACCD;">launch 启动 / run 运行</span></span>
<span class="line"><span style="color:#A6ACCD;">compile 编译 / execute 执行</span></span>
<span class="line"><span style="color:#A6ACCD;">debug 调试 / trace 跟踪</span></span>
<span class="line"><span style="color:#A6ACCD;">observe 观察 / listen 监听</span></span>
<span class="line"><span style="color:#A6ACCD;">build 构建 / publish 发布</span></span>
<span class="line"><span style="color:#A6ACCD;">input 输入 / output 输出</span></span>
<span class="line"><span style="color:#A6ACCD;">encode 编码 / decode 解码</span></span>
<span class="line"><span style="color:#A6ACCD;">encrypt 加密 / decrypt 解密</span></span>
<span class="line"><span style="color:#A6ACCD;">compress 压缩 / decompress 解压缩</span></span>
<span class="line"><span style="color:#A6ACCD;">pack 打包 / unpack 解包</span></span>
<span class="line"><span style="color:#A6ACCD;">parse 解析 / emit 生成</span></span>
<span class="line"><span style="color:#A6ACCD;">connect 连接 / disconnect 断开</span></span>
<span class="line"><span style="color:#A6ACCD;">send 发送 / receive 接收</span></span>
<span class="line"><span style="color:#A6ACCD;">download 下载 / upload 上传</span></span>
<span class="line"><span style="color:#A6ACCD;">refresh 刷新 / synchronize 同步</span></span>
<span class="line"><span style="color:#A6ACCD;">update 更新 / revert 复原</span></span>
<span class="line"><span style="color:#A6ACCD;">lock 锁定 / unlock 解锁</span></span>
<span class="line"><span style="color:#A6ACCD;">check out 签出 / check in 签入</span></span>
<span class="line"><span style="color:#A6ACCD;">submit 提交 / commit 交付</span></span>
<span class="line"><span style="color:#A6ACCD;">push 推 / pull 拉</span></span>
<span class="line"><span style="color:#A6ACCD;">expand 展开 / collapse 折叠</span></span>
<span class="line"><span style="color:#A6ACCD;">begin 起始 / end 结束</span></span>
<span class="line"><span style="color:#A6ACCD;">start 开始 / finish 完成</span></span>
<span class="line"><span style="color:#A6ACCD;">enter 进入 / exit 退出</span></span>
<span class="line"><span style="color:#A6ACCD;">abort 放弃 / quit 离开</span></span>
<span class="line"><span style="color:#A6ACCD;">obsolete 废弃 / depreciate 废旧</span></span>
<span class="line"><span style="color:#A6ACCD;">collect 收集 / aggregate 聚集</span></span>
<span class="line"><span style="color:#A6ACCD;"></span></span></code></pre></div><p><strong>常量命名全部大写，单词间用下划线隔开，力求语义表达完整清楚，不要嫌名字长</strong></p><blockquote><p>这边的常量名不局限于 js 基本类型，也可以是引用类型，比如<code>Array</code>，<code>Object</code>，<code>Set</code>，<code>Map</code> 等</p></blockquote><p>✅ 正例：<code>MAX_STOCK_COUNT</code> ❌ 反例：<code>MAX_COUNT</code></p><p>如果是下面这种类型的，检查报错，就直接 <code>disabled</code></p><p><img src="`+p+`" alt="1626422780_69_w1690_h1078"></p><p>解决方案：</p><div class="language-ts"><button title="Copy Code" class="copy"></button><span class="lang">ts</span><pre class="shiki material-theme-palenight" tabindex="0"><code><span class="line"><span style="color:#676E95;font-style:italic;">// eslint-disable-next-line @typescript-eslint/naming-convention</span></span>
<span class="line"><span style="color:#C792EA;">const</span><span style="color:#A6ACCD;"> Axios </span><span style="color:#89DDFF;">=</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">new</span><span style="color:#A6ACCD;"> </span><span style="color:#82AAFF;">AxiosRequest</span><span style="color:#A6ACCD;">(</span><span style="color:#89DDFF;">{</span></span>
<span class="line"><span style="color:#A6ACCD;">  </span><span style="color:#F07178;">timeout</span><span style="color:#89DDFF;">:</span><span style="color:#A6ACCD;"> </span><span style="color:#F78C6C;">10</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">*</span><span style="color:#A6ACCD;"> </span><span style="color:#F78C6C;">1000</span><span style="color:#89DDFF;">,</span></span>
<span class="line"><span style="color:#A6ACCD;">  </span><span style="color:#F07178;">headers</span><span style="color:#89DDFF;">:</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">{</span></span>
<span class="line"><span style="color:#A6ACCD;">    </span><span style="color:#89DDFF;">&#39;</span><span style="color:#F07178;">Content-Type</span><span style="color:#89DDFF;">&#39;</span><span style="color:#89DDFF;">:</span><span style="color:#A6ACCD;"> ContentTypeEnum</span><span style="color:#89DDFF;">.</span><span style="color:#A6ACCD;">JSON</span><span style="color:#89DDFF;">,</span></span>
<span class="line"><span style="color:#A6ACCD;">    </span><span style="color:#89DDFF;">&#39;</span><span style="color:#F07178;">X-Requested-With</span><span style="color:#89DDFF;">&#39;</span><span style="color:#89DDFF;">:</span><span style="color:#A6ACCD;"> ContentTypeEnum</span><span style="color:#89DDFF;">.</span><span style="color:#A6ACCD;">X_Requested_With</span><span style="color:#89DDFF;">,</span></span>
<span class="line"><span style="color:#A6ACCD;">  </span><span style="color:#89DDFF;">},</span></span>
<span class="line"><span style="color:#A6ACCD;">  transform</span><span style="color:#89DDFF;">,</span></span>
<span class="line"><span style="color:#A6ACCD;">  </span><span style="color:#F07178;">withCredentials</span><span style="color:#89DDFF;">:</span><span style="color:#A6ACCD;"> </span><span style="color:#FF9CAC;">true</span><span style="color:#89DDFF;">,</span></span>
<span class="line"><span style="color:#A6ACCD;">  </span><span style="color:#F07178;">showErrorMessage</span><span style="color:#89DDFF;">:</span><span style="color:#A6ACCD;"> </span><span style="color:#FF9CAC;">true</span><span style="color:#89DDFF;">,</span></span>
<span class="line"><span style="color:#89DDFF;">}</span><span style="color:#A6ACCD;">)</span><span style="color:#89DDFF;">;</span></span>
<span class="line"></span></code></pre></div><p><strong>TS 类型名称命名全部采用大驼峰 <code>KebabCase</code> 命名</strong></p><p>✅ 正例：</p><div class="language-ts"><button title="Copy Code" class="copy"></button><span class="lang">ts</span><pre class="shiki material-theme-palenight" tabindex="0"><code><span class="line"><span style="color:#89DDFF;font-style:italic;">export</span><span style="color:#A6ACCD;"> </span><span style="color:#C792EA;">type</span><span style="color:#A6ACCD;"> </span><span style="color:#FFCB6B;">Fn</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">=</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">()</span><span style="color:#A6ACCD;"> </span><span style="color:#C792EA;">=&gt;</span><span style="color:#A6ACCD;"> </span><span style="color:#FFCB6B;">void</span><span style="color:#89DDFF;">;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#89DDFF;font-style:italic;">export</span><span style="color:#A6ACCD;"> </span><span style="color:#C792EA;">interface</span><span style="color:#A6ACCD;"> </span><span style="color:#FFCB6B;">UserInfo</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">{</span></span>
<span class="line"><span style="color:#A6ACCD;">  </span><span style="color:#F07178;">name</span><span style="color:#89DDFF;">:</span><span style="color:#A6ACCD;"> </span><span style="color:#FFCB6B;">string</span><span style="color:#89DDFF;">;</span></span>
<span class="line"><span style="color:#A6ACCD;">  </span><span style="color:#F07178;">age</span><span style="color:#89DDFF;">:</span><span style="color:#A6ACCD;"> </span><span style="color:#FFCB6B;">number</span><span style="color:#89DDFF;">;</span></span>
<span class="line"><span style="color:#89DDFF;">}</span></span>
<span class="line"></span></code></pre></div><p>❌ 反例：</p><div class="language-ts"><button title="Copy Code" class="copy"></button><span class="lang">ts</span><pre class="shiki material-theme-palenight" tabindex="0"><code><span class="line"><span style="color:#89DDFF;font-style:italic;">export</span><span style="color:#A6ACCD;"> </span><span style="color:#C792EA;">type</span><span style="color:#A6ACCD;"> </span><span style="color:#FFCB6B;">fn</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">=</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">()</span><span style="color:#A6ACCD;"> </span><span style="color:#C792EA;">=&gt;</span><span style="color:#A6ACCD;"> </span><span style="color:#FFCB6B;">void</span><span style="color:#89DDFF;">;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#89DDFF;font-style:italic;">export</span><span style="color:#A6ACCD;"> </span><span style="color:#C792EA;">interface</span><span style="color:#A6ACCD;"> </span><span style="color:#FFCB6B;">userInfo</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">{</span></span>
<span class="line"><span style="color:#A6ACCD;">  </span><span style="color:#F07178;">name</span><span style="color:#89DDFF;">:</span><span style="color:#A6ACCD;"> </span><span style="color:#FFCB6B;">string</span><span style="color:#89DDFF;">;</span></span>
<span class="line"><span style="color:#A6ACCD;">  </span><span style="color:#F07178;">age</span><span style="color:#89DDFF;">:</span><span style="color:#A6ACCD;"> </span><span style="color:#FFCB6B;">number</span><span style="color:#89DDFF;">;</span></span>
<span class="line"><span style="color:#89DDFF;">}</span></span>
<span class="line"></span></code></pre></div><p><strong><code>boolean</code> 类型名称命名除了按照正常的命名规范来，需要加上前缀 <code>is, should, has, can, did, will</code> 命名</strong></p><p>否则 <code>eslint</code> 检查会报错</p><p><img src="`+l+`" alt="1626423491_41_w1092_h237"></p><p>解决方案：</p><div class="language-js"><button title="Copy Code" class="copy"></button><span class="lang">js</span><pre class="shiki material-theme-palenight" tabindex="0"><code><span class="line"><span style="color:#C792EA;">const</span><span style="color:#A6ACCD;"> isFlag </span><span style="color:#89DDFF;">=</span><span style="color:#A6ACCD;"> </span><span style="color:#FF9CAC;">true</span><span style="color:#89DDFF;">;</span></span>
<span class="line"></span></code></pre></div><h2 id="javascript-编码规范" tabindex="-1">JavaScript 编码规范 <a class="header-anchor" href="#javascript-编码规范" aria-hidden="true">#</a></h2><p>具体的规范可以查看 [JavaScript 编码规范]</p>`,45),t=[c];function r(i,C,A,y,d,D){return a(),n("div",null,t)}const g=s(o,[["render",r]]);export{h as __pageData,g as default};
