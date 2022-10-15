import assert from 'assert';
import { args, slice, symbol, realm } from '../const';
import itools from '../itools';

describe('isString', function () {
  it('should return `true` for strings', function () {
    assert.strictEqual(itools.isString('a'), true);
    assert.strictEqual(itools.isString(Object('a')), true);
  });

  it('should return `false` for non-strings', function () {
    assert.strictEqual(itools.isString(args), false);
    assert.strictEqual(itools.isString([1, 2, 3]), false);
    assert.strictEqual(itools.isString(true), false);
    assert.strictEqual(itools.isString(new Date()), false);
    assert.strictEqual(itools.isString(new Error()), false);
    assert.strictEqual(itools.isString(slice), false);
    assert.strictEqual(itools.isString({ 0: 1, length: 1 }), false);
    assert.strictEqual(itools.isString(1), false);
    assert.strictEqual(itools.isString(/x/), false);
    assert.strictEqual(itools.isString(symbol), false);
  });

  it('should work with strings from another realm', function () {
    if (realm.string) {
      assert.strictEqual(itools.isString(realm.string), true);
    }
  });
});
