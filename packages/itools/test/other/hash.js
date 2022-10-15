import itools from '../itools';

describe('hash', () => {
  test('itools.hash() is a Function', () => {
    expect(itools.hash).toBeInstanceOf(Function);
  });

  test('itools.hash()', () => {
    expect(itools.hash('')).toBe(0);
    expect(itools.hash(1)).toBe(49);
    expect(itools.hash(1000)).toBe(1507423);
    expect(itools.hash('sdf%$sdfMnjjskds23')).toBe(-844608950);
  });
});
