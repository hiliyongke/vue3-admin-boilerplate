import itools from '../itools';

describe('removeAt', () => {
  it('base case', () => {
    const array = [1, 2, 3, 4, 5, 6];
    const removeType1 = itools.removeAt(array, 7);
    const removeType2 = itools.removeAt(array, 0);

    expect(removeType1).toBe(false);
    expect(removeType2).toBe(true);
  });

  it('base to equal', () => {
    const array1 = [1, 2, 3, 4, 5, 6];
    itools.removeAt(array1, 0);
    expect(array1).toEqual([2, 3, 4, 5, 6]);

    const array2 = [1, 2, 3, 4, 5, 6];
    itools.removeAt(array2, 7);
    expect(array2).toBe(array2);
  });
});
