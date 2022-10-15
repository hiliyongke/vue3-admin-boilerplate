import itools from '../itools';

describe('httpGet', () => {
  test('itools.httpGet() is a Function', () => {
    expect(itools.httpGet).toBeInstanceOf(Function);
  });

  test('httpGet', () => {
    itools.httpGet(
      'https://api.github.com/',
      res => {
        const cb = JSON.parse(res); // {message: "API...", documentation_url: "https://developer.github.com/v3/#rate-limiting"}
        expect(itools.isObject(cb)).toBe(true);
      },
      error => {
        console.log(error);
      }
    );
  });
});
