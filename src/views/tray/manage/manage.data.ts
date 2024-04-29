/*
 * @Descripttion:
 * @version:
 * @Author: zcc
 * @Date: 2023-12-20 14:11:29
 * @LastEditors: zcc
 * @LastEditTime: 2024-01-26 10:50:50
 */
import { BasicColumn, FormSchema } from '@/components/Table';
import { SERVER_ENUM } from '@/enums/serverEnum';
import { useServerEnumStoreWithOut } from '@/store/modules/serverEnums';

const serverEnumStore = useServerEnumStoreWithOut();
const BankTrayStatusEnum = serverEnumStore.getServerEnumText(SERVER_ENUM.BankTrayStatusEnum);
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
    slots: { customRender: 'totalBagNumber' },
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
    format: BankTrayStatusEnum,
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
  {
    component: 'Select',
    field: 'trayType',
    label: '存放类型',
    componentProps: {
      options: serverEnumStore.getServerEnum(SERVER_ENUM.BankTrayTypeEnum),
    },
  },
  {
    component: 'Select',
    field: 'trayStatus',
    label: '入库状态',
    componentProps: {
      options: serverEnumStore.getServerEnum(SERVER_ENUM.BankTrayStatusEnum),
    },
  },
  {
    component: 'Select',
    field: 'useStatus',
    label: '负载状态',
    componentProps: {
      options: [
        { label: '空载', value: '0' },
        { label: '负载', value: '1' },
      ],
    },
  },
];

export const trayDtColumns: BasicColumn[] = [{ dataIndex: '', title: '托盘编号' }];
export const trayDtSearchSchema: FormSchema[] = [
  { label: '托盘编号', field: '', component: 'Input' },
];

export const trayBoxColumns: BasicColumn[] = [{ title: '血浆箱号', dataIndex: 'boxNo' }];

export const trayBagColumns: BasicColumn[] = [
  { title: '血浆批号', dataIndex: 'batchNo' },
  { title: '血浆编号', dataIndex: 'bagNo' },
  { title: '浆员编号', dataIndex: 'donorNo' },
  { title: '浆员姓名', dataIndex: 'donorName' },
  { title: '现存箱号', dataIndex: 'currBoxNo' },
];

export const trayBagSearch: FormSchema[] = [
  { label: '血浆批号', component: 'Input', field: 'batchNo' },
  { label: '血浆编号', component: 'Input', field: 'bagNo' },
];
