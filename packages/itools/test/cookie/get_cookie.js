import itools from '../itools';

describe('getCookie', () => {
  test('simple value', function () {
    document.cookie = 'c=v';
    expect(itools.getCookie('c')).toBe('v');
  });
  test('must encode ";"', function () {
    document.cookie = 'c%3B=foo';
    expect(itools.getCookie('c;')).toBe('foo');
  });

  test('reading name with encoded equals sign', function () {
    document.cookie = 'c%3D=foo';
    expect(itools.getCookie('c=')).toBe('foo');
  });

  test('setCookie', function () {
    itools.setCookie('cv', 'cv');
    expect(itools.getCookie('cv')).toBe('cv');
  });

  test('null', function () {
    expect(itools.getCookie('cv2')).toBe(null);
    expect(itools.getCookie()).toBe(null);
  });
});
