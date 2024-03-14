/*
 * @Author: chiyifan chiyf@stpass.com
 * @Date: 2024-03-09 15:56:23
 * @LastEditors: chiyifan chiyf@stpass.com
 * @LastEditTime: 2024-03-14 16:34:08
 * @FilePath: \psms-fe\src\views\inbound-management\components\PlasmaBoxDetailModal\box.data.ts
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
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
    width: 100,
  },
  {
    title: '已验收数量',
    dataIndex: 'verifyCount',
    width: 100,
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
    width: 80,
  },
  {
    title: '状态',
    dataIndex: 'verifyState',
    slots: { customRender: 'verifyState' },
    width: 80,
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
