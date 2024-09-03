import type { AppRouteRecordRaw, AppRouteModule } from '@/router/types';

import { PAGE_NOT_FOUND_ROUTE, REDIRECT_ROUTE } from '@/router/routes/basic';
import { LAYOUT } from '@/router/constant';
import { mainOutRoutes } from './mainOut';
import { PageEnum } from '@/enums/pageEnum';
import { jsonClone } from 'js-xxx';
import { t } from '@/hooks/web/useI18n';

// import.meta.glob() 直接引入所有的模块 Vite 独有的功能
const modules = import.meta.glob('./modules/**/*.ts', { eager: true });
const routeModuleList: AppRouteModule[] = [];

// 加入到路由集合中
Object.keys(modules).forEach(async (key) => {
  const mod = (modules as Recordable)[key].default || {};
  const modList = Array.isArray(mod) ? [...mod] : [mod];
  routeModuleList.push(...modList);
});

export async function getRoutes() {
  return new Promise((resolve) => {
    resolve(true);
  });
}

function getRouteIdMap(routes: any[]) {
  let ret: any = {};
  routes.forEach((item) => {
    if (item.id) {
      ret[item.id] = {
        ...item,
        title: item?.title ?? item?.meta?.title ?? item?.name,
      };
    }
    if (item.children || item.authElements) {
      ret = {
        ...ret,
        ...getRouteIdMap(item.children || item.authElements || []),
      };
    }
  });
  return ret;
}

export const modulesRouteList = jsonClone(routeModuleList);

export const routeIdMap = getRouteIdMap(modulesRouteList);

export const asyncRoutes = [PAGE_NOT_FOUND_ROUTE, ...routeModuleList];

// 根路由
export const RootRoute: AppRouteRecordRaw = {
  path: '/',
  name: 'Root',
  redirect: PageEnum.BASE_HOME,
  meta: {
    title: 'Root',
  },
};
const Home: AppRouteRecordRaw = {
  path: '/',
  name: 'Home',
  component: LAYOUT,
  redirect: '/home',
  meta: {
    title: 'Home',
  },
  children: [
    {
      path: 'home',
      name: 'home',
      meta: { title: '首页' },
      component: () => import('@/layouts/default/home/index.vue'),
    },
  ],
};

export const LoginRoute: AppRouteRecordRaw = {
  path: '/login',
  name: 'Login',
  component: () => import('@/views/sys/login/Login.vue'),
  meta: {
    title: t('routes.basic.login'),
  },
};

export const ModifyPasswordRoute: AppRouteRecordRaw = {
  path: '/modifypassword',
  name: 'ModifyPassword',
  component: () => import('@/views/sys/modifyPassword/index.vue'),
  meta: {
    title: '修改密码',
  },
};

// Basic routing without permission
// 未经许可的基本路由
export const basicRoutes = [
  LoginRoute,
  RootRoute,
  ...mainOutRoutes,
  REDIRECT_ROUTE,
  PAGE_NOT_FOUND_ROUTE,
  ModifyPasswordRoute,
  Home,
];
