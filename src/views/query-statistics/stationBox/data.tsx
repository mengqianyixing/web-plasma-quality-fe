import { FormSchema } from '@/components/Form';
import { BasicColumn } from '@/components/Table';
import { SERVER_ENUM } from '@/enums/serverEnum';
import { useServerEnumStoreWithOut } from '@/store/modules/serverEnums';
// import { getDilutionTypeApi } from '@/api/plasmaStore/inventory';
import { useServerConfig } from '@/hooks/common/useServerConfig';

const { boxText } = useServerConfig();
const serverEnumStore = useServerEnumStoreWithOut();
const PlasmaType = serverEnumStore.getServerEnumText(SERVER_ENUM.PlasmaType);

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
    title: '浆站' + boxText,
    dataIndex: 'boxNo',
  },
  {
    title: '来浆类型',
    dataIndex: 'rawImm',
    format(text) {
      return text ? `${PlasmaType(text)}` : '';
    },
  },
  {
    title: '最小血浆编号',
    dataIndex: 'minBagNo',
  },
  {
    title: '最大血浆编号',
    dataIndex: 'maxBagNo',
  },
  {
    title: '数量',
    dataIndex: 'bagCount',
  },
];

export const searchFormSchema: FormSchema[] = [
  {
    field: 'stationNo',
    label: '采浆公司',
    component: 'Select',
  },
  {
    field: '[batchStartNo, batchEndNo]',
    component: 'InputRange',
    label: '血浆批号',
    componentProps: {
      isBetween: false,
    },
  },
  {
    field: 'boxNo',
    component: 'Input',
    label: '浆站' + boxText,
  },
  {
    field: 'rawImm',
    component: 'Select',
    label: '来浆类型',
    componentProps: {
      options: serverEnumStore.getServerEnum(SERVER_ENUM.PlasmaType),
    },
  },
];
