/**
 * to json
 */

// eval hack
const evil = (fn) => {
  // A variable points to Function, preventing reporting errors
  const Fn = Function;
  return new Fn(`return ${fn}`)();
};

// itools.toJSON = itools.tojson = itools.toJson
const toJson = (res) => {
  if (!res) return null;

  if (typeof res === 'string') {
    try {
      return JSON.parse(res);
    } catch (e) {
      return evil(`(${res})`);
    }
  } else {
    return res;
  }
};

export default toJson;
