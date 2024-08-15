import { BasicColumn, FormSchema } from '@/components/Table';
import { VxeGridPropTypes } from '@/components/VxeTable';
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
    title: '样本数量',
    dataIndex: 'totalNum',
    width: 80,
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
    defaultValue: 'RSD',
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
    title: '样本编号',
    field: 'sampleNo',
  },
  {
    title: '类别',
    field: 'source',
  },
  {
    title: '采集日期',
    field: 'collectDate',
  },
  {
    title: '浆员姓名',
    field: 'donorName',
  },
  {
    title: '浆员编号',
    field: 'donorNo',
  },
  {
    title: '血型',
    field: 'bloodType',
  },
  {
    title: '血浆状态',
    field: 'plasmaType',
  },
  {
    title: '血浆不合格原因',
    field: 'unqReason',
  },
];

export const requisitionDetail: BasicColumn[] = [
  {
    dataIndex: 'stationName',
    title: '采浆公司',
    width: 80,
  },
  {
    dataIndex: 'batchNo',
    title: '样本批号',
    width: 120,
  },
  {
    dataIndex: 'sampleNo',
    title: '样本编号',
    width: 120,
  },
  {
    dataIndex: 'collectDate',
    title: '采集日期',
    width: 100,
  },
  {
    dataIndex: 'donorName',
    title: '浆员姓名',
    width: 100,
  },
  {
    dataIndex: 'donorNo',
    title: '浆员编号',
    width: 120,
  },
  {
    dataIndex: 'source',
    title: '类别',
    width: 100,
  },
  {
    dataIndex: 'bloodType',
    title: '血型',
    width: 50,
  },
  {
    dataIndex: 'plasmaType',
    title: '血浆类型',
    width: 80,
  },
  {
    dataIndex: 'unqReason',
    title: '不合格原因',
    width: 100,
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
    width: 50,
  },
  {
    title: '托盘号',
    field: 'trayNo',
    width: 100,
  },
  {
    title: '样本编号',
    field: 'sampleNo',
    minWidth: 140,
  },
  {
    title: '样本袋号',
    field: 'sampleBagNo',
    minWidth: 140,
  },
  {
    title: '箱号',
    field: 'boxNo',
    minWidth: 140,
  },
  {
    title: '存放位置',
    field: 'location',
    width: 140,
  },
];
