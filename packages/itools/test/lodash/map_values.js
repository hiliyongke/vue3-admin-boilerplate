import itools from '../itools';

describe('mapValues', function () {
  test('applies predicate using value argument', () => {
    const obj1 = { a: 3, b: 5, c: 9 };
    const result1 = itools.mapValues(obj1, function (value) {
      return value + 1;
    });
    expect(result1).toStrictEqual({ a: 4, b: 6, c: 10 });

    const obj2 = { a: 3, b: 0, c: null };
    const result2 = itools.mapValues(obj2, function (value) {
      return Boolean(value);
    });
    expect(result2).toStrictEqual({ a: true, b: false, c: false });
  });

  test('applies predicate using key argument', function () {
    const obj1 = { a: 3, b: 5, c: 9 };
    const result1 = itools.mapValues(obj1, function (value, key) {
      return key;
    });
    expect(result1).toStrictEqual({ a: 'a', b: 'b', c: 'c' });

    const obj2 = [1, 2, 3];
    const result2 = itools.mapValues(obj2, function (value, key) {
      return Boolean(Number(key)) || key;
    });
    expect(result2).toStrictEqual({ 0: '0', 1: true, 2: true });
  });

  test('applies predicate using value and key arguments', function () {
    const obj1 = { a: 3, b: 5, c: 9 };
    const result1 = itools.mapValues(obj1, function (value, key) {
      return key + value;
    });

    expect(result1).toStrictEqual({ a: 'a3', b: 'b5', c: 'c9' });
  });

  test('applies predicate using all arguments', function () {
    const obj1 = { a: 3, b: 5, c: 9 };
    const result1 = itools.mapValues(obj1, function (value, key, obj) {
      return obj['b'] + value + key;
    });
    expect(result1).toStrictEqual({ a: '8a', b: '10b', c: '14c' });
  });
});
