/*
 * @Descripttion:
 * @version:
 * @Author: zcc
 * @Date: 2023-12-20 14:11:29
 * @LastEditors: zcc
 * @LastEditTime: 2023-12-22 14:59:30
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
    title: '已存放容量(箱)',
    dataIndex: 'usedNumber',
  },

  {
    title: '存放库房',
    dataIndex: 'wareHouseName',
  },
  {
    title: '存放区域',
    dataIndex: 'subWareHouseName',
  },
  {
    title: '存放货位',
    dataIndex: 'locationNo',
  },
  {
    title: '创建人',
    dataIndex: 'creater',
  },
  {
    title: '创建时间',
    dataIndex: 'create_at',
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
