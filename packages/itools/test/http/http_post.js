import itools from '../itools';

describe('httpPost', () => {
  test('itools.httpPost() is a Function', () => {
    expect(itools.httpPost).toBeInstanceOf(Function);
  });

  test('httpPost', () => {
    itools.httpPost(
      'https://api.github.com/users',
      'hrout',
      res => {
        const cb = JSON.parse(res);
        expect(itools.isObject(cb)).toBe(true);
      },
      error => {
        console.log(error);
      }
    );
  });
});
