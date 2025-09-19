import assert from 'assert';
import lodashStable from 'lodash';
import { identity, falsey, stubArray, document } from '../const';
import itools from '../itools';

describe('map', function () {
  const array = [1, 2];

  it('should map values in `collection` to a new array', function () {
    const object = { a: 1, b: 2 };
    const expected = ['1', '2'];

    assert.deepStrictEqual(itools.map(array, String), expected);
    assert.deepStrictEqual(itools.map(object, String), expected);
  });

  it('should iterate over own string keyed properties of objects', function () {
    function Foo() {
      this.a = 1;
    }
    Foo.prototype.b = 2;

    const actual = itools.map(new Foo(), identity);
    assert.deepStrictEqual(actual, [1]);
  });

  it('should accept a falsey `collection`', function () {
    const expected = lodashStable.map(falsey, stubArray);

    const actual = lodashStable.map(falsey, function (collection, index) {
      try {
        return index ? itools.map(collection) : itools.map();
      } catch (e) {}
    });

    assert.deepStrictEqual(actual, expected);
  });

  it('should treat number values for `collection` as empty', function () {
    assert.deepStrictEqual(itools.map(1), []);
  });

  it('should treat a nodelist as an array-like object', function () {
    if (document) {
      const actual = itools.map(document.getElementsByTagName('body'), function (element) {
        return element.nodeName.toLowerCase();
      });

      assert.deepStrictEqual(actual, ['body']);
    }
  });

  it('should work with objects with non-number length properties', function () {
    const value = { value: 'x' };
    const object = { length: { value: 'x' } };

    assert.deepStrictEqual(itools.map(object, identity), [value]);
  });
});
