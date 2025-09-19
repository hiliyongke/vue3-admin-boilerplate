import itools from '../itools';

describe('randomColor', () => {
  test('itools.randomColor() is a Function', () => {
    expect(itools.randomColor).toBeInstanceOf(Function);
  });

  test('should pass example', () => {
    const isColor = (strColor) => {
      const s = new Option().style;
      s.color = strColor;
      const test1 = s.color === strColor;
      const test2 = /^#[0-9A-F]{6}$/i.test(strColor);
      if (test1 === true || test2 === true) {
        return true;
      } else {
        return false;
      }
    };

    const num = 20;
    for (let i = 0; i < num.length; i++) {
      expect(isColor(itools.randomColor())).toBe(true);
    }
    const testColor = itools.randomColor();
    expect(isColor(testColor)).toBe(true);
    expect(isColor('red')).toBe(true);
    expect(isColor('reds')).toBe(false);
    expect(isColor('#ff0000')).toBe(true);
    expect(isColor('#ff000011')).toBe(false);
  });
});
