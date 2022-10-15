import itools from '../itools';

describe('split', () => {
  const array = [1, 2, 3, 4, 5];

  it('base case 1', () => {
    expect(itools.split(array, 2)).toEqual([[1, 2], [3, 4], [5]]);
    expect(itools.split([], 3)).toEqual([]);

    expect(itools.split([], null)).toEqual([]);
  });

  test('itools.split !isArray throws an error', () => {
    expect(() => {
      itools.split('', 1);
    }).toThrow();

    expect(() => {
      itools.split([], 'a');
    }).toThrow();
  });
});
