import itools from '../itools';

describe('pick', function () {
  test('pick returns new object', function () {
    const obj = { a: 3, b: 5, c: 9 };
    expect(itools.pick(obj, []) !== obj).toBe(true);
  });

  test('pick using array', function () {
    const obj = { a: 3, b: 5, c: 9 };
    expect(itools.pick(obj, ['a', 'c'])).toStrictEqual({ a: 3, c: 9 });
  });

  test('pick using arguments', function () {
    const obj = { a: 3, b: 5, c: 9 };
    expect(itools.pick(obj, 'a', 'c')).toStrictEqual({ a: 3, c: 9 });
  });

  test('pick using a non-existent key', function () {
    const obj = { a: 3, b: 5, c: 9 };
    expect(itools.pick(obj, ['a', 'b', 'd'])).toStrictEqual({ a: 3, b: 5 });
  });

  test('pick using a duplicate key', function () {
    const obj = { a: 3, b: 5, c: 9 };
    expect(itools.pick(obj, ['a', 'a'])).toStrictEqual({ a: 3 });
  });

  test('pick where obj has a function value', function () {
    const fn = function () {
      return true;
    };
    const obj = {
      a: 3,
      b: fn,
    };
    expect(itools.pick(obj, 'b', { b: fn }));
  });
});
