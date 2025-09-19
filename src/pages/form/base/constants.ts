export const FORM_RULES = {
  name: [{ required: true, message: '请输入合同名称', trigger: 'blur' as const }],
  type: [{ required: true, message: '请选择合同类型', trigger: 'change' as const }],
  payment: [{ required: true, message: '请选择合同收付类型', trigger: 'change' as const }],
  amount: [{ required: true, message: '请输入合同金额', trigger: 'blur' as const }],
  partyA: [{ required: true, message: '请选择甲方', trigger: 'change' as const }],
  partyB: [{ required: true, message: '请选择乙方', trigger: 'change' as const }],
  signDate: [{ required: true, message: '请选择日期', trigger: 'change' as const }],
  startDate: [{ required: true, message: '请选择日期', trigger: 'change' as const }],
  endDate: [{ required: true, message: '请选择日期', trigger: 'change' as const }],
};

export const INITIAL_DATA = {
  name: '',
  type: '',
  partyA: '',
  partyB: '',
  signDate: '',
  startDate: '',
  endDate: '',
  payment: '1',
  amount: 0,
  comment: '',
  files: [],
};

export const TYPE_OPTIONS = [
  { label: '类型A', value: '1' },
  { label: '类型B', value: '2' },
  { label: '类型C', value: '3' },
];

export const PARTY_A_OPTIONS = [
  { label: '公司A', value: '1' },
  { label: '公司B', value: '2' },
  { label: '公司C', value: '3' },
];

export const PARTY_B_OPTIONS = [
  { label: '公司A', value: '1' },
  { label: '公司B', value: '2' },
  { label: '公司C', value: '3' },
];
