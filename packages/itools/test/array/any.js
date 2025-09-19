import itools from '../itools';

describe('any', () => {
  it('base case', () => {
    expect(itools.any([4, 2, 3], (x) => x > 1)).toBe(true);
    expect(itools.any([4, 2, 3], (x) => x < 1)).toBe(false);
    expect(itools.any([1, 2, 3])).toBe(true);
  });
});
