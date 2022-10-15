import itools from '../itools';

describe('drop', () => {
  it('base case', () => {
    expect(itools.drop([1, 2, 3])).toEqual([2, 3]);
    expect(itools.drop([1, 2, 3], 2)).toEqual([3]);
    expect(itools.drop([1, 2, 3], 42)).toEqual([]);
  });
});
