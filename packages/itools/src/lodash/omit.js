import isString from './is_string';
export default function omit(obj, remove) {
  const result = {};
  if (isString(remove)) {
    remove = [].slice.call(arguments, 1);
  }
  for (const prop in obj) {
    if (!obj.hasOwnProperty || obj.hasOwnProperty(prop)) {
      if (remove.indexOf(prop) === -1) {
        result[prop] = obj[prop];
      }
    }
  }
  return result;
}
