import expect from 'expect';
import itools from '../itools';

describe('forEach', function () {
  it('object', function () {
    const ctx = { keys: [] };

    itools.forEach(
      { a: 1, b: 2 },
      (val, key) => {
        ctx.keys.push(key);
      },
      ctx
    );
    expect(ctx.keys).toContain('a');
    expect(ctx.keys).toContain('b');
  });

  it('array', function () {
    const arr = [0, 1];
    itools.forEach(arr, function (val, i) {
      arr[i] = val * 2;
    });

    expect(arr).toEqual([0, 2]);
  });
});
