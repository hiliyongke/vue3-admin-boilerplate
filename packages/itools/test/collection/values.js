/* eslint-disable no-new-wrappers */
import itools from '../itools';

describe('values', () => {
  test('regular objects return array of property values', function () {
    expect(itools.values({ a: 4, c: 8 })).toEqual([4, 8]);
    expect(itools.values({ a: { aa: 2 }, b: { bb: 4 } })).toEqual([
      { aa: 2 },
      { bb: 4 }
    ]);
    expect(itools.values({})).toEqual([]);
  });

  test('array returns a copy of itself', function () {
    let arr1 = [1, 2, 3];
    let arr2 = [];

    expect(itools.values(arr1)).toEqual(arr1);
    expect(itools.values(arr2)).toEqual(arr2);
  });

  test('irregular objects return array of property values', function () {
    expect(
      itools.values(function (a, b) {
        return a + b;
      })
    ).toEqual([]);

    expect(itools.values(new String('hello'))).toEqual([
      'h',
      'e',
      'l',
      'l',
      'o'
    ]);

    let fn = function () {};
    fn.a = 4;
    expect(itools.values(fn)).toEqual([4]);
  });

  test('primitives throw exceptions', function () {
    expect(() => {
      itools.values(1);
    }).toThrow();

    expect(() => {
      itools.values(true);
    }).toThrow();

    expect(() => {
      itools.values(undefined);
    }).toThrow();

    expect(() => {
      itools.values(null);
    }).toThrow();
  });
});
