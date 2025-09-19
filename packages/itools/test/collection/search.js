import itools from '../itools';

describe('search', () => {
  it('should pass example 1', () => {
    const expected = 'surname';
    const result = itools.search('zonneveld', {
      firstname: 'kevin',
      middle: 'van',
      surname: 'zonneveld',
    });
    expect(result).toEqual(expected);
  });

  it('should pass example 2', () => {
    const expected = 'a';
    const result = itools.search('3', { a: 3, b: 5, c: 7 });
    expect(result).toEqual(expected);
  });

  it('should pass example 3', () => {
    const expected = 'a';
    const result = itools.search('3', { a: 3, b: 5, c: 7 });
    expect(result).toEqual(expected);
    expect(itools.search('3', { a: 3, b: 5, c: 7 }, 0)).toEqual(expected);
  });

  it('should pass example 3', () => {
    expect(itools.search({})).toEqual(false);
    expect(itools.search([])).toEqual(false);
    expect(itools.search(null)).toEqual(false);
    expect(itools.search('1')).toEqual(false);
    expect(itools.search(() => {})).toEqual(false);
    expect(itools.search({}, {}, {})).toEqual(false);
  });
});
