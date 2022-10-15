import itools from '../itools';

describe('detailedDiff', function () {
  test('base case', function () {
    const lhs = {
      foo: {
        bar: {
          a: ['a', 'b'],
          b: 2,
          c: ['x', 'y'],
          e: 100 // deleted
        }
      },
      buzz: 'world'
    };

    const rhs = {
      foo: {
        bar: {
          a: ['a'], // index 1 ('b')  deleted
          b: 2, // unchanged
          c: ['x', 'y', 'z'], // 'z' added
          d: 'Hello, world!' // added
        }
      },
      buzz: 'fizz' // updated
    };

    const detailedDiffValue = itools.detailedDiff(lhs, rhs);

    expect(itools.detailedDiff(lhs, rhs)).toStrictEqual(detailedDiffValue);
  });
});
