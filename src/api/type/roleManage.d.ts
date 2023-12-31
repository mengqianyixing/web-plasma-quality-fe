/* prettier-ignore-start */
/* tslint:disable */
/* eslint-disable */

/* 该文件由 yapi-to-typescript 自动生成，请勿直接修改！！！ */

// @ts-ignore
type FileData = File;

/**
 * 接口 [查询角色列表↗](https://yapi.sharing8.cn/project/521/interface/api/29314) 的 **请求类型**
 *
 * @分类 [角色管理↗](https://yapi.sharing8.cn/project/521/interface/api/cat_4400)
 * @请求头 `POST /sys/roles`
 * @更新时间 `2023-10-27 17:19:39`
 */
export interface PostSysRolesRequest {
  /**
   * 当前页
   */
  currPage: number;
  /**
   * 分页大小
   */
  pageSize: number;
  /**
   * 角色名称，模糊查询
   */
  roleName?: string;
  /**
   * 状态，0：禁用，1：正常
   */
  status?: number;
}

/**
 * 接口 [查询角色列表↗](https://yapi.sharing8.cn/project/521/interface/api/29314) 的 **返回类型**
 *
 * @分类 [角色管理↗](https://yapi.sharing8.cn/project/521/interface/api/cat_4400)
 * @请求头 `POST /sys/roles`
 * @更新时间 `2023-10-27 17:19:39`
 */
export interface PostSysRolesResponse {
  /**
   * 总数
   */
  totalCount: number;
  /**
   * 分页大小
   */
  pageSize: number;
  /**
   * 总页数
   */
  totalPage: number;
  /**
   * 当前页数
   */
  currPage: number;
  result: {
    /**
     * 角色id，主键
     */
    roleId: string;
    /**
     * 角色名称，唯一
     */
    roleName: string;
    /**
     * 状态，0：禁用，1：正常
     */
    status: number;
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
    create_time?: string;
  }[];
}

/**
 * 接口 [新增角色信息↗](https://yapi.sharing8.cn/project/521/interface/api/29320) 的 **请求类型**
 *
 * @分类 [角色管理↗](https://yapi.sharing8.cn/project/521/interface/api/cat_4400)
 * @请求头 `POST /sys/role`
 * @更新时间 `2023-10-27 17:19:31`
 */
export interface PostSysRoleRequest {
  roleName: string;
  status: number;
  remark?: string;
  /**
   * 菜单集合
   */
  menuIds: string[];
}

/**
 * 接口 [新增角色信息↗](https://yapi.sharing8.cn/project/521/interface/api/29320) 的 **返回类型**
 *
 * @分类 [角色管理↗](https://yapi.sharing8.cn/project/521/interface/api/cat_4400)
 * @请求头 `POST /sys/role`
 * @更新时间 `2023-10-27 17:19:31`
 */
export interface PostSysRoleResponse {}

/**
 * 接口 [删除角色信息↗](https://yapi.sharing8.cn/project/521/interface/api/29332) 的 **请求类型**
 *
 * @分类 [角色管理↗](https://yapi.sharing8.cn/project/521/interface/api/cat_4400)
 * @请求头 `DELETE /sys/role/{id}`
 * @更新时间 `2023-10-27 17:19:44`
 */
export interface DeleteSysRoleIdRequest {
  /**
   * 角色id
   */
  id: string;
}

/**
 * 接口 [删除角色信息↗](https://yapi.sharing8.cn/project/521/interface/api/29332) 的 **返回类型**
 *
 * @分类 [角色管理↗](https://yapi.sharing8.cn/project/521/interface/api/cat_4400)
 * @请求头 `DELETE /sys/role/{id}`
 * @更新时间 `2023-10-27 17:19:44`
 */
export interface DeleteSysRoleIdResponse {}

/**
 * 接口 [编辑角色信息↗](https://yapi.sharing8.cn/project/521/interface/api/29338) 的 **请求类型**
 *
 * @分类 [角色管理↗](https://yapi.sharing8.cn/project/521/interface/api/cat_4400)
 * @请求头 `PUT /sys/role`
 * @更新时间 `2023-10-27 17:19:49`
 */
