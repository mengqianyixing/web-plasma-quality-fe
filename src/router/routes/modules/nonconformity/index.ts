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
  ],
};

export default nonconformity;
