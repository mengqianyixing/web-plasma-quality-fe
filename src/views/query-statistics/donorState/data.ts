import { FormSchema } from '@/components/Form';
import { BasicColumn } from '@/components/Table';
import { stationNameSearchApi } from '@/api/plasmaStore/entryPlasma';
import { SERVER_ENUM } from '@/enums/serverEnum';
import { useServerEnumStoreWithOut } from '@/store/modules/serverEnums';

const serverEnumStore = useServerEnumStoreWithOut();
export const columns: BasicColumn[] = [
  {
    title: '采浆公司',
    dataIndex: 'batchNo',
  },
  {
    title: '浆员编号',
    dataIndex: 'stationName',
  },

  {
    title: '浆员姓名',
    dataIndex: 'stationBoxNo',
  },
  {
    title: '血型',
    dataIndex: 'currBoxNo',
  },
  {
    title: '无检疫期后续的血浆数量',
    dataIndex: 'currBoxNo',
  },
  {
    title: '血浆验收净重(g)',
    dataIndex: 'currBoxNo',
  },
  {
    title: '最早采集日期',
    dataIndex: 'currBoxNo',
  },
  {
    title: '地址',
    dataIndex: 'currBoxNo',
  },
  {
    title: '血浆总袋数',
    dataIndex: 'currBoxNo',
  },
  {
    title: '最晚采集日期',
    dataIndex: 'currBoxNo',
  },
  {
    title: '淘汰原因',
    dataIndex: 'currBoxNo',
  },
  {
    title: '淘汰系统',
    dataIndex: 'currBoxNo',
  },
  {
    title: '不合格依据日期',
    dataIndex: 'currBoxNo',
  },
];

export const searchFormSchema: FormSchema[] = [
  {
    field: '',
    component: 'ApiSelect',
    label: '采浆公司',
    componentProps: {
      api: stationNameSearchApi,
      labelField: 'stationName',
      valueField: 'stationName',
    },
  },
  {
    field: '',
    component: 'Input',
    label: '血浆批号',
  },
  {
    field: '',
    component: 'RangePicker',
    label: '采集日期',
    componentProps: {
      class: 'w-full',
      valueFormat: 'YYYY-MM-DD',
    },
  },
  {
    field: '',
    component: 'Select',
    label: '血浆类型',
    componentProps: {
      options: serverEnumStore.getServerEnum(SERVER_ENUM.ImmType),
    },
  },
  {
    field: '',
    component: 'Input',
    label: '淘汰原因',
  },
  {
    field: '',
    component: 'Input',
    label: '效价结果值',
  },
  {
    field: '',
    component: 'Select',
    label: '浆员状态',
  },
  {
    field: '',
    component: 'Select',
    label: '淘汰系统',
  },
  {
    field: '',
    component: 'RangePicker',
    label: '检测发布日期',
    componentProps: {
      class: 'w-full',
      valueFormat: 'YYYY-MM-DD',
    },
  },
  {
    field: '',
    component: 'Select',
    label: '回访状态',
  },
  {
    field: '',
    component: 'RangePicker',
    label: '不合格依据日期',
    componentProps: {
      class: 'w-full',
      valueFormat: 'YYYY-MM-DD',
    },
  },
];
