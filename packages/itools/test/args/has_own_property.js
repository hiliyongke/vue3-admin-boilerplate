import itools from '../itools';

describe('hasOwnProperty', () => {
  test('itools.hasOwnProperty is a Function', () => {
    expect(itools.hasOwnProperty).toBeInstanceOf(Function);
  });

  test('should pass example 1', () => {
    const object = {};
    object.property1 = 42;

    expect(itools.hasOwnProperty(object, 'property1')).toBe(true);
    expect(itools.hasOwnProperty(object, 'toString')).toBe(false);
  });
});
