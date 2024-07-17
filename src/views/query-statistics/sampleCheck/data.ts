import { FormSchema } from '@/components/Form';
import { BasicColumn } from '@/components/Table';
import { SERVER_ENUM } from '@/enums/serverEnum';
import { useServerEnumStoreWithOut } from '@/store/modules/serverEnums';
import { useStation } from '@/hooks/common/useStation';

const { stationOptions } = useStation();
const serverEnumStore = useServerEnumStoreWithOut();
const SampleType = serverEnumStore.getServerEnumText(SERVER_ENUM.SampleType);
export const columns: (
  customRender: any,
  customRender2: any,
  customRender3: any,
) => BasicColumn[] = (customRender, customRender2, customRender3) => [
  {
    width: 80,
    title: '采浆公司',
    dataIndex: 'stationName',
    fixed: 'left',
  },
  {
    width: 80,
    title: '样本类型',
    dataIndex: 'sampleType',
    format: (text) => SampleType(text),
    fixed: 'left',
  },

  {
    width: 80,
    title: '样本总数',
    dataIndex: 'sampleCount',
    format: (v) => v || 0,
    customRender,
    fixed: 'left',
  },
  {
    width: 120,
    title: '已接收血浆未验收',
    dataIndex: 'acceptCount',
    format: (v) => v || 0,
    customRender,
  },
  {
    width: 120,
    title: '血浆已验收未检测',
    dataIndex: 'verifiyCount',
    format: (v) => v || 0,
    customRender,
  },
  {
    width: 80,
    title: '检测样本',
    dataIndex: 'checkCount',
    format: (v) => v || 0,
    customRender: customRender3,
  },
  {
    width: 80,
    title: '检测中',
    dataIndex: 'checkingCount',
    format: (v) => v || 0,
    customRender,
  },
  {
    title: '检测合格',
    children: [
      {
        width: 80,
        title: '合格',
        dataIndex: ['check', 'count'],
        format: (v) => v || 0,
        customRender,
      },
      {
        width: 80,
        title: '比率(%)',
        dataIndex: ['check', 'ratio'],
        format: (t: any) => Number(((t || 0) * 100).toFixed(2)),
      },
    ],
  },
  {
    width: 100,
    title: '检测不合格',
    children: [
      {
        width: 80,
        title: '合计',
        dataIndex: ['failed', 'count'],
        format: (v) => v || 0,
        customRender: customRender2,
      },
      {
        width: 80,
        title: '比率(%)',
        dataIndex: ['failed', 'ratio'],
        format: (t: any) => Number(((t || 0) * 100).toFixed(2)),
      },
    ],
  },
  {
    title: '验收不合格',
    children: [
      {
        width: 120,
        title: '血浆验收不合格',
        dataIndex: ['verification', 'bag'],
        format: (v) => v || 0,
        customRender: customRender2,
      },
      {
        width: 120,
        title: '样本验收不合格',
        dataIndex: ['verification', 'sample'],
        format: (v) => v || 0,
        customRender: customRender2,
      },
      {
        width: 80,
        title: '合计',
        dataIndex: ['verification', 'count'],
        format: (v) => v || 0,
        customRender: customRender2,
      },
      {
        width: 80,
        title: '比率(%)',
        dataIndex: ['verification', 'ratio'],
        format: (t: any) => Number(((t || 0) * 100).toFixed(2)),
      },
    ],
  },
  {
    width: 100,
    title: '其他不合格',
    dataIndex: 'other',
    format: (v) => v || 0,
    customRender: customRender2,
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
    field: 'sampleType',
    component: 'Select',
    label: '样本类型',
    componentProps: {
      options: serverEnumStore
        .getServerEnum(SERVER_ENUM.SampleType)
        .filter((item) => ['CAB', 'NOR', 'CMV'].includes(item.value)),
    },
  },
  {
    field: '[collectionBegin,collectionEnd]',
    component: 'RangePicker',
    label: '采集日期',
    componentProps: {
      class: 'w-full',
      valueFormat: 'YYYY-MM-DD',
    },
  },
  {
    field: '[issueBegin,issueEnd]',
    component: 'RangePicker',
    label: '发布日期',
    componentProps: {
      class: 'w-full',
      valueFormat: 'YYYY-MM-DD',
    },
  },
];
export const dtColumns: BasicColumn[] = [
  {
    width: 80,
    title: '样本批号',
    dataIndex: 'batchNo',
  },
  {
    width: 80,
    title: '总数',
    dataIndex: 'count',
  },
  {
    width: 80,
    title: '狂免',
    dataIndex: 'r',
  },
  {
    width: 80,
    title: '乙免',
    dataIndex: 'b',
  },
  {
    width: 80,
    title: '巨细胞',
    dataIndex: 'c',
  },
  {
    width: 80,
    title: '破免',
    dataIndex: 't',
  },
  {
    width: 80,
    title: '样本接收日期',
    dataIndex: 'acceptAt',
  },
];

export const dtColumns2: BasicColumn[] = [
  {
    width: 80,
    title: '样本编号',
    dataIndex: 'sampleNo',
  },
  {
    width: 80,
    title: '采集日期',
    dataIndex: 'collectAt',
  },
  {
    width: 80,
    title: '浆员编号',
    dataIndex: 'cardNo',
  },
  {
    width: 80,
    title: '浆员姓名',
    dataIndex: 'name',
  },
  {
    width: 80,
    title: '不合格原因',
    dataIndex: 'failed',
  },
];
export const dtColumns3: BasicColumn[] = [
  {
    width: 80,
    title: '样本批号',
    dataIndex: 'batchNo',
  },
  {
    width: 80,
    title: '总数',
    dataIndex: 'count',
  },
  {
    width: 80,
    title: '来样日期',
    dataIndex: 'acceptAt',
  },
];
