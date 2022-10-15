import { PRINTABLE_ASCII } from '../const';
import itools from '../itools';

describe('deCapitalize', function () {
  it('should decapitalize the first character in a string', function () {
    expect(itools.deCapitalize('Light')).toBe('light');
    expect(itools.deCapitalize('light')).toBe('light');
    expect(itools.deCapitalize('Sun')).toBe('sun');
    expect(itools.deCapitalize('f')).toBe('f');
    expect(itools.deCapitalize('')).toBe('');
    expect(itools.deCapitalize('*light')).toBe('*light');
    expect(itools.deCapitalize(PRINTABLE_ASCII)).toBe(PRINTABLE_ASCII);
  });

  it('should decapitalize the first character in a string representation of an object', function () {
    expect(itools.deCapitalize(['Fruit'])).toBe('fruit');
    expect(
      itools.deCapitalize(
        {
          toString: function () {
            return 'CaRrOt';
          }
        },
        false
      )
    ).toBe('caRrOt');
  });

  it('should not modify numbers', function () {
    expect(itools.deCapitalize(100)).toBe('100');
    expect(itools.deCapitalize(812, false)).toBe('812');
  });

  it('should return an empty string for null or undefined', function () {
    expect(itools.deCapitalize()).toBe('');
    expect(itools.deCapitalize(undefined)).toBe('');
    expect(itools.deCapitalize(null)).toBe('');
  });
});
