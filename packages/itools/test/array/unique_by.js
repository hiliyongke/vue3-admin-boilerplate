import itools from '../itools';

describe('uniqueBy', () => {
  test('itools.uniqueBy is a Function', () => {
    expect(itools.uniqueBy).toBeInstanceOf(Function);
  });

  test('itools.uniqueBy works for properties', () => {
    expect(
      itools.uniqueBy(
        [
          { id: 0, value: 'a' },
          { id: 1, value: 'b' },
          { id: 2, value: 'c' },
          { id: 1, value: 'd' },
          { id: 0, value: 'e' },
        ],
        (a, b) => a.id === b.id
      )
    ).toEqual([
      { id: 0, value: 'a' },
      { id: 1, value: 'b' },
      { id: 2, value: 'c' },
    ]);
  });

  test('itools.uniqueBy works for nested properties', () => {
    expect(
      itools.uniqueBy(
        [
          { id: 0, value: 'a', n: { p: 0 } },
          { id: 1, value: 'b', n: { p: 1 } },
          { id: 2, value: 'c', n: { p: 2 } },
          { id: 1, value: 'd', n: { p: 0 } },
          { id: 0, value: 'e', n: { p: 1 } },
        ],
        (a, b) => a.id === b.id
      )
    ).toEqual([
      { id: 0, value: 'a', n: { p: 0 } },
      { id: 1, value: 'b', n: { p: 1 } },
      { id: 2, value: 'c', n: { p: 2 } },
    ]);
  });
});
