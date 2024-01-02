/*
 * @Author: HxB
 * @Date: 2023-12-28 18:11:32
 * @LastEditors: DoubleAm
 * @LastEditTime: 2023-12-28 18:37:25
 * @Description: 新建文件
 * @FilePath: \psms-fe\src\router\routes\modules\callManager\index.ts
 */
import type { AppRouteModule } from '@/router/types';

import { LAYOUT } from '@/router/constant';

const callManager: AppRouteModule = {
  path: '/callback',
  name: '回访管理',
  component: LAYOUT,
  meta: {
    title: '回访管理',
    icon: 'ant-design:phone-outlined',
  },
  children: [
    {
      path: 'list-generation',
      name: '回访名单生成',
      meta: {
        title: '回访名单生成',
      },
      id: 9900,
      component: () => import('/@/views/callback/list-generation/index.vue'),
    },
    // {
    //   path: 'list-confirm',
    //   name: '回访名单确认',
    //   meta: {
    //     title: '回访名单确认',
    //   },
    //   id: 9900,
    //   component: () => import('/@/views/callback/list-confirm/index.vue'),
    // },
  ],
};
export default callManager;
