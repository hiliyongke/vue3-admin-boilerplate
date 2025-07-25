interface AttrInfo {
  name: string;
  type: string;
  enums?: string[];
}

interface Value {
  description: string | null;
  maxLength: number | null;
  minLength: number | null;
  pattern: string | null;
  format: string | undefined;
  enum: string[] | undefined;
}

interface Attr {
  description: AttrInfo;
  maxLength: AttrInfo;
  minLength: AttrInfo;
  pattern: AttrInfo;
  format: AttrInfo;
  enum: AttrInfo;
}

interface Wrapper {
  value: Value;
  attr: Attr;
}

const value: Value = {
  description: null,
  maxLength: null,
  minLength: null,
  pattern: null,
  format: undefined,
  enum: undefined
};

const attr: Attr = {
  description: {
    name: '描述',
    type: 'string'
  },
  maxLength: {
    name: '最大字符数',
    type: 'integer'
  },
  minLength: {
    name: '最小字符数',
    type: 'integer'
  },
  pattern: {
    name: '正则表达式',
    type: 'string'
  },
  format: {
    name: '格式',
    type: 'array',
    enums: ['date', 'date-time', 'email', 'hostname', 'ipv4', 'ipv6', 'uri']
  },
  enum: {
    name: '枚举',
    type: 'array'
  }
};

const wrapper: Wrapper = { value, attr };
export default wrapper;
