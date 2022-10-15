import itools from '../itools';

describe('noop', () => {
  test('itools.noop is a Function', () => {
    expect(itools.noop).toBeInstanceOf(Function);
  });
});
