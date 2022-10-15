import itools from '../itools';
import assert from 'assert';

describe('min', function () {
  it('should return the largest value from a collection', function () {
    assert.strictEqual(itools.min([1, 2, 3]), 1);
  });
});
