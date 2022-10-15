import itools from '../itools';
import { deburredLetters } from '../const';

describe('random', () => {
  const random = itools.random(deburredLetters);
  it('base case', () => {
    expect(itools.contains(deburredLetters, random)).toBe(true);
  });
});
