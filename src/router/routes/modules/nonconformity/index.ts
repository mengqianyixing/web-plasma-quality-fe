/*
 * @Descripttion:
 * @version:
 * @Author: zcc
 * @Date: 2024-01-31 18:59:35
 * @LastEditors: zcc
 * @LastEditTime: 2024-02-01 15:53:59
 */
import type { AppRouteModule } from '@/router/types';

import { LAYOUT } from '@/router/constant';
import { ReCheckButtonEnum, NonconformityButtonEnum } from '@/enums/authCodeEnum';

const nonconformity: AppRouteModule = {
  path: '/nonconformity',
  name: 'Nonconformity',
  component: LAYOUT,
  redirect: '/nonconformity/nb',
  id: 92,
  menuWeight: 920,
  meta: {
    orderNo: 10000,
    title: '不合格血浆管理',
    icon: 'ant-design:windows-outlined',
  },
  children: [
    {
      path: 'nonconformity-registration',
      name: 'NonconformityRegistration',
      meta: {
        title: '不合格血浆登记',
      },
      id: 920020,
      component: () => import('@/views/nonconformity/nonconformity-registration/index.vue'),
      authElements: [
        {
          id: ReCheckButtonEnum.NonconformityRegistrationCheck,
          name: 'reCheck',
          title: '复核人登录权限',
        },
      ],
    },
    {
      path: 'nb',
      name: 'NonconformityBoxes',
      id: 920010,
      meta: {
        title: '不合格库房箱',
      },
      component: () => import('@/views/nonconformity/boxes/index.vue'),
    },
    {
      path: 'plasma-manage',
      name: 'PlasmaManage',
      meta: {
        title: '不合格血浆入库',
      },
      id: 920040,
      component: () => import('@/views/nonconformity/plasma-manage/index.vue'),
      authElements: [
        {
          id: ReCheckButtonEnum.NonconformityPickCheck,
          name: 'reCheckPick',
          title: '挑浆复核权限',
        },
        {
          id: ReCheckButtonEnum.NonconformityInStoreCheck,
          name: 'recheckInStore',
          title: '入库登录权限',
        },
      ],
    },
    {
      path: 'plasmaOut',
      name: 'PlasmaOut',
      meta: {
        title: '不合格血浆出库',
      },
      authElements: [
        {
          id: NonconformityButtonEnum.PlasmaOutAdd,

          title: '新增',
        },
        {
          id: NonconformityButtonEnum.PlasmaOutUpdate,

          title: '编辑',
        },
        {
          id: NonconformityButtonEnum.PlasmaOutRemove,

          title: '撤销',
        },
        {
          id: NonconformityButtonEnum.PlasmaOutProcess,

          title: '审核',
        },
        {
          id: NonconformityButtonEnum.PlasmaOutUnProcess,

          title: '取消审核',
        },
        {
          id: NonconformityButtonEnum.PlasmaOutScan,

          title: '出库扫描',
        },
        {
          id: NonconformityButtonEnum.PlasmaOutTransferPrint,

          title: '转移记录打印',
        },
        {
          id: NonconformityButtonEnum.PlasmaOutPlasmaPrint,

          title: '不合格原料血浆信息清单打印',
        },
        {
          id: NonconformityButtonEnum.PlasmaOutDestructionPrint,

          title: '不合格原料血浆销毁处理申请审批表',
        },
      ],
      id: 920030,
      component: () => import('@/views/nonconformity/plasmaOut/index.vue'),
    },
  ],
};

export default nonconformity;
