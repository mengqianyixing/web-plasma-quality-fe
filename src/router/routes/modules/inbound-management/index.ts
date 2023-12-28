/*
 * @Author: HxB
 * @Date: 2023-12-25 16:00:06
 * @LastEditors: DoubleAm
 * @LastEditTime: 2023-12-28 18:38:33
 * @Description: 新建文件
 * @FilePath: \psms-fe\src\router\routes\modules\inbound-management\index.ts
 */
import type { AppRouteModule } from '@/router/types';

import { LAYOUT } from '@/router/constant';

const inboundmanagement: AppRouteModule = {
  path: '/inboundmanagement',
  name: 'Inboundmanagement',
  component: LAYOUT,
  meta: {
    orderNo: 10001,
    title: '入库管理',
    icon: 'ant-design:api-filled',
  },
  children: [
    {
      path: 'receiveplasma',
      name: 'Receiveplasma',
      id: 9901,
      meta: {
        title: '血浆接收',
      },
      component: () => import('@/views/inbound-management/receive-plasma/index.vue'),
    },
    {
      path: 'acceptplasma',
      name: 'Acceptplasma',
      id: 9902,
      meta: {
        title: '血浆验收',
      },
      component: () => import('@/views/inbound-management/accept-plasma/index.vue'),
    },
    // {
    //   path: 'sample-accept',
    //   name: '样本接收',
    //   meta: {
    //     title: '样本接收',
    //   },
    //   id: 9900,
    //   component: () => import('@/views/inbound-management/sample-accept/index.vue'),
    // },
    // {
    //   path: 'sample-receive',
    //   name: '样本验收',
    //   meta: {
    //     title: '样本验收',
    //     id: 9900,
    //     component: () => import('@/views/inbound-management/sample-receive/index.vue'),
    //   },
    // },
  ],
};

export default inboundmanagement;
