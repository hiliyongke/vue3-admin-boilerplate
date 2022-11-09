import { ConfigEnv, UserConfigExport, loadEnv, defineConfig } from 'vite';
import path from 'path';
import { createVitePlugins } from './build/vite/plugins';
import proxy from './build/vite/proxy';
import {
  DROP_CONSOLE,
  DROP_DEBUGGER,
  OUTPUT_DIR,
  VITE_PORT,
  PUBLIC_PATH
} from './build/constant';

function resolvePath(paths: string) {
  // 如果 __dirname 找不到 需要 npn install @types/node --save-dev
  return path.resolve(__dirname, paths);
}

// 详细配置： https://vitejs.dev/config/
// mode : 'development' 用于开发，'production' 用于构建
export default ({ command, mode }: ConfigEnv): UserConfigExport => {
  const root = process.cwd();

  const isBuild = command === 'build';

  const alias = {
    '@': path.resolve(__dirname, './src'),
    '@api': resolvePath('./src/api')
  };

  const esbuild = {
    jsxFactory: 'h',
    jsxFragment: 'Fragment'
  };

  const rollupOptions = {
    // 确保外部化处理那些你不想打包进库的依赖
    external: [],
    // https://rollupjs.org/guide/en/#big-list-of-options
    // 打包以后的js,css和img资源分别分门别类在js/css/img文件夹中
    // 如果要进行多页面开发，配置多入口，进行多页面开发
    input: {
      index: path.resolve(__dirname, 'index.html')
      // project: path.resolve(__dirname, 'project.html')
    },
    output: {
      // 静态资源分类打包
      chunkFileNames: 'static/js/[name]-[hash].js',
      entryFileNames: 'static/js/[name]-[hash].js',
      assetFileNames: 'static/[ext]/name-[hash].[ext]',
      // 静态资源分拆打包
      manualChunks(id) {
        if (id.includes('node_modules')) {
          return id
            .toString()
            .split('node_modules/')[1]
            .split('/')[0]
            .toString();
        }
      }
    }
  };

  // 配置 Vite 依赖预编译，缩短项目冷启动时间
  const optimizeDeps = {
    include: [
      'axios',
      'lodash-es',
      'pinyin',
      'sortablejs',
      'dom-to-image',
      'wangeditor',
      '@toast-ui/editor',
      'vue-pdf-embed',
      'vue3-pdfjs/esm',
      '@codemirror/lang-javascript',
      '@codemirror/lang-html',
      '@codemirror/lang-json',
      '@codemirror/lang-markdown',
      '@codemirror/lang-cpp',
      '@codemirror/lang-java',
      '@codemirror/lang-php',
      '@codemirror/lang-python',
      '@codemirror/lang-rust',
      '@codemirror/lang-sql',
      '@codemirror/lang-rust',
      '@codemirror/theme-one-dark',
      'codemirror',
      '@codemirror/view',
      '@codemirror/state',
      '@codemirror/commands',
      '@codemirror/language',
      'generate-schema',
      'splitpanes'
    ]
  };

  // 具体的的配置选项：https://vitejs.dev/config/#config-file
  return defineConfig({
    envDir: './build/env', // 用于加载 .env 文件的目录
    envPrefix: 'VITE_',
    base: PUBLIC_PATH, // index.html文件所在位置
    root, // 项目根目录（index.html 文件所在的位置）。可以是一个绝对路径，或者一个相对于该配置文件本身的相对路径。
    // publicDir: 'src/assets/static', //要打包的静态资源，不配置的话，output打包出来的文件会没有
    resolve: {
      alias
      // TODO: 这里会导致 tdesign 的全局配置导入异常 故注释
      // extensions: ['.js', '.ts', '.jsx', '.tsx', '.json', '.vue'] // 使用路径别名时想要省略的后缀名，可以自己 增减
    },

    // vite 工程相关的插件. 数量多，抽离出去单独管理
    plugins: createVitePlugins(isBuild),

    optimizeDeps,

    // css
    css: {
      preprocessorOptions: {
        less: {
          // 这样就能全局使用 src/style/variables.less 定义的 变量
          additionalData: `@import "${resolvePath(
            'src/style/variables.less'
          )}";`,
          // 支持内联 JavaScript
          javascriptEnabled: true
        }
      }
    },

    define: {
      'process.env.APP_IS_LOCAL': '"true"'
    },

    // 开发服务器配置
    server: {
      hmr: { overlay: true }, // 禁用或配置 HMR 连接 设置 server.hmr.overlay 为 false 可以禁用服务器错误遮罩层
      port: VITE_PORT, // 类型： number 指定服务器端口;
      open: false, // 类型： boolean | string在服务器启动时自动在浏览器中打开应用程序；
      cors: false, // 类型： boolean | CorsOptions 为开发服务器配置 CORS。默认启用并允许任何源
      host: true, // 监听所有本地 IP
      proxy
    },

    // build
    build: {
      target: 'es2015',
      minify: 'terser', // 是否进行压缩,boolean | 'terser' | 'esbuild',默认使用terser
      terserOptions: {
        compress: {
          keep_infinity: true,
          // 清除console和debugger
          drop_console: DROP_CONSOLE,
          drop_debugger: DROP_DEBUGGER
        }
      },
      manifest: true, // 是否产出manifest.json
      outDir: OUTPUT_DIR || 'dist', // 产出目录
      assetsDir: 'static',
      chunkSizeWarningLimit: 2000, // 限制最大包的大小
      rollupOptions,
      sourcemap: mode === 'development' // 是否产出sourcemap.json
    },
    esbuild
  });
};
