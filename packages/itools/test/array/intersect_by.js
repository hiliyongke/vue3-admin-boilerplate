import itools from '../itools';

describe('intersectBy', () => {
  it('base case', () => {
    expect(itools.intersectBy([2.1, 1.2], [2.3, 3.4], Math.floor)).toEqual([
      2.1
    ]);
  });
});
