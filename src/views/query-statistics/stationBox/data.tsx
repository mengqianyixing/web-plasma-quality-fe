import { FormSchema } from '@/components/Form';
import { BasicColumn } from '@/components/Table';
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
    dataIndex: 'stationName',
  },
  {
    title: '浆站箱号',
    dataIndex: 'stationBoxNo',
  },
  {
    title: '来浆类型',
    dataIndex: 'currBoxNo',
  },
  {
    title: '最小血浆编号',
    dataIndex: 'currBoxNo',
  },
  {
    title: '最大血浆编号',
    dataIndex: 'currBoxNo',
  },
  {
    title: '数量',
    dataIndex: 'currBoxNo',
  },
];

export const searchFormSchema: FormSchema[] = [
  {
    field: 'stationNo',
    label: '采浆公司',
    component: 'Select',
  },
  {
    field: '',
    component: 'InputRange',
    label: '血浆批号',
    componentProps: {
      isBetween: false,
    },
  },
  {
    field: 'wqd',
    component: 'Input',
    label: '浆站箱号',
  },
  {
    field: 'plasmaTypeFromStation',
    component: 'Select',
    label: '来浆类型',
    componentProps: {
      options: serverEnumStore.getServerEnum(SERVER_ENUM.ImmType),
    },
  },
  {
    field: 'www',
    component: 'Input',
    label: '血浆类型',
  },
  {
    field: 'fff',
    component: 'Input',
    label: '效价类型',
  },
];
