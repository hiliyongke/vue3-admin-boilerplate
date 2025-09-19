import itools from '../itools';

describe('show', () => {
  test('show shows an element', () => {
    const el = document.createElement('div');
    el.setAttribute('style', 'display: none;');
    itools.show(el);
    expect(el.style.display).not.toBe('none');
  });
});
