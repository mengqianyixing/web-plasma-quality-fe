import { BasicColumn, FormSchema } from '@/components/Table';
import dayjs from 'dayjs';
import { useServerEnumStoreWithOut } from '@/store/modules/serverEnums';
import { SERVER_ENUM } from '@/enums/serverEnum';

const serverEnumStore = useServerEnumStoreWithOut();

export const columns: BasicColumn[] = [
  {
    title: '申请单号',
    dataIndex: 'dlvNo',
    slots: { customRender: 'dlvNo' },
    width: 150,
    fixed: 'left',
  },
  {
    title: '血浆数量',
    dataIndex: 'bagNum',
    width: 100,
    fixed: 'left',
  },
  {
    title: '原因',
    dataIndex: 'reason',
    ellipsis: false,
    width: 200,
  },
  {
    title: '转移部门',
    dataIndex: 'transferDepartment',
    width: 120,
  },
  {
    title: '转移申请人',
    dataIndex: 'applicant',
    ellipsis: false,
    width: 120,
  },
  {
    title: '申请日期',
    dataIndex: 'applicationDate',
    format(text) {
      return text ? dayjs(text).format('YYYY-MM-DD') : '-';
    },
    width: 100,
  },
  {
    title: '记录人',
    dataIndex: 'creator',
    ellipsis: false,
    width: 120,
  },
  {
    title: '记录日期',
    dataIndex: 'createDate',
    format(text) {
      return text ? dayjs(text).format('YYYY-MM-DD') : '-';
    },
    width: 100,
  },
  {
    title: '准备人',
    dataIndex: 'preparedBy',
    ellipsis: false,
    width: 120,
  },
  {
    title: '准备日期',
    dataIndex: 'prepareAt',
    format(text) {
      return text ? dayjs(text).format('YYYY-MM-DD') : '-';
    },
    width: 100,
  },
  {
    title: '复核人',
    dataIndex: 'reviewer',
    ellipsis: false,
    width: 120,
  },
  {
    title: '复核日期',
    dataIndex: 'checkDate',
    format(text) {
      return text ? dayjs(text).format('YYYY-MM-DD') : '-';
    },
    width: 100,
  },
  {
    title: '审核人',
    dataIndex: 'checker',
    ellipsis: false,
    width: 120,
  },
  {
    title: '审核日期',
    dataIndex: 'reviewDate',
    format(text) {
      return text ? dayjs(text).format('YYYY-MM-DD') : '-';
    },
    width: 100,
  },
  {
    title: '出库扫描日期',
    dataIndex: 'outDate',
    format(text) {
      return text ? dayjs(text).format('YYYY-MM-DD') : '-';
    },
    width: 100,
  },
  {
    title: '状态',
    dataIndex: 'status',
    width: 100,
  },
];

export const searchSchema: FormSchema[] = [
  {
    field: 'dlvNo',
    component: 'Input',
    label: '申请单号',
  },
  {
    field: 'fieldTime',
    component: 'RangePicker',
    componentProps: {
      allowEmpty: [true, true],
    },
    label: '申请日期',
  },
  {
    field: 'state',
    component: 'Select',
    componentProps: {
      options: serverEnumStore.getServerEnum(SERVER_ENUM.BankNonProdDeliverState),
    },
    label: '状态',
  },
];

export const plasmaDetailColumns: BasicColumn[] = [
  {
    title: '采浆公司',
    dataIndex: 'stationName',
    width: 100,
  },
  {
    title: '血浆批号',
    dataIndex: 'batchNo',
    width: 120,
    ellipsis: false,
  },
  {
    title: '血浆箱号',
    dataIndex: 'boxNo',
    width: 120,
    ellipsis: false,
  },
  {
    title: '血浆编号',
    dataIndex: 'bagNo',
    width: 120,
    ellipsis: false,
  },
  {
    title: '浆员编号',
    dataIndex: 'cardNo',
    width: 120,
    ellipsis: false,
  },
  {
    title: '检疫期类型',
    dataIndex: 'trackType',
    width: 100,
    ellipsis: false,
  },
  {
    title: '血型',
    dataIndex: 'bloodType',
    width: 80,
  },
  {
    title: '效价类型',
    dataIndex: 'titerType',
    width: 100,
  },
  {
    title: '效价值',
    dataIndex: 'titerNum',
    width: 60,
  },
  {
    title: '血浆过程状态',
    dataIndex: 'plasmaStatus',
    width: 100,
  },
];

export const plasmaBoxColumns: BasicColumn[] = [
  {
    title: '采浆公司',
    dataIndex: 'stationName',
  },
  {
    title: '血浆批号',
    dataIndex: 'batchNo',
  },
  {
    title: '血浆箱号',
    dataIndex: 'boxNo',
  },
  {
    title: '血浆数量',
    dataIndex: 'plasmaTotal',
  },
  {
    title: '血浆净重(kg)',
    dataIndex: 'totalWeight',
  },
];

export const plasmaBatchColumns: BasicColumn[] = [
  {
    title: '采浆公司',
    dataIndex: 'stationName',
    width: 100,
  },
  {
    title: '血浆批号',
    dataIndex: 'batchNo',
    width: 140,
  },
  {
    title: '效价类型',
    dataIndex: 'titerType',
    width: 100,
  },
  {
    title: '血浆总数',
    dataIndex: 'plasmaTotal',
    width: 100,
  },
  {
    title: '血浆净重(kg)',
    dataIndex: 'totalWeight',
    width: 100,
  },
];
