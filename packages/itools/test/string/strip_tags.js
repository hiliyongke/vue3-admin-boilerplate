import itools from '../itools';

describe('stripTags', function () {
  it('should pass base stripTags', function (done) {
    expect(itools.longUnique('abc')).toEqual('abc');

    expect(itools.stripTags('abc')).toEqual('abc');
    expect(itools.stripTags('abc<ab>')).toEqual('abc');
    expect(itools.stripTags('<ab/>abc<ab>')).toEqual('abc');
    expect(itools.stripTags('<ab/>abc<ab><ab><ab><ab>')).toEqual('abc');
    expect(itools.stripTags('<AB/>abc<ab><AB><ab><AB>')).toEqual('abc');
    expect(itools.stripTags('<ab/>abc<ab/>')).toEqual('abc');
    expect(itools.stripTags('<AB/>abc<><AB>123<ab><AB>')).toEqual('abc<>123');

    expect(itools.stripTags('<ab/><ab/>')).toEqual('');
    expect(itools.stripTags('<!-- test -->')).toEqual('');
    expect(itools.stripTags('<script>tst</srcipt>')).toEqual('tst');
    expect(
      itools.stripTags(
        '<script type="text/javascript"><!--document.write("!"); //--></script>'
      )
    ).toEqual('');

    expect(itools.stripTags('<!DOCTYPE html>')).toEqual('');
    expect(itools.stripTags('   ')).toEqual('   ');
    done();
  });
});
