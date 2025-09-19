import isString from './is_string';
export default function pick(obj, select) {
  const result = {};
  if (isString(select)) {
    select = [].slice.call(arguments, 1);
  }
  const len = select.length;
  for (let i = 0; i < len; i++) {
    const key = select[i];
    if (key in obj) {
      result[key] = obj[key];
    }
  }
  return result;
}
