import itools from '../itools';

describe('remove', () => {
  it('base case', () => {
    const array = [1, 2, 3, 4, 5];
    expect(itools.remove(array, [2, 4])).toEqual([1, 3, 5]);
    expect(itools.remove(array, [])).toEqual(array);
  });

  test('itools.remove !isArray throws an error', () => {
    expect(() => {
      itools.remove(true, 'str');
    }).toThrow();
  });
});
