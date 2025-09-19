/* eslint-disable prefer-promise-reject-errors */
/**
 * @param {any} attempt
 * @param {any} options
 *  interval: 200,  //ms
 *  retries: 2
 *  timeout: 8000 //ms
 */
export default function (attempt, options) {
  const option = options || {};
  const interval = option.interval || 400;
  const retries = option.retries || 2;
  const timeout = option.timeout || 8000;

  function rejectDelay(reason) {
    return new Promise(function (resolve, reject) {
      setTimeout(reject.bind(null, reason), interval);
    });
  }

  let p = Promise.reject();
  for (let i = 0; i < retries; i++) {
    p = p.catch(timeoutReject(attempt, timeout)).catch(rejectDelay);
  }

  return p;
}

function timeoutReject(task, timeout) {
  let timer;

  return function () {
    return Promise.race([
      Promise.reject().catch(task),
      new Promise(function (rs, rj) {
        timer = setTimeout(function () {
          rj('timeout.');
        }, timeout || 8000);
      }),
    ]).then(
      function (r) {
        clearTimeout(timer);
        return r;
      },
      function (err) {
        return Promise.reject(err);
      }
    );
  };
}
