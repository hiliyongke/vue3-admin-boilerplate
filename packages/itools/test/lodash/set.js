/* eslint-disable no-undef */
import itools from '../itools';

describe('set', function () {
  test('sets existing property using dot-notation arg', function () {
    const obj1 = { a: { aa: { aaa: 2 } } };
    expect(itools.set(obj1, 'a.aa.aaa', 3)).toEqual(true);
    expect(obj1).toStrictEqual({ a: { aa: { aaa: 3 } } });

    const obj2 = { a: { aa: { aaa: 2 } } };

    expect(itools.set(obj2, 'a.aa', { bbb: 7 })).toEqual(true);
    expect(obj2).toStrictEqual({ a: { aa: { bbb: 7 } } });
  });

  test('sets existing property using array arg', function () {
    const obj1 = { a: { aa: { aaa: 2 } } };
    expect(itools.set(obj1, ['a', 'aa', 'aaa'], 3)).toEqual(true);
    expect(obj1).toStrictEqual({ a: { aa: { aaa: 3 } } });

    const obj2 = { a: { aa: { aaa: 2 } } };
    expect(itools.set(obj2, ['a', 'aa'], { bbb: 7 })).toEqual(true);
    expect(obj2).toStrictEqual({ a: { aa: { bbb: 7 } } });
  });

  test('sets non-existent property using dot-notation arg', function () {
    const obj1 = {};
    expect(itools.set(obj1, 'a.aa.aaa', 4)).toEqual(true);
    expect(obj1).toStrictEqual({ a: { aa: { aaa: 4 } } });

    const obj2 = {};
    expect(itools.set(obj2, 'a.aa', { bbb: 7 })).toEqual(true);
    expect(obj2).toStrictEqual({ a: { aa: { bbb: 7 } } });
  });

  test('sets non-existent property using array arg', function () {
    const obj1 = {};
    expect(itools.set(obj1, ['a', 'aa', 'aaa'], 4)).toEqual(true);
    expect(obj1).toStrictEqual({ a: { aa: { aaa: 4 } } });

    const obj2 = {};
    expect(itools.set(obj2, ['a', 'aa'], { bbb: 7 })).toEqual(true);
    expect(obj2).toStrictEqual({ a: { aa: { bbb: 7 } } });
  });

  test("doesn't interrupt property chain, using dot-notation arg", function () {
    const obj1 = { a: 5 };
    expect(itools.set(obj1, 'a.aa.aaa', 4)).toEqual(false);
    // ok to clobber last property
    const obj2 = { a: { aa: 9 } };
    expect(itools.set(obj2, 'a.aa', { bbb: 7 })).toEqual(true);
  });

  test("doesn't interrupt property chain, using array arg", function () {
    const obj1 = { a: 5 };
    expect(itools.set(obj1, ['a', 'aa', 'aaa'], 4)).toEqual(false);
    // ok to clobber last property
    const obj2 = { a: { aa: 9 } };
    expect(itools.set(obj2, ['a', 'aa'], { bbb: 7 })).toEqual(true);
  });

  if (typeof Symbol === 'function') {
    test('supports symbol prop', function () {
      const obj1 = { a: {} };

      const sym = Symbol();
      expect(itools.set(obj1.a, sym, 7)).toEqual(true);
      expect(obj1.a[sym] === 7);
    });
  }
});
