import itools from '../itools';

describe('all', () => {
  it('base case', () => {
    expect(itools.all([4, 2, 3], (x) => x > 1)).toBe(true);
    expect(itools.all([4, 2, 3], (x) => x < 1)).toBe(false);
    expect(itools.all([1, 2, 3])).toBe(true);
  });
});
