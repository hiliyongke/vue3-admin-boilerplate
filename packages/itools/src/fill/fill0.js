export default function fill0(num) {
  const _num = parseFloat(num);
  return _num < 10 ? `0${_num}` : String(_num);
}
