import itools from '../itools';

describe('clearTimesout', function () {
  test('clearTimesout is a Function', () => {
    expect(itools.clearTimesout).toBeInstanceOf(Function);
  });

  test('base example', () => {
    let i = 0;
    const less = 6;
    let interval = setInterval(function () {
      console.log(i++);
      if (i > less) {
        itools.clearTimesout(interval);
        expect(i).toBeLessThan(less);
      }
    }, 1);

    expect(itools.clearTimesout(interval)).toEqual(
      window.clearInterval(interval)
    );
  });
});
