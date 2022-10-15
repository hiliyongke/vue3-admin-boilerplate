import itools from '../itools';

describe('floor', () => {
  test('itools.floor() is a Function', () => {
    expect(itools.floor).toBeInstanceOf(Function);
  });

  test('should pass example', () => {
    const n = 3.1415926535897;

    expect(itools.floor(n)).toBe(3);
    expect(itools.floor(n, 0)).toBe(3);
    expect(itools.floor(n, 2)).toBe(3.14);
    expect(itools.floor(n, 4)).toBe(3.1415);
    expect(itools.floor(n, 5)).toBe(3.14159);
  });
});
