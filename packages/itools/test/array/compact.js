import itools from '../itools';

describe('compact', () => {
  it('base case', () => {
    expect(itools.compact([0, 1, false, 2, '', 3], 3)).toEqual([1, 2, 3]);

    const array = [1, 2, 3, 4, 5];
    expect(
      itools.compact([1, null, 2, undefined, null, NaN, 3, 4, false, 5], 3)
    ).toEqual(array);

    expect(itools.compact([1, 7, undefined, null, '', 0, false])).toEqual([
      1, 7
    ]);
    expect(itools.compact([1, 2, [], 4, {}])).toEqual([1, 2, [], 4, {}]);
    expect(itools.compact([])).toEqual([]);
  });

  test('itools.compact !isArray throws an error', () => {
    expect(() => {
      itools.compact(null);
    }).toThrow();
  });
});
