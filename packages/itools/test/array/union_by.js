import itools from '../itools';

describe('unionBy', () => {
  test('unionBy is a Function', () => {
    expect(itools.unionBy).toBeInstanceOf(Function);
  });

  test('Produces the appropriate results', () => {
    expect(itools.unionBy([2.1], [1.2, 2.3], Math.floor)).toEqual([2.1, 1.2]);
  });
});
