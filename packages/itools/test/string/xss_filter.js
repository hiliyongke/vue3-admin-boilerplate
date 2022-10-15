import itools from '../itools';

describe('xssFilter', function () {
  test('should pass base example 1', function () {
    const uncode =
      '<div>x-html<img src="/itools/image.png" onerror="onError()"></div>';
    const filterCode =
      '&lt;div&gt;x-html&lt;img src=&quot;/itools/image.png&quot; onerror=&quot;onError()&quot;&gt;&lt;/div&gt;';
    expect(itools.xssFilter(uncode)).toStrictEqual(filterCode);
  });
});
