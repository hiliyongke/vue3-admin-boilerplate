import assert from 'assert';
import lodashStable from 'lodash';
import { falsey, args, slice, symbol, realm } from '../const';
import itools from '../itools';

describe('isNumber', function () {
  it('should return `true` for numbers', function () {
    assert.strictEqual(itools.isNumber(0), true);
    assert.strictEqual(itools.isNumber(Object(0)), true);
    assert.strictEqual(itools.isNumber(NaN), true);
  });

  it('should return `false` for non-numbers', function () {
    let expected = lodashStable.map(falsey, function (value) {
      return typeof value === 'number';
    });

    let actual = lodashStable.map(falsey, function (value, index) {
      return index ? itools.isNumber(value) : itools.isNumber();
    });

    assert.deepStrictEqual(actual, expected);

    assert.strictEqual(itools.isNumber(args), false);
    assert.strictEqual(itools.isNumber([1, 2, 3]), false);
    assert.strictEqual(itools.isNumber(true), false);
    assert.strictEqual(itools.isNumber(new Date()), false);
    assert.strictEqual(itools.isNumber(new Error()), false);
    assert.strictEqual(itools.isNumber(slice), false);
    assert.strictEqual(itools.isNumber({ a: 1 }), false);
    assert.strictEqual(itools.isNumber(/x/), false);
    assert.strictEqual(itools.isNumber('a'), false);
    assert.strictEqual(itools.isNumber(symbol), false);
  });

  it('should work with numbers from another realm', function () {
    if (realm.number) {
      assert.strictEqual(itools.isNumber(realm.number), true);
    }
  });
});
