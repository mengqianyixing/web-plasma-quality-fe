/*
 * @Descripttion:
 * @version:
 * @Author: zcc
 * @Date: 2023-12-18 14:18:35
 * @LastEditors: zcc
 * @LastEditTime: 2023-12-22 16:58:30
 */
import { BasicColumn, FormSchema } from '@/components/Table';

export const columns: BasicColumn[] = [
  {
    title: '托盘编号',
    dataIndex: '',
  },
  {
    title: '已用容量(箱)',
    dataIndex: '',
  },
  {
    title: '所在库房',
    dataIndex: '',
  },
  {
    title: '所在货位',
    dataIndex: '',
  },
  {
    title: '所在区域',
    dataIndex: '',
  },
  {
    title: '创建人',
    dataIndex: '',
  },
  {
    title: '创建时间',
    dataIndex: '',
  },
  {
    title: '托盘状态',
    dataIndex: '',
  },
];

export const searchFormSchema: FormSchema[] = [
  {
    label: '托盘编号',
    component: 'Input',
    field: '',
    colProps: { span: 8 },
  },
  {
    label: '血浆批次',
    component: 'Input',
    field: '',
    colProps: { span: 8 },
  },
  {
    label: '血浆编号',
    component: 'Input',
    field: '',
    colProps: { span: 8 },
  },
  {
    label: '样品批次',
    component: 'Input',
    field: '',
    colProps: { span: 8 },
  },
  {
    label: '投产准备号',
    component: 'Input',
    field: '',
    colProps: { span: 8 },
  },
];

export const inStoreAreaSchema: FormSchema = {
  field: 'subWareHouseNo',
  component: 'Select',
  label: '区域',
  required: true,
  componentProps: {
    options: [],
  },
};
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
