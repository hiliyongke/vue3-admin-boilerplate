import itools from '../itools';
import { android, chrome, edge } from '../const';

describe('isAndroid', () => {
  // ua = navigator.userAgent
  // jest jsdom ua = "Mozilla/5.0 (darwin) AppleWebKit/537.36 (KHTML, like Gecko) jsdom/11.12.0"

  const isAndroid = (ua) => {
    return ua.toLowerCase().indexOf('android') > -1;
  };

  test('itools.isAndroid is a Function', () => {
    expect(itools.isAndroid).toBeInstanceOf(Function);
  });

  test('itools.isAndroid() for ua', () => {
    expect(itools.isAndroid()).toBe(false);
    expect(isAndroid(android)).toBe(true);
    expect(isAndroid(chrome)).toBe(false);
    expect(isAndroid(edge)).toBe(false);
  });
});
