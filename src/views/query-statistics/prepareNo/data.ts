import { FormSchema } from '@/components/Form';
import { BasicColumn } from '@/components/Table';
import { SERVER_ENUM } from '@/enums/serverEnum';
import { useServerEnumStoreWithOut } from '@/store/modules/serverEnums';
import { getDilutionTypeApi } from '@/api/plasmaStore/inventory';
import dayjs from 'dayjs';

const serverEnumStore = useServerEnumStoreWithOut();
const PlasmaType = serverEnumStore.getServerEnumText(SERVER_ENUM.PlasmaType);

export const columns: BasicColumn[] = [
  {
    title: '投产准备号',
    dataIndex: 'prepareNo',
  },
  {
    title: '投产类型',
    dataIndex: 'prodType',
    format(text) {
      return `${PlasmaType(text)}`;
    },
  },
  {
    title: '准备总量',
    children: [
      {
        title: '数量(袋)',
        dataIndex: 'prodBagCount',
        width: 150,
      },
      {
        title: '投产净重(kg)',
        dataIndex: 'netWeight',
        width: 150,
      },
    ],
  },
  {
    title: '已出库',
    children: [
      {
        title: '数量(袋)',
        dataIndex: 'outBagCount',
        width: 150,
      },
      {
        title: '投产净重(kg)',
        dataIndex: 'outNetWeight',
        width: 150,
      },
      {
        title: '出库日期',
        dataIndex: 'outAt',
        width: 150,
        format(text) {
          return text ? dayjs(text).format('YYYY-MM-DD') : '-';
        },
      },
    ],
  },
  {
    title: '剩余',
    children: [
      {
        title: '数量(袋)',
        dataIndex: 'unOutBagCount',
        width: 150,
      },
      {
        title: '投产净重(kg)',
        dataIndex: 'unOutNetWeight',
        width: 150,
      },
    ],
  },
];

export const searchFormSchema: FormSchema[] = [
  {
    field: 'batchNo',
    component: 'Input',
    label: '血浆批号',
  },
  {
    field: 'bagNo',
    component: 'Input',
    label: '血浆编号',
  },
  {
    field: 'immTypeLevel',
    label: '效价类型',
    component: 'ApiSelect',
    componentProps: {
      api: getDilutionTypeApi,
      labelField: 'key',
      valueField: 'value',
    },
  },
];
