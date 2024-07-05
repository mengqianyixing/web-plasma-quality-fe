/*
 * @Descripttion:
 * @version:
 * @Author: zcc
 * @Date: 2024-01-04 16:32:04
 * @LastEditors: zcc
 * @LastEditTime: 2024-01-16 15:04:35
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
  },
  {
    title: '箱数',
    dataIndex: 'boxCount',
  },
  {
    title: '血浆数量',
    dataIndex: 'bagCount',
  },
  {
    title: '状态',
    dataIndex: 'trayStatus',
    format: BankTrayStatusEnum,
  },
  {
    title: '所在库房',
    dataIndex: 'houseName',
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
    defaultValue: '0',
    componentProps: {
      options: [
        { value: '0', label: '否' },
        { value: '1', label: '是' },
      ],
    },
  },
];
