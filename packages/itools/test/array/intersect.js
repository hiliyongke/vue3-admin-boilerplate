import itools from '../itools';

describe('intersect', () => {
  it('base case', () => {
    expect(itools.intersect([1, 2, 3], [4, 3, 2])).toEqual([2, 3]);
    expect(itools.intersect([1, 2, 3], [])).toEqual([]);
    expect(itools.intersect([], [4, 3, 2])).toEqual([]);
    expect(itools.intersect([], [])).toEqual([]);
  });
});
