import itools from '../itools';

describe('chunk', () => {
  it('base case', () => {
    expect(itools.chunk([1, 2, 3, 4, 5], 2)).toEqual([[1, 2], [3, 4], [5]]);
    expect(itools.chunk([1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15], 4)).toEqual([
      [1, 2, 3, 4],
      [5, 6, 7, 8],
      [9, 10, 11, 12],
      [13, 14, 15],
    ]);
    expect(itools.chunk([], 3)).toEqual([]);
    expect(itools.chunk([1, 2, 3], 4)).toEqual([[1, 2, 3]]);
  });
});
