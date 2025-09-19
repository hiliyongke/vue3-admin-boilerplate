import isTypeof from './is_typeof';
/**
 * map condition judge
 *  itools.judge = itools.judgment
 */
export default function judge(v, vals, strict) {
  if (!isTypeof(vals, 'array')) return false;

  for (const key in vals) {
    if (strict) {
      if (v === vals[key]) return true;
    } else {
      // eslint-disable-next-line eqeqeq
      if (v == vals[key]) return true;
    }
  }

  return false;
}
