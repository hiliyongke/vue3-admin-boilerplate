import itools from '../itools';

describe('formatPassTime', function () {
  test('formatPassTime is a Function', () => {
    expect(itools.formatPassTime).toBeInstanceOf(Function);
  });
  test('date aogo', () => {
    const aDay = 24 * 60 * 60 * 1000;
    expect(itools.formatPassTime(new Date(Date.now() - 60 * 30))).toBe(
      '1 seconds'
    );
    expect(
      itools.formatPassTime(new Date(Date.now() - 0.5 * 60 * 60 * 1000))
    ).toBe('30 minutes');
    expect(
      itools.formatPassTime(new Date(Date.now() - 2 * 60 * 60 * 1000))
    ).toBe('2 hours');
    expect(itools.formatPassTime(new Date(Date.now() - aDay))).toBe('24 hours');
    expect(itools.formatPassTime(new Date(Date.now() - aDay * 2))).toBe(
      '2 days'
    );
    expect(itools.formatPassTime(new Date(Date.now() - aDay * 33))).toBe(
      '1 months'
    );
    expect(itools.formatPassTime(new Date(Date.now() - aDay * 365 * 50))).toBe(
      '50 years'
    );
  });
});
