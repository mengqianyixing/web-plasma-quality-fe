import { BasicColumn, FormSchema } from '@/components/Table';
import { PLASMA_TYPE_TEXT } from '@/enums/inspectEnum';
import { donorStatusMap, donorStatusValueEnum } from '@/enums/callbackEnum';

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
    title: '血浆编号',
    dataIndex: 'bagNo',
  },
  {
    title: '浆员编号',
    dataIndex: 'donorNo',
  },
  {
    title: '浆员姓名',
    dataIndex: 'donorName',
  },
  {
    title: '浆员状态',
    dataIndex: 'donatorStatus',
    format: (text) => {
      return donorStatusMap.get(text as donorStatusValueEnum) as string;
    },
  },
  {
    title: '血浆类型',
    dataIndex: 'plasmaImmType',
    format: (text) => PLASMA_TYPE_TEXT[text],
  },
  {
    title: '采浆日期',
    dataIndex: 'collectAt',
  },
  {
    title: '最后采浆日期',
    dataIndex: 'lastCollectAt',
  },
  {
    title: '最后回访日期',
    dataIndex: 'lastCallBackAt',
  },
  {
    title: '确认人',
    dataIndex: 'creator',
  },
  {
    title: '确认日期',
    dataIndex: 'createAt',
  },
];

export const searchFormSchema: FormSchema[] = [
  {
    label: '血浆批号',
    component: 'Input',
    field: 'batchNo',
  },
  {
    label: '血浆编号',
    component: 'Input',
    field: 'bagNo',
  },
  {
    label: '浆员编号',
    component: 'Input',
    field: 'donorNo',
  },
  {
    label: '状态',
    component: 'Select',
    field: 'isConfirm',
    componentProps: {
      options: [
        {
          label: '已确认',
          value: true,
        },
        {
          label: '未确认',
          value: false,
        },
      ],
    },
  },
];
