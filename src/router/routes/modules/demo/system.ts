/*
 * @Author: HxB
 * @Date: 2023-12-25 16:00:06
 * @LastEditors: DoubleAm
 * @LastEditTime: 2024-01-11 17:52:52
 * @Description: 系统管理
 * @FilePath: \psms-fe\src\router\routes\modules\demo\system.ts
 */
import type { AppRouteModule } from '@/router/types';

import { LAYOUT } from '@/router/constant';

const system: AppRouteModule = {
  path: '/system',
  name: 'System',
  menuWeight: 98,
  id: 92,
  component: LAYOUT,
  redirect: '/system/account',
  meta: {
    orderNo: 2000,
    icon: 'ant-design:windows-outlined',
    title: '系统管理',
  },
  children: [
    {
      path: 'account',
      id: 9201,
      name: 'AccountManagement',
      meta: {
        title: '用户管理',
        ignoreKeepAlive: false,
      },
      component: () => import('@/views/system/account/index.vue'),
    },
    // {
    //   path: 'account_detail/:id',
    //   name: 'AccountDetail',
    //   meta: {
    //     hideMenu: true,
    //     title: '账号详情',
    //     ignoreKeepAlive: true,
    //     showMenu: false,
    //     currentActiveMenu: '/system/account',
    //   },
    //   component: () => import('@/views/system/account/AccountDetail.vue'),
    // },
    {
      path: 'role',
      name: 'RoleManagement',
      id: 9202,
      meta: {
        title: '角色管理',
        ignoreKeepAlive: true,
      },
      component: () => import('@/views/system/role/index.vue'),
    },
    {
      path: 'menu',
      name: 'MenuManagement',
      id: 9203,
      meta: {
        title: '菜单管理',
        ignoreKeepAlive: true,
      },
      component: () => import('@/views/system/menu/index.vue'),
    },
    {
      path: 'dept',
      id: 9204,
      name: 'DeptManagement',
      meta: {
        title: '部门管理',
        ignoreKeepAlive: true,
      },
      component: () => import('@/views/system/dept/index.vue'),
    },
    {
      path: 'resource',
      id: 9205,
      name: 'ResourceViews',
      meta: {
        title: '资源管理',
        ignoreKeepAlive: true,
      },
      component: () => import('@/views/system/resource/index.vue'),
    },
    {
      path: 'dictionary',
      name: 'Dictionary',
      meta: {
        title: '字典管理',
      },
      id: 9206,
      component: () => import('@/views/system/dictionary/index.vue'),
    },
    {
      path: 'auth_menus',
      name: 'AuthMenus',
      id: 9207,
      meta: {
        title: '权限管理',
        ignoreKeepAlive: true,
      },
      component: () => import('@/views/auth/menus/index.vue'),
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
      path: 'params',
      name: 'Params',
      id: 9208,
      meta: {
        title: '系统参数',
      },
      component: () => import('@/views/system/params/index.vue'),
    },
    // {
    //   path: 'changePassword',
    //   name: 'ChangePassword',
    //   meta: {
    //     title: '修改密码',
    //     ignoreKeepAlive: true,
    //   },
    //   component: () => import('@/views/system/password/index.vue'),
    // },
  ],
};

export default system;
