import { FormSchema } from '@/components/Form';
import { BasicColumn } from '@/components/Table';
import { SERVER_ENUM } from '@/enums/serverEnum';
import { useServerEnumStoreWithOut } from '@/store/modules/serverEnums';

const serverEnumStore = useServerEnumStoreWithOut();

export const columns: BasicColumn[] = [
  {
    title: '制造批号',
    dataIndex: 'mesId',
  },
  {
    title: '投产类型',
    dataIndex: 'orderType',
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
  },
  {
    title: '记录人',
    dataIndex: 'creator',
  },
  {
    title: '记录日期',
    dataIndex: 'createAt',
  },
  {
    title: '复核人',
    dataIndex: 'reviewer',
  },
  {
    title: '审核人',
    dataIndex: 'checker',
  },
  {
    title: '人数',
    dataIndex: 'count',
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
