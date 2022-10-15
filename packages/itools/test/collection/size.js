import assert from 'assert';
import lodashStable from 'lodash';
import { falsey, stubZero, args, realm, MAX_SAFE_INTEGER } from '../const';
import itools from '../itools';

describe('size', function () {
  let array = [1, 2, 3];

  it('should return the number of own enumerable string keyed properties of an object', function () {
    assert.strictEqual(itools.size({ one: 1, two: 2, three: 3 }), 3);
  });

  it('should return the length of an array', function () {
    assert.strictEqual(itools.size(array), 3);
  });

  it('should accept a falsey `object`', function () {
    let expected = lodashStable.map(falsey, stubZero);

    let actual = lodashStable.map(falsey, function (object, index) {
      try {
        return index ? itools.size(object) : itools.size();
      } catch (e) {}
    });

    assert.deepStrictEqual(actual, expected);
  });

  it('should work with `arguments` objects', function () {
    assert.strictEqual(itools.size(args), 3);
  });

  it('should work with maps', function () {
    if (Map) {
      lodashStable.each([new Map(), realm.map], function (map) {
        map.set('a', 1);
        map.set('b', 2);
        assert.strictEqual(itools.size(map), 2);
        map.clear();
      });
    }
  });

  it('should work with sets', function () {
    if (Set) {
      lodashStable.each([new Set(), realm.set], function (set) {
        set.add(1);
        set.add(2);
        assert.strictEqual(itools.size(set), 2);
        set.clear();
      });
    }
  });

  it('should not treat objects with negative lengths as array-like', function () {
    assert.strictEqual(itools.size({ length: -1 }), 1);
  });

  it('should not treat objects with lengths larger than `MAX_SAFE_INTEGER` as array-like', function () {
    assert.strictEqual(itools.size({ length: MAX_SAFE_INTEGER + 1 }), 1);
  });

  it('should not treat objects with non-number lengths as array-like', function () {
    assert.strictEqual(itools.size({ length: '0' }), 1);
  });
});
