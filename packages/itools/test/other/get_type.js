import itools from '../itools';

describe('getType', () => {
  test('itools.getType() is a Function', () => {
    expect(itools.getType).toBeInstanceOf(Function);
  });

  test('itools.getType()', () => {
    expect(itools.getType(5)).toBe('number');
    expect(itools.getType({})).toBe('object'); // -> 'object'
    expect(itools.getType([])).toBe('array'); // -> 'array'
    expect(itools.getType(new Set([1, 2, 3]))).toBe('set'); // -> 'set'
    expect(itools.getType(null)).toBe('null'); // -> null
    expect(itools.getType(undefined)).toBe('undefined'); // -> undefined
    expect(itools.getType(function () {})).toBe('function'); // -> 'function'
    expect(itools.getType(async function () {})).toBe('asyncfunction'); // -> 'AsyncFunction'
  });
});
