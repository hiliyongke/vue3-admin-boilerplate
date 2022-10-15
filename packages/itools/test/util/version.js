import { REGEXP_SEMVER } from '../const';
import itools from '../itools';

describe('version', function () {
  it('should match semantic version number pattern', function () {
    expect(REGEXP_SEMVER.test(itools.version)).toBe(true);
  });
});
