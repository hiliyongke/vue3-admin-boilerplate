import itools from '../itools';
import { chrome, edge, Edge12, Edge13, IE10, IE11 } from '../const';

describe('ieVersion', () => {
  // ua = navigator.userAgent , isMobile = itools.isMobile
  // jest jsdom ua = "Mozilla/5.0 (darwin) AppleWebKit/537.36 (KHTML, like Gecko) jsdom/11.12.0"
  const ieVersion = (ua) => {
    const uakit = ua;
    const msie = uakit.indexOf('MSIE ');
    if (msie > 0) {
      return parseInt(uakit.substring(msie + 5, uakit.indexOf('.', msie)), 10);
    }

    const trident = uakit.indexOf('Trident/');
    if (trident > 0) {
      const rv = uakit.indexOf('rv:');
      return parseInt(uakit.substring(rv + 3, uakit.indexOf('.', rv)), 10);
    }

    const edge = uakit.indexOf('Edge/');
    if (edge > 0) {
      return parseInt(ua.substring(edge + 5, uakit.indexOf('.', edge)), 10);
    }

    return '';
  };

  test('itools.ieVersion is a Function', () => {
    expect(itools.ieVersion).toBeInstanceOf(Function);
  });

  test('itools.ieVersion() for ua', () => {
    expect(itools.ieVersion()).toBe('');
    expect(ieVersion(chrome)).toBe('');
    expect(ieVersion(edge)).toBe(12);
    expect(ieVersion(Edge12)).toBe(12);
    expect(ieVersion(Edge13)).toBe(13);
    expect(ieVersion(IE10)).toBe(10);
    expect(ieVersion(IE11)).toBe(11);
  });
});
