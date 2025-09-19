export function clearAttr(obj: Record<string, any>): void {
  for (const key in obj) {
    if (Object.prototype.hasOwnProperty.call(obj, key)) {
      delete obj[key];
    }
  }
}
/**
 * 快速拷贝两个对象的属性值
 * @param source
 * @param target
 */
export function copyAttr(source: Record<string, any>, target: Record<string, any>): void {
  if (!source || typeof source !== 'object') {
    return;
  }
  Object.keys(target).forEach((key) => {
    target[key] = source[key];
  });
}

export function isNull(ele: any): boolean {
  return ele === undefined || ele === null || ele === '';
}
