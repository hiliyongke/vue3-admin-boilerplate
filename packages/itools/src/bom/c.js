import attr from './attr';

export default function c(t, cn, i, id) {
  const el = document.createElement(t);
  if (cn) {
    attr(el, 'class', cn);
  }
  if (i) {
    el.innerHTML = i;
  }
  if (id) {
    attr(el, 'id', id);
  }
  return el;
}
