import { FormSchema } from '@/components/Form';
import { BasicColumn } from '@/components/Table';
import { useStation } from '@/hooks/common/useStation';

const { stationOptions } = useStation();
export const backTrackUnqKey = 'backTrackUnq';
export const followTrackNumUnqKey = 'followTrackNumUnq';
export const otherNumUnqKey = 'otherNumUnq';
export const projectsKey = 'projects';
export const numKey = 'num';
export const ratioKey = 'ratio';
export const trackNumKey = 'trackNum';
export enum Type {
  FOLLOW = 'FOLLOW',
  BACK = 'BACK',
  OTHER = 'OTHER',
}
export const columns: BasicColumn[] = [
  {
    title: '年份',
    dataIndex: 'year',
    width: 70,
  },
  {
    title: '续追踪血浆数量(袋)',
    dataIndex: trackNumKey,
    width: 140,
  },
  {
    title: '回访不合格追踪',
    children: [
      {
        dataIndex: [backTrackUnqKey, numKey],
        title: '合计',
        width: 80,
      },
      {
        dataIndex: [backTrackUnqKey, ratioKey],
        title: '比率(%)',
        format: (t: any) => Number(((t || 0) * 100).toFixed(2)),
        width: 80,
      },
    ],
  },
  {
    title: '后续供浆检测不合格追踪',
    children: [
      {
        dataIndex: [followTrackNumUnqKey, numKey],
        title: '合计',
        width: 80,
      },
      {
        dataIndex: [followTrackNumUnqKey, ratioKey],
        title: '比率(%)',
        format: (t: any) => Number(((t || 0) * 100).toFixed(2)),
        width: 80,
      },
    ],
  },
  {
    title: '其他无后续信息',
    children: [
      {
        dataIndex: [otherNumUnqKey, numKey],
        title: '数量(袋)',
        width: 80,
        slots: { customRender: 'otherNum' },
      },
      {
        dataIndex: [otherNumUnqKey, ratioKey],
        title: '比率(%)',
        format: (t: any) => Number(((t || 0) * 100).toFixed(2)),
        width: 80,
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
    field: '[collectStartDate, collectEndDate]',
    component: 'RangePicker',
    label: '采集日期',
    componentProps: {
      valueFormat: 'YYYY-MM-DD',
      class: 'w-full',
    },
  },
  {
    field: '[verifyPubStartDate, verifyPubEndDate]',
    component: 'RangePicker',
    label: '检测发布日期',
    componentProps: {
      valueFormat: 'YYYY-MM-DD',
      class: 'w-full',
    },
  },
];
export const dtColumns: BasicColumn[] = [
  {
    dataIndex: 'donorNo',
    title: '浆员编号',
  },
  {
    dataIndex: 'name',
    title: '浆员姓名',
  },
  {
    dataIndex: 'batchNo',
    title: '血浆批号',
  },
  {
    dataIndex: 'bagNo',
    title: '血浆编号',
  },
  {
    dataIndex: 'collectAt',
    title: '血浆采集日期',
  },
];
