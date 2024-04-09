import { FormSchema } from '@/components/Table';

export const columns = [
  {
    field: 'boxNo',
    title: '箱号',
    width: 120,
  },
  {
    title: '血浆编号',
    field: 'bagNo',
    width: 140,
  },
  {
    title: '采集日期',
    field: 'collectAt',
    slots: { default: 'collectAt' },
    width: 120,
  },
  {
    title: '浆员编号',
    field: 'donorNo',
    width: 120,
  },
  {
    title: '浆员名称',
    field: 'donorName',
    width: 100,
  },
  {
    title: '性别',
    field: 'gender',
    slots: { default: 'gender' },
    width: 100,
  },
  {
    title: '血型',
    field: 'bloodType',
    width: 100,
  },
  {
    title: '浆站重量(g)',
    field: 'rawWeight',
    width: 100,
  },
  {
    title: '验收净重(g)',
    field: 'netWeight',
    width: 100,
  },
  {
    title: '验收人',
    field: 'verifyUser',
    width: 100,
  },
  {
    title: '复核人',
    field: 'checker',
    width: 100,
  },
  {
    title: '验收时间',
    field: 'verifyAt',
    width: 120,
    slots: { default: 'verifyAt' },
  },
  {
    title: '验收状态',
    field: 'verifyState',
    slots: { default: 'verifyState' },
    width: 100,
  },
  {
    title: '血浆验收结果',
    field: 'bagResult',
    width: 120,
  },
  {
    title: '样本验收结果',
    field: 'sampleResult',
    width: 120,
  },
];

export const searchFormSchema: FormSchema[] = [
  {
    field: 'stationName',
    label: '采浆公司',
    component: 'Input',
    componentProps: {
      disabled: true,
    },
    colProps: {
      span: 4,
    },
  },
  {
    field: 'batchNo',
    label: '血浆批号',
    component: 'Input',
    colProps: {
      span: 4,
    },
  },
  {
    field: 'boxNo',
    label: '血浆箱号',
    component: 'Input',
    colProps: {
      span: 4,
    },
  },
  {
    field: 'verifyState',
    label: '验收状态',
    component: 'Select',
    componentProps: {
      options: [
        {
          value: 0,
          label: '未验收',
        },
        {
          value: 1,
          label: '已验收',
        },
      ],
    },
    colProps: {
      span: 4,
    },
  },
  {
    field: 'verifyResult',
    label: '验收结果',
    component: 'Select',
    componentProps: {
      options: [
        {
          value: 0,
          label: '不合格',
        },
        {
          value: 1,
          label: '合格',
        },
        {
          value: 2,
          label: '缺浆',
        },
      ],
    },
    colProps: {
      span: 4,
    },
  },
];
