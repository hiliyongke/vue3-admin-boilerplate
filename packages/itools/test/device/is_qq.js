import itools from '../itools';
import { qq, qqNews, ipad, android, iphone } from '../const';
describe('isQQ', () => {
  // jest jsdom ua = "Mozilla/5.0 (darwin) AppleWebKit/537.36 (KHTML, like Gecko) jsdom/11.12.0"

  const isQQ = (ua) => {
    return /qq\//.test(ua.toLowerCase());
  };

  test('itools.isQQ is a Function', () => {
    expect(itools.isQQ).toBeInstanceOf(Function);
  });

  test('itools.isQQ() for ua', () => {
    expect(itools.isQQ()).toBe(false);
    expect(isQQ(ipad)).toBe(false);
    expect(isQQ(android)).toBe(false);
    expect(isQQ(iphone)).toBe(false);
    expect(isQQ(qqNews)).toBe(false);
    expect(isQQ(qq)).toBe(true);
  });
});
