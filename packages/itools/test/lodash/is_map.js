import assert from 'assert';
import lodashStable from 'lodash';
import { map, falsey, stubFalse, args, slice, symbol, weakMap, realm } from '../const';
import itools from '../itools';

describe('isMap', function () {
  it('should return `true` for maps', function () {
    if (Map) {
      assert.strictEqual(itools.isMap(map), true);
    }
  });

  it('should return `false` for non-maps', function () {
    const expected = lodashStable.map(falsey, stubFalse);

    const actual = lodashStable.map(falsey, function (value, index) {
      return index ? itools.isMap(value) : itools.isMap();
    });

    assert.deepStrictEqual(actual, expected);

    assert.strictEqual(itools.isMap(args), false);
    assert.strictEqual(itools.isMap([1, 2, 3]), false);
    assert.strictEqual(itools.isMap(true), false);
    assert.strictEqual(itools.isMap(new Date()), false);
    assert.strictEqual(itools.isMap(new Error()), false);
    assert.strictEqual(itools.isMap(slice), false);
    assert.strictEqual(itools.isMap({ a: 1 }), false);
    assert.strictEqual(itools.isMap(1), false);
    assert.strictEqual(itools.isMap(/x/), false);
    assert.strictEqual(itools.isMap('a'), false);
    assert.strictEqual(itools.isMap(symbol), false);
    assert.strictEqual(itools.isMap(weakMap), false);
  });

  it('should work for objects with a non-function `constructor` (test in IE 11)', function () {
    const values = [false, true];
    const expected = lodashStable.map(values, stubFalse);

    const actual = lodashStable.map(values, function (value) {
      return itools.isMap({ constructor: value });
    });

    assert.deepStrictEqual(actual, expected);
  });

  it('should work with maps from another realm', function () {
    if (realm.map) {
      assert.strictEqual(itools.isMap(realm.map), true);
    }
  });
});
