import { PRINTABLE_ASCII } from '../const';
import itools from '../itools';

describe('endsWith', function () {
  it('should return true for valid ending string', function () {
    expect(itools.endsWith('Hello World!', '!')).toBe(true);
    expect(itools.endsWith('Hello World!', 'd!')).toBe(true);
    expect(itools.endsWith('Hello World!', 'rld!')).toBe(true);
    expect(itools.endsWith('Hello World!', 'orld!')).toBe(true);
    expect(itools.endsWith('Hello World!', 'World!')).toBe(true);
    expect(itools.endsWith('Hello World!', ' World!')).toBe(true);
    expect(itools.endsWith('Hello World!', 'o World!')).toBe(true);
    expect(itools.endsWith('Hello World!', 'lo World!')).toBe(true);
    expect(itools.endsWith('Hello World!', 'llo World!')).toBe(true);
    expect(itools.endsWith('Hello World!', 'ello World!')).toBe(true);
    expect(itools.endsWith('Hello World!', 'Hello World!')).toBe(true);
    expect(itools.endsWith('Привет Мир!', 'Мир!')).toBe(true);
    expect(itools.endsWith('', '')).toBe(true);
    expect(itools.endsWith(PRINTABLE_ASCII, '~')).toBe(true);
  });
});
