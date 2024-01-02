/*
 * @Author: HxB
 * @Date: 2023-12-28 18:11:32
 * @LastEditors: DoubleAm
 * @LastEditTime: 2023-12-28 18:13:11
 * @Description: 新建文件
 * @FilePath: \psms-fe\src\router\routes\modules\storeManager\index.ts
 */
import type { AppRouteModule } from '@/router/types';

import { LAYOUT } from '@/router/constant';

const storeManager: AppRouteModule = {
  path: '/plasma-store',
  name: '库房管理',
  component: LAYOUT,
  meta: {
    title: '库房管理',
    icon: 'ant-design:alipay-circle-filled',
  },
  children: [
    {
      path: 'site',
      name: '站点管理',
      meta: {
        title: '站点管理',
      },
      id: 9900,
      component: () => import('/@/views/plasma-store/site/index.vue'),
    },
    {
      path: 'inventory',
      name: '库存查询',
      meta: {
        title: '库存查询',
      },
      id: 9900,
      component: () => import('/@/views/plasma-store/inventory/index.vue'),
    },
    {
      path: 'setting',
      name: '库房设置',
      meta: {
        title: '库房设置',
      },
      id: 9900,
      component: () => import('/@/views/plasma-store/setting/index.vue'),
    },
    {
      path: 'entry-plasma',
      name: '入库查询',
      meta: {
        title: '入库查询',
      },
      id: 9900,
      component: () => import('/@/views/plasma-store/entry-plasma/index.vue'),
    },
  ],
};

export default storeManager;
