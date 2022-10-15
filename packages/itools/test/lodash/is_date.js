import assert from 'assert';
import lodashStable from 'lodash';
import { falsey, stubFalse, args, slice, symbol, realm } from '../const';
import itools from '../itools';

describe('isDate', function () {
  it('should return `true` for dates', function () {
    assert.strictEqual(itools.isDate(new Date()), true);
  });

  it('should return `false` for non-dates', function () {
    let expected = lodashStable.map(falsey, stubFalse);

    let actual = lodashStable.map(falsey, function (value, index) {
      return index ? itools.isDate(value) : itools.isDate();
    });

    assert.deepStrictEqual(actual, expected);

    assert.strictEqual(itools.isDate(args), false);
    assert.strictEqual(itools.isDate([1, 2, 3]), false);
    assert.strictEqual(itools.isDate(true), false);
    assert.strictEqual(itools.isDate(new Error()), false);
    assert.strictEqual(itools.isDate(slice), false);
    assert.strictEqual(itools.isDate({ a: 1 }), false);
    assert.strictEqual(itools.isDate(1), false);
    assert.strictEqual(itools.isDate(/x/), false);
    assert.strictEqual(itools.isDate('a'), false);
    assert.strictEqual(itools.isDate(symbol), false);
  });

  it('should work with a date object from another realm', function () {
    if (realm.date) {
      assert.strictEqual(itools.isDate(realm.date), false);
    }
  });
});
