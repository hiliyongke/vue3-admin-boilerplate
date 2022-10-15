import itools from '../itools';

describe('call', () => {
  test('itools.call is a Function', () => {
    expect(itools.call).toBeInstanceOf(Function);
  });

  test('calls function on given object', () => {
    expect(itools.call('map', x => x * 2)([1, 2, 3])).toEqual([2, 4, 6]);
  });
});
