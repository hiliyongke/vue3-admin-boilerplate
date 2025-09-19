import itools from '../itools';
import { ios, ipad, android, iphone } from '../const';
describe('isiPhone', () => {
  // jest jsdom ua = "Mozilla/5.0 (darwin) AppleWebKit/537.36 (KHTML, like Gecko) jsdom/11.12.0"

  const isiPhone = (ua) => {
    return /iPhone/.test(ua);
  };

  test('itools.isiPhone is a Function', () => {
    expect(itools.isiPhone).toBeInstanceOf(Function);
  });

  test('itools.isiPhone() for ua', () => {
    expect(itools.isiPhone()).toBe(false);
    expect(isiPhone(ipad)).toBe(false);
    expect(isiPhone(android)).toBe(false);
    expect(isiPhone(iphone)).toBe(true);
    expect(isiPhone(ios)).toBe(true);
  });
});
