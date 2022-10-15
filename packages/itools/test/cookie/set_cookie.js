import itools from '../itools';

describe('setCookie', () => {
  const cookie = 'c=v; c1=v';
  const cookieNew1 = 'name=name-value';
  const cookieNew2 = 'nameNew=name-value-new';

  test('set simple value', function () {
    itools.setCookie('c', 'v');
    expect(document.cookie).toBe('c=v');
    itools.setCookie('c1', 'v');
    expect(document.cookie).toBe('c=v; c1=v');
  });

  test('set option => path', function () {
    itools.setCookie('c', 'v', { path: '/' });
    expect(document.cookie).toBe(cookie);
    itools.setCookie('c', 'v', { path: '' });
    expect(document.cookie).toBe(cookie);
    itools.setCookie('c', 'v', { path: '/cv' });
    expect(document.cookie).toBe(cookie);
  });

  test('set option => days , hour, secure ', function () {
    itools.setCookie('name', 'name-value', { days: 1, secure: true });
    expect(document.cookie).toBe(`${cookie}; ${cookieNew1}`);
    itools.setCookie('name', 'name-value', { hour: 2, secure: true });
    expect(document.cookie).toBe(`${cookie}; ${cookieNew1}`);
  });

  test('set option => domain ', function () {
    itools.setCookie('name', 'name-value-new', { domain: 'www.qq.com' });
    expect(document.cookie).toBe(`${cookie}; ${cookieNew1}`);
    itools.setCookie('nameNew', 'name-value-new');
    expect(document.cookie).toBe(`${cookie}; ${cookieNew1}; ${cookieNew2}`);
  });

  test('set option => raw ', function () {
    itools.setCookie('name', 'name-value-new', { raw: true });
    expect(document.cookie).toBe(
      `${cookie}; name=name-value-new; ${cookieNew2}`
    );
  });
});
