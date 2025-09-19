import itools from '../itools';

describe('extend', () => {
  test('shallow extend merges properties', function () {
    const src = { a: 3, b: 5 };
    expect(itools.extend(src, { a: 4, c: 8 })).toEqual({ a: 4, b: 5, c: 8 });
    expect(itools.extend(src)).toEqual({ a: 4, b: 5, c: 8 });
  });

  test('shallow extend merges into new object', function () {
    const src = {};
    expect(itools.extend(src, { a: 3, b: 5 }, { a: 4, c: 8 })).toEqual({
      a: 4,
      b: 5,
      c: 8,
    });
    expect(src).toEqual({ a: 4, b: 5, c: 8 });
  });

  test('shallow extend does not clone child objects', function () {
    const obj = { p: 4 };
    const src2 = { a: 3, b: 5 };
    expect(itools.extend(src2, { c: obj })).toEqual({
      a: 3,
      b: 5,
      c: { p: 4 },
    });

    obj.p = 9;
    expect(src2).toEqual({ a: 3, b: 5, c: { p: 9 } });

    const arrInner = [1, 2, 3];
    const arrOuter = ['a', 'b', arrInner];
    const src1 = { a: 3, b: 5 };

    expect(itools.extend(src1, { c: arrOuter })).toEqual({
      a: 3,
      b: 5,
      c: ['a', 'b', [1, 2, 3]],
    });
    expect(arrOuter).toEqual(src1.c);
    expect(arrInner).toEqual(src1.c[2]);
  });

  test('shallow extend copies non-plain objects', function () {
    const fn = function (a, b) {
      return a + b;
    };
    const src2 = { a: 3, b: 5 };
    expect(itools.extend(src2, { c: fn })).toEqual({ a: 3, b: 5, c: fn });
    expect(src2).toEqual({ a: 3, b: 5, c: fn });
    expect(src2.c(4, 2)).toEqual(6);

    fn.x = 34;
    expect(src2.c.x).toEqual(34);

    const date = new Date(1510439803151);
    const src3 = { a: 3, b: 5 };
    expect(itools.extend(src3, { c: date })).toEqual({ a: 3, b: 5, c: date });
    expect(src3).toEqual({ a: 3, b: 5, c: date });
    expect(src3.c.getTime()).toEqual(1510439803151);

    date.x = 34;
    expect(src3.c.x).toEqual(34);

    const regex = /abc/;
    expect(itools.extend(src3, { c: regex })).toEqual({ a: 3, b: 5, c: regex });

    expect(src3).toEqual({ a: 3, b: 5, c: regex });
    expect(src3.c.exec('ddabc').index).toEqual(2);
    regex.x = 34;
    expect(src3.c.x).toEqual(34);
  });

  test('deep extend merges child objects', function () {
    const obj = { a: { b: 'c' } };
    const obj2 = { a: { c: 'd' } };

    expect(itools.extend(true, obj, obj2)).toEqual({ a: { b: 'c', c: 'd' } });
    expect(obj).toEqual({ a: { b: 'c', c: 'd' } });
  });

  test('deep extend clones child plain objects and arrays', function () {
    const obj = { p: 4 };
    const src2 = { a: 3, b: 5 };
    expect(itools.extend(true, src2, { c: obj })).toEqual({
      a: 3,
      b: 5,
      c: { p: 4 },
    });
    obj.p = 9;
    expect(src2).toEqual({ a: 3, b: 5, c: { p: 4 } });

    const arrInner = [1, 2, 3];
    const arrOuter = ['a', 'b', arrInner];
    const src1 = { a: 3, b: 5 };
    expect(itools.extend(true, src1, { c: arrOuter })).toEqual({
      a: 3,
      b: 5,
      c: ['a', 'b', [1, 2, 3]],
    });
  });

  test('deep extend extendees can be primitive values', function () {
    const obj1 = { a: null, b: null, c: null };
    const obj2 = { a: { foo: 'str' }, b: { bar: 5 } };
    const obj3 = itools.extend(true, {}, obj1, obj2);
    expect(obj3).toEqual({ a: { foo: 'str' }, b: { bar: 5 }, c: null });
  });
});
