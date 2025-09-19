import args from '../args/args';
import clearTimesout from '../times/clear_timesout';
/**
 * setInterval func fix times
 * https://stackoverflow.com/questions/2956966/javascript-telling-setinterval-to-only-fire-x-amount-of-times
 */
export default function setTimesout() {
  const func = arguments[0];
  const delay = arguments[1] === undefined ? 0 : parseFloat(arguments[1]);
  const times = arguments[2] === undefined ? 1 : parseInt(arguments[2], 10);
  const _args = arguments.length > 3 ? args(arguments, 3) : null;
  const target = {
    index: 0,
    times,
    over: false,
  };

  const id = setInterval(function () {
    target.index++;
    if (target.index > times) {
      clearTimesout(id);
    } else {
      if (target.index === times) target.over = true;
      func.apply(target, _args);
    }
  }, delay);

  return id;
}
