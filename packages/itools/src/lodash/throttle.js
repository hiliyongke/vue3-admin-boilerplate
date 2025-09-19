export default function throttle(fn, interval, callFirst) {
  let wait = false;
  let callNow = false;
  return function () {
    callNow = callFirst && !wait;
    const self = this;
    const args = arguments;
    if (!wait) {
      wait = true;
      setTimeout(function () {
        wait = false;
        if (!callFirst) {
          return fn.apply(self, args);
        }
      }, interval);
    }
    if (callNow) {
      callNow = false;
      return fn.apply(this, arguments);
    }
  };
}
