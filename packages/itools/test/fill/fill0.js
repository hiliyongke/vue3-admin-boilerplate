import itools from '../itools';

describe('fill0', () => {
  test('itools.fill0() is a Function', () => {
    expect(itools.fill0).toBeInstanceOf(Function);
  });

  test('should pass example', () => {
    const n = 3.1415926535897;

    expect(itools.fill0(n)).toBe('03.1415926535897');
    expect(itools.fill0(9)).toBe('09');
    expect(itools.fill0(1)).toBe('01');
    expect(itools.fill0(1)).toBe('01');
    expect(itools.fill0(0.314)).toBe('00.314');
    expect(itools.fill0(10)).toBe('10');
    expect(itools.fill0(99)).toBe('99');
  });
});
