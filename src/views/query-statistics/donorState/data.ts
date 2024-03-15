import { FormSchema } from '@/components/Form';
import { BasicColumn } from '@/components/Table';
import { SERVER_ENUM } from '@/enums/serverEnum';
import { useServerEnumStoreWithOut } from '@/store/modules/serverEnums';
import { formatKg } from '@/utils';
import { useStation } from '@/hooks/common/useStation';

const { stationOptions } = useStation();
const serverEnumStore = useServerEnumStoreWithOut();

export const columns: BasicColumn[] = [
  {
    title: '采浆公司',
    dataIndex: 'stationName',
    width: 80,
  },
  {
    title: '浆员编号',
    dataIndex: 'donorNo',
    width: 120,
  },

  {
    title: '浆员姓名',
    dataIndex: 'name',
    width: 100,
  },
  {
    title: '血型',
    dataIndex: 'bloodType',
    width: 60,
  },
  {
    title: '无检疫期后续的血浆数量',
    dataIndex: 'ambiguityBagCount',
    width: 180,
  },
  {
    title: '血浆验收净重(g)',
    dataIndex: 'netWeight',
    format: formatKg,
    width: 120,
  },
  {
    title: '最早采集日期',
    dataIndex: 'earlier',
    format: (t) => t?.slice(0, 10),
    width: 100,
  },
  {
    title: '地址',
    dataIndex: 'idcardAddress',
    width: 300,
    ellipsis: false,
  },
  {
    title: '血浆总袋数',
    dataIndex: 'bagCount',
    width: 100,
  },
  {
    title: '最晚采集日期',
    dataIndex: 'late',
    format: (t) => t?.slice(0, 10),
    width: 100,
  },
  {
    title: '淘汰原因',
    dataIndex: 'cause',
    width: 200,
    ellipsis: false,
  },
  {
    title: '淘汰系统',
    dataIndex: 'blockBy',
    width: 80,
  },
  {
    title: '不合格依据日期',
    dataIndex: 'listen',
    format: (t) => t?.slice(0, 10),
    width: 120,
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
    field: 'batch',
    component: 'Input',
    label: '血浆批号',
  },
  {
    field: '[collectBegin , collectEnd]',
    component: 'RangePicker',
    label: '采集日期',
    componentProps: {
      class: 'w-full',
      valueFormat: 'YYYY-MM-DD',
    },
  },
  {
    field: 'immunity',
    component: 'Select',
    label: '血浆类型',
    componentProps: {
      options: serverEnumStore.getServerEnum(SERVER_ENUM.PlasmaType),
    },
  },
  {
    field: 'cause',
    component: 'Input',
    label: '淘汰原因',
  },
  {
    field: '[titerBenign, titerEnd]',
    component: 'InputRange',
    label: '效价结果值',
  },
  {
    field: 'state',
    component: 'Select',
    label: '浆员状态',
    componentProps: {
      options: serverEnumStore.getServerEnum(SERVER_ENUM.DonorStatus),
    },
  },
  {
    field: 'blockBy',
    component: 'Select',
    label: '淘汰系统',
    componentProps: {
      options: serverEnumStore.getServerEnum(SERVER_ENUM.BlockSource),
    },
  },
  {
    field: '[checkBegin, checkEnd]',
    component: 'RangePicker',
    label: '检测发布日期',
    componentProps: {
      class: 'w-full',
      valueFormat: 'YYYY-MM-DD',
    },
  },
  {
    field: 'callback',
    component: 'Select',
    label: '回访状态',
    componentProps: {
      options: serverEnumStore.getServerEnum(SERVER_ENUM.CallbackState),
    },
  },
  {
    field: '[listenBegin, listenEnd]',
    component: 'RangePicker',
    label: '不合格依据日期',
    componentProps: {
      class: 'w-full',
      valueFormat: 'YYYY-MM-DD',
    },
  },
];
