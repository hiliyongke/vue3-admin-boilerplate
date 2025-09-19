import itools from '../itools';

describe('trigger', () => {
  test('triggers an event', () => {
    const el = document.createElement('div');
    let val = false;
    const fn = () => (val = true);
    el.addEventListener('click', fn);
    itools.trigger(el, 'click', 'MouseEvents');
    expect(val).toBeTruthy();
  });
});
