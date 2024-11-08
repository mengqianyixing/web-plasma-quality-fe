import { BasicColumn, FormSchema } from '@/components/Table';
import { useStation } from '@/hooks/common/useStation';
import { useGlobalApiStoreWithOut } from '@/store/modules/globalApi';
import { SysParamsEnum } from '@/enums/sysParamsEnum';
import { COMPANY } from '@/enums/company';

const globalApiStore = useGlobalApiStoreWithOut();
const iskm = globalApiStore.getSysParams(SysParamsEnum.BloodProductionCompany) === COMPANY.KM;
const { stationOptions } = useStation();
export const columns: BasicColumn[] = [
  {
    title: '采浆公司',
    dataIndex: 'stationName',
  },
  {
    title: '血浆批号',
    dataIndex: 'batchNo',
  },
  {
    title: iskm ? '托盘数量' : '血浆箱数',
    dataIndex: 'boxCount',
    slots: { customRender: 'boxCount' },
  },
  {
    title: '血浆数量',
    dataIndex: 'bagCount',
  },

  {
    title: '备注',
    dataIndex: 'remark',
  },
  {
    title: '记录人',
    dataIndex: 'creator',
  },
  {
    title: '记录日期',
    dataIndex: 'createAt',
  },
  {
    title: '复核人',
    dataIndex: 'reviewer',
  },
  {
    title: '复核日期',
    dataIndex: 'reviewAt',
  },
];

export const searchFormschema: FormSchema[] = [
  {
    label: '采浆公司',
    component: 'Select',
    field: 'stationNo',
    componentProps: {
      options: stationOptions,
    },
  },
  {
    field: 'batchNo',
    component: 'Input',
    label: '血浆批号',
  },
  {
    field: '[beginTime,endTime]',
    component: 'RangePicker',
    label: '记录日期',
  },
];

export const boxColumns: BasicColumn[] = [
  {
    title: '血浆批号',
    dataIndex: 'batchNo',
  },
  {
    title: iskm ? '托盘编号' : '血浆箱号',
    dataIndex: 'boxNo',
  },
  {
    title: '数量',
    dataIndex: 'bagCount',
  },
];
