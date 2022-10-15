/* eslint-disable no-invalid-this */
export default function debounce(fn, wait, callFirst) {
  let timeout;
  return function () {
    if (!wait) {
      return fn.apply(this, arguments);
    }
    let self = this;
    let args = arguments;
    let callNow = callFirst && !timeout;
    clearTimeout(timeout);
    timeout = setTimeout(function () {
      timeout = null;
      if (!callNow) {
        return fn.apply(self, args);
      }
    }, wait);

    if (callNow) {
      return fn.apply(this, arguments);
    }
  };
}
