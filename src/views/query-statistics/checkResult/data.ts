import { FormSchema } from '@/components/Form';
import { BasicColumn } from '@/components/Table';
import { SERVER_ENUM } from '@/enums/serverEnum';
import { useServerEnumStoreWithOut } from '@/store/modules/serverEnums';
import { useStation } from '@/hooks/common/useStation';

const { stationOptions } = useStation();
const serverEnumStore = useServerEnumStoreWithOut();
const SampleType = serverEnumStore.getServerEnumText(SERVER_ENUM.SampleType);

export const columns: (customRender: Function) => BasicColumn[] = (customRender) => [
  {
    title: '采浆公司',
    dataIndex: 'stationName',
    width: 80,
    fixed: 'left',
  },
  {
    title: '样本批号',
    dataIndex: 'bsNo',
    width: 120,
    fixed: 'left',
  },

  {
    title: '样本类型',
    dataIndex: 'sampleType',
    width: 80,
    format: (text) => SampleType(text),
    fixed: 'left',
  },
  {
    title: '样本数量',
    dataIndex: 'sampleCount',
    width: 80,
    fixed: 'left',
  },
  {
    title: '样本验收',
    children: [
      {
        title: '合格数',
        dataIndex: ['verification', 'passCount'],
        width: 80,
      },
      {
        title: '不合格数',
        dataIndex: ['verification', 'failedCount'],
        width: 80,
        // customRender: ({ record }) => customRender({ record, key: ['verification', 'failedCount'].join('.') ,label:'样本验收不合格数'}),
      },
      {
        title: '不合格比率(%)',
        dataIndex: ['verification', 'ratio'],
        width: 100,
        format: (t: any) => Number(((t || 0) * 100).toFixed(2)),
      },
    ],
  },
  {
    title: '检测数量',
    dataIndex: 'testCount',
    width: 150,
    slots: { customRender: 'testCount' },
  },
  {
    title: '检测合格',
    children: [
      {
        title: '合格数',
        dataIndex: ['qualified', 'passCount'],
        width: 80,
      },
      {
        title: '合格比率(%)',
        dataIndex: ['qualified', 'ratio'],
        width: 100,
        format: (t: any) => Number(((t || 0) * 100).toFixed(2)),
      },
    ],
  },
  {
    title: '检测不合格',
    children: [
      {
        title: 'HBV-DNA',
        dataIndex: ['unqualified', 'hbvdna'],
        width: 80,
        customRender: ({ record }) =>
          customRender({
            record,
            key: ['unqualified', 'hbvdna'].join('.'),
            label: '检测不合格HBV-DNA',
          }),
      },
      {
        title: 'HCV-RNA',
        dataIndex: ['unqualified', 'hcvrna'],
        width: 80,
        customRender: ({ record }) =>
          customRender({
            record,
            key: ['unqualified', 'hcvrna'].join('.'),
            label: '检测不合格HCV-RNA',
          }),
      },
      {
        title: 'HIV-RNA',
        dataIndex: ['unqualified', 'hivrna'],
        width: 80,
        customRender: ({ record }) =>
          customRender({
            record,
            key: ['unqualified', 'hivrna'].join('.'),
            label: '检测不合格HIV-RNA',
          }),
      },
      {
        title: 'HBsAg',
        dataIndex: ['unqualified', 'hbsag'],
        width: 80,
        customRender: ({ record }) =>
          customRender({
            record,
            key: ['unqualified', 'hbsag'].join('.'),
            label: '检测不合格HBsAg',
          }),
      },
      {
        title: 'HCV抗体',
        dataIndex: ['unqualified', 'hcv'],
        width: 80,
        customRender: ({ record }) =>
          customRender({
            record,
            key: ['unqualified', 'hcv'].join('.'),
            label: '检测不合格HCV抗体',
          }),
      },
      {
        title: 'HIV-1/HIV-2抗体',
        dataIndex: ['unqualified', 'hiv'],
        width: 140,
        customRender: ({ record }) =>
          customRender({
            record,
            key: ['unqualified', 'hiv'].join('.'),
            label: '检测不合格HIV-1/HIV-2抗体',
          }),
      },
      {
        title: 'TP抗体',
        dataIndex: ['unqualified', 'tpAntibody'],
        width: 80,
        customRender: ({ record }) =>
          customRender({
            record,
            key: ['unqualified', 'tpAntibody'].join('.'),
            label: '检测不合格TP抗体',
          }),
      },
      {
        title: 'ALT',
        dataIndex: ['unqualified', 'alt'],
        width: 80,
        customRender: ({ record }) =>
          customRender({ record, key: ['unqualified', 'alt'].join('.'), label: '检测不合格ALT' }),
      },
      {
        title: 'TP',
        dataIndex: ['unqualified', 'tp'],
        width: 80,
        customRender: ({ record }) =>
          customRender({ record, key: ['unqualified', 'tp'].join('.'), label: '检测不合格TP' }),
      },
      {
        title: '合计',
        dataIndex: ['unqualified', 'count'],
        width: 80,
        customRender: ({ record }) =>
          customRender({
            record,
            key: ['unqualified', 'count'].join('.'),
            label: '检测不合格合计',
          }),
      },
      {
        title: '不合格比率(%)',
        dataIndex: ['unqualified', 'ratio'],
        width: 120,
        format: (t: any) => Number(((t || 0) * 100).toFixed(2)),
      },
    ],
  },
];

