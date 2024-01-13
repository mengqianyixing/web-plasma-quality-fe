import { FormSchema } from '@/components/Form';
import { BasicColumn } from '@/components/Table';
import {
  tagStatusMap,
  tagStatusValueEnum,
  tagStyleTypeEnum,
  tagStyleTypeMap,
  tagTypeMap,
} from '@/enums/tagManageEnum';
import dayjs from 'dayjs';

export const columns: BasicColumn[] = [
  {
    title: '标签名称',
    dataIndex: 'tagName',
    width: 140,
  },
  {
    title: '状态',
    dataIndex: 'state',
    width: 80,
    customRender: ({ record }) => {
      return record.state == tagStatusValueEnum.DSB ? '禁用' : '启用';
    },
  },
  {
    title: '标签类型',
    dataIndex: 'labelType',
    width: 100,
    slots: { customRender: 'labelType' },
  },
  {
    title: '打印分辨率',
    dataIndex: 'resolution',
    width: 100,
  },
  {
    title: '打印机类型',
    dataIndex: 'printerType',
    width: 100,
  },
  {
    title: '打印份数',
    dataIndex: 'times',
    width: 100,
  },
  {
    title: '创建日期',
    dataIndex: 'createAt',
    format: (text) => (text ? dayjs(text).format('YYYY-MM-DD HH:mm:ss') : '-'),
    width: 200,
  },
  {
    title: '更新日期',
    dataIndex: 'updateAt',
    format: (text) => (text ? dayjs(text).format('YYYY-MM-DD HH:mm:ss') : '-'),
    width: 200,
  },
];

export const columnsHistory: BasicColumn[] = [
  {
    title: '标签名称',
    dataIndex: 'tagName',
  },
  {
    title: '标签类型',
    dataIndex: 'labelType',
    width: 100,
    slots: { customRender: 'labelType' },
  },
  {
    title: '创建日期',
    dataIndex: 'createAt',
    format: (text) => (text ? dayjs(text).format('YYYY-MM-DD HH:mm:ss') : '-'),
    width: 200,
  },
  {
    title: '更新日期',
    dataIndex: 'updateAt',
    format: (text) => (text ? dayjs(text).format('YYYY-MM-DD HH:mm:ss') : '-'),
    width: 200,
  },
];

export const styleDetailColumns: BasicColumn[] = [
  {
    title: '类型',
    dataIndex: 'Type',
    width: 100,
  },
  {
    title: '打印内容Id',
    dataIndex: 'Id',
    width: 100,
  },
  {
    title: '打印内容前缀',
    dataIndex: 'Data',
  },
  {
    title: 'x坐标',
    dataIndex: 'X',
  },
  {
    title: 'y坐标',
    dataIndex: 'Y',
  },
  {
    title: '宽度',
    dataIndex: 'Width',
  },
  {
    title: '高度',
    dataIndex: 'Height',
  },
  {
    title: '只生成预览，打印不生效',
    dataIndex: 'OnlyDisplay',
  },
  {
    title: '旋转角度',
    dataIndex: 'Orientation',
  },
  {
    title: '线条粗细',
    dataIndex: 'LineThickness',
  },
  {
    title: '字体名',
    dataIndex: 'TextFormat.FontName',
    format(_, record) {
      return record.TextFormat?.FontName;
    },
  },
  {
    title: '字体大小',
    dataIndex: 'TextFormat.FontSize',
    format(_, record) {
      return record.TextFormat?.FontSize;
    },
  },
  {
    title: '是否粗体',
    dataIndex: 'TextFormat.Bold',
    format(_, record) {
      return record.TextFormat?.Bold ? '是' : '否';
    },
  },
  {
    title: '是否斜体',
    dataIndex: 'TextFormat.Italic',
    format(_, record) {
      return record.TextFormat?.Italic ? '是' : '否';
    },
  },
  {
    title: '是否加下划线',
    dataIndex: 'TextFormat.Underline',
    format(_, record) {
      return record.TextFormat?.Underline ? '是' : '否';
    },
  },
  {
    title: '是否自动换行',
    dataIndex: 'TextFormat.LineWrap',
    format(_, record) {
      return record.TextFormat?.LineWrap ? '是' : '否';
    },
  },
  {
    title: '是否黑底白字',
    dataIndex: 'TextFormat.Revert',
    format(_, record) {
      return record.TextFormat?.Revert ? '是' : '否';
    },
  },
  {
    title: '是否居中',
    dataIndex: 'TextFormat.Middle',
    format(_, record) {
      return record.TextFormat?.Middle ? '是' : '否';
    },
  },
];

