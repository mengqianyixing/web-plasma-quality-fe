import { FormSchema } from '@/components/Form';
import { BasicColumn } from '@/components/Table';
import { useStation } from '@/hooks/common/useStation';
import { SERVER_ENUM } from '@/enums/serverEnum';
import { useServerEnumStoreWithOut } from '@/store/modules/serverEnums';

const { stationOptions } = useStation();
const serverEnumStore = useServerEnumStoreWithOut();

export const checkUnqKey = 'checkUnq';
export const quarantineUnqKey = 'quarantineUnq';
export const trackUnqKey = 'trackUnq';
export const projectsKey = 'projects';
export const numKey = 'num';
export const ratioKey = 'ratio';
export const bagNumKey = 'bagNum';

export const collectKey = '[collectStartDate, collectEndDate]';
export const verifyPubKey = '[verifyPubStartDate, verifyPubEndDate]';
export const blockKey = '[blockStartDate, blockEndDate]';
export enum Type {
  CHECK_FAIL = 'CHECK_FAIL',
  QUA_FAIL = 'QUA_FAIL',
  FTRK_FAIL = 'FTRK_FAIL',
}
export const columns: BasicColumn[] = [
  {
    title: '采浆公司',
    dataIndex: 'stationName',
    width: 150,
  },
  {
    title: '血浆数量（袋）',
    dataIndex: bagNumKey,
    width: 150,
  },

  {
    title: '检测不合格',
    dataIndex: '',
    children: [
      {
        title: '合计',
        dataIndex: [checkUnqKey, numKey],
        width: 150,
      },
      {
        title: '比率(%)',
        dataIndex: [checkUnqKey, ratioKey],
        width: 150,
        format: (t: any) => Number(((t || 0) * 100).toFixed(2)),
      },
    ],
  },

  {
    title: '检疫期不合格',
    dataIndex: '',
    children: [
      {
        title: '合计',
        dataIndex: [quarantineUnqKey, numKey],
        width: 150,
      },
      {
        title: '比率(%)',
        dataIndex: [quarantineUnqKey, ratioKey],
        width: 150,
        format: (t: any) => Number(((t || 0) * 100).toFixed(2)),
      },
    ],
  },

  {
    title: '续追踪不合格',
    dataIndex: '',
    children: [
      {
        title: '合计',
        dataIndex: [trackUnqKey, numKey],
        width: 150,
      },
      {
        title: '比率(%)',
        dataIndex: [trackUnqKey, ratioKey],
        width: 150,
        format: (t: any) => Number(((t || 0) * 100).toFixed(2)),
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
    field: collectKey,
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
  {
    field: 'blockBy',
    component: 'Select',
    label: '追踪类型',
    componentProps: {
      options: serverEnumStore.getServerEnum(SERVER_ENUM.BagBlockSource),
    },
  },
  {
    field: '[blockStartDate, blockEndDate]',
    component: 'RangePicker',
    label: '不合格日期',
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
