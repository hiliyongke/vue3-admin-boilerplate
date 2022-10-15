import itools from '../itools';
describe('isIE', () => {
  // jest jsdom ua = "Mozilla/5.0 (darwin) AppleWebKit/537.36 (KHTML, like Gecko) jsdom/11.12.0"

  test('itools.isIE is a Function', () => {
    expect(itools.isIE).toBeInstanceOf(Function);
  });

  test('itools.isIE() for ua', () => {
    expect(itools.isIE()).toBe(false);
  });
});
