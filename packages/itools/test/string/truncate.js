import itools from '../itools';

describe('truncate', function () {
  it('should pass base example 1', function (done) {
    expect(itools.truncate('abcdefg')).toEqual('abc...');
    expect(itools.truncate('abcdefg', 1)).toEqual('a...');
    expect(itools.truncate('abcdefg', 3)).toEqual('abc...');
    expect(itools.truncate('abcdefg', 4)).toEqual('a...');
    expect(itools.truncate('boomerang', 7)).toEqual('boom...');
    expect(itools.truncate('abcdefgabcdefg', 7)).toEqual('abcd...');
    expect(itools.truncate('abcdefgabcdefg', 10)).toEqual('abcdefg...');
    done();
  });
});
