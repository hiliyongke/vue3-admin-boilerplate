// import assert from 'assert';
import itools from '../itools';

describe('get', function () {
  test('returns existing properties using dot-notation arg', () => {
    const obj = { a: { aa: { aaa: 2 } }, b: 0 };
    expect(itools.get(obj, 'a')).toStrictEqual({ aa: { aaa: 2 } });
    expect(itools.get(obj, 'a.aa')).toStrictEqual({ aaa: 2 });
    expect(itools.get(obj, 'a.aa.aaa')).toStrictEqual(2);
    expect(itools.get(obj, 'b')).toStrictEqual(0);
    expect(itools.get(obj.a, 'aa')).toStrictEqual({ aaa: 2 });
    expect(itools.get(obj.a.aa, 'aaa')).toStrictEqual(2);
  });

  test('returns existing properties using array arg', () => {
    const obj = { a: { aa: { aaa: 2 } }, b: null };
    expect(itools.get(obj, ['a'])).toStrictEqual({ aa: { aaa: 2 } });
    expect(itools.get(obj, ['a', 'aa'])).toStrictEqual({ aaa: 2 });
    expect(itools.get(obj, ['a', 'aa', 'aaa'])).toStrictEqual(2);
    expect(itools.get(obj, ['b'])).toStrictEqual(null);
    expect(itools.get(obj.a, ['aa'])).toStrictEqual({ aaa: 2 });
    expect(itools.get(obj.a.aa, ['aaa'])).toStrictEqual(2);

    const arr = ['a', 'aa', 'aaa'];
    expect(itools.get(obj, arr)).toStrictEqual(2);
    expect(itools.get(arr, ['a', 'aa', 'aaa'])); // array arg preserved
  });

  test('returns undefined for non-existing properties, using dot-notation arg', () => {
    const obj = { a: { aa: { aaa: 2 } }, b: 4, c: null, d: 0 };
    expect(itools.get(obj, 'b.bb')).toStrictEqual(undefined);
    expect(itools.get(obj, 'a.bb')).toStrictEqual(undefined);
    expect(itools.get(obj, 'b.bb.bbb')).toStrictEqual(undefined);
    expect(itools.get(obj.b, 'bb.bbb')).toStrictEqual(undefined);
    expect(itools.get(obj, 'c.cc')).toStrictEqual(undefined);
    expect(itools.get(obj, 'd.dd.ddd')).toStrictEqual(undefined);
  });

  test('returns 3rd param for non-existing properties, using dot-notation arg', () => {
    const obj = { a: { aa: { aaa: 2 } }, b: 4, c: null, d: 0 };
    expect(itools.get(obj, 'b.bb', 888)).toStrictEqual(888);
    expect(itools.get(obj, 'a.bb', 888)).toStrictEqual(888);
    expect(itools.get(obj, 'b.bb.bbb', 888)).toStrictEqual(888);
    expect(itools.get(obj.b, 'bb.bbb', 888)).toStrictEqual(888);
    expect(itools.get(obj, 'c.cc', 888)).toStrictEqual(888);
    expect(itools.get(obj, 'd.dd.ddd', 888)).toStrictEqual(888);
  });

  test('returns undefined for non-existing properties, using array arg', () => {
    const obj = { a: { aa: { aaa: 2 } }, b: 4, c: null, d: 0 };
    expect(itools.get(obj, ['b', 'bb'])).toStrictEqual(undefined);
    expect(itools.get(obj, ['a', 'bb'])).toStrictEqual(undefined);
    expect(itools.get(obj, ['b', 'bb', 'bbb'])).toStrictEqual(undefined);
    expect(itools.get(obj.b, ['bb', 'bbb'])).toStrictEqual(undefined);
    expect(itools.get(obj, ['c', 'cc'])).toStrictEqual(undefined);
    expect(itools.get(obj, ['d', 'dd', 'ddd'])).toStrictEqual(undefined);

    const arr = ['b', 'bb', 'bbb'];
    expect(itools.get(obj, arr)).toStrictEqual(undefined);
    expect(itools.get(arr, ['b', 'bb', 'bbb'])); // array arg preserved
  });

  test('returns 3rd param for non-existing properties, using array arg', () => {
    const obj = { a: { aa: { aaa: 2 } }, b: 4, c: null, d: 0 };
    expect(itools.get(obj, ['b', 'bb'], 888)).toStrictEqual(888);
    expect(itools.get(obj, ['a', 'bb'], 888)).toStrictEqual(888);
    expect(itools.get(obj, ['b', 'bb', 'bbb'], 888)).toStrictEqual(888);
    expect(itools.get(obj.b, ['bb', 'bbb'], 888)).toStrictEqual(888);
    expect(itools.get(obj, ['c', 'cc'], 888)).toStrictEqual(888);
    expect(itools.get(obj, ['d', 'dd', 'ddd'], 888)).toStrictEqual(888);

    const arr = ['b', 'bb', 'bbb'];
    expect(itools.get(obj, arr, 888)).toStrictEqual(888);
    expect(itools.get(arr, ['b', 'bb', 'bbb'])); // array arg preserved
  });

  test('returns undefined for falsey property names using dot notation', () => {
    const obj = { a: { aa: { aaa: 2 } }, b: {} };
    expect(itools.get(obj, 'a.')).toStrictEqual(undefined);
    expect(itools.get(obj, 'a.aa.aaa.')).toStrictEqual(undefined);
    expect(itools.get(obj, 'b.')).toStrictEqual(undefined);
    expect(itools.get(obj, 'b..b')).toStrictEqual(undefined);
    expect(itools.get(obj, 'b...b')).toStrictEqual(undefined);
  });
  test('returns 3rd param for falsey property names using dot notation', () => {
    const obj = { a: { aa: { aaa: 2 } }, b: {} };
    expect(itools.get(obj, 'a.', 888)).toStrictEqual(888);
    expect(itools.get(obj, 'a.aa.aaa.', 888)).toStrictEqual(888);
    expect(itools.get(obj, 'b.', 888)).toStrictEqual(888);
  });

  test('returns undefined for falsey property names using array arg', () => {
    const obj = { a: { aa: { aaa: 2 } }, b: { '': { '': 3 } } };
    expect(itools.get(obj, ['a', false])).toStrictEqual(undefined);
    expect(itools.get(obj, ['a', 'aa', 'aaa', null])).toStrictEqual(undefined);
    expect(itools.get(obj, ['b', undefined])).toStrictEqual(undefined);

    const arr = ['a', 'aa', 'aaa', null];
    expect(itools.get(obj, arr)).toStrictEqual(undefined);
    expect(itools.get(arr, ['a', 'aa', 'aaa', null])); // array arg preserved
  });

  test('returns 3rd param for falsey property names using array arg', () => {
    const obj = { a: { aa: { aaa: 2 } }, b: { '': { '': 3 } } };
    expect(itools.get(obj, ['a', false], 888)).toStrictEqual(888);
    expect(itools.get(obj, ['a', 'aa', 'aaa', null], 888)).toStrictEqual(888);
    expect(itools.get(obj, ['b', undefined], 888)).toStrictEqual(888);
    const arr = ['a', 'aa', 'aaa', null];
    expect(itools.get(obj, arr, 888)).toStrictEqual(888);
    expect(itools.get(arr, ['a', 'aa', 'aaa', null])); // array arg preserved
  });

  test('follows empty keys using array arg', () => {
    const obj = { b: { '': { '': 3 } } };
    expect(itools.get(obj, ['b', ''])).toStrictEqual({ '': 3 });
    expect(itools.get(obj, ['b', '', ''])).toStrictEqual(3);
  });

  test('returns undefined if first argument is a falsey value', () => {
    expect(itools.get(null, 'a')).toStrictEqual(undefined);
    expect(itools.get(undefined, 'a')).toStrictEqual(undefined);
  });

  test('returns 3rd argument if first argument is a falsey value', () => {
    expect(itools.get(null, 'a', 888)).toStrictEqual(888);
    expect(itools.get(undefined, 'a', 888)).toStrictEqual(888);
  });

  test('props arg must be an array, a string or a symbol', () => {
    expect(() => {
      itools.get([]);
    }).toThrow();
  });

  /* eslint-disable no-undef */
  if (typeof Symbol === 'function') {
    test('works with symbols', () => {
      const obj = { a: {} };

      const sym = Symbol();
      obj.a[sym] = 4;
      expect(itools.get(obj.a, sym)).toStrictEqual(4);
    });
  }
});
