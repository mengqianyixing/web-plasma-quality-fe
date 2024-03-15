import { FormSchema } from '@/components/Form';
import { BasicColumn } from '@/components/Table';
import { SERVER_ENUM } from '@/enums/serverEnum';
import { useServerEnumStoreWithOut } from '@/store/modules/serverEnums';
import { useStation } from '@/hooks/common/useStation';

const { stationOptions } = useStation();
const serverEnumStore = useServerEnumStoreWithOut();
const SampleType = serverEnumStore.getServerEnumText(SERVER_ENUM.SampleType);

export const columns: BasicColumn[] = [
  {
    title: '采浆公司',
    dataIndex: 'stationName',
    width: 80,
  },
  {
    title: '样本批号',
    dataIndex: 'bsNo',
    width: 120,
  },

  {
    title: '样本类型',
    dataIndex: 'sampleType',
    width: 80,
    format: (text) => SampleType(text),
  },
  {
    title: '样本数量',
    dataIndex: 'sampleCount',
    width: 80,
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
      },
      {
        title: 'HCV-RNA',
        dataIndex: ['unqualified', 'hcvrna'],
        width: 80,
      },
      {
        title: 'HIV-RNA',
        dataIndex: ['unqualified', 'hivrna'],
        width: 80,
      },
      {
        title: 'HBsAg',
        dataIndex: ['unqualified', 'hbsag'],
        width: 80,
      },
      {
        title: 'HCV抗体',
        dataIndex: ['unqualified', 'hcv'],
        width: 80,
      },
      {
        title: 'HIV-1/HIV-2抗体',
        dataIndex: ['unqualified', 'hiv'],
        width: 140,
      },
      {
        title: 'TP抗体',
        dataIndex: ['unqualified', 'tpAntibody'],
        width: 80,
      },
      {
        title: 'ALT',
        dataIndex: ['unqualified', 'alt'],
        width: 80,
      },
      {
        title: 'TP',
        dataIndex: ['unqualified', 'tp'],
        width: 80,
      },
      {
        title: '合计',
        dataIndex: ['unqualified', 'count'],
        width: 80,
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
      options: serverEnumStore.getServerEnum(SERVER_ENUM.SampleType),
    },
  },
  {
    field: 'bsNo',
    component: 'Input',
    label: '样本批号',
  },

  {
    field: 'issueAt',
    component: 'DatePicker',
    label: '结果发布日期',
    componentProps: {
      class: 'w-full',
      valueFormat: 'YYYY-MM-DD',
    },
  },
  {
    field: 'collectAt',
    component: 'DatePicker',
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
