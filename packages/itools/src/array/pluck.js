/**
 * Get the attribute values in an array object and combine them into a new array
 */
export default function pluck(target, name) {
  const result = [];
  let temp;
  target.forEach(function (item) {
    if (item[name]) {
      temp = item[name];
      result.push(temp);
    }
  });
  return result;
}
