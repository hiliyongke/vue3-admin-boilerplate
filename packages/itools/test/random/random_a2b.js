import itools from '../itools';

describe('randomA2B', () => {
  test('itools.randomA2B() is a Function', () => {
    expect(itools.randomA2B).toBeInstanceOf(Function);
  });

  test('should pass example', () => {
    const max = 999;
    const min = 1;
    const number = itools.randomA2B(min, max, true);
    expect(number < max).toBe(true);
    expect(number > max).toBe(false);
    expect(itools.isNumber(number)).toBe(true);
    expect(itools.isString(number)).toBe(false);

    const numberNoFloor = itools.randomA2B(min, max);
    expect(itools.isNumber(numberNoFloor)).toBe(true);
  });
});
