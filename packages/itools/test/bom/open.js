import itools from '../itools';

describe('hide', () => {
  test('open url', () => {
    const url = 'https://www.google.com/';
    itools.open(url);
    const href = document.querySelectorAll('a');
    expect(url).toBe(href[0].href);
  });
});
