import itools from '../itools';

describe('isAbsoluteURL', () => {
  test('itools.isAbsoluteURL() is a Function', () => {
    expect(itools.isAbsoluteURL).toBeInstanceOf(Function);
  });

  test('an absolute URL', () => {
    expect(itools.isAbsoluteURL('https://ww.com')).toBeTruthy();
  });
  test('an absolute URL', () => {
    expect(itools.isAbsoluteURL('ftp://www.www.net')).toBeTruthy();
  });
  test('not a absolute URL', () => {
    expect(itools.isAbsoluteURL('/foo/bar')).toBeFalsy();
  });
});
