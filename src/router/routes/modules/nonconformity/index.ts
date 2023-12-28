import type { AppRouteModule } from '@/router/types';

import { LAYOUT } from '@/router/constant';

const nonconformity: AppRouteModule = {
  path: '/nonconformity',
  name: 'Nonconformity',
  component: LAYOUT,
  redirect: '/nonconformity/nb',
  meta: {
    orderNo: 10000,
    title: '不合格管理',
    icon: 'ant-design:close-outlined',
  },
  children: [
    {
      path: 'nb',
      name: 'NonconformityBoxes',
      meta: {
        title: '不合格库房管理',
      },
      component: () => import('/@/views/nonconformity/boxes/index.vue'),
    },
    {
      path: 'nonconformity-registration',
      name: '不合格血浆登记',
      meta: {
        title: '不合格血浆登记',
      },
      id: 9903,
      component: () => import('/@/views/nonconformity/nonconformity-registration/index.vue'),
    },
  ],
};

export default nonconformity;
