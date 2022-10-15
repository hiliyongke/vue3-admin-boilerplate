import itools from '../itools';

describe('copyArray', () => {
  it('base case', () => {
    expect(itools.copyArray([])).toEqual([]);
    expect(itools.copyArray([1, 2, 3])).toEqual([1, 2, 3]);

    // eslint-disable-next-line no-array-constructor
    const array = [];
    expect(itools.copyArray(array)).toEqual(array);
  });
});
