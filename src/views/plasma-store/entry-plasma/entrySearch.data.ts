import { stationNameSearchApi } from '@/api/plasmaStore/entryPlasma';
import { BasicColumn, FormSchema } from '@/components/Table';
import { operationMap, operationValueEnum } from '@/enums/stockoutEnum';

export const entryColumns: BasicColumn[] = [
  {
    title: '采浆公司',
    dataIndex: 'stationName',
    width: 150,
  },
  {
    title: '血浆批号',
    slots: { customRender: 'batchNo' },
    width: 120,
  },
  {
    title: '血浆情况',
    children: [
      {
        title: '采集开始日期',
        dataIndex: 'collectStartDate',
        width: 100,
      },
      {
        title: '采集结束日期',
        dataIndex: 'collectEndDate',
        width: 120,
      },
      {
        title: '浆站出库日期',
        dataIndex: 'stationOutDate',
        width: 100,
      },
      {
        title: '出库数量(袋)',
        dataIndex: 'outNum',
        width: 100,
      },
      {
        title: '出库总净重(kg)',
        dataIndex: 'outWeight',
        width: 120,
      },
    ],
  },
  {
    title: '入库情况',
    width: 500,
    children: [
      {
        title: '接收日期',
        dataIndex: 'receptDate',
        width: 100,
      },
      {
        title: '验收发布人',
        dataIndex: 'verifyPuber',
        width: 100,
      },
      {
        title: '验收发布日期',
        dataIndex: 'verifyPubDate',
        width: 100,
      },
      {
        title: '验收数量(袋)',
        dataIndex: '',
        slots: { customRender: 'verifyNum' },
        width: 100,
      },
      {
        title: '验收总净重(kg)',
        dataIndex: 'verifyWeight',
        width: 120,
      },
      {
        title: '差异数量(袋)',
        dataIndex: 'diffNum',
        width: 100,
      },
      {
        title: '差异总净重(kg)',
        dataIndex: 'diffWeight',
        width: 120,
      },
      {
        title: '验收合格数量(袋)',
        dataIndex: 'verifyPassNum',
        width: 130,
      },
      {
        title: '验收不合格数量(袋)',
        dataIndex: '',
        slots: { customRender: 'verifyNoPassNum' },
        width: 140,
      },
      {
        title: '不足量数量(袋)',
        dataIndex: '',
        slots: { customRender: 'hortFallNum' },
        width: 130,
      },
    ],
  },
];

export const searchFormSchema: FormSchema[] = [
  {
    label: '采浆公司',
    component: 'ApiSelect',
    field: 'stationNo',
    componentProps: {
      api: stationNameSearchApi,
      resultField: 'result',
      labelField: 'stationName',
      valueField: 'stationNo',
    },
  },
  {
    label: '血浆批号',
    component: 'Input',
    field: 'batchNo',
  },
  {
    label: '接收日期',
    component: 'RangePicker',
    field: '[receptStartDate, receptEndDate]',
  },
  {
    label: '验收日期',
    component: 'RangePicker',
    field: '[verifyPubStartDate, verifyPubEndDate]',
  },
];

