import { FormSchema } from '@/components/Form';
import { BasicColumn } from '@/components/Table';
import { useStation } from '@/hooks/common/useStation';

const { stationOptions } = useStation();

export const columns: BasicColumn[] = [
  {
    title: '采浆公司',
    dataIndex: 'stationName',
    width: 80,
  },
  {
    title: '血浆批号',
    dataIndex: 'batchNo',
    width: 120,
    ellipsis: false,
  },
  {
    title: '最早采集日期',
    dataIndex: 'firstCollectAt',
    width: 100,
    format: (v) => v?.slice(0, 10),
  },
  {
    title: '最晚采集日期',
    dataIndex: 'lastCollectAt',
    width: 100,
    format: (v) => v?.slice(0, 10),
  },
  {
    title: '浆站合格数',
    dataIndex: 'stationTotal',
    width: 100,
  },
  {
    width: 110,
    title: '厂家检测样本数',
    dataIndex: 'testTotal',
    slots: { customRender: 'testTotal' },
  },
  {
    title: '厂家检测情况',
    children: [
      {
        width: 110,
        title: 'HBsAg不合格数',
        dataIndex: 'hbsag',
      },
      {
        width: 110,
        title: 'HBsAg符合率',
        dataIndex: 'hbsagSucRate',
      },
      {
        width: 130,
        title: 'HCV抗体不合格数',
        dataIndex: 'hcv',
      },
      {
        width: 120,
        title: 'HCV抗体符合率',
        dataIndex: 'hcvSucRate',
      },
      {
        width: 180,
        title: 'HIV-1/HIV-2抗体不合格数',
        dataIndex: 'hiv',
      },
      {
        width: 160,
        title: 'HIV-1/HIV-2抗体符合率',
        dataIndex: 'hivSucRate',
      },
      {
        width: 110,
        title: 'TP抗体不合格数',
        dataIndex: 'tpAntibody',
      },
      {
        width: 110,
        title: 'TP抗体符合率',
        dataIndex: 'tpAntibodySucRate',
      },
      {
        width: 110,
        title: 'ALT不合格数',
        dataIndex: 'alt',
      },
      {
        width: 110,
        title: 'ALT符合率',
        dataIndex: 'altSucRate',
      },
      {
        width: 110,
        title: 'TP不合格数',
        dataIndex: 'tp',
      },
      {
        width: 110,
        title: 'TP符合率',
        dataIndex: 'tpSucRate',
      },
      {
        width: 70,
        title: '总符合率',
        dataIndex: 'totalRate',
      },
    ],
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
    field: 'batchNo',
    component: 'Input',
    label: '血浆批号',
  },
  {
    field: '[beginCollectDate,endCollectDate]',
    component: 'RangePicker',
    label: '采集日期',
    componentProps: {
      class: 'w-full',
      valueFormat: 'YYYY-MM-DD',
    },
  },

  {
    field: '[beginAcceptDate,endAcceptDate]',
    component: 'RangePicker',
    label: '接收日期',
    componentProps: {
      class: 'w-full',
      valueFormat: 'YYYY-MM-DD',
    },
  },
  {
    field: '[beginIssueDate,endIssueDate]',
    component: 'RangePicker',
    label: '结果发布日期',
    componentProps: {
      class: 'w-full',
      valueFormat: 'YYYY-MM-DD',
    },
  },
];

export const dtSearchFormSchema: FormSchema[] = [
  {
    field: 'stationNo',
    component: 'Select',
    label: '采浆公司',
    componentProps: {
      options: stationOptions,
    },
  },
  {
    field: 'batchNo',
    component: 'Input',
    label: '血浆批号',
    required: true,
    componentProps: {},
  },
  {
    field: 'bagNo',
    component: 'Input',
    label: '血浆编号',
  },
  {
    field: '[beginCollectDate,endCollectDate]',
    component: 'RangePicker',
    label: '采集日期',
  },

  {
    field: '[beginIssueDate,endIssueDate]',
    component: 'RangePicker',
    label: '结果发布日期',
  },
];
export const dtColumns: BasicColumn[] = [
  {
    dataIndex: 'stationName',
    title: '采浆公司',
    width: 80,
    ellipsis: false,
  },
  {
    dataIndex: 'batchNo',
    title: '血浆批号',
    width: 140,
    ellipsis: false,
  },
  {
    dataIndex: 'bagNo',
    title: '血浆编号',
    width: 140,
    ellipsis: false,
  },
  {
    dataIndex: 'donorNo',
    title: '浆员编号',
    width: 100,
    ellipsis: false,
  },
  {
    dataIndex: 'donorName',
    title: '姓名',
    width: 100,
    ellipsis: false,
  },
  {
    dataIndex: 'bloodType',
    title: '血型	',
    width: 60,
    ellipsis: false,
  },
  {
    dataIndex: 'collectAt',
    title: '采集日期',
    width: 100,
    ellipsis: false,
  },
  {
    title: '浆站检测结果',
    children: [
      {
        dataIndex: 'stationHbsag',
        title: 'HBsAg',
        width: 100,
      },
      {
        dataIndex: 'stationHcv',
        title: 'HCV抗体',
        width: 100,
      },
      {
        dataIndex: 'stationHiv',
        title: 'HIV-1/HIV-2抗体',
        width: 100,
      },
      {
        dataIndex: 'stationTpAntibody',
        title: 'TP抗体',
        width: 100,
      },
      {
        dataIndex: 'stationAlt',
        title: 'ALT(U/L)',
        width: 100,
      },
      {
        dataIndex: 'stationTp',
        title: 'TP(g/L)',
        width: 100,
      },
    ],
  },
  {
    title: '厂家检测结果',
    children: [
      {
        dataIndex: 'lisHbsag',
        title: 'HBsAg',
        width: 100,
      },
      {
        dataIndex: 'lisHcv',
        title: 'HCV抗体',
        width: 100,
      },
      {
        dataIndex: 'lisHiv',
        title: 'HIV-1/HIV-2抗体',
        width: 100,
      },
      {
        dataIndex: 'lisTpAntibody',
        title: 'TP抗体',
        width: 100,
      },
      {
        dataIndex: 'lisAlt',
        title: 'ALT(U/L)',
        width: 100,
      },
      {
        dataIndex: 'lisTp',
        title: 'TP(g/L)',
        width: 100,
      },
    ],
  },
];