export const searchFormSchema: FormSchema[] = [
  {
    field: 'fkStationNo',
    component: 'Select',
    label: '采浆公司',
    componentProps: {
      options: stationOptions,
    },
  },
  {
    field: 'sampleType',
    component: 'Select',
    label: '样本类型',
    componentProps: {
      options: serverEnumStore.getServerEnum(SERVER_ENUM.RsLabSampleType),
    },
  },
  {
    field: 'bsNo',
    component: 'Input',
    label: '样本批号',
  },

  {
    field: '[issueBegin,issueEnd]',
    component: 'RangePicker',
    label: '结果发布日期',
    componentProps: {
      class: 'w-full',
      valueFormat: 'YYYY-MM-DD',
    },
  },
  {
    field: '[collectionBegin,collectionEnd]',
    component: 'RangePicker',
    label: '样本采集日期',
    componentProps: {
      class: 'w-full',
      valueFormat: 'YYYY-MM-DD',
    },
  },
];

export const dtColumns: BasicColumn[] = [
  {
    dataIndex: 'sampleNo',
    title: '样本编号',
  },
  {
    dataIndex: 'project',
    title: '检测项目',
  },
  {
    dataIndex: 'conclusion',
    title: '检测结果',
  },
  {
    dataIndex: 'checkAt',
    title: '检测日期',
    format: (t) => t?.slice(0, 10),
  },
  {
    dataIndex: 'unqualified',
    title: '不合格',
  },
  {
    dataIndex: 'od',
    title: 'OD值',
  },
  {
    dataIndex: 'Cutoff值',
    title: 'CuttOff',
  },
  {
    dataIndex: 'ct',
    title: 'CT值',
  },
  {
    dataIndex: 'titerValue',
    title: '效价值',
  },
];
export const unDtColumns: BasicColumn[] = [
  {
    dataIndex: 'sampleNo',
    title: '样本编号',
    width: 110,
  },
  {
    dataIndex: 'batchNo',
    title: '样本批号',
    width: 110,
  },
  {
    dataIndex: 'sampleType',
    title: '样本类型',
    width: 110,
  },
  {
    dataIndex: 'collectAt',
    title: '采集日期',
    width: 110,
  },
  {
    dataIndex: 'cardNo',
    title: '浆员编号',
    width: 110,
  },
  {
    dataIndex: 'filed',
    title: '不合格原因',
    ellipsis: false,
    width: 220,
  },
];
