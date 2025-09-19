import itools from '../itools';

describe('entries', () => {
  test('regular objects return pairs of property/value', function () {
    expect(itools.entries({ c: 8, a: 4 })).toEqual([
      ['c', 8],
      ['a', 4],
    ]);

    expect(itools.entries({ b: { bb: 4 }, a: { aa: 2 } })).toEqual([
      ['b', { bb: 4 }],
      ['a', { aa: 2 }],
    ]);

    expect(itools.entries({})).toEqual([]);
  });

  test('arrays return pairs of index/value', function () {
    expect(itools.entries([{ c: 8 }, { a: 4 }])).toEqual([
      ['0', { c: 8 }],
      ['1', { a: 4 }],
    ]);

    expect(itools.entries([])).toEqual([]);
  });

  test('irregular objects return pairs of property/value', function () {
    expect(itools.entries(new String('hello'))).toEqual([
      ['0', 'h'],
      ['1', 'e'],
      ['2', 'l'],
      ['3', 'l'],
      ['4', 'o'],
    ]);

    expect(
      itools.entries(function (a, b) {
        return a + b;
      })
    ).toEqual([]);

    const fn = function () {};
    fn.a = 4;
    expect(itools.entries(fn)).toEqual([['a', 4]]);
  });
});
