import { BasicColumn, FormSchema } from '@/components/Table';
import dayjs from 'dayjs';
import { useServerEnumStoreWithOut } from '@/store/modules/serverEnums';
import { SERVER_ENUM } from '@/enums/serverEnum';

const serverEnumStore = useServerEnumStoreWithOut();

export const columns: BasicColumn[] = [
  {
    title: '采浆公司',
    dataIndex: 'stationName',
    width: 70,
  },
  {
    title: '血浆批号',
    dataIndex: 'batchNo',
    slots: { customRender: 'batchNo' },
    width: 120,
  },
  {
    title: '血浆箱数',
    dataIndex: 'boxNum',
    slots: { customRender: 'boxNum' },
    width: 75,
  },
  {
    title: '接收箱数',
    dataIndex: 'acceptBoxNum',
    width: 70,
  },
  {
    title: '血浆数量',
    dataIndex: 'bagNum',
    width: 70,
  },
  {
    title: '验收数量',
    dataIndex: 'verifyNum',
    width: 70,
  },
  {
    title: '合格血浆数量',
    dataIndex: 'passBagNum',
    slots: { customRender: 'passBagNum' },
    width: 105,
  },
  {
    title: '不合格血浆数量',
    dataIndex: 'noPassBagNum',
    slots: { customRender: 'noPassBagNum' },
    width: 120,
  },
  {
    title: '缺浆数量',
    dataIndex: 'lackNoNum',
    slots: { customRender: 'lackNoNum' },
    width: 75,
  },
  {
    title: '浆站重量(kg)',
    dataIndex: 'stationWeight',
    width: 95,
  },
  {
    title: '验收净重(kg)',
    dataIndex: 'verifyWeight',
    width: 95,
  },
  {
    title: '接收日期',
    dataIndex: 'acceptDate',
    width: 100,
  },
  {
    title: '验收日期',
    dataIndex: 'verifyDate',
    width: 100,
  },
  {
    title: '发布日期',
    dataIndex: 'pubDate',

    format(text) {
      return text ? dayjs(text).format('YYYY-MM-DD') : '-';
    },
    width: 100,
  },
  {
    title: '发布人',
    dataIndex: 'publisher',
    width: 80,
    ellipsis: false,
  },
  {
    title: '状态',
    dataIndex: 'state',
    format(text) {
      return serverEnumStore.getServerEnumText(SERVER_ENUM.BatchOperationSumState)(text);
    },
    width: 120,
  },
];

export const searchFormSchema: FormSchema[] = [
  {
    field: 'stationNo',
    label: '采浆公司',
    component: 'Select',
  },
  {
    field: 'batchNo',
    label: '血浆批号',
    component: 'Input',
  },
  {
    field: 'state',
    label: '状态',
    component: 'Select',
    componentProps: {
      options: serverEnumStore.getServerEnum(SERVER_ENUM.BatchOperationSumState),
    },
  },
  {
    field: '[receiveStartDate,receiveEndDate]',
    label: '血浆接收日期',
    component: 'RangePicker',
  },
  {
    field: '[verifyStartDate,verifyEndDate]',
    label: '验收日期',
    component: 'RangePicker',
  },
  {
    field: '[publishStartDate,publishEndDate]',
    label: '发布日期',
    component: 'RangePicker',
  },
];

export const unqualifiedColumns: BasicColumn[] = [
  {
    title: '血浆编号',
    dataIndex: 'bagNo',
  },
  {
    title: '浆员编号',
    dataIndex: 'cardNo',
  },
  {
    title: '不合格原因',
    dataIndex: 'unqReason',
    slots: { customRender: 'unqReason' },
  },
  {
    title: '验收人',
    dataIndex: 'receiver',
  },
  {
    title: '验收日期',
    dataIndex: 'verifyAt',
    format(text) {
      return text ? dayjs(text).format('YYYY-MM-DD') : '-';
    },
  },
];
