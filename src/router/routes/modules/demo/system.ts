import type { AppRouteModule } from '@/router/types';

import { LAYOUT } from '@/router/constant';
import { t } from '@/hooks/web/useI18n';

const system: AppRouteModule = {
  path: '/system',
  name: 'System',
  component: LAYOUT,
  redirect: '/system/account',
  meta: {
    orderNo: 2000,
    icon: 'ion:settings-outline',
    title: t('routes.demo.system.moduleName'),
  },
  children: [
    {
      path: 'account',
      id: 9905,
      name: 'AccountManagement',
      meta: {
        title: t('routes.demo.system.account'),
        icon: 'ion:settings-outline',
        ignoreKeepAlive: false,
      },
      component: () => import('@/views/system/account/index.vue'),
    },
    // {
    //   path: 'vxeTableAccount',
    //   name: 'VxeTableAccountManagement',
    //   meta: {
    //     title: t('routes.demo.system.vxeTableAccount'),
    //     ignoreKeepAlive: false,
    //   },
    //   component: () => import('/@/views/demo/system/vxe-account/index.vue'),
    // },
    {
      path: 'account_detail/:id',
      name: 'AccountDetail',
      meta: {
        hideMenu: true,
        title: t('routes.demo.system.account_detail'),
        ignoreKeepAlive: true,
        showMenu: false,
        currentActiveMenu: '/system/account',
      },
      component: () => import('@/views/system/account/AccountDetail.vue'),
    },
    {
      path: 'role',
      name: 'RoleManagement',
      id: 9906,
      meta: {
        title: t('routes.demo.system.role'),
        ignoreKeepAlive: true,
      },
      component: () => import('@/views/system/role/index.vue'),
    },

    {
      path: 'menu',
      name: 'MenuManagement',
      id: 9907,
      meta: {
        title: t('routes.demo.system.menu'),
        ignoreKeepAlive: true,
      },
      component: () => import('@/views/system/menu/index.vue'),
    },
    {
      path: 'dept',
      id: 9908,
      name: 'DeptManagement',
      meta: {
        title: t('routes.demo.system.dept'),
        ignoreKeepAlive: true,
      },
      component: () => import('@/views/system/dept/index.vue'),
    },
    {
      path: 'resource',
      id: 9909,
      name: 'resourceViews',
      meta: {
        title: t('routes.demo.system.resource'),
        ignoreKeepAlive: true,
      },
      component: () => import('@/views/system/resource/index.vue'),
    },
    {
      path: 'changePassword',
      name: 'ChangePassword',
      meta: {
        title: t('routes.demo.system.password'),
        ignoreKeepAlive: true,
      },
      component: () => import('@/views/system/password/index.vue'),
    },
    {
      path: 'dictionary',
      name: '字典管理',
      meta: {
        title: '字典管理',
      },
      id: 9900,
      component: () => import('@/views/system/dictionary/index.vue'),
    },
  ],
};

export default system;
