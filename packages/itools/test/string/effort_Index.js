import itools from '../itools';

describe('effortIndex', function () {
  it('should pass example 1', function (done) {
    const expected = 0;
    const result = itools.effortIndex('Kevin', 'K');
    expect(result).toEqual(expected);
    done();
  });
  it('should pass example 2', function (done) {
    const expected = -1;
    const result = itools.effortIndex('Kevin', 'Z');
    expect(result).toEqual(expected);
    done();
  });
});
