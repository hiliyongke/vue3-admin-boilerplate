/**
 * returns a copy of an array with falsey values removed
 */

import isArray from '../lodash/is_array';

export default function compact(arr) {
  if (!isArray(arr)) {
    throw new Error('expected an array');
  }
  const result = [];
  const len = arr.length;
  for (let i = 0; i < len; i++) {
    const elem = arr[i];
    if (elem) {
      result.push(elem);
    }
  }
  return result;
}
