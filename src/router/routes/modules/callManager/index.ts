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
import { CallbackButtonEnum } from '@/enums/authCodeEnum';

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
        title: '回访名单生成',
      },
      id: 930010,
      component: () => import('@/views/callback/list-generation/index.vue'),
      authElements: [
        {
          id: CallbackButtonEnum.ListGeneAdd,
          name: 'add',
          title: '新增',
        },
        {
          id: CallbackButtonEnum.ListGeneEdit,
          name: 'edit',
          title: '编辑',
        },
        {
          id: CallbackButtonEnum.ListGeneDelete,
          name: 'delete',
          title: '撤销',
        },
        {
          id: CallbackButtonEnum.ListGeneEnter,
          name: 'enter',
          title: '确认',
        },
        {
          id: CallbackButtonEnum.ListGeneExport,
          name: 'export',
          title: '导出',
        },
      ],
    },
    {
      path: 'callback-complete',
      name: 'CallbackComplete',
      meta: {
        title: '回访名单完成',
      },
      id: 930020,
      component: () => import('@/views/callback/callback-complete/index.vue'),
    },
    {
      path: 'callback-failure',
      name: 'CallbackFailure',
      meta: {
        title: '回访名单失败',
      },
      id: 930030,
      component: () => import('@/views/callback/callback-failure/index.vue'),
    },
  ],
};
export default callManager;
