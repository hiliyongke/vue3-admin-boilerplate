import itools from '../itools';

describe('countBy', () => {
  it('base case', () => {
    expect(itools.countBy([6, 10, 100, 10], Math.sqrt)).toEqual({
      10: 1,
      2.449489742783178: 1,
      3.1622776601683795: 2
    });
    expect(itools.countBy([6.1, 4.2, 6.3], Math.floor)).toEqual({ 4: 1, 6: 2 });
    expect(itools.countBy(['one', 'two', 'three'], 'length')).toEqual({
      3: 2,
      5: 1
    });
  });
});
