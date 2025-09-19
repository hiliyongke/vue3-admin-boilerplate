/**
 * Item is the end of the target
 */
export default function endsWith(target, item, ignore) {
  const str = target.slice(-item.length);
  return ignore ? str.toLowerCase() === item.toLowerCase() : str === item;
}
