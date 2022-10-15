import itools from '../itools';
import {
  weishi,
  qqLiveBrowser,
  qq,
  qqNews,
  ipad,
  android,
  iphone
} from '../const';
describe('isTenvideo', () => {
  // jest jsdom ua = "Mozilla/5.0 (darwin) AppleWebKit/537.36 (KHTML, like Gecko) jsdom/11.12.0"

  const isWeiShi = ua => {
    return /weishi/.test(ua.toLowerCase());
  };

  test('itools.isWeiShi() is a Function', () => {
    expect(itools.isWeiShi).toBeInstanceOf(Function);
  });

  test('itools.isWeiShi() for ua', () => {
    expect(itools.isWeiShi()).toBe(false);
    expect(isWeiShi(ipad)).toBe(false);
    expect(isWeiShi(android)).toBe(false);
    expect(isWeiShi(iphone)).toBe(false);
    expect(isWeiShi(qqNews)).toBe(false);
    expect(isWeiShi(qq)).toBe(false);
    expect(isWeiShi(qqLiveBrowser)).toBe(false);
    expect(isWeiShi(weishi)).toBe(true);
  });
});
