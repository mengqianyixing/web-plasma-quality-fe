/* prettier-ignore-start */
/* tslint:disable */
/* eslint-disable */

/* 该文件由 yapi-to-typescript 自动生成，请勿直接修改！！！ */

// @ts-ignore
type FileData = File;

/**
 * 接口 [新增资源↗](https://yapi.sharing8.cn/project/521/interface/api/29272) 的 **请求类型**
 *
 * @分类 [资源管理↗](https://yapi.sharing8.cn/project/521/interface/api/cat_4392)
 * @请求头 `POST /api/sys/resource`
 * @更新时间 `2023-12-15 10:46:34`
 */
export interface PostApiSysResourceRequest {
  /**
   * 资源URI
   */
  resourceUri: string;
  /**
   * 请求方法
   */
  methodType: string;
  /**
   * 资源名称
   */
  resourceName: string;
  /**
   * 备注说明
   */
  remark?: string;
  /**
   * 该资源URI关联的菜单id数组
   */
  resourceMenuList: string[];
}

/**
 * 接口 [新增资源↗](https://yapi.sharing8.cn/project/521/interface/api/29272) 的 **返回类型**
 *
 * @分类 [资源管理↗](https://yapi.sharing8.cn/project/521/interface/api/cat_4392)
 * @请求头 `POST /api/sys/resource`
 * @更新时间 `2023-12-15 10:46:34`
 */
export interface PostApiSysResourceResponse {
  /**
   * 响应码
   */
  code: string;
  /**
   * 响应信息
   */
  msg: string;
}

/**
 * 接口 [删除资源↗](https://yapi.sharing8.cn/project/521/interface/api/29284) 的 **请求类型**
 *
 * @分类 [资源管理↗](https://yapi.sharing8.cn/project/521/interface/api/cat_4392)
 * @请求头 `DELETE /api/sys/resource/{id}`
 * @更新时间 `2023-12-15 10:46:40`
 */
export interface DeleteApiSysResourceIdRequest {
  /**
   * 资源id
   */
  id: string;
}

/**
 * 接口 [删除资源↗](https://yapi.sharing8.cn/project/521/interface/api/29284) 的 **返回类型**
 *
 * @分类 [资源管理↗](https://yapi.sharing8.cn/project/521/interface/api/cat_4392)
 * @请求头 `DELETE /api/sys/resource/{id}`
 * @更新时间 `2023-12-15 10:46:40`
 */
export interface DeleteApiSysResourceIdResponse {
  /**
   * 响应码
   */
  code: string;
  /**
   * 响应信息
   */
  msg: string;
}

/**
 * 接口 [修改资源↗](https://yapi.sharing8.cn/project/521/interface/api/29296) 的 **请求类型**
 *
 * @分类 [资源管理↗](https://yapi.sharing8.cn/project/521/interface/api/cat_4392)
 * @请求头 `PUT /api/sys/resource`
 * @更新时间 `2023-12-15 10:46:48`
 */
export interface PutApiSysResourceRequest {
  /**
   * 1234567
   */
  resourceId: string;
  /**
   * /sys/resource
   */
  resourceUri: string;
  /**
   * POST
   */
  methodType: string;
  /**
   * 新增资源
   */
  resourceName: string;
  /**
   * 备注信息
   */
  remark?: string;
  /**
   * 该资源URI关联的菜单id数组
   */
  resourceMenuList: string[];
}

/**
 * 接口 [修改资源↗](https://yapi.sharing8.cn/project/521/interface/api/29296) 的 **返回类型**
 *
 * @分类 [资源管理↗](https://yapi.sharing8.cn/project/521/interface/api/cat_4392)
 * @请求头 `PUT /api/sys/resource`
 * @更新时间 `2023-12-15 10:46:48`
 */
export interface PutApiSysResourceResponse {
  /**
   * 响应码
   */
  code: string;
  /**
   * 响应信息
   */
  msg: string;
}

/**
 * 接口 [查询单个资源↗](https://yapi.sharing8.cn/project/521/interface/api/29302) 的 **请求类型**
 *
 * @分类 [资源管理↗](https://yapi.sharing8.cn/project/521/interface/api/cat_4392)
 * @请求头 `GET /api/sys/resource/{id}`
 * @更新时间 `2023-12-15 10:46:57`
 */
