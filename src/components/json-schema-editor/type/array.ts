interface AttrInfo {
  name: string;
  type: string;
}

interface Value {
  description: string | null;
  minItems: number | null;
  maxItems: number | null;
  uniqueItems: boolean;
}

interface Attr {
  description: AttrInfo;
  maxItems: AttrInfo;
  minItems: AttrInfo;
  uniqueItems: AttrInfo;
}

interface Wrapper {
  value: Value;
  attr: Attr;
}

const value: Value = {
  description: null,
  minItems: null,
  maxItems: null,
  uniqueItems: false
};

const attr: Attr = {
  description: {
    name: '描述',
    type: 'string'
  },
  maxItems: {
    name: '最大元素个数',
    type: 'integer'
  },
  minItems: {
    name: '最小元素个数',
    type: 'integer'
  },
  uniqueItems: {
    name: '元素不可重复',
    type: 'boolean'
  }
};

const wrapper: Wrapper = { value, attr };
export default wrapper;
