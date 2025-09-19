/**
 * Increase by 0 based on string length before string
 */
export default function fillZero(target, n) {
  const z = new Array(n).join('0');
  const str = z + target;
  const result = str.slice(-n);
  return result;
}
