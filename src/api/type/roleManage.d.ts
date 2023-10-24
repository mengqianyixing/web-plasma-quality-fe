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
 * @更新时间 `2023-10-24 10:47:33`
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
 * @更新时间 `2023-10-24 10:47:33`
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
  list: {
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
 * @更新时间 `2023-10-24 11:02:25`
 */
export interface PostSysRoleRequest {
  roleName: string;
  status: number;
  remark?: string;
  /**
   * 菜单集合
   */
  menuIds: {
    /**
     * 已选择菜单编号
     */
    menuId: string;
  }[];
}

/**
 * 接口 [新增角色信息↗](https://yapi.sharing8.cn/project/521/interface/api/29320) 的 **返回类型**
 *
 * @分类 [角色管理↗](https://yapi.sharing8.cn/project/521/interface/api/cat_4400)
 * @请求头 `POST /sys/role`
 * @更新时间 `2023-10-24 11:02:25`
 */
export interface PostSysRoleResponse {
  /**
   * 响应码
   */
  code?: string;
  /**
   * 响应信息
   */
  msg?: string;
}

/**
 * 接口 [删除角色信息↗](https://yapi.sharing8.cn/project/521/interface/api/29332) 的 **请求类型**
 *
 * @分类 [角色管理↗](https://yapi.sharing8.cn/project/521/interface/api/cat_4400)
 * @请求头 `DELETE /sys/role/{id}`
 * @更新时间 `2023-10-24 10:23:57`
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
 * @更新时间 `2023-10-24 10:23:57`
 */
export interface DeleteSysRoleIdResponse {
  /**
   * 状态码
   */
  code?: string;
  /**
   * 状态信息
   */
  msg?: string;
}

/**
 * 接口 [编辑角色信息↗](https://yapi.sharing8.cn/project/521/interface/api/29338) 的 **请求类型**
 *
 * @分类 [角色管理↗](https://yapi.sharing8.cn/project/521/interface/api/cat_4400)
 * @请求头 `PUT /sys/role`
 * @更新时间 `2023-10-24 11:33:12`
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
 * @更新时间 `2023-10-24 11:33:12`
 */
export interface PutSysRoleResponse {
  /**
   * 状态码
   */
  code?: string;
  /**
   * 状态信息
   */
  msg?: string;
}

/**
 * 接口 [查询单个角色，包括菜单信息↗](https://yapi.sharing8.cn/project/521/interface/api/29416) 的 **请求类型**
 *
 * @分类 [角色管理↗](https://yapi.sharing8.cn/project/521/interface/api/cat_4400)
 * @请求头 `GET /sys/role/{id}`
 * @更新时间 `2023-10-24 15:18:39`
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
 * @更新时间 `2023-10-24 15:18:39`
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
    child?: {
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
      child?: {}[];
    }[];
  }[];
}

/* prettier-ignore-end */
