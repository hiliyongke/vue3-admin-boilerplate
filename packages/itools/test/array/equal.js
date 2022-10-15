import itools from '../itools';

describe('equal', () => {
  it('base case', () => {
    expect(itools.equal([1], [1, 2])).toBe(false);
    expect(itools.equal([1, 2, 3], [1, 2, 3])).toBe(true);
    expect(itools.equal([1, 2, 3], [1, 2, 4])).toBe(false);
    expect(itools.equal([], [])).toBe(true);
  });
});
