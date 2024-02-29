import { FormSchema } from '@/components/Form';
import { BasicColumn } from '@/components/Table';
import { stationNameSearchApi } from '@/api/plasmaStore/entryPlasma';
import { SERVER_ENUM } from '@/enums/serverEnum';
import { useServerEnumStoreWithOut } from '@/store/modules/serverEnums';

const serverEnumStore = useServerEnumStoreWithOut();
const SampleType = serverEnumStore.getServerEnumText(SERVER_ENUM.SampleType);

export const columns: BasicColumn[] = [
  {
    title: '采浆公司',
    dataIndex: 'stationName',
    width: 150,
  },
  {
    title: '样本批号',
    dataIndex: 'bsNo',
    width: 150,
  },

  {
    title: '样本类型',
    dataIndex: 'sampleType',
    width: 150,
    format: (text) => SampleType(text),
  },
  {
    title: '样本数量',
    dataIndex: 'sampleCount',
    width: 150,
  },
  {
    title: '样本验收',
    children: [
      {
        title: '合格数',
        dataIndex: 'verification.passCount',
        width: 150,
      },
      {
        title: '不合格数',
        dataIndex: 'verification.failedCount',
        width: 150,
      },
      {
        title: '不合格比率(%)',
        dataIndex: 'verification.ratio',
        width: 150,
      },
    ],
  },
  {
    title: '检测数量',
    dataIndex: 'testCount',
    width: 150,
  },
  {
    title: '检测合格',
    children: [
      {
        title: '合格数',
        dataIndex: 'qualified.passCount',
        width: 150,
      },
      {
        title: '合格比率(%)',
        dataIndex: 'qualified.ratio',
        width: 150,
      },
    ],
  },
  {
    title: '检测不合格',
    children: [
      {
        title: 'HBV-DNA',
        dataIndex: 'unqualified.hbvdna',
        width: 150,
      },
      {
        title: 'HCV-RNA',
        dataIndex: 'unqualified.hcvrna',
        width: 150,
      },
      {
        title: 'HIV-RNA',
        dataIndex: 'unqualified.hivrna',
        width: 150,
      },
      {
        title: 'HBsAg',
        dataIndex: 'unqualified.hbsag',
        width: 150,
      },
      {
        title: 'HCV抗体',
        dataIndex: 'unqualified.hcv',
        width: 150,
      },
      {
        title: 'HIV-1/HIV-2抗体',
        dataIndex: 'unqualified.hiv',
        width: 150,
      },
      {
        title: 'TP抗体',
        dataIndex: 'unqualified.tpAntibody',
        width: 150,
      },
      {
        title: 'ALT',
        dataIndex: 'unqualified.alt',
        width: 150,
      },
      {
        title: 'TP',
        dataIndex: 'unqualified.tp',
        width: 150,
      },
      {
        title: '合计',
        dataIndex: 'unqualified.count',
        width: 150,
      },
      {
        title: '不合格比率(%)',
        dataIndex: 'unqualified.ratio',
        width: 150,
      },
    ],
  },
];

export const searchFormSchema: FormSchema[] = [
  {
    field: 'fkStationNo',
    component: 'ApiSelect',
    label: '采浆公司',
    componentProps: {
      api: stationNameSearchApi,
      labelField: 'stationName',
      valueField: 'stationNo',
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
