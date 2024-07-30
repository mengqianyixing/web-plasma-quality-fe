import { FormSchema } from '@/components/Table';

export const columns = [
  {
    field: 'nowBoxNo',
    title: '现存箱号',
    width: 140,
    className: 'no-ellipsis',
  },
  {
    field: 'boxNo',
    title: '浆站箱号',
    width: 140,
    className: 'no-ellipsis',
  },
  {
    title: '血浆编号',
    field: 'bagNo',
    width: 160,
    className: 'no-ellipsis',
  },
  {
    title: '采集日期',
    field: 'collectAt',
    slots: { default: 'collectAt' },
    width: 110,
  },
  {
    title: '浆员编号',
    field: 'cardNo',
    width: 120,
    className: 'no-ellipsis',
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
    width: 50,
  },
  {
    title: '血型',
    field: 'bloodType',
    width: 50,
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
    width: 180,
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
    width: 160,
    className: 'no-ellipsis',
  },
  {
    title: '样本验收结果',
    field: 'sampleResult',
    width: 160,
    className: 'no-ellipsis',
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
  },
  {
    field: 'batchNo',
    label: '血浆批号',
    component: 'Input',
  },
  {
    field: 'bagNo',
    label: '血浆编号',
    component: 'Input',
  },
  {
    field: 'nowBoxNo',
    label: '现存箱号',
    component: 'Input',
  },
  {
    field: 'stationBoxNo',
    label: '浆站箱号',
    component: 'Input',
  },
  {
    field: 'verifyBy',
    label: '验收人',
    component: 'Input',
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
  },
  {
    field: 'order',
    label: '排序',
    component: 'Input',
    defaultValue: 'desc',
    show: false,
  },
];
