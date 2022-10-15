import itools from '../itools';

describe('fillZero', function () {
  it('should pass no number input', function (done) {
    expect(itools.fillZero('abc')).toEqual('abc');
    expect(itools.fillZero('12345')).toEqual('12345');
    expect(itools.fillZero('1')).toEqual('1');
    expect(itools.fillZero('')).toEqual('');
    done();
  });

  it('should pass base example 1', function (done) {
    expect(itools.fillZero('12345', 10)).toEqual('0000012345');
    expect(itools.fillZero('abcdefg', 10)).toEqual('000abcdefg');
    done();
  });

  it('should pass slice', function (done) {
    expect(itools.fillZero('12345', 2)).toEqual('45');
    expect(itools.fillZero('abc', 3)).toEqual('abc');
    expect(itools.fillZero('abc', 1)).toEqual('c');
    done();
  });
});
