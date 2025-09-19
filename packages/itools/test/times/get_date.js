import itools from '../itools';

describe('getDate', function () {
  test('getDate is a Function', () => {
    expect(itools.getDate).toBeInstanceOf(Function);
  });

  test('number of milliseconds', () => {
    const today = new Date();
    const dd = String(today.getDate()).padStart(2, '0');
    const mm = String(today.getMonth() + 1).padStart(2, '0'); // January is 0!
    const yyyy = today.getFullYear();

    const hh = String(today.getHours()).padStart(2, '0');
    const ms = String(today.getMinutes()).padStart(2, '0');
    const ss = String(today.getSeconds()).padStart(2, '0');
    const expectDefalut = `${yyyy}/${mm}/${dd} ${hh}:${ms}:${ss}`;
    expect(itools.getDate()).toBe(expectDefalut);

    const expectNew = `${yyyy}-${mm}-${dd} ${hh}-${ms}-${ss}`;
    expect(itools.getDate('-', '-')).toBe(expectNew);
  });
});
