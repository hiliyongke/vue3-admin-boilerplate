import itools from '../itools';

describe('capwords', function () {
  test('should pass base example 1', function () {
    expect(itools.capwords('kevin van  zonneveld')).toStrictEqual(
      'Kevin Van  Zonneveld'
    );
    expect(itools.capwords('HELLO WORLD')).toStrictEqual('HELLO WORLD');
  });
});
