import itools from '../itools';

describe('camelize', function () {
  test('_ or - to camelCase', function () {
    expect(itools.camelize('to-upper-case')).toStrictEqual('toUpperCase');
  });
  test('base case', function () {
    expect(itools.camelize('toUpperCase')).toStrictEqual('toUpperCase');
  });
});
