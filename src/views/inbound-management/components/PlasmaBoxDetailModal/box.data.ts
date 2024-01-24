import { BasicColumn, FormSchema } from '@/components/Table';
import { PlasmaStateMap } from '@/enums/plasmaEnum';

export const columns: BasicColumn[] = [
  {
    title: '箱号',
    dataIndex: 'boxNo',
    slots: { customRender: 'boxNo' },
  },
  {
    title: '接收人',
    dataIndex: 'acceptUser',
  },
  {
    title: '未验收数量',
    dataIndex: 'unVerifyCount',
  },
  {
    title: '已验收数量',
    dataIndex: 'verifyCount',
  },
  {
    title: '验收合格数量',
    dataIndex: 'qualifiedCount',
  },
  {
    title: '验收人',
    dataIndex: 'verifyUser',
  },
  {
    title: '验收复核人',
    dataIndex: 'checker',
  },
  {
    title: '托盘编号',
    dataIndex: 'trayNo',
  },
  {
    title: '状态',
    dataIndex: 'verifyState',
    slots: { customRender: 'verifyState' },
  },
];

export const searchFormSchema: FormSchema[] = [
  {
    field: 'stationName',
    label: '采浆公司',
    component: 'Input',
    componentProps: {
      disabled: true,
    },
  },
  {
    field: 'batchNo',
    label: '血浆批号',
    component: 'Input',
  },
  {
    field: 'boxNo',
    label: '血浆箱号',
    component: 'Input',
  },
  {
    field: 'verifyState',
    label: '状态',
    component: 'Select',
    componentProps: {
      options: [...PlasmaStateMap].map(([value, label]) => ({ value, label })),
    },
  },
];