export const searchFormSchema: FormSchema[] = [
  {
    field: 'tagName',
    label: '标签名称',
    component: 'Input',
    colProps: { span: 5 },
  },
  {
    field: 'labelType',
    label: '标签类型',
    component: 'Select',
    colProps: { span: 5 },
  },
  {
    field: 'state',
    label: '状态',
    component: 'Select',
    colProps: { span: 5 },
    componentProps: {
      options: [...tagStatusMap.entries()].map(([value, label]) => ({ label, value })),
    },
  },
];

export const searchHistoryFormSchema: FormSchema[] = [
  {
    field: 'tagName',
    label: '标签名称',
    component: 'Input',
    colProps: { span: 8 },
  },
  {
    field: 'labelType',
    label: '标签类型',
    component: 'Select',
    colProps: { span: 8 },
  },
];

export const formSchema: FormSchema[] = [
  {
    field: 'tagName',
    label: '标签名称',
    component: 'Input',
    colProps: { span: 8 },
    required: true,
  },
  {
    field: 'labelType',
    label: '标签类型',
    component: 'Select',
    colProps: { span: 8 },
    componentProps: {
      options: [...tagTypeMap.entries()].map(([value, label]) => ({ label, value })),
    },
    required: true,
  },
  {
    field: 'printerName',
    label: '打印机名称',
    component: 'Input',
    colProps: { span: 8 },
    required: true,
  },
  {
    field: 'width',
    label: '宽度(mm)',
    component: 'InputNumber',
    colProps: { span: 8 },
    required: true,
  },
  {
    field: 'height',
    label: '高度(mm)',
    component: 'InputNumber',
    colProps: { span: 8 },
    required: true,
  },
  {
    field: 'gap',
    label: '标签间隔(mm)',
    component: 'InputNumber',
    colProps: { span: 8 },
    required: true,
  },
  {
    field: 'resolution',
    label: '打印分辨率',
    component: 'Select',
    colProps: { span: 8 },
    componentProps: {
      options: ['203', '300'].map((item) => ({ label: item, value: item })),
    },
    required: true,
  },
  {
    field: 'times',
    label: '打印份数',
    component: 'InputNumber',
    colProps: { span: 8 },
    required: true,
  },
  {
    field: 'printerType',
    label: '打印机类型',
    component: 'Select',
    colProps: { span: 8 },
    componentProps: {
      options: ['TSC', 'ZEBRA'].map((item) => ({ label: item, value: item })),
    },
    required: true,
  },
];

