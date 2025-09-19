import itools from '../itools';

describe('hide', () => {
  test('hide hides an element', () => {
    const el = document.createElement('div');
    el.setAttribute('style', 'display: block;');
    itools.hide(el);
    expect(el.style.display).toBe('none');
  });
});
