import itools from '../itools';
import { ios, ipad, android, iphone } from '../const';
describe('isIOS', () => {
  // jest jsdom ua = "Mozilla/5.0 (darwin) AppleWebKit/537.36 (KHTML, like Gecko) jsdom/11.12.0"

  const isIOS = ua => {
    return /iPad|iPhone|iPod/.test(ua);
  };

  test('itools.isIOS is a Function', () => {
    expect(itools.isIOS).toBeInstanceOf(Function);
  });

  test('itools.isIOS() for ua', () => {
    expect(itools.isIOS()).toBe(false);
    expect(isIOS(ios)).toBe(true);
    expect(isIOS(iphone)).toBe(true);
    expect(isIOS(ipad)).toBe(true);
    expect(isIOS(android)).toBe(false);
  });
});
