/*
  returns a new object with the predicate applied to each value
  like map-object, but (value, key, object) are passed to the predicate
*/

export default function mapValues(obj, predicate) {
  const result = {};
  const keys = Object.keys(obj);
  const len = keys.length;
  for (let i = 0; i < len; i++) {
    const key = keys[i];
    result[key] = predicate(obj[key], key, obj);
  }
  return result;
}
