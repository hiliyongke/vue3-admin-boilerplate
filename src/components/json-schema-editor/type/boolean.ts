interface AttrInfo {
  name: string;
  type: string;
}

interface Value {
  description: string | null;
}

interface Attr {
  description: AttrInfo;
}

interface Wrapper {
  value: Value;
  attr: Attr;
}

const value: Value = {
  description: null,
};

const attr: Attr = {
  description: {
    name: '描述',
    type: 'string',
  },
};

const wrapper: Wrapper = { value, attr };
export default wrapper;
