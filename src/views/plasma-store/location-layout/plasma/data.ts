import { BasicColumn, FormSchema } from '@/components/Table';
import {
  getBatchListApi,
  getBoxListApi,
  getDetailListApi,
} from '@/api/plasmaStore/locationLayout/index';

export const tabKey = { batch: '1', box: '2', plasma: '3' };
export const tabList = [
  { title: '批号明细', key: tabKey['batch'], api: getBatchListApi },
  { title: '箱号明细', key: tabKey['box'], api: getBoxListApi },
  { title: '血浆明细', key: tabKey['plasma'], api: getDetailListApi },
];
export const optionMap: Record<string, { cloumns: BasicColumn[]; searchSchema: FormSchema[] }> = {
  [tabKey['batch']]: {
    cloumns: [
      { dataIndex: 'stationName', title: '采浆公司' },
      { dataIndex: 'batchNo', title: '样本批号' },
      { dataIndex: 'totalCount', title: '样本数量' },
    ],
    searchSchema: [],
  },
  [tabKey['box']]: {
    cloumns: [
      { dataIndex: 'boxNo', title: '样本箱号' },
      { dataIndex: 'totalCount', title: '样本数量' },
    ],
    searchSchema: [],
  },
  [tabKey['plasma']]: {
    cloumns: [
      { dataIndex: 'stationName', title: '采浆公司', width: 80 },
      { dataIndex: 'batchNo', title: '血浆批号', width: 120, ellipsis: false },
      { dataIndex: 'boxNo', title: '血浆箱号', width: 100 },
      { dataIndex: 'bagNo', title: '血浆编号', width: 120, ellipsis: false },
      { dataIndex: 'cardNo', title: '浆员编号', width: 100, ellipsis: false },
      { dataIndex: 'donorName', title: '浆员姓名', width: 100, ellipsis: false },
      { dataIndex: 'collectAt', title: '采集日期', width: 100 },
    ],
    searchSchema: [
      { field: 'batchNo', component: 'Input', label: '血浆批号' },
      { field: 'boxNo', component: 'Input', label: '血浆箱号' },
      { field: 'number', component: 'Input', label: '血浆编号' },
    ],
  },
};
export const cellList = [
  {
    field: 'locationNo',
    label: '货位',
  },
  {
    field: 'trayNo',
    label: '托盘',
  },
  {
    field: 'trayType',
    label: '存放类型',
  },
  {
    field: 'totalCount',
    label: '数量',
  },
];
