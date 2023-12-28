/*
 * @Descripttion:
 * @version:
 * @Author: zcc
 * @Date: 2023-12-21 17:19:22
 * @LastEditors: zcc
 * @LastEditTime: 2023-12-27 16:26:56
 */
import { BasicColumn, FormSchema } from '@/components/Table';

export const columns: BasicColumn[] = [
  {
    title: '托盘编号',
    dataIndex: 'trayNo',
  },
  {
    title: '货位号',
    dataIndex: 'locationNo',
  },
  {
    title: '区域',
    dataIndex: 'subWareHouseName',
  },
  {
    title: '库房',
    dataIndex: 'wareHouseName',
  },
  {
    title: '存放类型',
    dataIndex: 'trayType',
  },
  // {
  //   title: '血浆批次范围',
  //   dataIndex: '',
  // },
];

export const formSchema: FormSchema[] = [
  {
    field: '',
    component: 'Input',
    label: '托盘编号',
  },
  {
    field: '',
    component: 'Input',
    label: '库房',
  },
  {
    field: '',
    component: 'Input',
    label: '货位号',
  },
  {
    field: '',
    component: 'Input',
    label: '区域',
  },
  {
    field: '',
    component: 'Input',
    label: '血浆批次',
  },
];