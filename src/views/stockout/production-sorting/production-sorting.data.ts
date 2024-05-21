import { FormSchema } from '@/components/Form';
import { BasicColumn } from '@/components/Table';
import { boxTypeMap, boxTypeEnum } from '@/enums/stockoutEnum';
import { SERVER_ENUM } from '@/enums/serverEnum';
import { useServerEnumStoreWithOut } from '@/store/modules/serverEnums';
import { useServerConfig } from '@/hooks/common/useServerConfig';

const { trayText, boxText } = useServerConfig();

const serverEnumStore = useServerEnumStoreWithOut();
const BankTrayStatusEnum = serverEnumStore.getServerEnumText(SERVER_ENUM.BankTrayStatusEnum);
export const trayInStoreColumns: BasicColumn[] = [
  {
    title: trayText + '编号',
    dataIndex: 'trayNo',
  },
  {
    title: '箱数',
    dataIndex: 'boxCount',
  },
  {
    title: '血浆数量',
    dataIndex: 'bagCount',
  },
  {
    title: '状态',
    dataIndex: 'state',
    format: BankTrayStatusEnum,
  },
  {
    title: '存放库房',
    dataIndex: 'wareHouseName',
  },
  {
    title: '存放位置',
    dataIndex: 'locationNo',
  },
];

export const trayInStoreFormSchema: FormSchema[] = [
  {
    label: trayText + '编号',
    field: 'trayNo',
    component: 'Input',
  },
  {
    label: '血浆' + boxText,
    field: 'boxNo',
    component: 'Input',
  },
];

export const bindFormSchema: FormSchema[] = [
  {
    field: 'trayNo',
    label: trayText + '编号',
    component: 'Input',
    componentProps: {
      placeholder: '扫描' + trayText + '编号',
      autocomplete: 'off',
    },
  },
  {
    field: 'boxId',
    label: '血浆' + boxText,
    component: 'Input',
    componentProps: {
      placeholder: '扫描血浆' + boxText,
      autocomplete: 'off',
      onkeyup: () => {
        console.log(112);
      },
    },
  },
];
export const bindSearchFormSchema: FormSchema[] = [
  {
    field: 'pickType',
    label: '装箱类型',
    component: 'Select',
    componentProps: {
      options: [...boxTypeMap.entries()].map(([key, value]) => ({
        value: key,
        label: `${value}`,
      })),
    },
  },
  {
    field: 'boxNo',
    label: '血浆' + boxText,
    component: 'Input',
  },
];
export const sortingBoxBindColumns: BasicColumn[] = [
  {
    title: '血浆' + boxText,
    dataIndex: 'boxNo',
  },
  {
    title: '装箱类型',
    dataIndex: 'pickType',
    format: (text) => boxTypeEnum[text],
  },
  {
    title: '血浆数量',
    dataIndex: 'bagCount',
  },
  {
    title: '装箱人',
    dataIndex: 'picker',
  },
  {
    title: '装箱日期',
    dataIndex: 'pickDate',
    format: (text) => text?.slice(0, 10),
  },
  {
    title: trayText + '编号',
    dataIndex: 'trayNo',
  },
];

export const trayOutStoreColumns: BasicColumn[] = [
  {
    title: trayText + '编号',
    dataIndex: 'trayNo',
  },
  {
    title: '血浆批号',
    dataIndex: 'batchNoes',
    ellipsis: false,
  },
  {
    title: '存放血浆箱数',
    dataIndex: 'boxCount',
    slots: { customRender: 'box' },
  },
  {
    title: '待分拣血浆箱数',
    dataIndex: 'waitBoxCount',
  },
  {
    title: '是否全分拣',
    dataIndex: 'allSort',
    format: (text) => (text ? '是' : '否'),
  },
  {
    title: '状态',
    dataIndex: 'state',
    format: BankTrayStatusEnum,
  },
  {
    title: '存放库房',
    dataIndex: 'wareHouseName',
  },
  {
    title: '存放位置',
    dataIndex: 'locationNo',
  },
];
export const trayOutStoreFormSchema: FormSchema[] = [
  {
    label: trayText + '编号',
    field: 'trayNo',
    component: 'Input',
  },
  {
    label: '血浆批号',
    field: 'batchNo',
    component: 'Input',
  },
  {
    label: '血浆' + boxText,
    field: 'boxNo',
    component: 'Input',
  },
  {
    label: '状态',
    field: 'state',
    component: 'Select',
    componentProps: {
      options: [
        { value: 'S', label: '已出库' },
        { value: 'W', label: '未出库' },
        { value: 'R', label: '出库中' },
      ],
    },
  },
  {
    label: '是否全分拣',
    field: 'sortType',
    component: 'Select',
    componentProps: {
      options: [
        { label: '是', value: 1 },
        { label: '否', value: 0 },
      ],
    },
  },
];
export const boxBindColumns: BasicColumn[] = [
  {
    title: '血浆批号',
    dataIndex: 'batchNo',
  },
  {
    title: '血浆' + boxText,
    dataIndex: 'boxNo',
  },
  {
    title: '血浆数量',
    dataIndex: 'bagCount',
  },
  {
    title: '是否待分拣',
    dataIndex: 'sortState',
    format: (text) => (text ? '是' : '否'),
  },
];
