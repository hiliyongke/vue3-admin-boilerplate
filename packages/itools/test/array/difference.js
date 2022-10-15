import itools from '../itools';

describe('difference', () => {
  it('base case', () => {
    expect(itools.difference([], [])).toEqual([]);
    expect(itools.difference([1, 2, 3], [4, 2, 6])).toEqual([1, 3]);
  });
});
