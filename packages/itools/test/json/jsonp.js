import itools from '../itools';
describe('jsonp', () => {
  const url = './';
  // const url = 'https://view.inews.qq.com/g2/getOnsInfo?name=wuwei_ww_ww_share_action';
  // window.URL.createObjectURL = jest.fn();
  // afterEach(() => {
  //   window.URL.createObjectURL.mockReset();
  // });
  // const url = URL.createObjectURL('callback({a: 1});');

  test('itools.jsonp() is a Function', () => {
    expect(itools.jsonp).toBeInstanceOf(Function);
  });

  it('should pass only url', () => {
    itools.jsonp(url);
  }, 9999);

  it('should pass example', () => {
    itools.jsonp(
      url,
      {
        name: 'callback',
      },
      (err, data) => {
        expect(itools.has(data, 'data')).toBe(true);
      }
    );
  }, 9999);

  it('should pass example 2', () => {
    itools.jsonp(
      url,
      (err, data) => {
        expect(itools.has(data, 'data')).toBe(true);
      },
      {
        name: 'callback',
      }
    );
  }, 9999);

  it('should pass example 3', () => {
    itools.jsonp(
      url,
      (err, data) => {
        expect(itools.has(data, 'data')).toBe(true);
      },
      {
        name: 'callback',
        timeout: 100,
        prefix: 'itools',
        param: {
          a: 1,
          b: 2,
        },
      }
    );
  }, 9999);
});
