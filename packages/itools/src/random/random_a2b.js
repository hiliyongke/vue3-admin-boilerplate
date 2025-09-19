// itools.randomFromA2B = itools.randomA2B
const randomA2B = (a, b, int) => {
  const result = Math.random() * (b - a) + a;
  return int ? Math.floor(result) : result;
};

export default randomA2B;
