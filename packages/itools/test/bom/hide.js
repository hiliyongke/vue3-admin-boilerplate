import itools from '../itools';

describe('hide', () => {
  test('hide hides an element', () => {
    let el = document.createElement('div');
    el.setAttribute('style', 'display: block;');
    itools.hide(el);
    expect(el.style.display).toBe('none');
  });
});
