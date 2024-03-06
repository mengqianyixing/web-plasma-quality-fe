import { FormSchema } from '@/components/Form';
import { stationNameList } from '@/api/callback/list-generation';
import { SERVER_ENUM } from '@/enums/serverEnum';
import { useServerEnumStoreWithOut } from '@/store/modules/serverEnums';

const serverEnumStore = useServerEnumStoreWithOut();

export const searchFormSchema: FormSchema[] = [
  {
    field: 'stationNo',
    label: '采浆公司',
    component: 'ApiSelect',
    componentProps: {
      api: stationNameList,
      labelField: 'stationName',
      valueField: 'stationNo',
    },
  },
  {
    field: 'batchNo',
    label: '血浆批号',
    component: 'Input',
  },
  {
    field: 'plasmaType',
    label: '血浆类型',
    component: 'Select',
    componentProps: {
      options: serverEnumStore.getServerEnum(SERVER_ENUM.ImmType),
    },
  },
  {
    field: 'dlvType',
    label: '血浆出库类型',
    component: 'Select',
    componentProps: {
      options: serverEnumStore.getServerEnum(SERVER_ENUM.DlvType),
    },
  },
  {
    field: '[acceptBeginAt,acceptEndAt]',
    label: '接收日期',
    component: 'RangePicker',
  },
  {
    field: '[verifyBeginAt, verifyEndAt]',
    label: '验收日期',
    component: 'RangePicker',
  },
  {
    field: '[publishBeginAt, publishEndAt]',
    label: '验收发布日期',
    component: 'RangePicker',
  },
  {
    field: '[deliverBeginAt, deliverEndAt]',
    label: '出库日期',
    component: 'RangePicker',
  },
];
