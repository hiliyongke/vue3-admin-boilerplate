import itools from '../itools';
import { qqLiveBrowser, qq, qqNews, ipad, android, iphone } from '../const';
describe('isTenvideo', () => {
  // jest jsdom ua = "Mozilla/5.0 (darwin) AppleWebKit/537.36 (KHTML, like Gecko) jsdom/11.12.0"

  const isTenvideo = (ua) => {
    return /qqlivebrowser/.test(ua.toLowerCase());
  };

  test('itools.isTenvideo is a Function', () => {
    expect(itools.isTenvideo).toBeInstanceOf(Function);
  });

  test('itools.isTenvideo() for ua', () => {
    expect(itools.isTenvideo()).toBe(false);
    expect(isTenvideo(ipad)).toBe(false);
    expect(isTenvideo(android)).toBe(false);
    expect(isTenvideo(iphone)).toBe(false);
    expect(isTenvideo(qqNews)).toBe(false);
    expect(isTenvideo(qq)).toBe(false);
    expect(isTenvideo(qqLiveBrowser)).toBe(true);
  });
});
