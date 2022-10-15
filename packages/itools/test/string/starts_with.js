import { PRINTABLE_ASCII } from '../const';
import itools from '../itools';

describe('startsWith', function () {
  it('should return true for a valid starting string', function () {
    expect(itools.startsWith('Hello World!', '')).toBe(true);
    expect(itools.startsWith('Hello World!', 'H')).toBe(true);
    expect(itools.startsWith('Hello World!', 'He')).toBe(true);
    expect(itools.startsWith('Hello World!', 'Hel')).toBe(true);
    expect(itools.startsWith('Hello World!', 'Hell')).toBe(true);
    expect(itools.startsWith('Hello World!', 'Hello')).toBe(true);
    expect(itools.startsWith('Hello World!', 'Hello ')).toBe(true);
    expect(itools.startsWith('Hello World!', 'Hello W')).toBe(true);
    expect(itools.startsWith('Hello World!', 'Hello Wo')).toBe(true);
    expect(itools.startsWith('Hello World!', 'Hello Wor')).toBe(true);
    expect(itools.startsWith('Hello World!', 'Hello Worl')).toBe(true);
    expect(itools.startsWith('Hello World!', 'Hello World')).toBe(true);
    expect(itools.startsWith('Hello World!', 'Hello World!')).toBe(true);
    expect(itools.startsWith('Привет Мир!', 'Привет')).toBe(true);
    expect(itools.startsWith('', '')).toBe(true);
    expect(itools.startsWith(PRINTABLE_ASCII, ' ')).toBe(true);
  });

  it('should return false for an invalid starting string', function () {
    expect(
      itools.startsWith(
        'The shadows betray you, because they belong to me!',
        'belong to me!'
      )
    ).toBe(false);
    expect(
      itools.startsWith(
        'The shadows betray you, because they belong to me!',
        'he shadows'
      )
    ).toBe(false);
    expect(itools.startsWith('They belong to me!', 'hey belong to me!')).toBe(
      false
    );
    expect(itools.startsWith('They belong to me!', 'belong')).toBe(false);
    expect(itools.startsWith('', 'The shadows')).toBe(false);
  });

  it('should return false for an invalid starting string and position', function () {
    expect(
      itools.startsWith(
        'The shadows betray you, because they belong to me!',
        'The shadows betray you'
      )
    ).toBe(true);
    expect(
      itools.startsWith('They belong to me', 'They belong to me!', '!')
    ).toBe(false);
  });

  it('should return false for an invalid starting number', function () {
    expect(itools.startsWith(1000, 11)).toBe(false);
    expect(itools.startsWith(1250, 10)).toBe(false);
    expect(itools.startsWith('916', 90)).toBe(false);
  });
});
