import itools from '../itools';

describe('formatRemainTime', function () {
  test('formatRemainTime is a Function', () => {
    expect(itools.formatRemainTime).toBeInstanceOf(Function);
  });
  test('eemain time', () => {
    const aDay = 24 * 60 * 60 * 1000;
    const aHour = 60 * 60 * 1000;
    const aMinute = 60 * 1000;
    const aSecond = 1 * 1000;
    const endTime = Date.now() + aDay + aHour + aMinute + aSecond;

    expect(itools.formatRemainTime(endTime)).toBe('1day 1hour 1minute 1second');
  });
});