export interface GetApiSysResourceIdRequest {
  /**
   * 资源id
   */
  id: string;
}

/**
 * 接口 [查询单个资源↗](https://yapi.sharing8.cn/project/521/interface/api/29302) 的 **返回类型**
 *
 * @分类 [资源管理↗](https://yapi.sharing8.cn/project/521/interface/api/cat_4392)
 * @请求头 `GET /api/sys/resource/{id}`
 * @更新时间 `2023-12-15 10:46:57`
 */
export interface GetApiSysResourceIdResponse {
  /**
   * 资源id
   */
  resourceId: string;
  /**
   * 资源URI
   */
  resourceUri: string;
  /**
   * 请求方法
   */
  methodType: string;
  /**
   * 资源名称
   */
  resourceName: string;
  /**
   * 备注信息
   */
  remark?: string;
  /**
   * 创建人
   */
  createUser?: string;
  /**
   * 创建时间
   */
  createTime?: string;
  /**
   * 修改人
   */
  updateUser?: string;
  /**
   * 修改时间
   */
  updateTime?: string;
  /**
   * 资源关联的菜单树
   */
  menuTree?: {
    /**
     * 菜单编号
     */
    menuId: string;
    /**
     * 菜单名称
     */
    menuName: string;
    /**
     * 菜单类型
     */
    menuType: string;
    /**
     * 菜单排序
     */
    menuOrder: string;
    /**
     * 父菜单id
     */
    parentId?: string;
    /**
     * 菜单编码
     */
    menuCode: string;
    /**
     * 图标
     */
    iconType?: string;
    /**
     * 菜单路径
     */
    menuPath?: string;
    /**
     * 组件
     */
    component?: string;
    check: boolean;
    children?: {
      /**
       * 菜单编号
       */
      menuId: string;
      /**
       * 菜单名称
       */
      menuName: string;
      /**
       * 菜单类型
       */
      menuType: string;
      /**
       * 菜单排序
       */
      menuOrder: string;
      /**
       * 父菜单id
       */
      parentId?: string;
      /**
       * 菜单编码
       */
      menuCode: string;
      /**
       * 图标
       */
      iconType?: string;
      /**
       * 菜单路径
       */
      menuPath?: string;
      /**
       * 组件
       */
      component?: string;
      check: string;
      children?: {}[];
    }[];
  }[];
}

/**
 * 接口 [查询资源列表↗](https://yapi.sharing8.cn/project/521/interface/api/29326) 的 **请求类型**
 *
 * @分类 [资源管理↗](https://yapi.sharing8.cn/project/521/interface/api/cat_4392)
 * @请求头 `POST /api/sys/resources`
 * @更新时间 `2023-12-15 10:47:11`
 */
export interface PostApiSysResourcesRequest {
  /**
   * 当前页码
   */
  currPage: number;
  /**
   * 页数大小
   */
  pageSize: number;
  /**
   * 资源URI，模糊查询
   */
  resourceUri?: string;
  /**
   * 资源名称，模糊查询
   */
  resourceName?: string;
}

/**
 * 接口 [查询资源列表↗](https://yapi.sharing8.cn/project/521/interface/api/29326) 的 **返回类型**
 *
 * @分类 [资源管理↗](https://yapi.sharing8.cn/project/521/interface/api/cat_4392)
 * @请求头 `POST /api/sys/resources`
 * @更新时间 `2023-12-15 10:47:11`
 */
export interface PostApiSysResourcesResponse {
  /**
   * 当前页
   */
  currPage: number;
  /**
   * 页数大小
   */
  pageSize: number;
  /**
   * 总数量
   */
  totalCount: number;
  /**
   * 资源列表
   */
  list?: {
    /**
     * 资源id
     */
    resourceId: string;
    /**
     * 资源URI
     */
    resourceUri: string;
    /**
     * 请求方法
     */
    methodType: string;
    /**
     * 资源名称
     */
    resourceName: string;
    /**
     * 备注信息
     */
    remark?: string;
    /**
     * 创建人
     */
    createUser?: string;
    /**
     * 创建时间
     */
    createTime?: string;
  }[];
}

/* prettier-ignore-end */
