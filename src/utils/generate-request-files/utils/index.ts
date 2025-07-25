import * as checkFns from './check-fns';
import * as constant from './constant';
import calculateObj from './calculate-obj';
import folderObj from './folder-obj';

const utils = {
  ...checkFns,
  ...constant,
  calculateObj,
  folderObj
};

export default utils;
