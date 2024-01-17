import type { AppRouteModule } from '@/router/types';

import { LAYOUT } from '@/router/constant';

const nonconformity: AppRouteModule = {
  path: '/nonconformity',
  name: 'Nonconformity',
  component: LAYOUT,
  redirect: '/nonconformity/nb',
  id: 95,
  menuWeight: 93,
  meta: {
    orderNo: 10000,
    title: '不合格管理',
    icon: 'ant-design:windows-outlined',
  },
  children: [
    {
      path: 'nb',
      name: 'NonconformityBoxes',
      id: 9501,
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
      id: 9502,
      component: () => import('/@/views/nonconformity/nonconformity-registration/index.vue'),
    },
    {
      path: 'plasmaOut',
      name: 'plasmaOut',
      meta: {
        title: '不合格血浆出库',
      },
      id: 9503,
      component: () => import('/@/views/nonconformity/plasmaOut/index.vue'),
    },
    {
      path: 'plasma-manage',
      name: 'plasmaManage',
      meta: {
        title: '不合格血浆管理',
      },
      id: 9504,
      component: () => import('/@/views/nonconformity/plasma-manage/index.vue'),
    },
  ],
};

export default nonconformity;
