/**
 * @description ProTable 组件接口定义
 */

export interface ColumnProps {
  /** 列标题 */
  title?: string;
  /** 标签 */
  label?: string;
  /** 数据索引 */
  dataIndex?: string;
  /** 属性名 */
  prop?: string;
  /** 列宽度 */
  width?: number | string;
  /** 是否可排序 */
  sortable?: boolean;
  /** 是否可筛选 */
  filterable?: boolean;
  /** 列类型 */
  type?: 'text' | 'number' | 'date' | 'select' | 'custom';
  /** 搜索类型 */
  searchType?: 'input' | 'select' | 'date' | 'daterange' | 'datetimerange' | 'number' | 'text';
  /** 初始搜索参数 */
  initSearchParam?: any;
  /** 自定义渲染 */
  render?: (value: any, record: any, index: number) => any;
  /** 列对齐方式 */
  align?: 'left' | 'center' | 'right';
  /** 是否固定列 */
  fixed?: 'left' | 'right' | boolean;
  /** 列是否可见 */
  visible?: boolean;
  /** 搜索配置 */
  search?: {
    /** 搜索类型 */
    type?: 'input' | 'select' | 'date' | 'daterange';
    /** 搜索选项 */
    options?: Array<{ label: string; value: any }>;
    /** 搜索占位符 */
    placeholder?: string;
  };
}

export interface TableProps {
  /** 表格数据 */
  data?: any[];
  /** 表格列配置 */
  columns?: ColumnProps[];
  /** 是否显示分页 */
  pagination?: boolean;
  /** 分页配置 */
  paginationProps?: {
    current?: number;
    pageSize?: number;
    total?: number;
    showSizeChanger?: boolean;
    showQuickJumper?: boolean;
  };
  /** 是否显示搜索表单 */
  search?: boolean;
  /** 搜索表单配置 */
  searchProps?: {
    labelWidth?: number | string;
    collapsed?: boolean;
    collapseRender?: (collapsed: boolean) => string;
  };
  /** 表格加载状态 */
  loading?: boolean;
  /** 行选择配置 */
  rowSelection?: {
    type?: 'checkbox' | 'radio';
    selectedRowKeys?: any[];
    onChange?: (selectedRowKeys: any[], selectedRows: any[]) => void;
  };
}
