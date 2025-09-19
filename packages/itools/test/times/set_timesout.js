import itools from '../itools';

describe('setTimesout', function () {
  test('setTimesout is a Function', () => {
    expect(itools.setTimesout).toBeInstanceOf(Function);
  });

  test('base example', () => {
    const repeat = 8;
    const skip = 50;
    const cb = () => {
      return 'abc';
    };
    const id = itools.setTimesout(
      function (word) {
        // console.log(this); // log {index: 3 ,times: 8, over: false}
        if (this.over) {
          expect(this.times).toEqual(repeat);
          expect(this.over).toBe(true);
          expect(word()).toEqual('abc');
        } else {
          expect(this.times > this.index).toBe(true);
        }
      },
      skip,
      repeat,
      cb
    );
    expect(typeof id === 'number').toEqual(itools.isNumber(id));
  });
});
