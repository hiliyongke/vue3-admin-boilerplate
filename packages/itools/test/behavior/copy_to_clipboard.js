import itools from '../itools';

describe('copyToClipboard', () => {
  test('copyToClipboard is a Function', () => {
    expect(itools.copyToClipboard).toBeInstanceOf(Function);
  });
  test('copyToClipboard does not throw errors', () => {
    document.getSelection = function () {
      return {
        rangeCount: 0,
        removeAllRanges() {},
        addRange(x) {
          return x;
        },
      };
    };
    document.execCommand = function (x) {
      return x;
    };

    expect(itools.copyToClipboard('hi')).toBe(undefined);
  });
  test('copyToClipboard does not throw errors', () => {
    document.getSelection = function () {
      return {
        rangeCount: 1,
        getRangeAt(x) {
          return x + 1;
        },
        removeAllRanges() {},
        addRange(x) {
          return x;
        },
      };
    };
    document.execCommand = function (x) {
      return x;
    };

    expect(itools.copyToClipboard('hi')).toBe(undefined);
  });
});
