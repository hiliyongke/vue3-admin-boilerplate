import assert from 'assert';
import itools from '../itools';

import {
  slice,
  asyncFunc,
  genFunc,
  args,
  symbol,
  document,
  realm
} from '../const';

describe('isFunction', function () {
  it('should return `true` for functions', function () {
    assert.strictEqual(itools.isFunction(_), true);
    assert.strictEqual(itools.isFunction(slice), true);
  });

  it('should return `true` for async functions', function () {
    assert.strictEqual(
      itools.isFunction(asyncFunc),
      typeof asyncFunc === 'function'
    );
  });

  it('should return `true` for generator functions', function () {
    assert.strictEqual(
      itools.isFunction(genFunc),
      typeof genFunc === 'function'
    );
  });

  it('should return `true` for the `Proxy` constructor', function () {
    if (Proxy) {
      assert.strictEqual(itools.isFunction(Proxy), true);
    }
  });

  it('should return `false` for non-functions', function () {
    assert.strictEqual(itools.isFunction(args), false);
    assert.strictEqual(itools.isFunction([1, 2, 3]), false);
    assert.strictEqual(itools.isFunction(true), false);
    assert.strictEqual(itools.isFunction(new Date()), false);
    assert.strictEqual(itools.isFunction(new Error()), false);
    assert.strictEqual(itools.isFunction({ a: 1 }), false);
    assert.strictEqual(itools.isFunction(1), false);
    assert.strictEqual(itools.isFunction(/x/), false);
    assert.strictEqual(itools.isFunction('a'), false);
    assert.strictEqual(itools.isFunction(symbol), false);

    if (document) {
      assert.strictEqual(
        itools.isFunction(document.getElementsByTagName('body')),
        false
      );
    }
  });

  it('should work with a function from another realm', function () {
    if (realm.function) {
      assert.strictEqual(itools.isFunction(realm.function), true);
    }
  });
});
