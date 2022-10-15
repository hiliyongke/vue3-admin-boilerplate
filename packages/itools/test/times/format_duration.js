import itools from '../itools';

describe('formatDuration', function () {
  test('formatDuration is a Function', () => {
    expect(itools.formatDuration).toBeInstanceOf(Function);
  });

  test('number of milliseconds', () => {
    expect(itools.formatDuration(1001)).toBe('1 second, 1 millisecond');
  });
  test('number of milliseconds (negative)', () => {
    expect(itools.formatDuration(-1001)).toBe('1 second, 1 millisecond');
  });
  test('number of milliseconds', () => {
    expect(itools.formatDuration(34325055574)).toBe(
      '397 days, 6 hours, 44 minutes, 15 seconds, 574 milliseconds'
    );
  });
});
