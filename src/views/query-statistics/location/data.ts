import { FormSchema } from '@/components/Form';
import { BasicColumn } from '@/components/Table';
import { SERVER_ENUM } from '@/enums/serverEnum';
import { useServerEnumStoreWithOut } from '@/store/modules/serverEnums';
import { useStation } from '@/hooks/common/useStation';
import { useServerConfig } from '@/hooks/common/useServerConfig';

const { trayText, boxText } = useServerConfig();

const { stationOptions } = useStation();
const serverEnumStore = useServerEnumStoreWithOut();
const BankTrayTypeEnum = serverEnumStore.getServerEnumText(SERVER_ENUM.BankTrayTypeEnum);

export const columns: BasicColumn[] = [
  {
    title: '采浆公司',
    dataIndex: 'stationName',
  },
  {
    title: '血浆(样本)批号',
    dataIndex: 'batchNo',
  },

  {
    title: '当前' + boxText,
    dataIndex: 'boxNo',
  },
  {
    title: '数量',
    dataIndex: 'bagCount',
  },
  {
    title: '当前' + trayText + '编号',
    dataIndex: 'trayNo',
  },
  {
    title: '存放库房',
    dataIndex: 'warehouseName',
  },
  {
    title: '当前货位号',
    dataIndex: 'locationNo',
  },
  {
    title: '存放类型',
    dataIndex: 'trayType',
    format: (text) => BankTrayTypeEnum(text),
  },
];

export const searchFormSchema: FormSchema[] = [
  {
    field: 'stationNo',
    component: 'Select',
    label: '采浆公司',
    componentProps: {
      options: stationOptions,
    },
  },
  {
    field: 'batchNo',
    component: 'Input',
    label: '血浆(样本)批号',
  },
  {
    field: 'boxNo',
    component: 'Input',
    label: '血浆(样本)' + boxText,
  },
  {
    field: 'bagNo',
    component: 'Input',
    label: '血浆(样本)编号',
  },

  {
    field: 'plasmaType',
    component: 'Select',
    label: '血浆类型',
    componentProps: {
      options: serverEnumStore.getServerEnum(SERVER_ENUM.PlasmaType),
    },
  },
  {
    field: 'trayNo',
    component: 'Input',
    label: trayText + '编号',
  },
  {
    field: 'trayType',
    component: 'Select',
    label: '存放类型',
    componentProps: {
      options: serverEnumStore.getServerEnum(SERVER_ENUM.BankTrayTypeEnum),
    },
  },
];
