import itools from '../itools';
import { deburredLetters } from '../const';

describe('random', () => {
  const random = itools.randomSize(deburredLetters, Math.floor(Math.random() * 50) + 1);
  it('base case', () => {
    expect(itools.includesAll(deburredLetters, random)).toBe(true);
    expect(itools.randomSize([1])).toEqual([1]);
    expect(itools.randomSize([])).toEqual([]);
  });
});
