/*
 * @Author: HxB
 * @Date: 2023-12-25 16:00:06
 * @LastEditors: zcc
 * @LastEditTime: 2024-02-01 14:37:59
 * @Description: 入库管理
 * @FilePath: \psms-fe\src\router\routes\modules\inbound-management\index.ts
 */
import type { AppRouteModule } from '@/router/types';

import { LAYOUT } from '@/router/constant';

const inboundmanagement: AppRouteModule = {
  path: '/inboundmanagement',
  name: 'Inboundmanagement',
  component: LAYOUT,
  id: 98,
  menuWeight: 980,
  meta: {
    orderNo: 10001,
    title: '入库管理',
    icon: 'ant-design:windows-outlined',
  },
  children: [
    {
      path: 'receiveplasma',
      name: 'Receiveplasma',
      id: 980010,
      meta: {
        title: '血浆接收',
      },
      component: () => import('@/views/inbound-management/receive-plasma/index.vue'),
    },
    {
      path: 'acceptplasma',
      name: 'Acceptplasma',
      id: 980020,
      meta: {
        title: '血浆验收',
      },
      component: () => import('@/views/inbound-management/accept-plasma/index.vue'),
    },

    {
      path: 'plasma-inbound-record',
      name: 'PlasmaInboundRecord',
      meta: {
        title: '血浆入库记录',
      },
      id: 980030,
      component: () => import('@/views/inbound-management/plasma-inbound-record/index.vue'),
    },
  ],
};

export default inboundmanagement;
