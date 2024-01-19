import type { AppRouteModule } from '@/router/types';

import { LAYOUT } from '@/router/constant';

const checkManager: AppRouteModule = {
  path: '/quality',
  name: 'Quality',
  id: 100,
  component: LAYOUT,
  meta: {
    title: '质量管理',
    icon: 'ant-design:windows-outlined',
  },
  children: [
    {
      path: '/quality/plasma-check',
      name: 'plasma-check',
      id: 10001,
      meta: {
        title: '血浆审核',
      },
      component: () => import('/@/views/quality-manage/plasma-check/index.vue'),
    },
  ],
};

export default checkManager;
