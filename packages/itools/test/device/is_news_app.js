import itools from '../itools';
import { qqNews, ipad, android, iphone } from '../const';
describe('isNewsApp', () => {
  // jest jsdom ua = "Mozilla/5.0 (darwin) AppleWebKit/537.36 (KHTML, like Gecko) jsdom/11.12.0"

  const isNewsApp = (ua) => {
    return /qqnews/.test(ua); // 腾讯新闻app
  };

  test('itools.isiPhone is a Function', () => {
    expect(itools.isNewsApp).toBeInstanceOf(Function);
  });

  test('itools.isNewsApp() for ua', () => {
    expect(itools.isNewsApp()).toBe(false);
    expect(isNewsApp(ipad)).toBe(false);
    expect(isNewsApp(android)).toBe(false);
    expect(isNewsApp(iphone)).toBe(false);
    expect(isNewsApp(qqNews)).toBe(true);
  });
});
