/*
 * @Descripttion:
 * @version:
 * @Author: zcc
 * @Date: 2024-01-31 18:59:35
 * @LastEditors: zcc
 * @LastEditTime: 2024-02-01 14:32:57
 */
import type { AppRouteModule } from '@/router/types';

import { LAYOUT } from '@/router/constant';

const checkManager: AppRouteModule = {
  path: '/quality',
  name: 'Quality',
  id: 94,
  menuWeight: 940,
  component: LAYOUT,
  meta: {
    title: '质量管理',
    icon: 'ant-design:windows-outlined',
  },
  children: [
    {
      path: '/quality/plasma-restriction',
      name: 'plasma-restriction',
      id: 940010,
      meta: {
        title: '血浆限制',
      },
      component: () => import('/@/views/quality-manage/plasma-restriction/index.vue'),
    },
    {
      path: '/quality/plasma-check',
      name: 'plasma-check',
      id: 940020,
      meta: {
        title: '血浆审核',
      },
      component: () => import('/@/views/quality-manage/plasma-check/index.vue'),
    },

    {
      path: '/quality/batch-release',
      name: 'batch-release',
      id: 940030,
      meta: {
        title: '血浆批放行',
      },
      component: () => import('/@/views/quality-manage/batch-release/index.vue'),
    },
  ],
};

export default checkManager;
