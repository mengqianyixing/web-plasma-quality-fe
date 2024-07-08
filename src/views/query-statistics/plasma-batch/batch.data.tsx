import { FormSchema } from '@/components/Form';
import { BasicColumn } from '@/components/Table';
import { useStation } from '@/hooks/common/useStation';
import dayjs from 'dayjs';

const { stationOptions } = useStation();

export const columns: BasicColumn[] = [
  {
    title: '血浆批号',
    dataIndex: 'batchNo',
    customCell: (record) => {
      return {
        rowSpan: record.rowSpan,
      };
    },
  },
  {
    title: '来浆类型',
    dataIndex: 'plasmaType',
  },
  {
    title: '血浆编号（起止）',
    dataIndex: 'batchNoRange',
    width: 350,
  },
  {
    title: '浆站不合格',
    dataIndex: 'lackNos',
  },
  {
    title: '血浆数量',
    dataIndex: 'totalNum',
  },
  {
    title: '验收净重（kg）',
    dataIndex: 'verifyWeight',
  },
  {
    title: '验收血浆不合格编号',
    dataIndex: 'verifyUnqNos',
    ellipsis: false,
  },
];

export const columnsByQuarantine: BasicColumn[] = [
  {
    title: '血浆批号',
    dataIndex: 'batchNo',
    customCell: (record) => {
      return {
        rowSpan: record.rowSpan,
      };
    },
  },
  {
    title: '检疫期类型',
    dataIndex: 'quarantineType',
    customCell: (record) => {
      return {
        colSpan: record.titerType ? 1 : 2,
        rowSpan: record.quarantineSpan,
      };
    },
  },
  {
    title: '效价类型',
    dataIndex: 'titerType',
    customCell: (record) => {
      return {
        colSpan: record.titerType ? 1 : 0,
      };
    },
  },
  {
    title: '批检疫期报告情况',
    children: [
      {
        title: '血浆数量',
        dataIndex: 'batchStatusTotal',
      },
      {
        title: '验收净重(kg)',
        dataIndex: 'batchStatusWeight',
      },
    ],
  },
  {
    title: '当前检疫期状态',
    children: [
      {
        title: '血浆数量',
        dataIndex: 'nowStatusTotal',
      },
      {
        title: '验收净重(kg)',
        dataIndex: 'nowStatusWeight',
      },
    ],
  },
  {
    title: '库存状态',
    children: [
      {
        title: '在库数量',
        dataIndex: 'stockTotal',
      },
      {
        title: '在库净重(kg)',
        dataIndex: 'stockWeight',
      },
      {
        title: '出库数量',
        dataIndex: 'outTotal',
      },
      {
        title: '出库净重(kg)',
        dataIndex: 'outWeight',
      },
    ],
  },
];

export const columnsByInventory: BasicColumn[] = [
  {
    title: '血浆批号',
    dataIndex: 'batchNo',
  },
  {
    title: '项目',
    dataIndex: 'mesId',
  },
  {
    title: '在库类型',
    dataIndex: 'state',
  },
  {
    title: '效价类型',
    children: [
      {
        title: 'TH',
        dataIndex: 'thNum',
      },
      {
        title: 'TL',
        dataIndex: 'tlNum',
      },
      {
        title: 'BH',
        dataIndex: 'bhNum',
      },
      {
        title: 'BL',
        dataIndex: 'blNum',
      },
      {
        title: 'RH',
        dataIndex: 'rhNum',
      },
      {
        title: 'RL',
        dataIndex: 'rlNum',
      },
      {
        title: 'CH',
        dataIndex: 'chNum',
      },
      {
        title: 'CL',
        dataIndex: 'clNum',
      },
      {
        title: 'AH',
        dataIndex: 'ahNum',
      },
      {
        title: 'AL',
        dataIndex: 'alNum',
      },
      {
        title: 'N',
        dataIndex: 'nnum',
      },
    ],
  },
  {
    title: '合计',
    children: [
      {
        title: '数量（袋）',
        dataIndex: 'total',
      },
      {
        title: '验收净重(kg)',
        dataIndex: 'verifyWeight',
      },
    ],
  },
  {
    title: '出库日期',
    dataIndex: 'outDate',
    format(text) {
      return text ? dayjs(text).format('YYYY-MM-DD') : '';
    },
  },
];

export const searchFormSchema: FormSchema[] = [
  {
    field: 'stationNo',
    label: '采浆公司',
    component: 'Select',
    componentProps: {
      options: stationOptions,
      class: 'w-full',
    },
  },
  {
    field: '[batchStartNo,batchEndNo]',
    component: 'InputRange',
    label: '血浆批号',
    componentProps: {
      isBetween: false,
      allowClear: false,
    },
    colProps: { flex: '0 0 440px' },
  },
];
