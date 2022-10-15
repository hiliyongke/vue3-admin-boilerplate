import itools from '../itools';

describe('isTypeof', () => {
  test('itools.isTypeof() is a Function', () => {
    expect(itools.isTypeof).toBeInstanceOf(Function);
  });

  test('itools.isTypeof()', () => {
    expect(itools.isTypeof(5, 'number')).toBe(true);
    expect(itools.isTypeof({}, 'object')).toBe(true); // -> 'object'
    expect(itools.isTypeof([], 'array')).toBe(true); // -> 'array'
    expect(itools.isTypeof(new Set([1, 2, 3]), 'set')).toBe(true); // -> 'set'
    expect(itools.isTypeof(null, 'null')).toBe(true); // -> null
    expect(itools.isTypeof(undefined, 'undefined')).toBe(true); // -> undefined
    expect(itools.isTypeof(function () {}, 'function')).toBe(true); // -> 'function'
    expect(itools.isTypeof(async function () {}, 'asyncfunction')).toBe(true); // -> 'AsyncFunction'
  });
});
