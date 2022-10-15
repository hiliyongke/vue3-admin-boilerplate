import itools from '../itools';

describe('includesAny', () => {
  it('base case', () => {
    expect(itools.includesAny([1, 2, 3], [1, 2, 3])).toBe(true);
    expect(itools.includesAny([1, 7, 2, 5, 4], [5])).toBe(true);
    expect(itools.includesAny([1, 7, 2, 5, 4], [5, 4])).toBe(true);
    expect(itools.includesAny([], [])).toBe(false);
    expect(itools.includesAny([1, 7, 2, 5, 4], [5, 4, 3])).toBe(true);
  });
});
