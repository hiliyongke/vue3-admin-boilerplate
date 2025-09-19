/**
 *  Item is the beginning of the target
 */
export default function startsWith(target, item, ignore) {
  const str = String(target).slice(0, item.length);
  return ignore ? str.toLowerCase() === item.toLowerCase() : str === item;
}
