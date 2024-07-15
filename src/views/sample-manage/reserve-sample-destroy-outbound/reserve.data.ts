import { BasicColumn, FormSchema } from '@/components/Table';
import { VxeGridPropTypes } from '@/components/VxeTable';
import dayjs from 'dayjs';
import { useServerEnumStoreWithOut } from '@/store/modules/serverEnums';
import { SERVER_ENUM } from '@/enums/serverEnum';
import { useStation } from '@/hooks/common/useStation';

const serverEnumStore = useServerEnumStoreWithOut();
const { stationOptions } = useStation();

export const columns: BasicColumn[] = [
  {
    title: '申请单号',
    dataIndex: 'dlvNo',
    slots: { customRender: 'dlvNo' },
    ellipsis: false,
    width: 180,
  },
  {
    title: '批次数量',
    dataIndex: 'batchNum',
    width: 80,
  },
  {
    title: '样本袋数',
    dataIndex: 'sampleNum',
    width: 80,
  },
  {
    title: '样本数量',
    dataIndex: 'totalNum',
    width: 80,
  },
  {
    title: '血浆最晚投产日期',
    dataIndex: 'bagLatestProdDate',
    width: 100,
  },
  {
    title: '备注',
    dataIndex: 'remark',
    width: 180,
    ellipsis: false,
  },
  {
    title: '申请人',
    dataIndex: 'applyBy',
    width: 80,
  },
  {
    title: '申请日期',
    dataIndex: 'applyDate',
    width: 100,
  },
  {
    title: '审核人',
    dataIndex: 'reviewer',
    width: 80,
  },
  {
    title: '审核日期',
    dataIndex: 'reviewDate',
    width: 100,
  },
  {
    title: '状态',
    dataIndex: 'state',
    width: 80,
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
    field: 'sampleBatchNo',
    component: 'Input',
    label: '样本批号',
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
    field: 'dlvNo',
    component: 'Input',
    label: '申请单号',
  },
  {
    field: '[applyStartDate, applyEndDate]',
    component: 'RangePicker',
    label: '申请日期',
  },
  {
    field: 'state',
    component: 'Select',
    componentProps: {
      options: serverEnumStore.getServerEnum(SERVER_ENUM.SampleDeliverType),
    },
    label: '状态',
  },
  {
    field: 'dlvType',
    component: 'Input',
    defaultValue: 'RSO',
    show: false,
  },
];

export const requisitionColumns: VxeGridPropTypes.Columns = [
  {
    type: 'checkbox',
    width: 50,
  },
  {
    type: 'seq',
    title: '序号',
    width: 80,
  },
  {
    title: '采浆公司',
    field: 'stationName',
  },
  {
    title: '样本批号',
    field: 'batchNo',
  },
  {
    title: '样本袋数',
    field: 'sampleBagNum',
  },
  {
    title: '样本数量',
    field: 'sampleNum',
  },
  {
    title: '血浆最晚投产日期',
    field: 'bagLatestProdDate',
  },
];

export const requisitionDetailByBatch: BasicColumn[] = [
  {
    dataIndex: 'stationName',
    title: '采浆公司',
  },
  {
    dataIndex: 'batchNo',
    title: '样本批号',
  },
  {
    dataIndex: 'sampleBagNum',
    title: '样本袋数',
  },
  {
    dataIndex: 'sampleNum',
    title: '样本数量',
  },
  {
    dataIndex: 'bagLatestProdDate',
    title: '血浆最晚投产日期',
    format(text) {
      return text ? dayjs(text).format('YYYY-MM-DD') : '-';
    },
  },
];
export const requisitionDetailByBag: BasicColumn[] = [
  {
    dataIndex: 'stationName',
    title: '采浆公司',
  },
  {
    dataIndex: 'batchNo',
    title: '样本批号',
  },
  {
    dataIndex: 'sampleBagNo',
    title: '样本袋号',
  },
  {
    dataIndex: 'sampleNum',
    title: '样本数量',
  },
  {
    dataIndex: 'boxNo',
    title: '箱号',
    ellipsis: false,
  },
  {
    dataIndex: 'location',
    title: '存放位置',
    ellipsis: false,
  },
];

export const trayColumns: VxeGridPropTypes.Columns = [
  {
    type: 'checkbox',
    width: 50,
  },
  {
    type: 'seq',
    title: '序号',
    width: 80,
  },
  {
    title: '托盘号',
    field: 'trayNo',
  },
  {
    title: '采浆公司',
    field: 'stationName',
  },
  {
    title: '样本批号',
    field: 'batchNo',
  },
  {
    title: '样本袋号',
    field: 'sampleBagNo',
  },
  {
    title: '箱号',
    field: 'boxNo',
  },
  {
    title: '存放位置',
    field: 'location',
  },
];
