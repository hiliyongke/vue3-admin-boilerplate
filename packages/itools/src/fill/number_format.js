/**
 * https://locutus.io/php/
 */

const numberFormat = (number, decimals, decPoint, thousandsSep) => {
  const _number = String(number).replace(/[^0-9+\-Ee.]/g, '');
  const _decimals = decimals;
  const n = !isFinite(Number(_number)) ? 0 : Number(_number);
  const prec = !isFinite(Number(_decimals)) ? 0 : Math.abs(_decimals);
  const sep = typeof thousandsSep === 'undefined' ? ',' : thousandsSep;
  const dec = typeof decPoint === 'undefined' ? '.' : decPoint;
  let s = '';

  const toFixedFix = function (n, prec) {
    if (String(n).indexOf('e') === -1) {
      return Number(`${Math.round(`${n}e+${prec}`)}e-${prec}`);
    } else {
      const arr = String(n).split('e');
      let sig = '';
      if (Number(arr[1]) + prec > 0) {
        sig = '+';
      }
      return Number(`${Math.round(`${Number(arr[0])}e${sig}${Number(arr[1]) + prec}`)}e-${prec}`).toFixed(prec);
    }
  };

  // @todo: for IE parseFloat(0.55).toFixed(0) = 0;
  s = (prec ? toFixedFix(n, prec).toString() : String(Math.round(n))).split('.');
  if (s[0].length > 3) {
    s[0] = s[0].replace(/\B(?=(?:\d{3})+(?!\d))/g, sep);
  }
  if ((s[1] || '').length < prec) {
    s[1] = s[1] || '';
    s[1] += new Array(prec - s[1].length + 1).join('0');
  }

  return s.join(dec);
};

export default numberFormat;
