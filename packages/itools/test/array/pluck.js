import itools from '../itools';

describe('pluck', () => {
  const array = [{ a: 1 }, { a: 2 }];

  it('base case', () => {
    expect(itools.pluck(array, 'a')).toEqual([1, 2]);
  });

  it('base case2', () => {
    expect(itools.pluck(array)).toEqual([]);
  });
});
