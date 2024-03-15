import { BasicColumn, FormSchema } from '@/components/Table';
import { donorStatusMap, donorStatusValueEnum } from '@/enums/callbackEnum';
import { SERVER_ENUM } from '@/enums/serverEnum';
import { useServerEnumStoreWithOut } from '@/store/modules/serverEnums';

const serverEnumStore = useServerEnumStoreWithOut();
const PlasmaType = serverEnumStore.getServerEnumText(SERVER_ENUM.PlasmaType);

export const columns: BasicColumn[] = [
  {
    title: '采浆公司',
    dataIndex: 'stationName',
    width: 70,
  },
  {
    title: '血浆批号',
    dataIndex: 'batchNo',
    width: 120,
  },
  {
    title: '血浆编号',
    dataIndex: 'bagNo',
    width: 120,
  },
  {
    title: '浆员编号',
    dataIndex: 'donorNo',
    width: 120,
  },
  {
    title: '浆员姓名',
    dataIndex: 'donorName',
    width: 100,
  },
  {
    title: '浆员状态',
    dataIndex: 'donatorStatus',
    format: (text) => {
      return donorStatusMap.get(text as donorStatusValueEnum) as string;
    },
    width: 80,
  },
  {
    title: '血浆类型',
    dataIndex: 'plasmaImmType',
    format: (text) => PlasmaType(text),
    width: 80,
  },
  {
    title: '采浆日期',
    dataIndex: 'collectAt',
    width: 100,
  },
  {
    title: '最后采浆日期',
    dataIndex: 'lastCollectAt',
    width: 100,
  },
  {
    title: '最后回访日期',
    dataIndex: 'lastCallBackAt',
    width: 100,
  },
  {
    title: '确认人',
    dataIndex: 'creator',
    width: 100,
  },
  {
    title: '确认日期',
    dataIndex: 'createAt',
    width: 100,
  },
];

export const searchFormSchema: FormSchema[] = [
  {
    label: '血浆批号',
    component: 'Input',
    field: 'batchNo',
  },
  {
    label: '血浆编号',
    component: 'Input',
    field: 'bagNo',
  },
  {
    label: '浆员编号',
    component: 'Input',
    field: 'donorNo',
  },
  {
    label: '状态',
    component: 'Select',
    field: 'isConfirm',
    defaultValue: false,
    componentProps: {
      options: [
        {
          label: '已确认',
          value: true,
        },
        {
          label: '未确认',
          value: false,
        },
      ],
    },
  },
];
