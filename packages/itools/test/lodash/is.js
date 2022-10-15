import assert from 'assert';
import itools from '../itools';

describe('is', function () {
  it('using is normal', function () {
    assert.strictEqual(itools.is('foo', 'foo'), true);
    assert.strictEqual(itools.is(window, window), true);

    assert.strictEqual(itools.is('foo', 'bar'), false);
    assert.strictEqual(itools.is([], []), false);
  });

  it('using is null', function () {
    assert.strictEqual(itools.is(null, null), true);
  });

  it('using is object', function () {
    let foo = { a: 1 };
    let bar = { a: 1 };
    assert.strictEqual(itools.is(foo, foo), true);
    assert.strictEqual(itools.is(foo, bar), false);
  });

  it('using special cases', function () {
    assert.strictEqual(itools.is(0, -0), false);
    assert.strictEqual(itools.is(-0, -0), true);
    assert.strictEqual(itools.is(NaN, 0 / 0), true);
  });
});
