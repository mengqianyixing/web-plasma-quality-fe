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
import { ReCheckButtonEnum } from '@/enums/authCodeEnum';

const nonconformity: AppRouteModule = {
  path: '/nonconformity',
  name: 'Nonconformity',
  component: LAYOUT,
  redirect: '/nonconformity/nb',
  id: 92,
  menuWeight: 920,
  meta: {
    orderNo: 10000,
    title: '不合格管理',
    icon: 'ant-design:windows-outlined',
  },
  children: [
    {
      path: 'nb',
      name: 'NonconformityBoxes',
      id: 920010,
      meta: {
        title: '不合格库房管理',
      },
      component: () => import('/@/views/nonconformity/boxes/index.vue'),
    },
    {
      path: 'nonconformity-registration',
      name: 'NonconformityRegistration',
      meta: {
        title: '不合格血浆登记',
      },
      id: 920020,
      component: () => import('/@/views/nonconformity/nonconformity-registration/index.vue'),
      authElements: [
        {
          id: ReCheckButtonEnum.NonconformityRegistrationCheck,
          name: 'reCheck',
          title: '复核人登录权限',
        },
      ],
    },
    {
      path: 'plasmaOut',
      name: 'plasmaOut',
      meta: {
        title: '不合格血浆出库',
      },
      id: 920030,
      component: () => import('/@/views/nonconformity/plasmaOut/index.vue'),
    },
    {
      path: 'plasma-manage',
      name: 'plasmaManage',
      meta: {
        title: '不合格血浆管理',
      },
      id: 920040,
      component: () => import('/@/views/nonconformity/plasma-manage/index.vue'),
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
  ],
};

export default nonconformity;
