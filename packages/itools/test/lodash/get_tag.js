import assert from 'assert';
import { funcTag, numberTag, objectTag, arrayTag } from '../const';
import lodashStable from 'lodash';
import itools from '../itools';

describe('getTag', function () {
  let tags = [() => {}, 0, {}, []];
  let tagsName = [funcTag, numberTag, objectTag, arrayTag];
  lodashStable.each(tags, (methodName, index) => {
    it(
      'itools.getTag' + tagsName[index] + '` should support shortcut fusion',
      () => {
        assert.strictEqual(itools.getTag(methodName), tagsName[index]);
      }
    );
  });
});
