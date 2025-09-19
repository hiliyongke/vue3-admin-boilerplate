/**
 * discuss at: https://locutus.io/php/array_column/
 */
import isObject from '../lodash/is_object';
import isArray from '../lodash/is_array';

export default function column(input, ColumnKey, IndexKey = null) {
  if (input !== null && (isObject(input) || isArray(input))) {
    const newarray = [];
    if (isObject(input)) {
      const temparray = [];
      for (const key of Object.keys(input)) {
        temparray.push(input[key]);
      }

      input = temparray;
    }
    if (isArray(input)) {
      for (const key of input.keys()) {
        if (IndexKey && input[key][IndexKey]) {
          if (ColumnKey) {
            newarray[input[key][IndexKey]] = input[key][ColumnKey];
          } else {
            newarray[input[key][IndexKey]] = input[key];
          }
        } else {
          if (ColumnKey) {
            newarray.push(input[key][ColumnKey]);
          } else {
            newarray.push(input[key]);
          }
        }
      }
    }

    return Object.assign({}, newarray);
  } else {
    throw new Error('throw an error');
  }
}
