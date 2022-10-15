import itools from '../itools';

describe('mask', function () {
  it('should pass base number example 1', function (done) {
    expect(itools.mask(1234567890)).toEqual('******7890');
    expect(itools.mask(1234567890, 3)).toEqual('*******890');
    expect(itools.mask(1234567890, -4, '$')).toEqual('$$$$567890');
    done();
  });

  it('should pass base string example 1', function (done) {
    expect(itools.mask('adcdefghijk')).toEqual('*******hijk');
    expect(itools.mask('adcdefghijk', 3)).toEqual('********ijk');
    expect(itools.mask('adcdefghijk', -4, '$')).toEqual('$$$$efghijk');
    done();
  });
});
