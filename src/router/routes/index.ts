import type { AppRouteRecordRaw, AppRouteModule } from '@/router/types';

import { PAGE_NOT_FOUND_ROUTE, REDIRECT_ROUTE } from '@/router/routes/basic';

import { mainOutRoutes } from './mainOut';
import { PageEnum } from '@/enums/pageEnum';
import { jsonClone } from 'js-xxx';
import { t } from '@/hooks/web/useI18n';
import { getDictListApi } from '@/api/dictionary';
import { usePermission } from '@/hooks/web/usePermission';

// import.meta.glob() 直接引入所有的模块 Vite 独有的功能
const modules = import.meta.glob('./modules/**/*.ts', { eager: true });
const routeModuleList: AppRouteModule[] = [];

// 加入到路由集合中
Object.keys(modules).forEach(async (key) => {
  const mod = (modules as Recordable)[key].default || {};
  const modList = Array.isArray(mod) ? [...mod] : [mod];
  routeModuleList.push(...modList);
});

async function getRoutes() {
  const res = await getDictListApi({ pageSize: 1000, currPage: 1, queryMenu: true });
  const { refreshMenu } = usePermission();
  const result = res.result?.map((x, i) => ({
    path: `/${x.dictNo}`,
    name: x.dictNo,
    meta: {
      title: x.dictName,
      dictId: x.dictId,
    },
    id: 100061 + i,
    component: () => import('@/views/system/dictionary/itemList.vue'),
  }));
  const index = routeModuleList.findIndex((x) => x.name === 'Basic');
  result?.forEach((x) => {
    routeModuleList[index].children?.push(x);
  });
  modulesRouteList = jsonClone(routeModuleList);
  routeIdMap = getRouteIdMap(modulesRouteList);
  refreshMenu();
}
getRoutes();

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

export let modulesRouteList = jsonClone(routeModuleList);

export let routeIdMap = getRouteIdMap(modulesRouteList);

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

export const LoginRoute: AppRouteRecordRaw = {
  path: '/login',
  name: 'Login',
  component: () => import('@/views/sys/login/Login.vue'),
  meta: {
    title: t('routes.basic.login'),
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
];
