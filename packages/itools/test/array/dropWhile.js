import itools from '../itools';

describe('dropWhile', () => {
  it('base case', () => {
    expect(itools.dropWhile([1, 2, 3, 4], n => n >= 3)).toEqual([3, 4]);
  });
});
