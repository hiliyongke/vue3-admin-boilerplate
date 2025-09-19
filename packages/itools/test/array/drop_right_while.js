import itools from '../itools';

describe('dropRightWhile', () => {
  it('base case', () => {
    expect(itools.dropRightWhile([1, 2, 3, 4], (n) => n < 3)).toEqual([1, 2]);
  });
});
