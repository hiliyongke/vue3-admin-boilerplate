import itools from '../itools';
describe('containsWith', function () {
  it('should pass example 1', function (done) {
    const expected = true;
    const result = itools.containsWith('Kevin', 'K');
    expect(result).toEqual(expected);
    done();
  });
});
