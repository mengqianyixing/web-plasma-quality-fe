/*
 * @Descripttion:
 * @version:
 * @Author: zcc
 * @Date: 2023-12-21 17:19:22
 * @LastEditors: zcc
 * @LastEditTime: 2024-01-17 16:41:27
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
    title: '货位号',
    dataIndex: 'locationNo',
  },
  {
    title: '库房',
    dataIndex: 'wareHouseName',
  },
  {
    title: '入库状态',
    dataIndex: 'trayStatus',
    format: BankTrayStatusEnum,
  },
];

export const formSchema: FormSchema[] = [
  {
    field: 'trayNo',
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
