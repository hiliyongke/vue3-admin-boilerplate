> stylelint 是一个强大的，现代的代码检查工具，可以帮助我们避免错误并在我们的样式中强制执行约定。前面我们已经为 vite 项目配置了 scss 等，现在我们来为项目配置上 stylelint。

为什么要用 stylelint 呢？  
其实原因和我们要用 eslint+prettier 是一个道理的，简单说一下：  
1、为了团队合作，避免各写各的风格代码，结果看着别人的老是觉得别人写得丑，干脆约定个大家都觉得还行的格式好了。  
2、避免一些低级错误。  
3、美化 css 代码。

下面说下配置 stylelint：  
一、安装依赖

```
npm install --save-dev stylelint stylelint-config-prettier stylelint-config-standard stylelint-config-recess-order stylelint-scss
```

二、配置相关文件  
1、项目目录下配置. stylelintignore 忽略特定文件：

```
# 其他类型文件
*.js
*.jsx
*.ts
*.tsx
*.jpg
*.woff
​
# 测试和打包目录
/mock/
/dist/
/node_modules/
```

2、项目目录下配置 stylelint.config.js 加载配置对象：

```
module.exports = {
	root: true,
	plugins: ['stylelint-scss'],
	extends: [
		'stylelint-config-standard',
		'stylelint-config-recess-order',
		'stylelint-config-prettier'
	],
	rules: {
		'declaration-colon-space-before': 'never',
		'declaration-colon-space-after': 'always-single-line',
		'at-rule-no-unknown': [
			true,
			{
				ignoreAtRules: ['include', 'mixin']
			}
		],
		'rule-empty-line-before': ['never']
	}
};


```

如此一来，配置就完成了。  
但是我们开发的时候通常希望能够让编辑器提示我们哪里是有问题的，这里以 vscode 为例：  
1、vscode 安装插件：vscode-stylelint，安装上插件后就可以提示我们 css 哪里错误了。  
2、我继续配置 vscode stylelint 插件自动美化、修复代码的功能：  
找到 vscode 配置项并配置，目前找到配置项的路径是在：File->Preferences->Settings-> 右上角 (Open Settings(JSON))，在文件里面添加如下代码：

```
"editor.codeActionsOnSave": {
    "source.fixAll.stylelint": true
  }
```

意思是在保存操作的时候，自动美化代码、修复可修复的代码，结合我们之前给 eslint 配置，就是下面这样的了：

```
"editor.codeActionsOnSave": {
    "source.fixAll.eslint": true,
    "eslint.autoFixOnSave" : true,
    "source.fixAll.stylelint": true
  }
```

再贴一下在下 settings.json 文件目前完整内容：

```
{
  "editor.codeActionsOnSave": {
    "source.fixAll.eslint": true,
    "eslint.autoFixOnSave" : true,
    "source.fixAll.stylelint": true
  },
  "workbench.colorTheme": "Solarized Light",
  "[json]": {
    "editor.defaultFormatter": "EditorConfig.EditorConfig"
  }
}
```

过程中遇到的问题：  
一、使用 scss 的过程中，遇到了下面的错误：  
Unexpected unknown at-rule “@mixin” (at-rule-no-unknown)stylelintat-rule-no-unknown

Unexpected unknown at-rule “@include” (at-rule-no-unknown)stylelintat-rule-no-unknown  
上面错误的意思是 @mixin，@include stylelint 不认识这两个样式属性，只需要配置这个规则忽略这两个 mixin 就可以了，如：

```
'at-rule-no-unknown': [
    true,
    {
        ignoreAtRules: ['include', 'mixin']
    }
]
```
