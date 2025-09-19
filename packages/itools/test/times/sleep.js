import { performance } from 'perf_hooks';
import itools from '../itools';

describe('sleep', function () {
  test('async await', async () => {
    const start = performance.now();
    await itools.sleep(20);
    expect(performance.now() - start).toBeGreaterThanOrEqual(19);
  });

  test('then', async () => {
    const start = performance.now();
    return itools.sleep(20).then(() => {
      expect(performance.now() - start).toBeGreaterThanOrEqual(19);
    });
  });

  test('promise chain value passing', async () =>
    Promise.resolve()
      .then(() => 'test')
      .then(itools.sleep(20))
      .then((value) => {
        expect(value).toEqual('test');
      }));

  test('promise chain itools.sleeping', async () => {
    const start = performance.now();

    return Promise.resolve()
      .then(itools.sleep(20))
      .then(() => {
        expect(performance.now() - start).toBeGreaterThanOrEqual(19);
      });
  });

  test('delayed itools.sleep', async () => {
    const start = performance.now();

    const sleepPromise = itools.sleep(20);
    await itools.sleep(20);

    return sleepPromise.then(() => {
      const end = performance.now();

      expect(end - start).toBeGreaterThanOrEqual(19);
      expect(end - start).toBeLessThan(30);
    });
  });

  test('delayed promise chain itools.sleeping', async () => {
    const start = performance.now();

    const sleepPromise = itools.sleep(20);

    return (
      itools
        .sleep(20)
        .then(() => 'test')
        // Must not itools.sleep again because 'sleepPromise' is already resolved
        .then(sleepPromise)
        .then(() => {
          const end = performance.now();

          expect(end - start).toBeGreaterThanOrEqual(19);
          expect(end - start).toBeLessThan(30);
        })
    );
  });

  test('delayed promise chain value passing', async () => {
    const sleepPromise = itools.sleep(0);

    return itools
      .sleep(0)
      .then(() => 'test')
      .then(sleepPromise)
      .then((value) => {
        expect(value).toEqual('test');
      });
  });

  test('call global setTimeout (default)', async () => {
    const spySetTimeout = jest.spyOn(global, 'setTimeout');
    await itools.sleep(0);
    expect(spySetTimeout).toHaveBeenCalledTimes(1);
  });

  test('call cached setTimeout', async () => {
    const spySetTimeout = jest.spyOn(global, 'setTimeout');

    // Replace global setTimeout
    jest.useFakeTimers();

    await itools.sleep(0, {
      useCachedSetTimeout: true,
    });

    expect(setTimeout).toHaveBeenCalledTimes(0);
    expect(spySetTimeout).toHaveBeenCalledTimes(1);
  });
});
