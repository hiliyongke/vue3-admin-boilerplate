import itools from '../itools';

describe('toJson', () => {
  test('itools.toJson() is a Function', () => {
    expect(itools.toJson).toBeInstanceOf(Function);
  });

  test('should pass example', () => {
    const a = '{"a":"[Function function () {}]"}';
    const b = '{"a":1,"b":"[Circular ~]"}';
    const res = "{ code: 0 , msg: 'msg' , data: {} }";

    expect(itools.toJson(a)).toEqual({
      a: '[Function function () {}]',
    });

    expect(itools.toJson(b)).toEqual({
      a: 1,
      b: '[Circular ~]',
    });

    expect(itools.toJson(res)).toEqual({ code: 0, msg: 'msg', data: {} });

    expect(itools.toJson()).toEqual(null);

    expect(
      itools.toJson({
        a: 1,
        b: 2,
      })
    ).toEqual({
      a: 1,
      b: 2,
    });
  });
});
