export default function construct() {
  const classs = arguments[0];
  return new (Function.prototype.bind.apply(classs, arguments))();
}
