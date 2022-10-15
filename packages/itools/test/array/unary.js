import itools from '../itools';

describe('unary', () => {
  test('unary is a Function', () => {
    expect(itools.unary).toBeInstanceOf(Function);
  });
  test('Discards arguments after the first one', () => {
    expect(['6', '8', '10'].map(itools.unary(parseInt))).toEqual([6, 8, 10]);
  });
});
