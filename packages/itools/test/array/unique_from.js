import itools from '../itools';

describe('uniqueFrom', () => {
  test('itools.uniqueFrom is a Function', () => {
    expect(itools.uniqueFrom).toBeInstanceOf(Function);
  });

  test('itools.uniqueFrom works for properties', () => {
    let array = [
      { name: 'n1', id: '1' },
      { name: 'n2', id: '11' },
      { name: 'n3', id: '12' },
      { name: 'n2', id: '11' }
    ];

    expect(itools.uniqueFrom(array, 'name')).toEqual([
      { name: 'n1', id: '1' },
      { name: 'n2', id: '11' },
      { name: 'n3', id: '12' }
    ]);

    expect(itools.uniqueFrom(array, 'id')).toEqual([
      { name: 'n1', id: '1' },
      { name: 'n2', id: '11' },
      { name: 'n3', id: '12' }
    ]);
  });
});
