import itools from '../itools';
import assert from 'assert';
import { args, slice, symbol, realm } from '../const';

describe('isArray', function () {
  it('should return `true` for arrays', function () {
    assert.strictEqual(itools.isArray([1, 2, 3]), true);
  });

  it('should return `false` for non-arrays', function () {
    assert.strictEqual(itools.isArray(args), false);
    assert.strictEqual(itools.isArray(true), false);
    assert.strictEqual(itools.isArray(new Date()), false);
    assert.strictEqual(itools.isArray(new Error()), false);
    assert.strictEqual(itools.isArray(slice), false);
    assert.strictEqual(itools.isArray({ 0: 1, length: 1 }), false);
    assert.strictEqual(itools.isArray(1), false);
    assert.strictEqual(itools.isArray(/x/), false);
    assert.strictEqual(itools.isArray('a'), false);
    assert.strictEqual(itools.isArray(symbol), false);
  });

  it('should work with an array from another realm', function () {
    if (realm.array) {
      assert.strictEqual(itools.isArray(realm.array), true);
    }
  });
});
