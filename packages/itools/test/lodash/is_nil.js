import assert from 'assert';
import { args, slice, symbol, realm } from '../const';
import itools from '../itools';

describe('isNil', function () {
  it('should return `true` for nullish values', function () {
    assert.strictEqual(itools.isNil(null), true);
    assert.strictEqual(itools.isNil(), true);
    assert.strictEqual(itools.isNil(undefined), true);
  });

  it('should return `false` for non-nullish values', function () {
    assert.strictEqual(itools.isNil(args), false);
    assert.strictEqual(itools.isNil([1, 2, 3]), false);
    assert.strictEqual(itools.isNil(true), false);
    assert.strictEqual(itools.isNil(new Date()), false);
    assert.strictEqual(itools.isNil(new Error()), false);
    assert.strictEqual(itools.isNil(slice), false);
    assert.strictEqual(itools.isNil({ a: 1 }), false);
    assert.strictEqual(itools.isNil(1), false);
    assert.strictEqual(itools.isNil(/x/), false);
    assert.strictEqual(itools.isNil('a'), false);

    if (Symbol) {
      assert.strictEqual(itools.isNil(symbol), false);
    }
  });

  it('should work with nils from another realm', function () {
    if (realm.object) {
      assert.strictEqual(itools.isNil(realm.null), true);
      assert.strictEqual(itools.isNil(realm.undefined), true);
    }
  });
});
