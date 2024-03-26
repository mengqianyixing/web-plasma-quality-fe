/*
 * @Descripttion:
 * @version:
 * @Author: zcc
 * @Date: 2023-12-20 14:11:29
 * @LastEditors: zcc
 * @LastEditTime: 2024-01-26 10:50:50
 */
import { BasicColumn, FormSchema } from '@/components/Table';
import { TRAY_IN_STATE_TEXT } from '@/enums/stockoutEnum';

export const columns: BasicColumn[] = [
  {
    title: '托盘编号',
    dataIndex: 'trayNo',
    fixed: 'left',
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
    title: '已存放容量(袋)',
    dataIndex: 'totalBagNumber',
  },
  {
    title: '打印人姓名',
    dataIndex: 'creater',
  },
  {
    title: '打印时间',
    dataIndex: 'createAt',
    width: 150,
  },
  {
    title: '入库状态',
    dataIndex: 'trayStatus',
    format: (text) => TRAY_IN_STATE_TEXT.get(text) as string,
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
    title: '启用状态',
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
  },
  {
    component: 'Input',
    field: 'batchNo',
    label: '血浆批号',
  },
  {
    component: 'Input',
    field: 'sampleNo',
    label: '样本批号',
  },
  {
    component: 'Input',
    field: 'boxNo',
    label: '血浆箱号',
  },
  {
    component: 'Input',
    field: 'bagNo',
    label: '浆袋编号',
  },
  {
    component: 'Input',
    field: 'prepareNo',
    label: '投产准备号',
  },
];

export const trayDtColumns: BasicColumn[] = [{ dataIndex: '', title: '托盘编号' }];
export const trayDtSearchSchema: FormSchema[] = [
  { label: '托盘编号', field: '', component: 'Input' },
];

export const trayBoxColumns: BasicColumn[] = [{ title: '血浆箱号', dataIndex: 'boxNo' }];
