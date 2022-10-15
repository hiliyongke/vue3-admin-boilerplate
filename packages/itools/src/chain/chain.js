import ChainWrapper from './wrapper';

export default function chain(subject) {
  return new ChainWrapper(subject, true);
}
