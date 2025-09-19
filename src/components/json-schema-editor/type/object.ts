interface AttrInfo {
  name: string;
  type: string;
}

interface Value {
  description: string | null;
  maxProperties: number | null;
  minProperties: number | null;
}

interface Attr {
  description: AttrInfo;
  maxProperties: AttrInfo;
  minProperties: AttrInfo;
}

interface Wrapper {
  value: Value;
  attr: Attr;
}

const value: Value = {
  description: null,
  maxProperties: null,
  minProperties: null,
};

const attr: Attr = {
  description: {
    name: '描述',
    type: 'string',
  },
  maxProperties: {
    name: '最大元素个数',
    type: 'integer',
  },
  minProperties: {
    name: '最小元素个数',
    type: 'integer',
  },
};

const wrapper: Wrapper = { value, attr };
export default wrapper;
