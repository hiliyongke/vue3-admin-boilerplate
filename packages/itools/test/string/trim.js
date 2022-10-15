import itools from '../itools';

describe('trim', function () {
  it('should pass base example 1', function (done) {
    expect(itools.trim(' abc  ')).toEqual('abc');
    expect(itools.trim(' abc')).toEqual('abc');
    expect(itools.trim('abc')).toEqual('abc');
    expect(itools.trim('a bc')).toEqual('a bc');
    expect(itools.trim(' ')).toEqual('');
    expect(itools.trim(null)).toEqual(null);
    done();
  });
});
