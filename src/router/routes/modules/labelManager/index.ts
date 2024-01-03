/*
 * @Author: HxB
 * @Date: 2023-12-28 18:11:32
 * @LastEditors: DoubleAm
 * @LastEditTime: 2024-01-03 09:41:31
 * @Description: 标签管理
 * @FilePath: \psms-fe\src\router\routes\modules\labelManager\index.ts
 */
import type { AppRouteModule } from '@/router/types';

import { LAYOUT } from '@/router/constant';

const labelManager: AppRouteModule = {
  path: '/tag-manage',
  name: 'TagManager',
  component: LAYOUT,
  id: 94,
  meta: {
    title: '标签管理',
    icon: 'ant-design:appstore-filled',
  },
  children: [
    {
      path: 'style',
      name: 'TagStyle',
      meta: {
        title: '标签样式管理',
      },
      id: 9401,
      component: () => import('/@/views/tag-manage/style/index.vue'),
    },
    {
      path: 'encoding',
      name: 'TagEncoding',
      meta: {
        title: '标签编码管理',
      },
      id: 9402,
      component: () => import('/@/views/tag-manage/encoding/index.vue'),
    },
    {
      path: 'print-record',
      name: 'TagPrintRecord',
      meta: {
        title: '标签打印记录',
      },
      id: 9403,
      component: () => import('/@/views/tag-manage/print-record/index.vue'),
    },
  ],
};
export default labelManager;
