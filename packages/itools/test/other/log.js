import itools from '../itools';

describe('log', () => {
  test('itools.log is a Function', () => {
    expect(itools.log).toBeInstanceOf(Function);
  });

  test('base example', () => {
    const cookie = 'cookie';
    itools.log(cookie, { color: '#fff', background: '#ff0000' });
    const el = document.getElementById('_itools_log');
    expect(el.innerHTML).toEqual(cookie);
  });
});
