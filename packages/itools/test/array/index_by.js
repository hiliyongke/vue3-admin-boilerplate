import itools from '../itools';

describe('indexBy', () => {
  const array = [
    { id: 'first', val: 1 },
    { id: 'second', val: 2 },
  ];

  it('base case', () => {
    expect(itools.indexBy(array, 'id')).toEqual({
      first: { id: 'first', val: 1 },
      second: { id: 'second', val: 2 },
    });

    expect(itools.indexBy([{ id: 'first', val: 1 }, null], 'id')).toEqual({
      first: { id: 'first', val: 1 },
    });

    expect(itools.indexBy([], 'id')).toEqual({});
  });

  test('itools.indexBy !isArray throws an error', () => {
    expect(() => {
      itools.indexBy('', 1);
    }).toThrow();

    expect(() => {
      itools.indexBy([], []);
    }).toThrow();
  });
});
