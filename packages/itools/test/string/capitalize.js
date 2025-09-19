import itools from '../itools';

describe('capitalize', function () {
  it('should capitalize the first character in a string', function () {
    expect(itools.capitalize('APPLE')).toBe('Apple');
    expect(itools.capitalize('apple')).toBe('Apple');
    expect(itools.capitalize('macBook')).toBe('Macbook');
    expect(itools.capitalize('f')).toBe('F');
    expect(itools.capitalize('')).toBe('');
    expect(itools.capitalize('*apple')).toBe('*apple');
  });

  it('should capitalize the first character in a string and keep the rest unmodified', function () {
    expect(itools.capitalize('apple')).toBe('Apple');
    expect(itools.capitalize('APPLE')).toBe('Apple');
    expect(itools.capitalize('яблоко')).toBe('Яблоко');
    expect(itools.capitalize('f')).toBe('F');
    expect(itools.capitalize('')).toBe('');
    expect(itools.capitalize('100')).toBe('100');
    expect(itools.capitalize('  ')).toBe('  ');
  });

  it('should capitalize the first character in a string representation of an object', function () {
    expect(itools.capitalize(['grape'])).toBe('Grape');
    expect(
      itools.capitalize({
        toString() {
          return 'oRaNgE';
        },
      })
    ).toBe('Orange');
  });

  it('should not modify numbers', function () {
    expect(itools.capitalize(100)).toBe('100');
  });

  it('should return an empty string for null or undefined', function () {
    // expect(itools.capitalize()).toBe('');
    expect(itools.capitalize(undefined)).toBe('Undefined');
    expect(itools.capitalize(null)).toBe('Null');
    expect(itools.capitalize(undefined)).toBe('Undefined');
    expect(itools.capitalize(undefined)).toBe('Undefined');
  });
});
