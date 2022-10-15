import itools from '../itools';

describe('modulo', () => {
  test('itools.modulo() is a Function', () => {
    expect(itools.modulo).toBeInstanceOf(Function);
  });

  test('should pass example', () => {
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

    expect(itools.modulo(7, 5)).toBe(2);
    expect(itools.modulo(17, 23)).toBe(17);
    expect(itools.modulo(16.2, 3.8)).toBe(1);
    expect(itools.modulo(5.8, 3.4)).toBe(2.4);
    expect(itools.modulo(4, 0)).toBe(4);
    expect(itools.modulo(-7, 5)).toBe(3);
    expect(itools.modulo(-2, 15)).toBe(13);
    expect(itools.modulo(-5.8, 3.4)).toBe(1);
    expect(itools.modulo(12, -1)).toBe(NaN);
    expect(itools.modulo(-3, -8)).toBe(NaN);
    expect(itools.modulo(12, 'apple')).toBe(NaN);
    expect(itools.modulo('bee', 9)).toBe(NaN);
    expect(itools.modulo(null, undefined)).toBe(NaN);
  });
});
