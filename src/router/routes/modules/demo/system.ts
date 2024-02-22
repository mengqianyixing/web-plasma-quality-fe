/*
 * @Author: HxB
 * @Date: 2023-12-25 16:00:06
 * @LastEditors: DoubleAm
 * @LastEditTime: 2024-02-22 10:09:13
 * @Description: 系统管理
 * @FilePath: \psms-fe\src\router\routes\modules\demo\system.ts
 */
import type { AppRouteModule } from '@/router/types';

import { LAYOUT } from '@/router/constant';

const system: AppRouteModule = {
  path: '/system',
  name: 'System',
  menuWeight: 1010,
  id: 101,
  component: LAYOUT,
  redirect: '/system/account',
  meta: {
    orderNo: 2000,
    icon: 'ant-design:windows-outlined',
    title: '系统管理',
  },
  children: [
    {
      path: 'auth_menus',
      name: 'AuthMenus',
      id: 101010,
      meta: {
        title: '权限管理',
        ignoreKeepAlive: true,
      },
      component: () => import('@/views/system/auth/index.vue'),
      authElements: [
        {
          id: 'E_123',
          name: 'addRole',
          title: '新增角色',
        },
        {
          id: 'E_456',
          name: 'editRole',
          title: '编辑角色',
        },
      ],
    },
    {
      path: 'users',
      name: 'Users',
      id: 101020,
      meta: {
        title: '用户管理',
        ignoreKeepAlive: true,
      },
      authElements: [
        {
          id: 'E_789',
          name: 'editUser',
          title: '编辑用户',
        },
      ],
      component: () => import('@/views/system/users/index.vue'),
    },

    {
      path: 'policies',
      name: 'Policies',
      id: 101030,
      meta: {
        title: '资源管理',
      },
      authElements: [
        {
          id: 'E_110',
          name: 'editPolicies',
          title: '编辑策略',
        },
      ],
      component: () => import('@/views/system/policies/index.vue'),
    },
  ],
};

export default system;
