import itools from '../itools';

describe('judge', () => {
  test('itools.judge() is a Function', () => {
    expect(itools.judge).toBeInstanceOf(Function);
  });

  test('itools.judge()', () => {
    const array = ['2', 'js', 'jsx', '.js', '.jsx', '.css', '.less'];
    const object = {};
    const loose = itools.judge(2, array);
    const strict = itools.judge(2, array, true);
    const error = itools.judge(2, object);

    expect(loose).toBe(true);
    expect(strict).toBe(false);
    expect(error).toBe(false);
  });
});
