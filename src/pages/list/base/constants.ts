export const COLUMNS = [
  { colKey: 'row-select', type: 'multiple' as const, width: 64, fixed: 'left' as const },
  {
    title: '合同名称',
    align: 'left' as const,
    width: 300,
    colKey: 'name',
    fixed: 'left' as const,
  },
  { title: '合同状态', colKey: 'status', width: 200 },
  {
    title: '合同编号',
    width: 200,
    ellipsis: true,
    colKey: 'no',
  },
  {
    title: '合同类型',
    width: 200,
    ellipsis: true,
    colKey: 'contractType',
  },
  {
    title: '合同收付类型',
    width: 200,
    ellipsis: true,
    colKey: 'paymentType',
  },
  {
    title: '合同金额 (元)',
    width: 200,
    ellipsis: true,
    colKey: 'amount',
  },
  {
    align: 'left' as const,
    fixed: 'right' as const,
    width: 200,
    colKey: 'op',
    title: '操作',
  },
];
