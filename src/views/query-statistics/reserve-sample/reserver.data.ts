import { FormSchema } from '@/components/Form';
import { BasicColumn } from '@/components/Table';
import { useStation } from '@/hooks/common/useStation';
import dayjs from 'dayjs';

const { stationOptions } = useStation();
export const mainRetainColumns: BasicColumn[] = [
  {
    title: '采浆公司',
    dataIndex: 'stationName',
    width: 100,
    fixed: 'left',
  },
  {
    title: '样本批号',
    dataIndex: 'batchNo',
    width: 120,
    fixed: 'left',
  },
  {
    title: '样本袋数',
    dataIndex: 'packNum',
    width: 80,
    slots: { customRender: 'packNum' },
  },
  {
    title: '样本数量',
    dataIndex: 'sampleNum',
    width: 80,
    slots: { customRender: 'sampleNum' },
  },
  {
    title: '状态',
    dataIndex: 'status',
    width: 80,
  },
  {
    title: '托盘编号',
    dataIndex: 'trayNo',
    width: 120,
  },
  {
    title: '存放库房',
    dataIndex: 'bankName',
    width: 100,
  },
  {
    title: '存放货位',
    dataIndex: 'locationNo',
    ellipsis: false,
    width: 100,
  },
];

export const searchMainRetainColumnsFormSchema: FormSchema[] = [
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
    label: '样本批号',
  },
  {
    field: 'keepBy',
    component: 'Select',
    label: '类别',
    componentProps: {
      options: [
        {
          value: 0,
          label: '采浆公司',
        },
        {
          value: 1,
          label: '厂家',
        },
      ],
    },
  },
  {
    field: 'status',
    component: 'Select',
    label: '状态',
    componentProps: {
      options: [
        {
          value: 0,
          label: '未入库',
        },
        {
          value: 1,
          label: '在库',
        },
        {
          value: 2,
          label: '已出库',
        },
      ],
    },
  },
];

export const retainPackColumns: BasicColumn[] = [
  {
    title: '采浆公司',
    dataIndex: 'stationName',
    width: 100,
    fixed: 'left',
  },
  {
    title: '样本批号',
    dataIndex: 'batchNo',
    width: 120,
    fixed: 'left',
  },
  {
    title: '样本箱号',
    dataIndex: 'boxNo',
    width: 120,
  },
  {
    title: '样本袋号',
    dataIndex: 'packNo',
    width: 120,
  },
  {
    title: '样本数量',
    dataIndex: 'sampleNum',
    width: 100,
    slots: {
      customRender: 'sampleNum',
    },
  },
  {
    title: '托盘编号',
    dataIndex: 'trayNo',
    width: 120,
  },
  {
    title: '存放库房',
    dataIndex: 'bankName',
    width: 100,
  },
  {
    title: '存放货位',
    dataIndex: 'locationNo',
    width: 100,
  },
];

export const searchRetainPackFormSchema: FormSchema[] = [
  {
    field: 'batchNo',
    component: 'Input',
    label: '样本批号',
  },
  {
    field: 'boxNo',
    component: 'Input',
    label: '样本箱号',
  },
  {
    field: 'packNo',
    component: 'Input',
    label: '样本袋号',
  },
  {
    field: 'keepBy',
    component: 'Select',
    label: '类别',
    componentProps: {
      options: [
        {
          value: 0,
          label: '采浆公司',
        },
        {
          value: 1,
          label: '厂家',
        },
      ],
    },
  },
];

export const retainBatchColumns: BasicColumn[] = [
  {
    title: '采浆公司',
    dataIndex: 'stationName',
    width: 100,
    fixed: 'left',
  },
  {
    title: '样本批号',
    dataIndex: 'batchNo',
    width: 120,
    fixed: 'left',
  },
  {
    title: '样本箱号',
    dataIndex: 'boxNo',
    width: 120,
  },
  {
    title: '样本袋号',
    dataIndex: 'packNo',
    width: 120,
  },
  {
    title: '类别',
    dataIndex: 'keepBy',
    width: 100,
  },
  {
    title: '样本编号',
    dataIndex: 'sampleNo',
    width: 120,
  },
  {
    title: '采集日期',
    dataIndex: 'collectDate',
    width: 110,
    format(text) {
      return text ? dayjs(text).format('YYYY-MM-DD') : '-';
    },
  },
  {
    title: '浆员编号',
    dataIndex: 'cardNo',
    width: 120,
  },
  {
    title: '浆员姓名',
    dataIndex: 'donorName',
    width: 100,
  },
  {
    title: '在库状态',
    dataIndex: 'status',
    width: 100,
  },
];

export const searchRetainBatchFormSchema: FormSchema[] = [
  {
    field: 'batchNo',
    component: 'Input',
    label: '样本批号',
  },
  {
    field: 'boxNo',
    component: 'Input',
    label: '样本箱号',
  },
  {
    field: 'packNo',
    component: 'Input',
    label: '样本袋号',
  },
  {
    field: 'sampleNo',
    component: 'Input',
    label: '样本编号',
  },
  {
    field: 'cardNo',
    component: 'Input',
    label: '浆员编号',
  },
  {
    field: 'keepBy',
    component: 'Select',
    label: '类别',
    componentProps: {
      options: [
        {
          value: 0,
          label: '采浆公司',
        },
        {
          value: 1,
          label: '厂家',
        },
      ],
    },
  },
  {
    field: 'status',
    component: 'Select',
    label: '在库状态',
    componentProps: {
      options: [
        {
          value: 0,
          label: '未入库',
        },
        {
          value: 1,
          label: '在库',
        },
        {
          value: 2,
          label: '已出库',
        },
      ],
    },
  },
];
