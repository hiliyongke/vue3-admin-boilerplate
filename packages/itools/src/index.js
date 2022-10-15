import chain from './chain/chain';
import ChainWrapper from './chain/wrapper';
import functions from './functions';

function itools(subject) {
  return new ChainWrapper(subject, false);
}

Object.assign(itools, functions, {
  chain
});

export default itools;
