/*
 * @Descripttion:
 * @version:
 * @Author: zcc
 * @Date: 2024-01-02 13:43:33
 * @LastEditors: zcc
 * @LastEditTime: 2024-01-02 17:43:12
 */
import { BasicColumn, FormSchema } from '@/components/Table';
import { getDictItemListByNoApi } from '@/api/dictionary';
import { stationNameSearchApi } from '@/api/plasmaStore/entryPlasma';

export const cellList = [
  {
    field: 'stationName',
    label: '采浆公司',
  },
  {
    field: 'bsNo',
    label: '样品批号',
  },
  {
    field: 'sampleTypeName',
    label: '样品类型',
  },
  {
    field: 'totalCount',
    label: '样品总数',
  },
  {
    field: 'totalQualified',
    label: '合格样品总数',
  },
  {
    field: 'status',
    label: '状态',
  },
];

export const batchColumns: BasicColumn[] = [
  {
    title: '样品批号',
    dataIndex: 'bsNo',
  },
  {
    title: '采浆公司',
    dataIndex: 'stationName',
  },
  {
    title: '样品类型',
    dataIndex: 'sampleCode',
    slots: { customRender: 'sampleCode' },
  },
  {
    title: '样品总数',
    dataIndex: 'totalCount',
  },
  {
    title: '合格样品数',
    dataIndex: 'totalQualified',
  },
  {
    title: '浆站出库日期',
    dataIndex: 'outDate',
  },
  {
    title: '接收日期',
    dataIndex: 'accepted',
  },
  {
    title: '登记情况',
    dataIndex: 'status',
  },
];
export const batchSearchScheam: FormSchema[] = [
  {
    field: 'stationNo',
    component: 'ApiSelect',
    label: '采浆公司',
    componentProps: {
      api: stationNameSearchApi,
      labelField: 'stationName',
      valueField: 'stationNo',
    },
  },
  {
    field: 'sampleCode',
    component: 'ApiSelect',
    label: '样品类型',
    componentProps: {
      api: () =>
        new Promise((rs, rj) => {
          getDictItemListByNoApi(['sampleType'])
            .then((res) => {
              rs(res[0]['dictImtes']);
            })
            .catch(rj);
        }),
    },
  },
  {
    field: 'bsNo',
    component: 'Input',
    label: '样品批号',
  },
];
