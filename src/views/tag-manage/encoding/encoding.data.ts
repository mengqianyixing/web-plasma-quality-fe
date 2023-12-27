import { BasicColumn, FormSchema } from '@/components/Table';
import dayjs from 'dayjs';
import { tagEncodingTypeMap } from '@/enums/tagManageEnum';

export const columns: BasicColumn[] = [
  {
    title: '类型',
    dataIndex: 'codingType',
  },
  {
    title: '名称',
    dataIndex: 'name',
    width: 300,
  },
  {
    title: '创建时间',
    dataIndex: 'createdAt',
    format(text) {
      return text ? dayjs(text).format('YYYY-MM-DD HH:mm:ss') : '-';
    },
  },
  {
    title: '更新时间',
    dataIndex: 'updatedAt',
    format(text) {
      return text ? dayjs(text).format('YYYY-MM-DD HH:mm:ss') : '-';
    },
  },
];

export const encodingDetailColumns: BasicColumn[] = [
  {
    title: '序号',
    dataIndex: 'order',
    width: 80,
  },
  {
    title: '类别',
    dataIndex: 'id',
    format: (_, record) => {
      return record.id.id;
    },
  },
  {
    title: '备注',
    dataIndex: 'remark',
  },
  {
    title: '长度',
    dataIndex: 'length',
  },
  {
    title: '常量值',
    dataIndex: 'constant',
  },
];

export const encodingSchemas: FormSchema[] = [
  {
    field: 'order',
    label: '序号',
    component: 'InputNumber',
    required: true,
  },
  {
    field: 'id',
    label: '编码类别',
    component: 'Select',
    colProps: { span: 18 },
    componentProps: {
      options: [...tagEncodingTypeMap.entries()].map(([value, label]) => ({ label, value })),
    },
    required: true,
  },
  {
    field: 'length',
    label: '长度',
    component: 'InputNumber',
    colProps: { span: 18 },
  },
  {
    field: 'constant',
    label: '常量值',
    component: 'Input',
    colProps: { span: 18 },
  },
  {
    field: 'remark',
    label: '备注',
    component: 'InputTextArea',
    colProps: { span: 18 },
  },
];
