import itools from '../itools';

describe('allEqual', () => {
  it('base case', () => {
    expect(itools.allEqual(['a', 'a', 'a', 'a'])).toBe(true);
    expect(itools.allEqual(['a', 'a', 'b', 'a'])).toBe(false);
  });

  it('base case2', () => {
    expect(itools.allEqual(['false', ''])).toBe(false);
    expect(itools.allEqual(['false', 'false'])).toBe(true);
    expect(itools.allEqual(['false', false])).toBe(false);
    expect(itools.allEqual([NaN, NaN])).toBe(false);
  });

  // it('special case', () => {
  //   expect(itools.allEqual(null)).toBe(false);
  //   expect(itools.allEqual([])).toBe(true);
  //   expect(itools.allEqual({})).toBe(false);
  //   expect(itools.allEqual([1])).toBe(false);
  //   expect(itools.allEqual([1, 2])).toBe(false);
  //   expect(itools.allEqual(NaN)).toBe(false);
  // });
});
