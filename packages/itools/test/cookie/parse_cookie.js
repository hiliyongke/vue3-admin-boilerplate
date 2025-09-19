import itools from '../itools';

describe('parseCookie', () => {
  test('itools.parseCookie is a Function', () => {
    expect(itools.parseCookie).toBeInstanceOf(Function);
  });

  test('parses the cookie', () => {
    expect(itools.parseCookie('foo=bar; equation=E%3Dmc%5E2')).toEqual({
      foo: 'bar',
      equation: 'E=mc^2',
    });
  });
});
