/*
 * @Descripttion:
 * @version:
 * @Author: zcc
 * @Date: 2024-01-04 16:32:04
 * @LastEditors: zcc
 * @LastEditTime: 2024-01-16 15:04:46
 */
import { BasicColumn, FormSchema } from '@/components/Table';

export const columns: BasicColumn[] = [
  {
    title: '托盘编号',
    dataIndex: 'trayNo',
  },
  {
    title: '箱数',
    dataIndex: 'totalNumber',
  },
  {
    title: '血浆数量',
    dataIndex: 'totalBagNumber',
  },
  {
    title: '状态',
    dataIndex: 'closed',
    customRender: ({ record }) => (record.wareHouseName ? '已入库' : '未入库'),
  },
  {
    title: '所在库房',
    dataIndex: 'wareHouseName',
  },
  {
    title: '所在货位',
    dataIndex: 'locationNo',
  },
];

export const searchForm: FormSchema[] = [
  {
    label: '托盘编号',
    component: 'Input',
    field: 'trayNo',
  },
  {
    label: '箱号',
    component: 'Input',
    field: 'boxNo',
  },
  {
    label: '是否在库',
    component: 'Select',
    field: 'inBank',
    defaultValue: '1',
    componentProps: {
      options: [
        { value: '0', label: '否' },
        { value: '1', label: '是' },
      ],
    },
  },
];
