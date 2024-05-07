/*
 * @Descripttion:
 * @version:
 * @Author: zcc
 * @Date: 2023-12-18 14:18:35
 * @LastEditors: zcc
 * @LastEditTime: 2024-01-13 10:28:20
 */
import { BasicColumn, FormSchema } from '@/components/Table';
import { SERVER_ENUM } from '@/enums/serverEnum';
import { useServerEnumStoreWithOut } from '@/store/modules/serverEnums';

const serverEnumStore = useServerEnumStoreWithOut();
const BankTrayStatusEnum = serverEnumStore.getServerEnumText(SERVER_ENUM.BankTrayStatusEnum);
export const columns: BasicColumn[] = [
  {
    title: '托盘编号',
    dataIndex: 'trayNo',
    width: 100,
  },
  {
    title: '采浆公司',
    dataIndex: 'stationNames',
    width: 130,
    ellipsis: false,
  },
  {
    title: '血浆批号',
    dataIndex: 'batchNoes',
    width: 130,
    ellipsis: false,
  },
  {
    title: '箱号类型',
    dataIndex: 'boxTypes',
    width: 130,
    ellipsis: false,
  },
  {
    title: '已存容量(箱)',
    dataIndex: 'totalNumber',
    width: 110,
  },
  {
    title: '已存容量(袋)',
    dataIndex: 'totalBagNumber',
    width: 110,
  },
  {
    title: '入库状态',
    dataIndex: 'trayStatus',
    format: BankTrayStatusEnum,
    width: 80,
  },
  {
    title: '所在库房',
    dataIndex: 'wareHouseName',
    width: 100,
  },
  {
    title: '所在货位',
    dataIndex: 'locationNo',
    width: 80,
  },

  {
    title: '打印人',
    dataIndex: 'creater',
    width: 90,
  },
  {
    title: '打印时间',
    dataIndex: 'createAt',
    width: 150,
  },
  {
    title: '托盘状态',
    dataIndex: '',
    width: 80,
    customRender: ({ record }) => {
      return record.closed ? '停用' : '启用';
    },
  },
];

export const searchFormSchema: FormSchema[] = [
  {
    label: '托盘编号',
    component: 'Input',
    field: 'trayNo',
  },
  {
    label: '血浆批次',
    component: 'Input',
    field: 'batchNo',
  },
  {
    component: 'Input',
    field: 'boxNo',
    label: '血浆箱号',
  },

  {
    label: '浆袋编号',
    component: 'Input',
    field: 'bagNo',
  },
  {
    label: '样本批次',
    component: 'Input',
    field: 'sampleNo',
  },
  {
    label: '样本编号',
    component: 'Input',
    field: 'sampleNo',
  },
  {
    label: '投产准备号',
    component: 'Input',
    field: 'prepareNo',
  },
  {
    component: 'Select',
    field: 'trayType',
    label: '存放类型',
    componentProps: {
      options: serverEnumStore.getServerEnum(SERVER_ENUM.BankTrayTypeEnum),
    },
  },
  {
    component: 'Select',
    field: 'trayStatus',
    label: '入库状态',
    componentProps: {
      options: serverEnumStore.getServerEnum(SERVER_ENUM.BankTrayStatusEnum),
    },
  },
  {
    component: 'Select',
    field: 'useStatus',
    label: '负载状态',
    componentProps: {
      options: [
        { label: '空载', value: '0' },
        { label: '负载', value: '1' },
      ],
    },
  },
];

export const inStoreFormSchema: (houseChange: Function) => FormSchema[] = (houseChange) => [
  {
    field: 'houseNo',
    component: 'Select',
    label: '库房',
    required: true,
    componentProps: {
      options: [],
      onChange: houseChange,
    },
  },
  // {
  //   field: 'dlvType',
  //   component: 'Select',
  //   label: '入库类型',
  //   required: true,
  //   componentProps: {
  //     options: [
  //       { label: '投产出库', value: '0' },
  //       { label: '不合格出库', value: '1' },
  //       { label: '科研出库', value: '2' },
  //       { label: '其他', value: '3' },
  //     ],
  //   },
  // },
];
export const siteNoSchema = {
  field: 'siteId',
  component: 'Select',
  label: '出库站点',
  required: true,
  componentProps: {
    options: [],
  },
};
