/*
 * @Author: HxB
 * @Date: 2023-12-28 18:11:32
 * @LastEditors: zcc
 * @LastEditTime: 2024-02-01 15:53:36
 * @Description: 回访管理
 * @FilePath: \psms-fe\src\router\routes\modules\callManager\index.ts
 */
import type { AppRouteModule } from '@/router/types';

import { LAYOUT } from '@/router/constant';

const callManager: AppRouteModule = {
  path: '/callback',
  name: 'Callback',
  id: 93,
  menuWeight: 930,
  component: LAYOUT,
  meta: {
    title: '回访管理',
    icon: 'ant-design:windows-outlined',
  },
  children: [
    {
      path: 'list-generation',
      name: 'CallbackGeneration',
      meta: {
        title: '回访名单',
      },
      id: 930010,
      component: () => import('/@/views/callback/list-generation/index.vue'),
    },
    {
      path: 'callback-complete',
      name: 'CallbackComplete',
      meta: {
        title: '回访完成',
      },
      id: 930020,
      component: () => import('/@/views/callback/callback-complete/index.vue'),
    },
    {
      path: 'callback-failure',
      name: 'CallbackFailure',
      meta: {
        title: '回访失败',
      },
      id: 930030,
      component: () => import('/@/views/callback/callback-failure/index.vue'),
    },
  ],
};
export default callManager;
