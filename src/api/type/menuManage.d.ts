/* prettier-ignore-start */
/* tslint:disable */
/* eslint-disable */

/* 该文件由 yapi-to-typescript 自动生成，请勿直接修改！！！ */

// @ts-ignore
type FileData = File;

/**
 * 接口 [查询菜单信息↗](https://yapi.sharing8.cn/project/521/interface/api/29356) 的 **请求类型**
 *
 * @分类 [菜单管理↗](https://yapi.sharing8.cn/project/521/interface/api/cat_4408)
 * @请求头 `POST /api/sys/menus`
 * @更新时间 `2023-12-15 10:45:51`
 */
export interface PostApiSysMenusRequest {
  /**
   * 菜单名称
   */
  menuName?: string;
  /**
   * 菜单编码
   */
  menuCode?: string;
  /**
   * 菜单类型：0：目录，1：菜单，2：按钮，3：其他
   */
  menuType?: number;
}

/**
 * 接口 [查询菜单信息↗](https://yapi.sharing8.cn/project/521/interface/api/29356) 的 **返回类型**
 *
 * @分类 [菜单管理↗](https://yapi.sharing8.cn/project/521/interface/api/cat_4408)
 * @请求头 `POST /api/sys/menus`
 * @更新时间 `2023-12-15 10:45:51`
 */
export interface PostApiSysMenusResponse {
  result?: {
    /**
     * 创建人
     */
    createUser?: string;
    /**
     * 创建时间
     */
    createTime?: string;
    /**
     * 菜单id，主键
     */
    menuId: string;
    /**
     * 菜单编码
     */
    menuCode: string;
    /**
     * 菜单名称
     */
    menuName: string;
    /**
     * 菜单类型
     */
    menuType: number;
    /**
     * 菜单排序
     */
    menuOrder: string;
    /**
     * 菜单路径
     */
    menuPath?: string;
    /**
     * 菜单组件
     */
    component?: string;
    /**
     * 图标类型
     */
    iconType?: string;
    /**
     * 父菜单id
     */
    parentId?: string;
    /**
     * 备注
     */
    remark?: string;
    /**
     * 叶子节点
     */
    children?: {
      /**
       * 菜单id，主键
       */
      menuId: string;
      /**
       * 菜单编码
       */
      menuCode: string;
      menuName: string;
      /**
       * 菜单类型
       */
      menuType: number;
      /**
       * 菜单排序
       */
      menuOrder: string;
      /**
       * 菜单路径
       */
      menuPath?: string;
      /**
       * 菜单组件
       */
      component?: string;
      /**
       * 图标类型
       */
      iconType?: string;
      /**
       * 父菜单id
       */
      parentId?: string;
      /**
       * 路径
       */
      path?: string;
      /**
       * 备注
       */
      remark?: string;
      /**
       * 叶子节点
       */
      children?: {}[];
    }[];
  }[];
}

/**
 * 接口 [新增菜单信息↗](https://yapi.sharing8.cn/project/521/interface/api/29362) 的 **请求类型**
 *
 * @分类 [菜单管理↗](https://yapi.sharing8.cn/project/521/interface/api/cat_4408)
 * @请求头 `POST /api/sys/menu`
 * @更新时间 `2023-12-15 10:45:59`
 */
export interface PostApiSysMenuRequest {
  /**
   * 菜单编码，唯一
   */
  menuCode: string;
  /**
   * 菜单类型：0：目录，1：菜单，2：按钮，3：其他
   */
  menuType: number;
  /**
   * 菜单排序
   */
  menuOrder: string;
  /**
   * 菜单名称
   */
  menuName: string;
  /**
   * 菜单路径
   */
  menuPath?: string;
  /**
   * component
   */
  component?: string;
  /**
   * 图标类型
   */
  iconType?: string;
  /**
   * 父菜单id
   */
  parentId?: string;
  /**
   * 备注
   */
  remark?: string;
}

/**
 * 接口 [新增菜单信息↗](https://yapi.sharing8.cn/project/521/interface/api/29362) 的 **返回类型**
 *
 * @分类 [菜单管理↗](https://yapi.sharing8.cn/project/521/interface/api/cat_4408)
 * @请求头 `POST /api/sys/menu`
 * @更新时间 `2023-12-15 10:45:59`
 */
