/*
 * @Author: HxB
 * @Date: 2023-12-28 18:11:32
 * @LastEditors: zcc
 * @LastEditTime: 2024-02-01 15:56:07
 * @Description: 标签管理
 * @FilePath: \psms-fe\src\router\routes\modules\labelManager\index.ts
 */
import type { AppRouteModule } from '@/router/types';

import { LAYOUT } from '@/router/constant';

const labelManager: AppRouteModule = {
  path: '/tag-manage',
  name: 'TagManager',
  component: LAYOUT,
  menuWeight: 890,
  id: 89,
  meta: {
    title: '标签管理',
    icon: 'ant-design:windows-outlined',
  },
  children: [
    {
      path: 'style',
      name: 'TagStyle',
      meta: {
        title: '标签样式管理',
      },
      id: 890010,
      component: () => import('@/views/tag-manage/style/index.vue'),
    },
    {
      path: 'encoding',
      name: 'TagEncoding',
      meta: {
        title: '标签编码管理',
      },
      id: 890020,
      component: () => import('@/views/tag-manage/encoding/index.vue'),
    },
    {
      path: 'print-record',
      name: 'TagPrintRecord',
      meta: {
        title: '标签打印记录',
      },
      id: 890030,
      component: () => import('@/views/tag-manage/print-record/index.vue'),
    },
  ],
};
export default labelManager;
