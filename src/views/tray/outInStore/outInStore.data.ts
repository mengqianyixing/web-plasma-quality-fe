/*
 * @Descripttion:
 * @version:
 * @Author: zcc
 * @Date: 2023-12-18 14:18:35
 * @LastEditors: zcc
 * @LastEditTime: 2024-01-13 10:28:20
 */
import { BasicColumn, FormSchema } from '@/components/Table';

export const columns: BasicColumn[] = [
  {
    title: '托盘编号',
    dataIndex: 'trayNo',
  },
  {
    title: '已存容量(箱)',
    dataIndex: 'totalNumber',
  },
  {
    title: '所在库房',
    dataIndex: 'wareHouseName',
  },
  {
    title: '所在货位',
    dataIndex: 'locationNo',
  },

  {
    title: '打印人',
    dataIndex: 'creater',
  },
  {
    title: '打印时间',
    dataIndex: 'createAt',
  },
  {
    title: '托盘状态',
    dataIndex: '',
    customRender: ({ record }) => {
      return record.closed ? '停用' : '启用';
    },
  },
];

export const searchFormSchema: FormSchema[] = [
  {
    label: '托盘编号',
    component: 'Input',
    field: 'trayNo',
    colProps: { span: 8 },
  },
  {
    label: '血浆批次',
    component: 'Input',
    field: 'batchNo',
    colProps: { span: 8 },
  },
  {
    label: '浆袋编号',
    component: 'Input',
    field: 'bagNo',
    colProps: { span: 8 },
  },
  {
    label: '样本批次',
    component: 'Input',
    field: 'sampleNo',
    colProps: { span: 8 },
  },
  {
    label: '投产准备号',
    component: 'Input',
    field: 'prepareNo',
    colProps: { span: 8 },
  },
];

export const inStoreFormSchema: (houseChange: Function) => FormSchema[] = (houseChange) => [
  {
    field: 'houseNo',
    component: 'Select',
    label: '库房',
    required: true,
    componentProps: {
      options: [],
      onChange: houseChange,
    },
  },
  // {
  //   field: 'dlvType',
  //   component: 'Select',
  //   label: '入库类型',
  //   required: true,
  //   componentProps: {
  //     options: [
  //       { label: '投产出库', value: '0' },
  //       { label: '不合格出库', value: '1' },
  //       { label: '科研出库', value: '2' },
  //       { label: '其他', value: '3' },
  //     ],
  //   },
  // },
];
export const siteNoSchema = {
  field: 'siteId',
  component: 'Select',
  label: '出库站点',
  required: true,
  componentProps: {
    options: [],
  },
};
