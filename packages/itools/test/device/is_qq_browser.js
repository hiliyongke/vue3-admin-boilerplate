import itools from '../itools';
import { qqBrowser, weixin, qq, qqNews, ipad, android, iphone } from '../const';

describe('isQQbrowser', () => {
  // jest jsdom ua = "Mozilla/5.0 (darwin) AppleWebKit/537.36 (KHTML, like Gecko) jsdom/11.12.0"

  const isQQbrowser = (ua) => {
    return /mqqbrowser/i.test(ua.toLowerCase());
  };

  test('itools.isQQbrowser() is a Function', () => {
    expect(itools.isQQbrowser).toBeInstanceOf(Function);
  });

  test('itools.isQQbrowser() for ua', () => {
    expect(itools.isQQbrowser()).toBe(false);
    expect(isQQbrowser(ipad)).toBe(false);
    expect(isQQbrowser(android)).toBe(false);
    expect(isQQbrowser(iphone)).toBe(false);
    expect(isQQbrowser(qqNews)).toBe(false);
    expect(isQQbrowser(qq)).toBe(false);
    expect(isQQbrowser(weixin)).toBe(false);
    expect(isQQbrowser(qqBrowser)).toBe(true);
  });
});
