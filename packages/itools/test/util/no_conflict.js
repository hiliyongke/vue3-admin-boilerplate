import getGlobalObject from '../../src/util/get_global';
import itoolsLibrary from '../itools';

describe('noConflict', function () {
  it('should return itools library instance and restore itools global variable', function () {
    const globalObject = getGlobalObject();
    globalObject.itools = itoolsLibrary;
    const itools = itoolsLibrary.noConflict();
    expect(itools).toBe(itoolsLibrary);
    expect(globalObject.itools).toBe(undefined);
  });

  it('should return itools library instance and not modify itools global variable', function () {
    const globalObject = getGlobalObject();
    const itools = itoolsLibrary.noConflict();
    expect(itools).toBe(itoolsLibrary);
    expect(globalObject.itools).toBe(undefined);
  });
});
