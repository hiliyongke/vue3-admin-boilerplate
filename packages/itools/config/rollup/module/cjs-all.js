import babel from 'rollup-plugin-babel';
import glob from 'glob';

import { DIST_MODULE_CJS, SRC } from '../../const';

function modulesPaths() {
  const paths = glob.sync(`${SRC}/*/*.js`, {
    ignore: [`${SRC}/chain/*.js`, `${SRC}/util/**/*.js`, `${SRC}/functions.js`, `${SRC}/index.js`],
  });
  return paths;
}

export default {
  input: modulesPaths(),
  plugins: [babel()],
  output: {
    dir: DIST_MODULE_CJS,
    format: 'cjs',
    chunkFileNames: 'internal/[name].js',
  },
};
