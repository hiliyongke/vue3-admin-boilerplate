import itools from '../itools';

describe('args', () => {
  test('itools.args is a Function', () => {
    expect(itools.args).toBeInstanceOf(Function);
  });

  test('itools.args works for slice', () => {
    function foo(a, b, c, d) {
      return itools.args(arguments);
    }

    expect(foo(1, 2, 3)).toEqual([1, 2, 3]);
    expect(foo(1, 2, 3, 4, 5)).toEqual([1, 2, 3, 4, 5]);
  });

  test('itools.args(arguments, first?) first defalult is 0', () => {
    function boo(a, b, c, d) {
      return itools.args(arguments, 1);
    }
    expect(boo(1, 2, 3, 4)).toEqual([2, 3, 4]);
  });
});