export const editStyleFormSchema: FormSchema[] = [
  {
    field: 'Type',
    label: '类型',
    component: 'Select',
    colProps: { span: 20 },
    componentProps: ({ formActionType }) => {
      return {
        options: [...tagStyleTypeMap.values()].map((item) => ({ label: item, value: item })),
        onChange: (e: string) => {
          formActionType.updateSchema([
            {
              field: 'TextFormat.FontName',
              show: e === tagStyleTypeEnum.Text,
              required: e === tagStyleTypeEnum.Text,
            },
            {
              field: 'TextFormat.FontSize',
              show: e === tagStyleTypeEnum.Text,
              required: e === tagStyleTypeEnum.Text,
            },
            {
              field: 'TextFormat.Bold',
              show: e === tagStyleTypeEnum.Text,
              required: e === tagStyleTypeEnum.Text,
            },
            {
              field: 'TextFormat.Italic',
              show: e === tagStyleTypeEnum.Text,
              required: e === tagStyleTypeEnum.Text,
            },
            {
              field: 'TextFormat.Underline',
              show: e === tagStyleTypeEnum.Text,
              required: e === tagStyleTypeEnum.Text,
            },
            {
              field: 'TextFormat.LineWrap',
              show: e === tagStyleTypeEnum.Text,
              required: e === tagStyleTypeEnum.Text,
            },
            {
              field: 'TextFormat.Revert',
              show: e === tagStyleTypeEnum.Text,
              required: e === tagStyleTypeEnum.Text,
            },
            {
              field: 'TextFormat.Middle',
              show: e === tagStyleTypeEnum.Text,
              required: e === tagStyleTypeEnum.Text,
            },
          ]);
        },
      };
    },
    required: true,
  },
  {
    field: 'Id',
    label: '打印内容Id',
    component: 'Input',
    colProps: { span: 20 },
  },
  {
    field: 'Data',
    label: '打印内容前缀',
    component: 'Input',
    colProps: { span: 20 },
  },
  {
    field: 'X',
    label: 'x坐标(mm)',
    component: 'InputNumber',
    colProps: { span: 20 },
    required: true,
  },
  {
    field: 'Y',
    label: 'y坐标(mm)',
    component: 'InputNumber',
    colProps: { span: 20 },
    required: true,
  },
  {
    field: 'Width',
    label: '宽度(mm)',
    component: 'InputNumber',
    colProps: { span: 20 },
    required: true,
  },
  {
    field: 'Height',
    label: '高度(mm)',
    component: 'InputNumber',
    colProps: { span: 20 },
    required: true,
  },
  {
    field: 'Orientation',
    label: '旋转角度',
    component: 'InputNumber',
    colProps: { span: 20 },
  },
  {
    field: 'LineThickness',
    label: '线条粗细',
    component: 'InputNumber',
    colProps: { span: 20 },
  },
  {
    field: 'TextFormat.FontName',
    label: '字体名',
    component: 'Input',
    colProps: { span: 20 },
    required: true,
    show: false,
  },
  {
    field: 'TextFormat.FontSize',
    label: '字体大小',
    component: 'InputNumber',
    colProps: { span: 20 },
    required: true,
    show: false,
  },
  {
    field: 'TextFormat.Bold',
    label: '是否粗体',
    component: 'RadioGroup',
    required: true,
    show: false,
    componentProps: {
      options: [
        { label: '是', value: true },
        { label: '否', value: false },
      ],
    },
  },
  {
    field: 'TextFormat.Italic',
    label: '是否斜体',
    component: 'RadioGroup',
    required: true,
    show: false,
    componentProps: {
      options: [
        { label: '是', value: true },
        { label: '否', value: false },
      ],
    },
  },
  {
    field: 'TextFormat.Underline',
    label: '是否加下划线',
    component: 'RadioGroup',
    required: true,
    show: false,
    componentProps: {
      options: [
        { label: '是', value: true },
        { label: '否', value: false },
      ],
    },
  },
  {
    field: 'TextFormat.LineWrap',
    label: '是否自动换行',
    component: 'RadioGroup',
    required: true,
    show: false,
    componentProps: {
      options: [
        { label: '是', value: true },
        { label: '否', value: false },
      ],
    },
  },
  {
    field: 'TextFormat.Revert',
    label: '是否黑底白字',
    component: 'RadioGroup',
    required: true,
    show: false,
    componentProps: {
      options: [
        { label: '是', value: true },
        { label: '否', value: false },
      ],
    },
  },
  {
    field: 'TextFormat.Middle',
    label: '是否居中',
    component: 'RadioGroup',
    required: true,
    show: false,
    componentProps: {
      options: [
        { label: '是', value: true },
        { label: '否', value: false },
      ],
    },
  },
  {
    field: 'OnlyDisplay',
    label: '只生成预览，打印不生效',
    component: 'RadioGroup',
    colProps: { span: 20 },
    componentProps: {
      options: [
        { label: '是', value: true },
        { label: '否', value: false },
      ],
    },
    required: true,
  },
];
