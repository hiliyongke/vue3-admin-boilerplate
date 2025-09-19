import itools from '../itools';
describe('dasherize', function () {
  it('should pass example 1', function (done) {
    const expected = 'hello-world';
    const result = itools.dasherize('hello_world');
    expect(result).toEqual(expected);
    done();
  });
});
