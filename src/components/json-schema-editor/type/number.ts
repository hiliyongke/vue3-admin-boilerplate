interface AttrInfo {
  name: string;
  type: string;
}

interface Value {
  description: string | null;
  maximum: number | null;
  minimum: number | null;
  exclusiveMaximum: boolean | null;
  exclusiveMinimum: boolean | null;
  enum: number[];
}

interface Attr {
  description: AttrInfo;
  maximum: AttrInfo;
  minimum: AttrInfo;
  exclusiveMaximum: AttrInfo;
  exclusiveMinimum: AttrInfo;
  enum: AttrInfo;
}

interface Wrapper {
  value: Value;
  attr: Attr;
}

const value: Value = {
  description: null,
  maximum: null,
  minimum: null,
  exclusiveMaximum: null,
  exclusiveMinimum: null,
  enum: []
};

const attr: Attr = {
  description: {
    name: '描述',
    type: 'string'
  },
  maximum: {
    name: '最大值',
    type: 'number'
  },
  minimum: {
    name: '最小值',
    type: 'number'
  },
  exclusiveMaximum: {
    name: '不包含最大值',
    type: 'boolean'
  },
  exclusiveMinimum: {
    name: '不包含最小值',
    type: 'boolean'
  },
  enum: {
    name: '枚举',
    type: 'array'
  }
};

const wrapper: Wrapper = { value, attr };
export default wrapper;
