import { FormSchema } from '@/components/Form';
import { BasicColumn } from '@/components/Table';
import { stationNameSearchApi } from '@/api/plasmaStore/entryPlasma';
import { SERVER_ENUM } from '@/enums/serverEnum';
import { useServerEnumStoreWithOut } from '@/store/modules/serverEnums';

const serverEnumStore = useServerEnumStoreWithOut();
export const columns: BasicColumn[] = [
  {
    title: '采浆公司',
    dataIndex: 'stationName',
  },
  {
    title: '血浆批号',
    dataIndex: 'batchNo',
  },

  {
    title: '数量',
    dataIndex: 'bagCount',
  },
  {
    title: '重量(g)',
    dataIndex: 'totalWeight',
  },
];

export const searchFormSchema: FormSchema[] = [
  {
    field: 'stationNo',
    component: 'ApiSelect',
    label: '采浆公司',
    componentProps: {
      api: stationNameSearchApi,
      labelField: 'stationName',
      valueField: 'stationName',
    },
  },
  {
    field: 'plasmaType',
    component: 'Select',
    label: '血浆类型',
    componentProps: {
      options: serverEnumStore.getServerEnum(SERVER_ENUM.ImmType),
    },
  },
  {
    field: 'batchNo',
    component: 'Input',
    label: '血浆批号',
  },
];
