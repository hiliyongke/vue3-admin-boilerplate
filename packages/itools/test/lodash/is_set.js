import assert from 'assert';
import lodashStable from 'lodash';
import {
  set,
  falsey,
  stubFalse,
  args,
  slice,
  symbol,
  weakSet,
  realm
} from '../const';
import itools from '../itools';

describe('isSet', function () {
  it('should return `true` for sets', function () {
    if (Set) {
      assert.strictEqual(itools.isSet(set), true);
    }
  });

  it('should return `false` for non-sets', function () {
    let expected = lodashStable.map(falsey, stubFalse);

    let actual = lodashStable.map(falsey, function (value, index) {
      return index ? itools.isSet(value) : itools.isSet();
    });

    assert.deepStrictEqual(actual, expected);

    assert.strictEqual(itools.isSet(args), false);
    assert.strictEqual(itools.isSet([1, 2, 3]), false);
    assert.strictEqual(itools.isSet(true), false);
    assert.strictEqual(itools.isSet(new Date()), false);
    assert.strictEqual(itools.isSet(new Error()), false);
    assert.strictEqual(itools.isSet(slice), false);
    assert.strictEqual(itools.isSet({ a: 1 }), false);
    assert.strictEqual(itools.isSet(1), false);
    assert.strictEqual(itools.isSet(/x/), false);
    assert.strictEqual(itools.isSet('a'), false);
    assert.strictEqual(itools.isSet(symbol), false);
    assert.strictEqual(itools.isSet(weakSet), false);
  });

  it('should work for objects with a non-function `constructor` (test in IE 11)', function () {
    let values = [false, true];
    let expected = lodashStable.map(values, stubFalse);

    let actual = lodashStable.map(values, function (value) {
      return itools.isSet({ constructor: value });
    });

    assert.deepStrictEqual(actual, expected);
  });

  it('should work with weak sets from another realm', function () {
    if (realm.set) {
      assert.strictEqual(itools.isSet(realm.set), true);
    }
  });
});
