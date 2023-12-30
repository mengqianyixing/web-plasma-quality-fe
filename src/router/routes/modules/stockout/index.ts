import type { AppRouteModule } from '@/router/types';

import { LAYOUT } from '@/router/constant';

const nonconformity: AppRouteModule = {
  path: '/stockout',
  name: 'StockOut',
  component: LAYOUT,
  meta: {
    orderNo: 10000,
    title: '出库管理',
    icon: 'ant-design:to-top-outlined',
  },
  children: [
    {
      path: 'po',
      name: 'ProductionOrder',
      id: 9904,
      meta: {
        title: '生产指令',
      },
      component: () => import('/@/views/stockout/production-order/index.vue'),
    },
  ],
};

export default nonconformity;
