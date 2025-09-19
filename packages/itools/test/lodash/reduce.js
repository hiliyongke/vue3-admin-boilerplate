/**
 * https://stackoverflow.com/questions/46042613/how-to-test-type-of-thrown-exception-in-jest
 */

const noop = function () {};
noop.toString = function () {
  return 'noop function';
};
const obj = { a: 3, b: 5, c: 9, d: null, e: noop };

import itools from '../itools';

describe('reduce', function () {
  test('initialValue', function () {
    const expectedKeys = Object.keys(obj);
    function getArgsInitialIndex(idx) {
      return function () {
        if (arguments[3] === idx) {
          return [].slice.call(arguments);
        }
        return arguments[0];
      };
    }

    // Without initialValue
    const result1 = itools.reduce(obj, getArgsInitialIndex(1));
    expect(result1).toStrictEqual([3, 'b', 5, 1, expectedKeys]);

    // With initialValue
    const result2 = itools.reduce(obj, getArgsInitialIndex(0), []);
    expect(result2).toStrictEqual([[], 'a', 3, 0, expectedKeys]);
  });

  test('pick returns new object', function () {
    const expectedKeys = Object.keys(obj);
    function getArgsInitialIndex(idx) {
      return function () {
        if (arguments[3] === idx) {
          return [].slice.call(arguments);
        }
        return arguments[0];
      };
    }
    const result1 = itools.reduce(obj, getArgsInitialIndex(1));
    expect(result1).toStrictEqual([3, 'b', 5, 1, expectedKeys]);
  });

  test('use value', function () {
    const result1 = itools.reduce(
      obj,
      function (target, key, value) {
        target.push(value);
        return target;
      },
      []
    );
    expect(result1).toStrictEqual([3, 5, 9, null, noop]);

    const result2 = itools.reduce(
      obj,
      function (target, key, value) {
        target += Number(value) || 0;
        return target;
      },
      0
    );
    expect(result2).toStrictEqual(17);

    const result3 = itools.reduce(obj, function (target, key, value) {
      target += Number(value) || 0;
      return target;
    });
    expect(result3).toStrictEqual(17);
  });

  test('use key', function () {
    const result1 = itools.reduce(
      obj,
      function (target, key, value) {
        target.push(key);
        return target;
      },
      []
    );
    expect(result1).toStrictEqual(['a', 'b', 'c', 'd', 'e']);

    const result2 = itools.reduce(
      obj,
      function (target, key, value, index) {
        target[index] = key;
        return target;
      },
      {}
    );
    expect(result2).toStrictEqual({ 0: 'a', 1: 'b', 2: 'c', 3: 'd', 4: 'e' });

    const result3 = itools.reduce(obj, function (target, key, value) {
      target += key;
      return target;
    });
    expect(result3).toStrictEqual('3bcde');
  });

  test('use key and value', function () {
    const expectedResult1 = ['a is 3', 'b is 5', 'c is 9', 'd is null', 'e is noop function'];
    const result1 = itools.reduce(
      obj,
      function (target, key, value) {
        target.push(`${key} is ${value}`);
        return target;
      },
      []
    );
    expect(result1).toStrictEqual(expectedResult1);

    const result2 = itools.reduce(
      obj,
      function (target, key, value) {
        target[value] = key;
        return target;
      },
      {}
    );

    expect(result2).toStrictEqual({
      3: 'a',
      5: 'b',
      9: 'c',
      null: 'd',
      'noop function': 'e',
    });
  });

  test('invalid usage', function () {
    expect(() => {
      itools.reduce(obj);
    }).toThrow();

    expect(() => {
      itools.reduce({}, noop);
    }).toThrow();
  });
});
