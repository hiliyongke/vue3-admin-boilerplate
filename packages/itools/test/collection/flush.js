import itools from '../itools';

describe('flush', () => {
  test('removes null/undefined from array', function () {
    expect(itools.flush([1, undefined, 2, null, 3, 0])).toEqual([1, 2, 3, 0]);
    expect(itools.flush([true, null, false, true, [null], undefined])).toEqual([true, false, true, [null]]);
  });

  test('removes null/undefined from object', function () {
    expect(itools.flush({ a: 2, b: null, c: 4, d: undefined })).toEqual({
      a: 2,
      c: 4,
    });
  });

  test('returns empty array as-is', function () {
    expect(itools.flush([])).toEqual([]);
  });

  test('returns empty object array as-is', function () {
    expect(itools.flush({})).toEqual({});
  });

  test('returns undefined if argument is not an array or object', function () {
    expect(itools.flush('hello')).toEqual(undefined);
    expect(itools.flush(null)).toEqual(undefined);
    expect(itools.flush(undefined)).toEqual(undefined);
    expect(itools.flush()).toEqual(undefined);
  });
});