export const entryDetailModalColumns: BasicColumn[] = [
  {
    title: '采浆公司',
    dataIndex: 'stationName',
    width: 150,
  },
  {
    title: '血浆批号',
    dataIndex: 'batchNo',
    width: 120,
  },
  {
    title: '浆站箱号',
    dataIndex: 'boxNo',
    width: 150,
  },
  {
    title: '现存箱号',
    dataIndex: 'bagNo',
    width: 150,
  },
  {
    title: '血浆编号',
    dataIndex: 'collectAt',
    width: 100,
  },
  {
    title: '采集日期',
    dataIndex: 'donorNo',
    width: 100,
  },
  {
    title: '浆员编号',
    dataIndex: 'donorNo',
    width: 100,
  },
  {
    title: '浆员姓名',
    dataIndex: 'donorName',
    width: 100,
  },
  {
    title: '浆员状态',
    dataIndex: 'donorStatus',
    width: 100,
  },
  {
    title: '血型',
    dataIndex: '',
    width: 100,
  },
  {
    title: '血浆类型',
    dataIndex: 'immType',
    format: (text) => {
      return operationMap.get(text as operationValueEnum) as string;
    },
    width: 100,
  },
  {
    title: '浆站净重(g)',
    dataIndex: 'stationWeight',
    width: 100,
  },
  {
    title: '验收净重(g)',
    dataIndex: 'verifyWeight',
    width: 100,
  },
  {
    title: '血浆过程状态',
    dataIndex: '',
    width: 100,
  },
  {
    title: '检疫期类型',
    dataIndex: '',
    width: 100,
  },
  {
    title: '血浆不合格原因',
    dataIndex: '',
    width: 120,
  },
  {
    title: '血浆复检信息',
    children: [
      {
        title: '结果发布日期',
        dataIndex: '',
        width: 120,
      },
      {
        title: '复检结果',
        dataIndex: '',
        width: 120,
      },
      {
        title: '不合格项目',
        dataIndex: '',
        width: 120,
      },
      {
        title: '血浆类型',
        dataIndex: '',
        width: 120,
      },
      {
        title: '效价结果值',
        dataIndex: '',
        width: 120,
      },
    ],
  },
  {
    title: '检疫期参考信息',
    children: [
      {
        title: '满足日期',
        dataIndex: '',
        width: 120,
      },
      {
        title: '样本批号',
        dataIndex: '',
        width: 120,
      },
      {
        title: '样本编号',
        dataIndex: '',
        width: 120,
      },
      {
        title: '采集日期',
        dataIndex: '',
        width: 120,
      },
      {
        title: '浆站检验日期',
        dataIndex: '',
        width: 120,
      },
      {
        title: '厂家复检日期',
        dataIndex: '',
        width: 120,
      },
      {
        title: '样本结果',
        dataIndex: '',
        width: 120,
      },
      {
        title: '不合格项目',
        dataIndex: '',
        width: 120,
      },
    ],
  },
  {
    title: '地址',
    dataIndex: 'address',
    width: 180,
  },
];

export const verifyDetailColumns: BasicColumn[] = [
  {
    title: '血浆类型',
    dataIndex: 'immuType',
    width: 90,
  },
  {
    title: '效价类型',
    dataIndex: '',
    width: 100,
  },
  {
    title: '血浆总数',
    dataIndex: 'plasmaNum',
    width: 100,
  },
  {
    title: '血浆总净重(kg)',
    dataIndex: 'plasmaWeight',
    width: 100,
  },
];

export const verifySumColumns: BasicColumn[] = [
  {
    title: '血浆类型',
    dataIndex: 'immuType',
    width: 100,
  },
  {
    title: '血浆总数',
    dataIndex: 'plasmaNum',
    width: 100,
  },
  {
    title: '血浆总净重(kg)',
    dataIndex: 'plasmaWeight',
    width: 100,
  },
];

export const noPassSearchFormSchema: FormSchema[] = [
  {
    label: '浆站箱号',
    component: 'Input',
    field: 'boxNo',
  },
  {
    label: '血浆编号',
    component: 'Input',
    field: 'bagNo',
  },
  {
    label: '验收人',
    component: 'Input',
    field: '',
  },
];

export const noPassModalColums: BasicColumn[] = [
  {
    title: '血浆编号',
    dataIndex: 'bagNo',
  },
  {
    title: '浆员编号',
    dataIndex: 'donorNo',
  },
  {
    title: '浆员姓名',
    dataIndex: 'donorName',
  },
  {
    title: '浆站箱号',
    dataIndex: 'boxNo',
  },
  {
    title: '采集日期',
    dataIndex: 'collectAt',
  },
  {
    title: '验收人',
    dataIndex: '',
  },
  {
    title: '复核人',
    dataIndex: '',
  },
  {
    title: '验收日期',
    dataIndex: '',
  },
  {
    title: '血浆净重(kg)',
    dataIndex: 'plasmaWeight',
  },
  {
    title: '不合格原因',
    dataIndex: '',
  },
];

export const hortFallNumModalColums: BasicColumn[] = [
  {
    title: '血浆批号',
    dataIndex: '',
  },
  {
    title: '血浆编号',
    dataIndex: '',
  },
  {
    title: '浆员姓名',
    dataIndex: '',
  },
  {
    title: '浆员批号',
    dataIndex: '',
  },
  {
    title: '采集日期',
    dataIndex: '',
  },
  {
    title: '浆站净重',
    dataIndex: '',
  },
];
