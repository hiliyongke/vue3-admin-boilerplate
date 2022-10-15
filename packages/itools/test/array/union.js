import itools from '../itools';

describe('union', () => {
  test('union is a Function', () => {
    expect(itools.union).toBeInstanceOf(Function);
  });

  test('itools.union([1, 2, 3], [4, 3, 2]) returns [1, 2, 3, 4]', () => {
    expect(itools.union([1, 2, 3], [4, 3, 2])).toEqual([1, 2, 3, 4]);
  });

  test("itools.union('str', 'asd') returns [ 's', 't', 'r', 'a', 'd' ]", () => {
    expect(itools.union('str', 'asd')).toEqual(['s', 't', 'r', 'a', 'd']);
  });

  test('itools.union([[], {}], [1, 2, 3]) returns [[], {}, 1, 2, 3]', () => {
    expect(itools.union([[], {}], [1, 2, 3])).toEqual([[], {}, 1, 2, 3]);
  });

  test('itools.union([], []) returns []', () => {
    expect(itools.union([], [])).toEqual([]);
  });

  test('itools.union() throws an error', () => {
    expect(() => {
      itools.union();
    }).toThrow();
  });

  test("itools.union(true, 'str') throws an error", () => {
    expect(() => {
      itools.union(true, 'str');
    }).toThrow();
  });

  test("itools.union('false', true) throws an error", () => {
    expect(() => {
      itools.union('false', true);
    }).toThrow();
  });

  test('itools.union((123, {}) throws an error', () => {
    expect(() => {
      itools.union(123, {});
    }).toThrow();
  });

  test('itools.union([], {}) throws an error', () => {
    expect(() => {
      itools.union([], {});
    }).toThrow();
  });

  test('itools.union(undefined, null) throws an error', () => {
    expect(() => {
      itools.union(undefined, null);
    }).toThrow();
  });

  let start = new Date().getTime();
  itools.union([1, 2, 3], [4, 3, 2]);

  let end = new Date().getTime();

  test('itools.union([1, 2, 3], [4, 3, 2]) takes less than 2s to run', () => {
    expect(end - start < 2000).toBeTruthy();
  });
});
