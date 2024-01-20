/*
 * @Author: HxB
 * @Date: 2023-12-28 18:11:32
 * @LastEditors: DoubleAm
 * @LastEditTime: 2024-01-17 15:40:45
 * @Description: 回访管理
 * @FilePath: \psms-fe\src\router\routes\modules\callManager\index.ts
 */
import type { AppRouteModule } from '@/router/types';

import { LAYOUT } from '@/router/constant';

const callManager: AppRouteModule = {
  path: '/callback',
  name: 'Callback',
  id: 90,
  menuWeight: 97,
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
      id: 9001,
      component: () => import('/@/views/callback/list-generation/index.vue'),
    },
  ],
};
export default callManager;
