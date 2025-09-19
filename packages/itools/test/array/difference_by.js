import itools from '../itools';

describe('differenceBy', () => {
  it('base case', () => {
    expect(itools.differenceBy([2.1, 1.2], [2.3, 3.4], Math.floor)).toEqual([1]);
    expect(itools.differenceBy([{ x: 2 }, { x: 1 }], [{ x: 1 }], (v) => v.x)).toEqual([2]);
  });
});