export interface PutSysRoleRequest {
  /**
   * 角色id，主键
   */
  roleId: string;
  /**
   * 角色名称，唯一
   */
  roleName?: string;
  /**
   * 状态，0：禁用，1：正常，-1：删除
   */
  status?: number;
  /**
   * 备注信息
   */
  remark?: string;
  /**
   * 已勾选菜单数组
   */
  menuIds?: string[];
}

/**
 * 接口 [编辑角色信息↗](https://yapi.sharing8.cn/project/521/interface/api/29338) 的 **返回类型**
 *
 * @分类 [角色管理↗](https://yapi.sharing8.cn/project/521/interface/api/cat_4400)
 * @请求头 `PUT /sys/role`
 * @更新时间 `2023-10-27 17:19:49`
 */
export interface PutSysRoleResponse {}

/**
 * 接口 [查询单个角色，包括菜单信息↗](https://yapi.sharing8.cn/project/521/interface/api/29416) 的 **请求类型**
 *
 * @分类 [角色管理↗](https://yapi.sharing8.cn/project/521/interface/api/cat_4400)
 * @请求头 `GET /sys/role/{id}`
 * @更新时间 `2023-10-31 16:05:41`
 */
export interface GetSysRoleIdRequest {
  /**
   * 角色编号
   */
  id: string;
}

/**
 * 接口 [查询单个角色，包括菜单信息↗](https://yapi.sharing8.cn/project/521/interface/api/29416) 的 **返回类型**
 *
 * @分类 [角色管理↗](https://yapi.sharing8.cn/project/521/interface/api/cat_4400)
 * @请求头 `GET /sys/role/{id}`
 * @更新时间 `2023-10-31 16:05:41`
 */
export interface GetSysRoleIdResponse {
  /**
   * 角色id，主键
   */
  roleId: string;
  /**
   * 角色名称
   */
  roleName: string;
  /**
   * 状态，0：禁用，1：正常，-1：删除
   */
  status: string;
  /**
   * 备注信息
   */
  remark?: string;
  /**
   * 菜单标识
   */
  menuCode: string;
  /**
   * 图标
   */
  iconType?: string;
  menuTree?: {
    /**
     * 菜单id
     */
    menuId: string;
    /**
     * 菜单名称
     */
    menuName: string;
    /**
     * 菜单类型：0：菜单，1：按钮，2：其他
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
     * 是否已勾选
     */
    check: boolean;
    /**
     * 叶子节点
     */
    children?: {
      /**
       * 菜单id
       */
      menuId: string;
      /**
       * 菜单名称
       */
      menuName: string;
      /**
       * 菜单类型：0：菜单，1：按钮，2：其他
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
       * 是否已勾选
       */
      check: boolean;
      /**
       * 叶子节点
       */
      children?: {}[];
    }[];
  }[];
}

/**
 * 接口 [根据用户id，获取用户的菜单↗](https://yapi.sharing8.cn/project/521/interface/api/29740) 的 **请求类型**
 *
 * @分类 [角色管理↗](https://yapi.sharing8.cn/project/521/interface/api/cat_4400)
 * @请求头 `GET /sys/role/user/menutree`
 * @更新时间 `2023-10-31 16:05:52`
 */
export interface GetSysRoleUserMenutreeRequest {}

/**
 * 接口 [根据用户id，获取用户的菜单↗](https://yapi.sharing8.cn/project/521/interface/api/29740) 的 **返回类型**
 *
 * @分类 [角色管理↗](https://yapi.sharing8.cn/project/521/interface/api/cat_4400)
 * @请求头 `GET /sys/role/user/menutree`
 * @更新时间 `2023-10-31 16:05:52`
 */
export type GetSysRoleUserMenutreeResponse = {
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
  menuType: number;
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
    menuType: number;
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
    children?: {}[];
  }[];
}[];

/* prettier-ignore-end */
