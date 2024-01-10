/*
 * @Descripttion:
 * @version:
 * @Author: zcc
 * @Date: 2023-12-20 14:11:29
 * @LastEditors: zcc
 * @LastEditTime: 2024-01-09 16:52:45
 */
import { BasicColumn, FormSchema } from '@/components/Table';

export const columns: BasicColumn[] = [
  {
    title: '托盘编号',
    dataIndex: 'trayNo',
    fixed: 'left',
    slots: { customRender: 'trayNo' },
  },
  {
    title: '负载状态',
    dataIndex: '',
    customRender: ({ record }) => {
      return record.totalNumber ? '负载' : '空载';
    },
  },
  {
    title: '已存放容量(箱)',
    dataIndex: 'totalNumber',
    slots: { customRender: 'totalNumber' },
  },
  {
    title: '打印人姓名',
    dataIndex: 'creater',
  },
  {
    title: '打印时间',
    dataIndex: 'createAt',
  },
  {
    title: '存放库房',
    dataIndex: 'wareHouseName',
  },

  {
    title: '存放货位',
    dataIndex: 'locationNo',
  },
  {
    title: '备注',
    dataIndex: 'remark',
  },
  {
    title: '托盘状态',
    dataIndex: 'closed',
    customRender: ({ record }) => {
      return record.closed ? '停用' : '启用';
    },
  },
];
export const searchFormSchema: FormSchema[] = [
  {
    component: 'Input',
    field: 'trayNo',
    label: '托盘编号',
    colProps: { span: 6 },
  },
  {
    component: 'Input',
    field: 'batchNo',
    label: '血浆批号',
    colProps: { span: 6 },
  },
  {
    component: 'Input',
    field: 'sampleNo',
    label: '样品批号',
    colProps: { span: 6 },
  },
  {
    component: 'Input',
    field: 'bagNo',
    label: '浆袋编号',
    colProps: { span: 6 },
  },
  {
    component: 'Input',
    field: 'prepareNo',
    label: '投产准备号',
    colProps: { span: 6 },
  },
];

export const trayDtColumns: BasicColumn[] = [{ dataIndex: '', title: '托盘编号' }];
export const trayDtSearchSchema: FormSchema[] = [
  { label: '托盘编号', field: '', component: 'Input', colProps: { span: 10 } },
];

export const trayBoxColumns: BasicColumn[] = [{ title: '血浆箱号', dataIndex: 'boxNo' }];
