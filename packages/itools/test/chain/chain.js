import itools from '../itools';

describe('chain', function () {
  it('should calculate the result using explicit chaining', function () {
    expect(itools.chain('Hello world').value()).toBe('Hello world');
    expect(itools.chain('  Hello world  ').trim().value()).toBe('Hello world');

    expect(itools.chain(' to-upper-case ').trim().camelize().value()).toBe(
      'toUpperCase'
    );

    expect(itools.chain([1, 1, 2, 3, 4, 2]).unique().split(2).value()).toEqual([
      [1, 2],
      [3, 4]
    ]);
  });

  it('wrapper object', function () {
    const obj = { a: { aa: { aaa: 2 } }, b: 4 };
    expect(JSON.stringify(itools.chain(obj).get('a').get('aa').value())).toBe(
      '{"aaa":2}'
    );
  });

  it('should allow to pass thru the wrapped value', function () {
    expect(
      itools('Hello world')
        .chain()
        .deCapitalize()
        .thru(function (words) {
          return words[0] + 1;
        })
        .value()
    ).toBe('h1');
  });
});
