import itools from '../itools';

describe('chainAsync', () => {
  test('itools.chainAsync() is a Function', () => {
    expect(itools.chainAsync).toBeInstanceOf(Function);
  });

  let incrementer = 0;
  test('Calls all functions in an array', () => {
    itools.chainAsync([
      (next) => {
        incrementer += 1;
        next();
      },
      (next) => {
        incrementer += 1;
        next();
      },
      (next) => {
        expect(incrementer).toEqual(2);
      },
    ]);
  });

  test('Last function does not receive "next" argument', () => {
    itools.chainAsync([
      (next) => {
        next();
      },
      (next) => {
        expect(next).toBe(undefined);
      },
    ]);
  });
});
