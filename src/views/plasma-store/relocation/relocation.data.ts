import { BasicColumn, FormSchema } from '@/components/Table';

export const plasmaTrayColumns: BasicColumn[] = [
  {
    title: '托盘编号',
    dataIndex: '',
    slots: { customRender: 'trayNo' },
  },
  {
    title: '采浆公司',
    dataIndex: '',
  },
  {
    title: '血浆批次号',
    dataIndex: '',
  },
  {
    title: '箱号范围',
    dataIndex: '',
  },
  {
    title: '血浆箱数量',
    dataIndex: '',
  },
  {
    title: '血浆箱袋数',
    dataIndex: '',
  },
  {
    title: '库房',
    dataIndex: '',
  },
  {
    title: '货位',
    dataIndex: '',
  },
];

export const plasmaTraySearchSchema: FormSchema[] = [
  {
    label: '采浆公司',
    field: '',
    component: 'Select',
    colProps: { span: 6 },
  },
  {
    label: '投产准备号',
    field: '',
    component: 'Select',
    colProps: { span: 6 },
  },
  {
    label: '血浆批次号',
    field: '',
    component: 'Select',
    colProps: { span: 6 },
  },
  {
    label: '托盘编号',
    field: '',
    component: 'Select',
    colProps: { span: 6 },
  },
  {
    label: '血浆编号',
    field: '',
    component: 'Select',
    colProps: { span: 6 },
  },
];

export const plasmaTrayModelColumns: BasicColumn[] = [
  { title: '血浆批号', dataIndex: '' },
  { title: '血浆箱号', dataIndex: '' },
  { title: '血浆袋数', dataIndex: '' },
];

export const sampleTrayColumns: BasicColumn[] = [
  {
    title: '托盘编号',
    dataIndex: '',
    slots: { customRender: 'trayNo' },
  },
  {
    title: '采浆公司',
    dataIndex: '',
  },
  {
    title: '样品批号',
    dataIndex: '',
  },
  {
    title: '样品袋号范围',
    dataIndex: '',
  },
  {
    title: '样本类型',
    dataIndex: '',
  },
  {
    title: '样品袋数',
    dataIndex: '',
  },
  {
    title: '库房',
    dataIndex: '',
  },
  {
    title: '货位',
    dataIndex: '',
  },
];

export const sampleTraySearchSchema: FormSchema[] = [
  {
    label: '采浆公司',
    field: '',
    component: 'Select',
    colProps: { span: 6 },
  },
  {
    label: '样品类型',
    field: '',
    component: 'Select',
    colProps: { span: 6 },
  },
  {
    label: '样品批号',
    field: '',
    component: 'Select',
    colProps: { span: 6 },
  },
  {
    label: '托盘编号',
    field: '',
    component: 'Select',
    colProps: { span: 6 },
  },
];
export const sampleTrayModelColumns: BasicColumn[] = [
  { title: '样品批号', dataIndex: '' },
  { title: '样品袋号', dataIndex: '' },
  { title: '样品数量', dataIndex: '' },
];

export const trayInStoreFormSchemas: (opt: {
  changeFn: Function;
  searchFn: Function;
}) => FormSchema[] = ({ changeFn, searchFn }) => [
  {
    label: '托盘编号',
    field: 'trayNo',
    component: 'Input',
    colProps: { span: 6 },
  },
  {
    label: '目标库房',
    field: 'house',
    component: 'Select',
    colProps: { span: 6 },
    componentProps: {
      width: '300px',
      onChange: changeFn,
      options: [
        { label: '立体库', value: 'N' },
        { label: '平库', value: 'F' },
      ],
    },
  },
  {
    label: '目标货位',
    field: 'room',
    component: 'InputSearch',
    colProps: { span: 6 },
    componentProps: {
      'enter-button': '选择',
      onSearch: searchFn,
    },
  },
];

export const trayPrintColumns: BasicColumn[] = [
  {
    title: '托盘编号',
    dataIndex: '',
  },
  {
    title: '打印人',
    dataIndex: '',
  },
  {
    title: '打印时间',
    dataIndex: '',
  },
  {
    title: '打印类型',
    dataIndex: '',
  },
];
