import itools from '../itools';

describe('unique', () => {
  test('itools.unique is a Function', () => {
    expect(itools.unique).toBeInstanceOf(Function);
  });
  test('itools.unique([1, 2, 2, 3, 4, 4, 5]) returns [1,2,3,4,5]', () => {
    expect(itools.unique([1, 2, 2, 3, 4, 4, 5])).toEqual([1, 2, 3, 4, 5]);
  });
  test('itools.unique([1, 23, 53]) returns [1, 23, 53]', () => {
    expect(itools.unique([1, 23, 53])).toEqual([1, 23, 53]);
  });
  test("itools.unique([true, 0, 1, false, false, undefined, null, '']) returns [true, 0, 1, false, false, undefined, null, '']", () => {
    expect(itools.unique([true, 0, 1, false, false, undefined, null, ''])).toEqual([
      true,
      0,
      1,
      false,
      undefined,
      null,
      '',
    ]);
  });
  test('itools.unique() returns []', () => {
    expect(itools.unique()).toEqual([]);
  });
  test('itools.unique(null) returns []', () => {
    expect(itools.unique(null)).toEqual([]);
  });
  test('itools.unique(undefined) returns []', () => {
    expect(itools.unique(undefined)).toEqual([]);
  });
  test("itools.unique('strt') returns ['s', 't', 'r']", () => {
    expect(itools.unique('strt')).toEqual(['s', 't', 'r']);
  });
  test('itools.unique(1, 1, 2543, 534, 5) throws an error', () => {
    expect(() => {
      itools.unique(1, 1, 2543, 534, 5);
    }).toThrow();
  });
  test('itools.unique({}) throws an error', () => {
    expect(() => {
      itools.unique({});
    }).toThrow();
  });
  test('itools.unique(true) throws an error', () => {
    expect(() => {
      itools.unique(true);
    }).toThrow();
  });
  test('itools.unique(false) throws an error', () => {
    expect(() => {
      itools.unique(false);
    }).toThrow();
  });
  const start = new Date().getTime();
  itools.unique([true, 0, 1, false, false, undefined, null, '']);
  const end = new Date().getTime();
  test('itools.unique([true, 0, 1, false, false, undefined, null]) takes less than 2s to run', () => {
    expect(end - start < 2000).toBeTruthy();
  });
});
