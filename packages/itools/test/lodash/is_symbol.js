import assert from 'assert';
import lodashStable from 'lodash';
import { symbol, falsey, stubFalse, args, slice, realm } from '../const';
import itools from '../itools';

describe('isSymbol', function () {
  it('should return `true` for symbols', function () {
    if (Symbol) {
      assert.strictEqual(itools.isSymbol(symbol), true);
      assert.strictEqual(itools.isSymbol(Object(symbol)), true);
    }
  });

  it('should return `false` for non-symbols', function () {
    const expected = lodashStable.map(falsey, stubFalse);

    const actual = lodashStable.map(falsey, function (value, index) {
      return index ? itools.isSymbol(value) : itools.isSymbol();
    });

    assert.deepStrictEqual(actual, expected);

    assert.strictEqual(itools.isSymbol(args), false);
    assert.strictEqual(itools.isSymbol([1, 2, 3]), false);
    assert.strictEqual(itools.isSymbol(true), false);
    assert.strictEqual(itools.isSymbol(new Date()), false);
    assert.strictEqual(itools.isSymbol(new Error()), false);
    assert.strictEqual(itools.isSymbol(slice), false);
    assert.strictEqual(itools.isSymbol({ 0: 1, length: 1 }), false);
    assert.strictEqual(itools.isSymbol(1), false);
    assert.strictEqual(itools.isSymbol(/x/), false);
    assert.strictEqual(itools.isSymbol('a'), false);
  });

  it('should work with symbols from another realm', function () {
    if (Symbol && realm.symbol) {
      assert.strictEqual(itools.isSymbol(realm.symbol), true);
    }
  });
});
