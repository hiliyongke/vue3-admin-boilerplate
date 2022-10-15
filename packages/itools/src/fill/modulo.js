/**
 * modulo of a number and a divisor
 */

export default function modulo(n, d) {
  // itools.modulo(7, 5); // 2
  // itools.modulo(17, 23); // 17
  // itools.modulo(16.2, 3.8); // 1
  // itools.modulo(5.8, 3.4); //2.4
  // itools.modulo(4, 0); // 4
  // itools.modulo(-7, 5); // 3
  // itools.modulo(-2, 15); // 13
  // itools.modulo(-5.8, 3.4); // 1
  // itools.modulo(12, -1); // NaN
  // itools.modulo(-3, -8); // NaN
  // itools.modulo(12, 'apple'); // NaN
  // itools.modulo('bee', 9); // NaN
  // itools.modulo(null, undefined); // NaN

  if (d === 0) {
    return n;
  }
  if (d < 0) {
    return NaN;
  }
  return ((n % d) + d) % d;
}
