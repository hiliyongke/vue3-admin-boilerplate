import itools from '../itools';

describe('underscored', function () {
  test('Turn CamelCase to _ ', function () {
    expect(itools.underscored('toUpperCase')).toStrictEqual('to_upper_case');
  });
});
