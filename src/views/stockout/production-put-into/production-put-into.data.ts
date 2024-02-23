import { FormSchema } from '@/components/Form';
import { BasicColumn } from '@/components/Table';
import {
  expirationMap,
  expirationValueEnum,
  statusMap,
  statusValueEnum,
} from '@/enums/stockoutEnum';
import dayjs from 'dayjs';
import { SERVER_ENUM } from '@/enums/serverEnum';
import { useServerEnumStoreWithOut } from '@/store/modules/serverEnums';

const serverEnumStore = useServerEnumStoreWithOut();
const PlasmaType = serverEnumStore.getServerEnumText(SERVER_ENUM.PlasmaType);

export const columns: BasicColumn[] = [
  {
    title: '制造批号',
    dataIndex: 'mesId',
    align: 'left',
    slots: { customRender: 'mesId' },
  },
  {
    title: '投浆重量(t)',
    dataIndex: 'orderWeight',
    width: 100,
  },
  {
    title: '投产类型',
    dataIndex: 'orderType',
    width: 100,
    format(text) {
      return `${PlasmaType(text)}`;
    },
  },
  {
    title: '计划出库日期',
    dataIndex: 'planOut',
    width: 120,
    format(text) {
      return text ? dayjs(text).format('YYYY-MM-DD') : '-';
    },
  },
  {
    title: '计划投产日期',
    dataIndex: 'planTask',
    width: 120,
    format(text) {
      return text ? dayjs(text).format('YYYY-MM-DD') : '-';
    },
  },
  {
    title: '血浆数量',
    dataIndex: 'totalNum',
  },
  {
    title: '血浆净重(kg)',
    dataIndex: 'totalWeight',
    format(text) {
      return Number(text) / 1000;
    },
  },
  {
    title: '血浆效期',
    dataIndex: 'expiration',
    width: 100,
    format(text) {
      return expirationMap.get(<expirationValueEnum>text) as string;
    },
  },
  {
    title: '出库人',
    dataIndex: 'outPerson',
  },
  {
    title: '出库日期',
    dataIndex: 'outDate',
    format(text) {
      return text ? dayjs(text).format('YYYY-MM-DD') : '-';
    },
  },
  {
    title: '接收人',
    dataIndex: 'receiver',
  },
  {
    title: '接收日期',
    dataIndex: 'acceptDate',
    format(text) {
      return text ? dayjs(text).format('YYYY-MM-DD') : '-';
    },
  },
  {
    title: '状态',
    dataIndex: 'state',
    width: 80,
    format(text) {
      return statusMap.get(<statusValueEnum>text) as string;
    },
  },
];

export const searchFormSchema: FormSchema[] = [
  {
    field: 'mesId',
    label: '制造批号',
    component: 'Input',
  },
  {
    field: 'orderType',
    label: '投产类型',
    component: 'Select',
    componentProps: {
      options: serverEnumStore.getServerEnum(SERVER_ENUM.PlasmaType),
    },
  },
  {
    field: 'state',
    label: '状态',
    component: 'Select',
    componentProps: {
      options: [...statusMap.entries()]
        .map(([key, value]) => ({
          value: key,
          label: value,
        }))
        .filter((it) =>
          [
            statusValueEnum.PVD,
            statusValueEnum.OTD,
            statusValueEnum.OUI,
            statusValueEnum.ACD,
            statusValueEnum.ACT,
            statusValueEnum.ROD,
          ].includes(it.value),
        ),
    },
  },
  {
    field: '[outStartDate, outEndDate]',
    label: '出库日期',
    component: 'RangePicker',
  },
  {
    field: 'pageFlag',
    label: '页面flag',
    component: 'Input',
    defaultValue: 'out',
    show: false,
  },
];

export const detailColumns: BasicColumn[] = [
  {
    title: '血浆公司',
    dataIndex: 'stationName',
  },
  {
    title: '血浆批号',
    dataIndex: 'batchNo',
  },
  {
    title: '血浆箱号',
    dataIndex: 'boxNo',
  },
  {
    title: '血浆净重(g)',
    dataIndex: 'netWeight',
  },
  {
    title: '血浆编号',
    dataIndex: 'bagNo',
  },
  {
    title: '浆员编号',
    dataIndex: 'fkDonorNo',
  },
  {
    title: '浆员姓名',
    dataIndex: 'donorName',
  },
  {
    title: '效价类型',
    dataIndex: 'immunity',
    customRender: ({ record }) => {
      return PlasmaType(record.type);
    },
  },
  {
    title: '效价结果值',
    dataIndex: 'titer',
  },
];

export const trayColumns: BasicColumn[] = [
  {
    title: '托盘编号',
    dataIndex: 'trayNo',
  },
  {
    title: '箱数',
    dataIndex: 'boxNum',
  },
  {
    title: '血浆数量',
    dataIndex: 'plasmaNum',
  },
  {
    title: '状态',
    dataIndex: 'state',
  },
  {
    title: '存放位置',
    dataIndex: 'houseName',
  },
];
