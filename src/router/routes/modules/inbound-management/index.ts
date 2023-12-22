import type { AppRouteModule } from '@/router/types';

import { LAYOUT } from '@/router/constant';

const inboundmanagement: AppRouteModule = {
  path: '/inboundmanagement',
  name: 'Inboundmanagement',
  component: LAYOUT,
  meta: {
    orderNo: 10001,
    title: '入库管理',
  },
  children: [
    {
      path: 'receiveplasma',
      name: 'Receiveplasma',
      meta: {
        title: '血浆接收',
      },
      component: () => import('/@/views/inbound-management/receive-plasma/index.vue'),
    },
  ],
};

export default inboundmanagement;
