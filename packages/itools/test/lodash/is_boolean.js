import assert from 'assert';
import itools from '../itools';
import { args, slice, symbol, realm } from '../const';

describe('isBoolean', function () {
  it('should return `true` for booleans', function () {
    assert.strictEqual(itools.isBoolean(true), true);
    assert.strictEqual(itools.isBoolean(false), true);
    assert.strictEqual(itools.isBoolean(Object(true)), true);
    assert.strictEqual(itools.isBoolean(Object(false)), true);
  });

  it('should return `false` for non-booleans', function () {
    assert.strictEqual(itools.isBoolean(args), false);
    assert.strictEqual(itools.isBoolean([1, 2, 3]), false);
    assert.strictEqual(itools.isBoolean(new Date()), false);
    assert.strictEqual(itools.isBoolean(new Error()), false);
    assert.strictEqual(itools.isBoolean(slice), false);
    assert.strictEqual(itools.isBoolean({ a: 1 }), false);
    assert.strictEqual(itools.isBoolean(1), false);
    assert.strictEqual(itools.isBoolean(/x/), false);
    assert.strictEqual(itools.isBoolean('a'), false);
    assert.strictEqual(itools.isBoolean(symbol), false);
  });

  it('should work with a boolean from another realm', function () {
    if (realm.boolean) {
      assert.strictEqual(itools.isBoolean(realm.boolean), true);
    }
  });
});
