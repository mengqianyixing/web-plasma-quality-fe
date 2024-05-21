import { FormSchema } from '@/components/Form';
import { BasicColumn } from '@/components/Table';
import { SERVER_ENUM } from '@/enums/serverEnum';
import { useServerEnumStoreWithOut } from '@/store/modules/serverEnums';
import dayjs from 'dayjs';
import { PLASMA_STATUS_TEXT } from '@/enums/productionPlanEnum';
import { useServerConfig } from '@/hooks/common/useServerConfig';

const { boxText } = useServerConfig();
const serverEnumStore = useServerEnumStoreWithOut();

export const columns: BasicColumn[] = [
  {
    title: '制造批号',
    dataIndex: 'mesId',
    slots: { customRender: 'mesId' },
  },
  {
    title: '投产类型',
    dataIndex: 'orderType',
    width: 80,
  },
  {
    title: '计划出库日期',
    dataIndex: 'planOut',
  },
  {
    title: '计划投产日期',
    dataIndex: 'planTask',
  },
  {
    title: '投产重量（kg）',
    dataIndex: 'prodWeight',
    format(text) {
      return text ? Number(text) / 1000 : text;
    },
  },
  {
    title: '人数',
    dataIndex: 'count',
  },
  {
    title: '袋数',
    dataIndex: 'bagCount',
  },
  {
    title: '记录人',
    dataIndex: 'creator',
  },
  {
    title: '记录日期',
    dataIndex: 'createAt',
    format(text) {
      return text ? dayjs(text).format('YYYY-MM-DD') : '';
    },
  },
  {
    title: '复核人',
    dataIndex: 'reviewer',
  },
  {
    title: '审核人',
    dataIndex: 'checker',
  },
];

export const searchFormSchema: FormSchema[] = [
  {
    field: 'mesId',
    component: 'Input',
    label: '制造批号',
  },
  {
    field: 'bagNo',
    component: 'Input',
    label: '血浆编号',
  },
  {
    field: 'orderType',
    component: 'Select',
    label: '投产类型',
    componentProps: {
      options: serverEnumStore.getServerEnum(SERVER_ENUM.PlasmaType),
    },
  },
  {
    field: '[planOutBegin, planOutEnd]',
    component: 'RangePicker',
    label: '计划出库日期',
    componentProps: {
      valueFormat: 'YYYY-MM-DD',
    },
  },
  {
    field: '[planTaskBegin, planTaskEnd]',
    component: 'RangePicker',
    label: '计划投产日期',
    componentProps: {
      valueFormat: 'YYYY-MM-DD',
    },
  },
  {
    field: '[collectionAtBegin, collectionAtEnd]',
    component: 'RangePicker',
    label: '血浆采集日期',
    componentProps: {
      valueFormat: 'YYYY-MM-DD',
    },
  },
  {
    field: '[batchNoBegin, batchNoEnd]',
    component: 'InputRange',
    label: '血浆批号',
  },
];

export const productionInquiryDetailColumns: BasicColumn[] = [
  {
    title: '采浆公司',
    dataIndex: 'stationName',
    width: 80,
  },
  {
    title: '血浆批号',
    dataIndex: 'batchNo',
    ellipsis: false,
  },
  {
    title: '血浆' + boxText,
    dataIndex: 'boxNo',
    ellipsis: false,
  },
  {
    title: '血浆编号',
    dataIndex: 'bagNo',
    ellipsis: false,
  },
  {
    title: '采集日期',
    format: (text) => text?.slice(0, 10),
    dataIndex: 'collectAt',
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
    title: '血型',
    dataIndex: 'bloodType',
  },
  {
    title: '效价类型',
    dataIndex: 'immunity',
  },
  {
    title: '效价值',
    dataIndex: 'titer',
  },
  {
    title: '血浆状态',
    dataIndex: 'verified',
    customRender: ({ record }) => {
      return PLASMA_STATUS_TEXT.get(record.verified);
    },
  },
];
