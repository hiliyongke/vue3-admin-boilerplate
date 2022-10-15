import itools from '../itools';

describe('over', () => {
  test('itools.over is a Function', () => {
    expect(itools.over).toBeInstanceOf(Function);
  });
  const minMax = itools.over(Math.min, Math.max);
  test('Applies given functions over multiple arguments', () => {
    expect(minMax(1, 2, 3, 4, 5)).toEqual([1, 5]);
  });
});
