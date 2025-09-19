/*
 * @Description: rollup 配置文件
 */
import * as path from 'path';
import nodeResolve from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import { babel } from '@rollup/plugin-babel';
import { terser } from 'rollup-plugin-terser';
import serve from 'rollup-plugin-serve';

const config = {
  input: {
    index: path.resolve(__dirname, 'src/index.js'),
  },
  output: {
    dir: path.resolve(__dirname, 'dist/'),
    format: 'es',
  },
  treeshake: {
    moduleSideEffects: 'no-external',
    propertyReadSideEffects: false,
    tryCatchDeoptimization: false,
  },
  plugins: [
    nodeResolve({
      preferBuiltins: true,
    }),
    babel({
      babelHelpers: 'bundled',
      exclude: 'node_modules/**',
    }),
    commonjs({
      extensions: ['.js'],
      ignoreDynamicRequires: true,
    }),
    terser(),
    process.argv.indexOf('-w') !== -1 &&
      serve({
        open: true,
        port: 8888,
        openPage: '/demo/demo.html',
      }),
  ],
};

export default config;
