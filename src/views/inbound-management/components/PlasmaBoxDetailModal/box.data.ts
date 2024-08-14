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
import { useGlobalApiStoreWithOut } from '@/store/modules/globalApi';
import { SysParamsEnum } from '@/enums/sysParamsEnum';
import { COMPANY } from '@/enums/company';

const globalApiStore = useGlobalApiStoreWithOut();
const iskm = globalApiStore.getSysParams(SysParamsEnum.BloodProductionCompany) === COMPANY.KM;

export const columns: BasicColumn[] = [
  {
    title: '浆站箱号',
    dataIndex: 'boxNo',
    slots: { customRender: 'boxNo' },
    width: 140,
    ellipsis: false,
  },
  {
    title: '接收人',
    dataIndex: 'acceptUser',
    width: 100,
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
    width: 100,
  },
  {
    title: '验收人',
    dataIndex: 'verifyUser',
    width: 100,
  },
  {
    title: '验收复核人',
    dataIndex: 'checker',
    width: 100,
  },
  ...(iskm
    ? []
    : [
        {
          title: '托盘编号',
          dataIndex: 'trayNo',
          width: 80,
        },
      ]),
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
    componentProps: {
      disabled: true,
    },
  },
  {
    field: 'boxNo',
    label: '浆站箱号',
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
