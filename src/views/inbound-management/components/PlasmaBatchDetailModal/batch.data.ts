import { BasicColumn, FormSchema } from '@/components/Table';
import dayjs from 'dayjs';

export const columns: BasicColumn[] = [
  {
    title: '箱号',
    dataIndex: 'boxNo',
  },
  {
    title: '血浆编号',
    dataIndex: 'bagNo',
  },
  {
    title: '采集日期',
    dataIndex: 'collectAt',
    customRender: ({ text }) => {
      return text ? dayjs(text).format('YYYY-MM-DD') : '-';
    },
  },
  {
    title: '浆员编号',
    dataIndex: 'donorNo',
  },
  {
    title: '浆员名称',
    dataIndex: 'donorName',
  },
  {
    title: '性别',
    dataIndex: 'gender',
    customRender: ({ text }) => {
      if (text === 'M') {
        return '男';
      } else if (text === 'F') {
        return '女';
      }
      return '';
    },
  },
  {
    title: '血型',
    dataIndex: 'bloodType',
  },
  {
    title: '浆站重量(g)',
    dataIndex: 'rawWeight',
  },
  {
    title: '验收净重(g)',
    dataIndex: 'netWeight',
  },
  {
    title: '验收人',
    dataIndex: 'verifyUser',
  },
  {
    title: '复核人',
    dataIndex: 'checker',
  },
  {
    title: '验收时间',
    dataIndex: 'verifyAt',
    customRender: ({ text }) => {
      return text ? dayjs(text).format('YYYY-MM-DD') : '-';
    },
  },
  {
    title: '验收状态',
    dataIndex: 'verifyState',
    slots: { customRender: 'verifyState' },
  },
  {
    title: '血浆验收结果',
    dataIndex: 'bagResult',
  },
  {
    title: '样本验收结果',
    dataIndex: 'sampleResult',
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
    field: 'boxNo',
    label: '血浆箱号',
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
];
