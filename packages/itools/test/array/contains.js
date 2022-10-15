import itools from '../itools';

describe('contains', () => {
  it('base case', () => {
    expect(itools.contains([1, 2, 3], 1)).toBe(true);
  });
});
