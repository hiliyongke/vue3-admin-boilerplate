import itools from '../itools';

describe('isShallowEqual', () => {
  it('should compare "strings"', () => {
    expect(itools.isShallowEqual('a', 'a')).toBe(true);
    expect(itools.isShallowEqual('a', 'b')).toBe(false);
  });

  it('should compare "numbers"', () => {
    expect(itools.isShallowEqual(1, 1)).toBe(true);
    expect(itools.isShallowEqual(1, 2)).toBe(false);
  });

  it('should compare "booleans"', () => {
    expect(itools.isShallowEqual(true, true)).toBe(true);
    expect(itools.isShallowEqual(true, false)).toBe(false);
  });

  it('should compare "arrays"', () => {
    expect(itools.isShallowEqual([], [])).toBe(true);
    expect(itools.isShallowEqual([1], [1])).toBe(true);
    expect(itools.isShallowEqual([1, 2], [1, 2])).toBe(true);
    expect(itools.isShallowEqual([1, [1]], [1, [1]])).toBe(true);
    expect(
      itools.isShallowEqual([{ a: 1 }, { a: 1 }], [{ a: 1 }, { a: 1 }])
    ).toBe(true);

    expect(
      itools.isShallowEqual(
        [
          { a: 1, b: { c: 2 } },
          { a: 1, b: { c: 2 } }
        ],
        [
          { a: 1, b: { c: 2 } },
          { a: 1, b: { c: 2 } }
        ]
      )
    ).toBe(true);
    expect(
      itools.isShallowEqual([{ a: [1] }, { a: [1] }], [{ a: [1] }, { a: [1] }])
    ).toBe(true);
  });

  it('should compare "objects"', () => {
    expect(itools.isShallowEqual({}, {})).toBe(true);
    expect(itools.isShallowEqual({ a: 1 }, { a: 1 })).toBe(true);
    expect(itools.isShallowEqual({ a: [1] }, { a: [1] })).toBe(true);
    expect(itools.isShallowEqual({ a: { b: 1 } }, { a: { b: 1 } })).toBe(true);

    expect(
      itools.isShallowEqual(
        { a: { b: [1, 2, { c: 1, d: { e: 1 } }] } },
        { a: { b: [1, 2, { c: 1, d: { e: 1 } }] } }
      )
    ).toBe(true);
    expect(itools.isShallowEqual({ a: 1 }, { a: 2 })).toBe(false);
    expect(itools.isShallowEqual({ a: [1] }, { a: [2] })).toBe(false);
    expect(itools.isShallowEqual({ a: { b: 1 } }, { a: { b: 2 } })).toBe(false);
    expect(
      itools.isShallowEqual(
        { a: { b: [1, 2, { c: 1, d: { e: 1 } }] } },
        { a: { b: [1, 2, { c: 1, d: { e: 2 } }] } }
      )
    ).toBe(false);
  });

  it('should compare "null"', () => {
    expect(itools.isShallowEqual(null, null)).toBe(true);
    expect(itools.isShallowEqual(null, false)).toBe(false);
  });

  it('should compare "undefined"', () => {
    expect(itools.isShallowEqual(undefined, undefined)).toBe(true);
    expect(itools.isShallowEqual(undefined, false)).toBe(false);
  });

  it('should compare "dates"', () => {
    let date = new Date();
    expect(itools.isShallowEqual(date, date)).toBe(true);
  });

  it('should NOT compare "functions"', () => {
    expect(
      itools.isShallowEqual(
        () => {},
        () => {}
      )
    ).toBe(true);
  });

  it('should compare multiple (> 2) values', () => {
    expect(itools.isShallowEqual('a', 'a', 'a')).toBe(true);
    expect(itools.isShallowEqual({ a: 1 }, { a: 1 }, { a: 1 })).toBe(true);
    expect(itools.isShallowEqual([1, 2], [1, 2], [1, 2], [1, 2])).toBe(true);
    expect(itools.isShallowEqual('a', 'a', 'b')).toBe(false);
    expect(itools.isShallowEqual({ a: 1 }, { a: 2 }, { a: 1 })).toBe(false);
    expect(itools.isShallowEqual([1, 2], [1, 2, 3], [1, 2], [1, 2])).toBe(
      false
    );
  });

  it('should return "false" given a single param', () => {
    expect(itools.isShallowEqual('a')).toBe(false);
  });

  it('should return "false" given no params', () => {
    expect(itools.isShallowEqual()).toBe(false);
  });
});
