import itools from '../itools';

describe('byteSize', function () {
  it('bytesize using special cases', function () {
    expect(itools.byteSize('a')).toBe(1);
    expect(itools.byteSize('')).toBe(0);
    expect(itools.byteSize(1)).toBe(1);
    expect(itools.byteSize(null)).toBe(4);
    expect(itools.byteSize([])).toBe(0);
    expect(itools.byteSize(undefined)).toBe(9);
  });
});
