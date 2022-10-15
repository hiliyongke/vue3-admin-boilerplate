import itools from '../itools';

describe('uuid', () => {
  test('itools.uuid() is a Function', () => {
    expect(itools.uuid).toBeInstanceOf(Function);
  });

  test('itools.uuid()', () => {
    const regUuid =
      /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/;
    for (let i = 0; i < 1000; i++) {
      expect(regUuid.test(itools.uuid())).toBe(true);
    }
  });
});
