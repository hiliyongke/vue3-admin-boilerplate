import itools from '../itools';

describe('isEmpty', function () {
  it('empty object, array, map or set', function () {
    expect(itools.isEmpty({})).toBe(true);
    expect(itools.isEmpty([])).toBe(true);
    expect(typeof Set === 'function' ? itools.isEmpty(new Set()) : true).toBe(
      true
    );
    expect(typeof Map === 'function' ? itools.isEmpty(new Map()) : true).toBe(
      true
    );
  });

  it('non-empty object, array, map or set', function () {
    expect(itools.isEmpty({ a: 3, b: 5 })).toBe(false);
    expect(itools.isEmpty([1, 2])).toBe(false);
    expect(itools.isEmpty(['a', 'b'])).toBe(false);
    expect(itools.isEmpty(new Array(4))).toBe(false);
    expect(
      itools.isEmpty(
        typeof Set === 'function' ? itools.isEmpty(new Set([1, 2, 2])) : true
      )
    ).not.toBe(false);

    expect(
      itools.isEmpty(
        typeof Map === 'function' ? itools.isEmpty(new Map().set('a', 2)) : true
      )
    ).not.toBe(false);
  });

  it('null or undefined', function () {
    expect(itools.isEmpty(null)).toBe(true);
    expect(itools.isEmpty(undefined)).toBe(true);
  });

  it('other primitives', function () {
    expect(itools.isEmpty(true)).toBe(true);
    expect(itools.isEmpty(false)).toBe(true);
    expect(itools.isEmpty('hello')).toBe(false);
    expect(itools.isEmpty('')).toBe(true);
  });

  it('other primitives', function () {
    expect(itools.isEmpty(/^abc$/)).toBe(true);
    expect(itools.isEmpty(0)).toBe(true);
    expect(itools.isEmpty(35)).toBe(true);
    expect(itools.isEmpty('abc')).toBe(false);
    // eslint-disable-next-line no-new-wrappers
    expect(itools.isEmpty(new Boolean(true))).toBe(true);

    const m = new Map([
      [1, 'a'],
      [2, 'b']
    ]);
    expect(itools.isEmpty(m)).toBe(true);

    const set = new Set([1, 2, 3, 4, 5, 6, 5]);
    expect(itools.isEmpty(set)).toBe(true);

    expect(itools.isEmpty(undefined)).toBe(true);
  });
});