export interface PostApiSysMenuResponse {}

/**
 * 接口 [删除菜单信息↗](https://yapi.sharing8.cn/project/521/interface/api/29368) 的 **请求类型**
 *
 * @分类 [菜单管理↗](https://yapi.sharing8.cn/project/521/interface/api/cat_4408)
 * @请求头 `DELETE /api/sys/menu/{id}`
 * @更新时间 `2023-12-15 10:46:07`
 */
export interface DeleteApiSysMenuIdRequest {
  /**
   * 菜单id
   */
  id: string;
}

/**
 * 接口 [删除菜单信息↗](https://yapi.sharing8.cn/project/521/interface/api/29368) 的 **返回类型**
 *
 * @分类 [菜单管理↗](https://yapi.sharing8.cn/project/521/interface/api/cat_4408)
 * @请求头 `DELETE /api/sys/menu/{id}`
 * @更新时间 `2023-12-15 10:46:07`
 */
export interface DeleteApiSysMenuIdResponse {}

/**
 * 接口 [编辑菜单信息↗](https://yapi.sharing8.cn/project/521/interface/api/29374) 的 **请求类型**
 *
 * @分类 [菜单管理↗](https://yapi.sharing8.cn/project/521/interface/api/cat_4408)
 * @请求头 `PUT /api/sys/menu`
 * @更新时间 `2023-12-15 10:46:13`
 */
export interface PutApiSysMenuRequest {
  /**
   * 菜单id，主键
   */
  menuId: string;
  /**
   * 菜单编码，唯一
   */
  menuCode?: string;
  /**
   * 菜单类型：0：目录，1：菜单，2：按钮，3：其他
   */
  menuType?: number;
  /**
   * 菜单排序
   */
  menuOrder?: string;
  /**
   * 菜单名称
   */
  menuName?: string;
  /**
   * 菜单路径
   */
  menuPath?: string;
  /**
   * 菜单组件
   */
  component?: string;
  /**
   * 图标类型
   */
  iconType?: string;
  /**
   * 父菜单id
   */
  parentId?: string;
  /**
   * 备注
   */
  remark?: string;
}

/**
 * 接口 [编辑菜单信息↗](https://yapi.sharing8.cn/project/521/interface/api/29374) 的 **返回类型**
 *
 * @分类 [菜单管理↗](https://yapi.sharing8.cn/project/521/interface/api/cat_4408)
 * @请求头 `PUT /api/sys/menu`
 * @更新时间 `2023-12-15 10:46:13`
 */
export interface PutApiSysMenuResponse {}

/**
 * 接口 [查询菜单树↗](https://yapi.sharing8.cn/project/521/interface/api/29410) 的 **请求类型**
 *
 * @分类 [菜单管理↗](https://yapi.sharing8.cn/project/521/interface/api/cat_4408)
 * @请求头 `GET /api/sys/menu/tree`
 * @更新时间 `2023-12-19 16:31:07`
 */
export interface GetApiSysMenuTreeRequest {}

/**
 * 接口 [查询菜单树↗](https://yapi.sharing8.cn/project/521/interface/api/29410) 的 **返回类型**
 *
 * @分类 [菜单管理↗](https://yapi.sharing8.cn/project/521/interface/api/cat_4408)
 * @请求头 `GET /api/sys/menu/tree`
 * @更新时间 `2023-12-19 16:31:07`
 */
export type GetApiSysMenuTreeResponse = {
  /**
   * 菜单id
   */
  menuId: string;
  /**
   * 菜单名称
   */
  menuName: string;
  /**
   * 菜单类型
   */
  menuType: number;
  /**
   * 菜单排序
   */
  menuOrder: string;
  /**
   * 菜单路径
   */
  menuPath?: string;
  /**
   * 菜单组件
   */
  component?: string;
  /**
   * 父菜单id
   */
  parentId?: string;
  /**
   * &..
   */
  children: GetApiSysMenuTreeResponse;
}[];

/* prettier-ignore-end */
