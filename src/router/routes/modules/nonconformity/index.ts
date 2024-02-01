/*
 * @Descripttion:
 * @version:
 * @Author: zcc
 * @Date: 2024-01-31 18:59:35
 * @LastEditors: zcc
 * @LastEditTime: 2024-02-01 14:37:19
 */
import type { AppRouteModule } from '@/router/types';

import { LAYOUT } from '@/router/constant';

const nonconformity: AppRouteModule = {
  path: '/nonconformity',
  name: 'Nonconformity',
  component: LAYOUT,
  redirect: '/nonconformity/nb',
  id: 93,
  menuWeight: 930,
  meta: {
    orderNo: 10000,
    title: '不合格管理',
    icon: 'ant-design:windows-outlined',
  },
  children: [
    {
      path: 'nb',
      name: 'NonconformityBoxes',
      id: 930010,
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
      id: 930020,
      component: () => import('/@/views/nonconformity/nonconformity-registration/index.vue'),
    },
    {
      path: 'plasmaOut',
      name: 'plasmaOut',
      meta: {
        title: '不合格血浆出库',
      },
      id: 930030,
      component: () => import('/@/views/nonconformity/plasmaOut/index.vue'),
    },
    {
      path: 'plasma-manage',
      name: 'plasmaManage',
      meta: {
        title: '不合格血浆管理',
      },
      id: 930040,
      component: () => import('/@/views/nonconformity/plasma-manage/index.vue'),
    },
  ],
};

export default nonconformity;
