import assert from 'assert';
import lodashStable from 'lodash';
import itools from '../itools';
import { toArgs, stubTrue, args, symbol, defineProperty, stubFalse } from '../const';

describe('has', function () {
  lodashStable.each(['has'], function (methodName) {
    const func = itools[methodName];
    const isHas = methodName === 'has';
    const sparseArgs = toArgs([1]);
    const sparseArray = Array(1);
    const sparseString = Object('a');

    delete sparseArgs[0];

    it(`\`itools.${methodName}\` should check for own properties`, function () {
      const object = { a: 1 };

      lodashStable.each(['a', ['a']], function (path) {
        assert.strictEqual(func(object, path), true);
      });
    });

    it(`\`itools.${methodName}\` should not use the \`hasOwnProperty\` method of \`object\``, function () {
      const object = { hasOwnProperty: null, a: 1 };
      assert.strictEqual(func(object, 'a'), true);
    });

    it(`\`itools.${methodName}\` should support deep paths`, function () {
      const object = { a: { b: 2 } };

      lodashStable.each(['a.a', ['a', 'a']], function (path) {
        assert.strictEqual(func(object, path), false);
      });
    });

    it(`\`itools.${methodName}\` should work with \`arguments\` objects`, function () {
      assert.strictEqual(func(args, 1), true);
    });

    it(`\`itools.${methodName}\` should work with a non-string \`path\``, function () {
      const array = [1, 2, 3];

      lodashStable.each([1, [1]], function (path) {
        assert.strictEqual(func(array, path), true);
      });
    });

    it(`\`itools.${methodName}\` should preserve the sign of \`0\``, function () {
      const object = { '-0': 'a', 0: 'b' };
      const props = [-0, Object(-0), 0, Object(0)];
      const expected = lodashStable.map(props, stubTrue);

      const actual = lodashStable.map(props, function (key) {
        return func(object, key);
      });

      assert.deepStrictEqual(actual, expected);
    });

    it(`\`itools.${methodName}\` should work with a symbol \`path\``, function () {
      function Foo() {}

      if (Symbol) {
        Foo.prototype[symbol] = 1;

        const symbol2 = Symbol('b');
        defineProperty(Foo.prototype, symbol2, {
          configurable: true,
          enumerable: false,
          writable: true,
          value: 2,
        });

        const object = isHas ? Foo.prototype : new Foo();
        assert.strictEqual(func(object, symbol), true);
        assert.strictEqual(func(object, symbol2), true);
      }
    });

    it(`\`itools.${methodName}\` should check for a key over a path`, function () {
      const object = { 'a.b': 1 };

      lodashStable.each(['a.b', ['a.b']], function (path) {
        assert.strictEqual(func(object, path), true);
      });
    });

    it(`\`itools.${methodName}\` should return \`${isHas ? 'false' : 'true'}\` for inherited properties`, function () {
      function Foo() {}
      Foo.prototype.a = 1;

      lodashStable.each(['a', ['a']], function (path) {
        assert.strictEqual(func(new Foo(), path), !isHas);
      });
    });

    it(`\`itools.${methodName}\` should return \`${
      isHas ? 'false' : 'true'
    }\` for nested inherited properties`, function () {
      function Foo() {}
      Foo.prototype.a = { b: 1 };

      lodashStable.each(['a.b', ['a', 'b']], function (path) {
        assert.strictEqual(func(new Foo(), path), !isHas);
      });
    });

    it(`\`itools.${methodName}\` should return \`false\` when \`object\` is nullish`, function () {
      const values = [null, undefined];
      const expected = lodashStable.map(values, stubFalse);

      lodashStable.each(['constructor', ['constructor']], function (path) {
        const actual = lodashStable.map(values, function (value) {
          return func(value, path);
        });

        assert.deepStrictEqual(actual, expected);
      });
    });

    it(`\`itools.${methodName}\` should return \`false\` for deep paths when \`object\` is nullish`, function () {
      const values = [null, undefined];
      const expected = lodashStable.map(values, stubFalse);

      lodashStable.each(['constructor.prototype.valueOf', ['constructor', 'prototype', 'valueOf']], function (path) {
        const actual = lodashStable.map(values, function (value) {
          return func(value, path);
        });

        assert.deepStrictEqual(actual, expected);
      });
    });

    it(`\`itools.${methodName}\` should return \`false\` for nullish values of nested objects`, function () {
      // eslint-disable-next-line no-sparse-arrays
      const values = [, null, undefined];
      const expected = lodashStable.map(values, stubFalse);

      lodashStable.each(['a.b', ['a', 'b']], function (path) {
        const actual = lodashStable.map(values, function (value, index) {
          const object = index ? { a: value } : {};
          return func(object, path);
        });

        assert.deepStrictEqual(actual, expected);
      });
    });

    it(`\`itools.${methodName}\` should return \`false\` over sparse values of deep paths`, function () {
      const values = [sparseArgs, sparseArray, sparseString];
      const expected = lodashStable.map(values, lodashStable.constant([false, false]));

      const actual = lodashStable.map(values, function (value) {
        return lodashStable.map(['a[0].b', ['a', '0', 'b']], function (path) {
          return func({ a: value }, path);
        });
      });

      assert.deepStrictEqual(actual, expected);
    });
  });
});
