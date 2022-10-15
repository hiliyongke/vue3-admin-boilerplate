import itools from '../itools';

describe('randomKey', () => {
  test('itools.randomKey() is a Function', () => {
    expect(itools.randomKey).toBeInstanceOf(Function);
  });

  test('should pass example', () => {
    const size = itools.randomA2B(1, 32, true);
    expect(itools.randomKey(size).length).toBe(size);
    expect(itools.isString(itools.randomKey(size))).toBe(true);
  });
});
