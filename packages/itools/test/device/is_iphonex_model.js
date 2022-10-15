import itools from '../itools';
describe('isIphoneXmodel', () => {
  // jest jsdom ua = "Mozilla/5.0 (darwin) AppleWebKit/537.36 (KHTML, like Gecko) jsdom/11.12.0"

  test('itools.isIphoneXmodel is a Function', () => {
    expect(itools.isIphoneXmodel).toBeInstanceOf(Function);
  });

  test('itools.isIphoneXmodel() for devicePixelRatio ,screen', () => {
    expect(itools.isIphoneXmodel()).toBe(false);
  });
});
