import itools from '../itools';

describe('deleteCookie', () => {
  const cookie = 'c=v';

  test('itools.deleteCookie or delCookie is a Function', () => {
    expect(itools.deleteCookie).toBeInstanceOf(Function);
    expect(itools.delCookie).toBeInstanceOf(Function);
  });

  test('delete simple value', function () {
    itools.setCookie('c', 'v');
    expect(document.cookie).toBe(cookie);

    itools.deleteCookie('c');
    expect(document.cookie).toBe('');
  });
});
