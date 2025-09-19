import lodashStable from 'lodash';
import assert from 'assert';
import { symbol } from '../const';
import itools from '../itools';

describe('toPath', function () {
  it('should convert a string to a path', function () {
    assert.deepStrictEqual(itools.toPath('a.b.c'), ['a', 'b', 'c']);
    assert.deepStrictEqual(itools.toPath('a[0].b.c'), ['a', '0', 'b', 'c']);
  });

  it('should coerce array elements to strings', function () {
    const array = ['a', 'b', 'c'];

    lodashStable.each([array, lodashStable.map(array, Object)], function (value) {
      const actual = itools.toPath(value);
      expect(actual).toStrictEqual(array);
      assert.notStrictEqual(actual, array);
    });
  });

  it('should return new path array', function () {
    assert.notStrictEqual(itools.toPath('a.b.c'), itools.toPath('a.b.c'));
  });

  it('should not coerce symbols to strings', function () {
    if (Symbol) {
      const object = Object(symbol);
      lodashStable.each([symbol, object, [symbol], [object]], function (value) {
        const actual = itools.toPath(value);
        assert.ok(lodashStable.isSymbol(actual[0]));
      });
    }
  });

  it('should handle complex paths', function () {
    const actual = itools.toPath('a[-1.23]["[\\"b\\"]"].c[\'[\\\'d\\\']\'][\ne\n][f].g');
    assert.deepStrictEqual(actual, ['a', '-1.23', '["b"]', 'c', "['d']", '\ne\n', 'f', 'g']);
  });

  it('should handle consecutive empty brackets and dots', function () {
    expect(itools.toPath('.a')).toEqual(['', 'a']);
    expect(itools.toPath('[].a')).toEqual(['a']);

    expect(itools.toPath('a')).toEqual(['a']);
    expect(itools.toPath(0)).toEqual(['0']);
    expect(itools.toPath(1)).toEqual(['1']);
  });
});
