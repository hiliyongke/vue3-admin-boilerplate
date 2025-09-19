/* eslint-disable eqeqeq */

import isObject from '../lodash/is_object';
import isArray from '../lodash/is_array';

export default function flush(collection) {
  let result;
  let len;
  let i;
  if (!collection) {
    return undefined;
  }
  if (isArray(collection)) {
    result = [];
    len = collection.length;
    for (i = 0; i < len; i++) {
      const elem = collection[i];
      if (elem != null) {
        result.push(elem);
      }
    }
    return result;
  }
  if (isObject(collection)) {
    result = {};
    const keys = Object.keys(collection);
    len = keys.length;
    for (i = 0; i < len; i++) {
      const key = keys[i];
      const value = collection[key];
      if (value != null) {
        result[key] = value;
      }
    }
    return result;
  }
  return undefined;
}
