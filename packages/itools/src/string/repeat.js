/**
 * Repeat item, times times
 */
export default function repeat(item, times) {
  let s = String(item);
  let target = '';
  while (times > 0) {
    if (times % 2 === 1) {
      target += s;
    }
    if (times === 1) {
      break;
    }
    s += s;

    times = times >> 1;
  }
  return target;
}
