以 vue 的 package.json 为例：

```
{
  // 名称
  "name": "vue",
  // 版本
  "version": "2.6.10",
  // 描述
  "description": "Reactive, component-oriented view layer for modern web interfaces.",
  // npm包项目的主要入口文件，必须的
  "main": "dist/vue.runtime.common.js",
  // rollup 打包需要的入口文件
  "module": "dist/vue.runtime.esm.js",
  // npm 上所有的文件都开启 cdn 服务地址
  "unpkg": "dist/vue.js",
  // jsdelivr cdn公共库
  "jsdelivr": "dist/vue.js",
  // TypeScript 的入口文件
  "typings": "types/index.d.ts",
  // 当你发布package时，具体那些文件会发布上去
  "files": [
    "src",
    "dist/*.js",
    "types/*.d.ts"
  ],
  // 声明该模块是否包含 sideEffects（副作用），从而可以为 tree-shaking 提供更大的优化空间。
  "sideEffects": false,
  "scripts": {
    "dev": "rollup -w -c scripts/config.js --environment TARGET:web-full-dev",
    "dev:cjs": "rollup -w -c scripts/config.js --environment TARGET:web-runtime-cjs-dev",
    "dev:esm": "rollup -w -c scripts/config.js --environment TARGET:web-runtime-esm",
    "dev:test": "karma start test/unit/karma.dev.config.js",
    "dev:ssr": "rollup -w -c scripts/config.js --environment TARGET:web-server-renderer",
    "dev:compiler": "rollup -w -c scripts/config.js --environment TARGET:web-compiler ",
    "dev:weex": "rollup -w -c scripts/config.js --environment TARGET:weex-framework",
    "dev:weex:factory": "rollup -w -c scripts/config.js --environment TARGET:weex-factory",
    "dev:weex:compiler": "rollup -w -c scripts/config.js --environment TARGET:weex-compiler ",
    "build": "node scripts/build.js",
    "build:ssr": "npm run build -- web-runtime-cjs,web-server-renderer",
    "build:weex": "npm run build -- weex",
    "test": "npm run lint && flow check && npm run test:types && npm run test:cover && npm run test:e2e -- --env phantomjs && npm run test:ssr && npm run test:weex",
    "test:unit": "karma start test/unit/karma.unit.config.js",
    "test:cover": "karma start test/unit/karma.cover.config.js",
    "test:e2e": "npm run build -- web-full-prod,web-server-basic-renderer && node test/e2e/runner.js",
    "test:weex": "npm run build:weex && jasmine JASMINE_CONFIG_PATH=test/weex/jasmine.js",
    "test:ssr": "npm run build:ssr && jasmine JASMINE_CONFIG_PATH=test/ssr/jasmine.js",
    "test:sauce": "npm run sauce -- 0 && npm run sauce -- 1 && npm run sauce -- 2",
    "test:types": "tsc -p ./types/test/tsconfig.json",
    "lint": "eslint src scripts test",
    "flow": "flow check",
    "sauce": "karma start test/unit/karma.sauce.config.js",
    "bench:ssr": "npm run build:ssr && node benchmarks/ssr/renderToString.js && node benchmarks/ssr/renderToStream.js",
    "release": "bash scripts/release.sh",
    "release:weex": "bash scripts/release-weex.sh",
    "release:note": "node scripts/gen-release-note.js",
    "commit": "git-cz"
  },
  // 代码质量检查
  "gitHooks": {
    "pre-commit": "lint-staged",
    "commit-msg": "node scripts/verify-commit-msg.js"
  },
  // 代码检查
  "lint-staged": {
    "*.js": [
      "eslint --fix",
      "git add"
    ]
  },
  // git仓库所在位置
  "repository": {
    "type": "git",
    "url": "git+https://github.com/vuejs/vue.git"
  },
  // 关键词
  "keywords": [
    "vue"
  ],
  // 作者
  "author": "Evan You",
  // 开源协议
  "license": "MIT",
  // bug地址
  "bugs": {
    "url": "https://github.com/vuejs/vue/issues"
  },
  // 主页
  "homepage": "https://github.com/vuejs/vue#readme",
  // 依赖
  "devDependencies": {
    "yorkie": "^2.0.0"
  },
  // 设置一些用于npm包的脚本命令会用到的配置参数
  "config": {
    "commitizen": {
      "path": "./node_modules/cz-conventional-changelog"
    }
  }
}

```

另外还有 3 个字段比较重要：

```
// 本node包依赖的其他依赖包
    "peerDependencies": {
        "vue": "^2.5.2"
    },
    // 指明了该项目所需要的node.js版本
    "engines": {
        "node": ">=8.9.1",
        "npm": ">=5.5.1",
        "yarn": ">=1.3.2"
    },
    // 支持的浏览器
    "browserslist": [
        "last 3 Chrome versions",
        "last 3 Firefox versions",
        "Safari >= 10",
        "Explorer >= 11",
        "Edge >= 12",
        "iOS >= 10",
        "Android >= 6"
    ]

```
