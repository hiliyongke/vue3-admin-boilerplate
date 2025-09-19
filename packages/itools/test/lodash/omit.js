import itools from '../itools';

describe('omit', function () {
  it('omit returns new object', function () {
    const obj = { a: 3, b: 5, c: 9 };
    expect(itools.omit(obj, []) !== obj).toBe(true);
  });

  test('omit using array', function () {
    const obj = { a: 3, b: 5, c: 9 };
    expect(itools.omit(obj, ['a', 'c'])).toStrictEqual({ b: 5 });
  });

  test('omit using arguments', function () {
    const obj = { a: 3, b: 5, c: 9 };
    expect(itools.omit(obj, 'a', 'c')).toStrictEqual({ b: 5 });
  });

  test('omit using a non-existent key', function () {
    const obj = { a: 3, b: 5, c: 9 };
    expect(itools.omit(obj, ['a', 'b', 'd'])).toStrictEqual({ c: 9 });
  });

  test('omit using a duplicate key', function () {
    const obj = { a: 3, b: 5, c: 9 };
    expect(itools.omit(obj, ['a', 'a'])).toStrictEqual({ b: 5, c: 9 });
  });

  test('omit where obj has a function value', function () {
    const fn = function () {
      return true;
    };
    const obj = {
      a: 3,
      b: fn,
    };
    expect(itools.omit(obj, 'a', { b: fn }));
  });
});
