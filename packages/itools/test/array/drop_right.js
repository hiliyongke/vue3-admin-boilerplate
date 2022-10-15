import itools from '../itools';

describe('dropRight', () => {
  it('base case', () => {
    expect(itools.dropRight([1, 2, 3])).toEqual([1, 2]);
    expect(itools.dropRight([1, 2, 3], 2)).toEqual([1]);
    expect(itools.dropRight([1, 2, 3], 42)).toEqual([]);
  });
});
