import assert from 'assert';
import lodashStable from 'lodash';
import { args, slice, document, body, symbol, falsey, stubFalse, realm } from '../const';
import itools from '../itools';

describe('isObject', function () {
  it('should return `true` for objects', function () {
    assert.strictEqual(itools.isObject(args), true);
    assert.strictEqual(itools.isObject([1, 2, 3]), true);
    assert.strictEqual(itools.isObject(Object(false)), true);
    assert.strictEqual(itools.isObject(new Date()), true);
    assert.strictEqual(itools.isObject(new Error()), true);
    assert.strictEqual(itools.isObject(slice), true);
    assert.strictEqual(itools.isObject({ a: 1 }), true);
    assert.strictEqual(itools.isObject(Object(0)), true);
    assert.strictEqual(itools.isObject(/x/), true);
    assert.strictEqual(itools.isObject(Object('a')), true);

    if (document) {
      assert.strictEqual(itools.isObject(body), true);
    }
    if (Symbol) {
      assert.strictEqual(itools.isObject(Object(symbol)), true);
    }
  });

  it('should return `false` for non-objects', function () {
    const values = falsey.concat(true, 1, 'a', symbol);
    const expected = lodashStable.map(values, stubFalse);

    const actual = lodashStable.map(values, function (value, index) {
      return index ? itools.isObject(value) : itools.isObject();
    });

    assert.deepStrictEqual(actual, expected);
  });

  it('should work with objects from another realm', function () {
    if (realm.element) {
      assert.strictEqual(itools.isObject(realm.element), true);
    }
    if (realm.object) {
      assert.strictEqual(itools.isObject(realm.boolean), true);
      assert.strictEqual(itools.isObject(realm.date), true);
      assert.strictEqual(itools.isObject(realm.function), true);
      assert.strictEqual(itools.isObject(realm.number), true);
      assert.strictEqual(itools.isObject(realm.object), true);
      assert.strictEqual(itools.isObject(realm.regexp), true);
      assert.strictEqual(itools.isObject(realm.string), true);
    }
  });
});
