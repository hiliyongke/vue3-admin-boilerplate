import itools from '../itools';

describe('column', () => {
  const array = [
    { name: 'a', value: 1 },
    { name: 'b', value: 2 },
    { name: 'c', value: 3 }
  ];

  const object = {
    0: { name: 'a', value: 1 },
    1: { name: 'b', value: 2 },
    2: { name: 'c', value: 3 }
  };

  it('base case', () => {
    expect(itools.column(array, 'name')).toEqual({ 0: 'a', 1: 'b', 2: 'c' });
    expect(itools.column(array, 'name', null)).toEqual({
      0: 'a',
      1: 'b',
      2: 'c'
    });
    expect(itools.column(array, 'name', 1)).toEqual({ 0: 'a', 1: 'b', 2: 'c' });
    expect(itools.column(array, null, 5)).toEqual(object);
    expect(itools.column(array, 'name', 5)).toEqual({ 0: 'a', 1: 'b', 2: 'c' });
    expect(itools.column(array, 'name', 'value')).toEqual({
      1: 'a',
      2: 'b',
      3: 'c'
    });
    expect(itools.column(object, 'name')).toEqual({ 0: 'a', 1: 'b', 2: 'c' });
    expect(itools.column(object, 'name', 'value')).toEqual({
      1: 'a',
      2: 'b',
      3: 'c'
    });
    expect(itools.column(object, 'name', 1)).toEqual({
      0: 'a',
      1: 'b',
      2: 'c'
    });
    expect(itools.column(object, null, 'value')).toEqual({
      1: { name: 'a', value: 1 },
      2: { name: 'b', value: 2 },
      3: { name: 'c', value: 3 }
    });
  });

  test('itools.column throws', () => {
    expect(() => {
      itools.column(null);
    }).toThrow();

    expect(() => {
      itools.column({}, [], 1);
    });

    expect(() => {
      itools.column(null);
    }).toThrow();
  });
});
