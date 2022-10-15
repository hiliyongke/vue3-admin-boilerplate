import itools from '../itools';

describe('repeat', function () {
  it('should pass base number example 1', function (done) {
    expect(itools.repeat(123, 3)).toEqual('123123123');
    done();
  });
  it('should pass base string example 1', function (done) {
    expect(itools.repeat('TechOnTheNet', 3)).toEqual(
      'TechOnTheNetTechOnTheNetTechOnTheNet'
    );
    done();
  });
});
