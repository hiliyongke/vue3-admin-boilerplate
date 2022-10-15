import itools from '../itools';

describe('deleteUrlParam', () => {
  test('itools.deleteUrlParam() is a Function', () => {
    expect(itools.deleteUrlParam).toBeInstanceOf(Function);
  });

  test('set a simple key value', () => {
    const url = itools.deleteUrlParam('a');
    // use URLSearchParams URL
    // https://developer.mozilla.org/en-US/docs/Web/API/URLSearchParams#Browser_compatibility
    // https://developer.mozilla.org/zh-CN/docs/Web/API/URL
    // const searchParams = new URLSearchParams(url);
    const parsedUrl = new URL(url);
    expect(parsedUrl.searchParams.has('a')).toBe(false);

    const urlset = 'https://ww.abc.com/c/a.htm?id=2f&y=1.21&a=b';
    const urlSetDelete = itools.deleteUrlParam('a', urlset);
    const parsedUrlSet = new URL(urlSetDelete);
    expect(parsedUrlSet.searchParams.has('b')).toBe(false);
    expect(parsedUrlSet.searchParams.has('a')).toBe(false);
    expect(parsedUrlSet.searchParams.has('id')).toBe(true);
    expect(parsedUrlSet.searchParams.get('a')).toBe(null);
  });
});
