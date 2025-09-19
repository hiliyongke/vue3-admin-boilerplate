import itools from '../itools';

describe('elementContains', () => {
  test('elementContains is a Function', () => {
    expect(itools.elementContains).toBeInstanceOf(Function);
  });
  test('elementContains returns true', () => {
    const p = document.createElement('div');
    const c = p.appendChild(document.createElement('div'));
    expect(itools.elementContains(p, c)).toBeTruthy();
  });
  test('elementContains returns false', () => {
    const p = document.createElement('div');
    const c = document.createElement('div');
    expect(itools.elementContains(p, c)).toBeFalsy();
  });
});
