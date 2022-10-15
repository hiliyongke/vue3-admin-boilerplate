/* eslint-disable */
import assert from 'assert';
import lodashStable from 'lodash';
import itools from '../itools';

import { LARGE_ARRAY_SIZE, isEven, square, _ } from '../const';

describe('findIndex', function () {
  lodashStable.each(['findIndex'], function (methodName) {
    let isFind = itools[methodName] === 'find';

    it(
      'itools.' + methodName + '` should support shortcut fusion',
      function () {
        let findCount = 0;
        let mapCount = 0;
        let array = lodashStable.range(1, LARGE_ARRAY_SIZE + 1);
        let iteratee = function (value) {
          mapCount++;
          return square(value);
        };
        let predicate = function (value) {
          findCount++;
          return isEven(value);
        };
        let actual = _(array).map(iteratee)[methodName](predicate);

        assert.strictEqual(findCount, isFind ? 1 : 2);
        assert.strictEqual(mapCount, isFind ? 1 : mapCount);
        assert.strictEqual(actual, isFind ? square(LARGE_ARRAY_SIZE) : actual);
      }
    );
  });

  test('returns base case', () => {
    const users = [
      { user: 'barney', age: 36, active: true },
      { user: 'fred', age: 40, active: false },
      { user: 'pebbles', age: 1, active: true }
    ];

    expect(itools.findIndex(users, { active: false })).toBe(1);
    expect(itools.findIndex(users, { user: 'fred', active: false })).toBe(1);
  });

  test('returns function case', () => {
    const array = [
      { user: 'barney', age: 36, active: true },
      { user: 'fred', age: 40, active: false },
      { user: 'pebbles', age: 1, active: true }
    ];
    const findIndexObj = itools.findIndex(array, function (o, i, j) {
      return o.user === 'barney';
    });
    expect(findIndexObj).toBe(0);
  });
});
