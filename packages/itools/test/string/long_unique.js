import itools from '../itools';

describe('longUnique', function () {
  it('should pass no number input', function (done) {
    expect(itools.longUnique('abc')).toEqual('abc');
    expect(itools.longUnique('12345')).toEqual('12345');
    expect(itools.longUnique('1')).toEqual('1');
    expect(itools.longUnique('')).toEqual('');
    done();
  });

  it('should pass base example 1', function (done) {
    expect(itools.longUnique('strtring')).toEqual('string');
    expect(itools.longUnique('sTrString')).toEqual('sTrSting');
    expect(itools.longUnique('abcdefg abcdefgi hijk')).toEqual('abcdefg ihjk');
    expect(itools.longUnique('123456 123 7')).toEqual('123456 7');
    done();
  });
});
