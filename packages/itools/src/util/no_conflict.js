/* eslint-disable no-invalid-this */
import getGlobalObject from './get_global';

const globalObject = getGlobalObject();
const previous = globalObject.itools;

export default function noConflict() {
  if (this === globalObject.itools) {
    globalObject.itools = previous;
  }
  return this;
}
