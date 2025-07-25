import _object from './object';
import _string from './string';
import _array from './array';
import _boolean from './boolean';
import _integer from './integer';
import _number from './number';

const TYPE_NAME = ['string', 'number', 'integer', 'object', 'array', 'boolean'] as const;

type SchemaType = typeof TYPE_NAME[number];

interface AttrInfo {
  name: string;
  type: string;
  enums?: string[];
}

interface Value {
  [key: string]: any;
}

interface Attr {
  [key: string]: AttrInfo | any;
}

interface Wrapper {
  value: Value;
  attr: Attr;
}

const TYPE: Record<SchemaType, Wrapper> = {
  object: _object,
  string: _string,
  array: _array,
  boolean: _boolean,
  integer: _integer,
  number: _number
};

export { TYPE, TYPE_NAME };
export type { SchemaType, Wrapper };
