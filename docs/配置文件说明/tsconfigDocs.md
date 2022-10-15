```json
{
  "compilerOptions": {
    "target": "esnext", // 指定输出 ECMAScript 版本，默认为 es5
    // "rootDir": "src", // 编译解析根路径，默认为 tsconfig.json 位于的目录
    "outDir": "dist", // 编译输出文件夹路径，默认为源文件同级目录
    "useDefineForClassFields": true,
    "module": "esnext", // 指定输出模块规范，默认为 Commonjs
    "strict": true, // 启用所有严格的类型检查选项，默认为 true
    "jsx": "preserve",
    "jsxFactory": "h",
    "jsxFragmentFactory": "Fragment",
    "sourceMap": true, // 启用 sourceMap，默认为 false
    "declaration": true, // 生成 .d.ts 类型文件，默认为 false
    "declarationDir": "dist/types", // .d.ts 类型文件的输出目录，默认为 outDir 目录
    "resolveJsonModule": true,
    "esModuleInterop": true, // 通过为导入内容创建命名空间，实现 CommonJS 和 ES 模块之间的互操作性，默认为 true
    "skipLibCheck": true, // 跳过导入第三方 lib 声明文件的类型检查，默认为 true
    "forceConsistentCasingInFileNames": true, // 强制在文件名中使用一致的大小写，默认为 true
    "moduleResolution": "node", // 指定使用哪种模块解析策略，默认为 Classic
    "baseUrl": ".", // 模块解析根路径，默认为 tsconfig.json 位于的目录
    "lib": ["esnext", "dom"], // 编译需要包含的 API，默认为 target 的默认值
    "types": ["node", "vite-plugin-vue-layouts/client"],
    "paths": {
      "@/*": ["src/*"],
      "@api/*": ["src/api/*"]
    }
  },
  // 指定需要编译文件，默认当前目录下除了 exclude 之外的所有.ts, .d.ts,.tsx 文件
  "include": [
    ".d.ts",
    "src/**/*.ts",
    "src/**/*.d.ts",
    "src/**/*.tsx",
    "src/**/*.vue",
    "**/*.ts",
    "**/*.md",
    "plop-tpls/component/prompt.js",
    "plopfile.js",
    "postcss.config.js",
    "src/i18n/lang/en-US.json5"
  ],
  "exclude": ["node_modules", "dist"]
}
```
