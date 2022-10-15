import itools from '../itools';

describe('elementContains', () => {
  test('elementContains is a Function', () => {
    expect(itools.elementContains).toBeInstanceOf(Function);
  });
  test('elementContains returns true', () => {
    let p = document.createElement('div');
    let c = p.appendChild(document.createElement('div'));
    expect(itools.elementContains(p, c)).toBeTruthy();
  });
  test('elementContains returns false', () => {
    let p = document.createElement('div');
    let c = document.createElement('div');
    expect(itools.elementContains(p, c)).toBeFalsy();
  });
});
