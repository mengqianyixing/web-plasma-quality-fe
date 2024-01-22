/*
 * @Author: HxB
 * @Date: 2024-01-18 17:34:12
 * @LastEditors: DoubleAm
 * @LastEditTime: 2024-01-18 17:35:21
 * @Description: 数据转换器
 * @FilePath: \psms-fe\src\views\system\auth\dataTransfer.ts
 */

import { TreeItem } from '@/components/Tree';
import { jsonClone } from 'js-xxx';

/**
 * 处理预览树特殊数据显示
 * 比如：
 * 【元素与菜单】子元素有权限，但父菜单没权限则不显示；子元素没权限，父菜单有权限，显示父菜单；子元素和父菜单都有权限，则显示所有有权限的子元素与父菜单；
 * 【菜单与菜单】子菜单有权限，但父菜单没权限，依然显示子菜单；父菜单有权限，显示所有子菜单，无论是否勾选；
 * @param treeList
 * @param selectedKeys
 */
export function getFilterTreeData(treeList: TreeItem[], selectedKeys: any) {
  treeList = jsonClone(treeList ?? []);
  selectedKeys = Array.isArray(selectedKeys) ? selectedKeys : selectedKeys?.checked ?? [];
  const filteredRoutes: any[] = [];

  treeList.forEach((item: any) => {
    if (selectedKeys?.includes(item.id)) {
      if (item.authElements) {
        const filteredChildren = getFilterTreeData(item.children, selectedKeys);
        if (filteredChildren.length > 0) {
          item.children = filteredChildren;
          filteredRoutes.push(item);
        } else {
          filteredRoutes.push({ ...item, children: undefined });
        }
        return;
      }
      if (!item.children || item.children?.every((child) => !child.authElements)) {
        filteredRoutes.push(item);
      } else {
        const filteredChildren = item.children?.map((i) =>
          i.authElements
            ? {
                ...i,
                children: getFilterTreeData(i.children, selectedKeys),
              }
            : i,
        );
        if (filteredChildren.length > 0) {
          item.children = filteredChildren;
          filteredRoutes.push(item);
        }
      }
    } else if (item.authElements) {
      return;
    } else if (item.children) {
      const filteredChildren = getFilterTreeData(item.children, selectedKeys);
      if (filteredChildren.length > 0) {
        item.children = filteredChildren;
        filteredRoutes.push(item);
      }
    }
  });

  return filteredRoutes.sort((a, b) => {
    return (b?.menuWeight || 0) - (a?.menuWeight || 0);
  });
}

/**
 * 筛选需要的路由数据
 * @param routes
 * @returns
 */
export function filterRoutes(routes: any[]): any[] {
  const filteredRoutes: any[] = [];

  routes.forEach((item: any) => {
    if (item.id && !item.children && !item.authElements) {
      if (`${item?.id}`.includes('E_')) {
        item.class = 'auth-element-tree-node';
      }
      filteredRoutes.push({
        ...item,
        title: item?.meta?.title ?? item.title ?? item.name,
      });
      return;
    }
    if (item.children) {
      const filteredChildren = filterRoutes(item.children);
      if (filteredChildren.length > 0) {
        item.children = filteredChildren;
        filteredRoutes.push({
          ...item,
          title: item?.meta?.title ?? item.title ?? item.name,
        });
      }
      return;
    }
    if (item.authElements) {
      const filteredChildren = filterRoutes(item.authElements);
      if (filteredChildren.length > 0) {
        // 将 authElements 导入到菜单
        item.children = filteredChildren;
        filteredRoutes.push({
          ...item,
          title: item?.meta?.title ?? item.title ?? item.name,
        });
      }
      return;
    }
  });

  return filteredRoutes.sort((a, b) => {
    return (b?.menuWeight || 0) - (a?.menuWeight || 0);
  });
}
