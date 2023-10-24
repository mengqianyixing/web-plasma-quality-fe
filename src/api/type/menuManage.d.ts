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
 * @请求头 `POST /sys/menus`
 * @更新时间 `2023-10-24 15:14:49`
 */
export interface PostSysMenusRequest {
  /**
   * 当前页
   */
  currPage: number;
  /**
   * 分页大小
   */
  pageSize: number;
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
 * @请求头 `POST /sys/menus`
 * @更新时间 `2023-10-24 15:14:49`
 */
export interface PostSysMenusResponse {
  /**
   * 总条数
   */
  totalCount: number;
  /**
   * 总页数
   */
  totalPage: number;
  /**
   * 当前页数
   */
  currPage: number;
  /**
   * 分页大小
   */
  pageSize: number;
  list?: {
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
    child?: {
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
      child?: {}[];
    }[];
  }[];
}

/**
 * 接口 [新增菜单信息↗](https://yapi.sharing8.cn/project/521/interface/api/29362) 的 **请求类型**
 *
 * @分类 [菜单管理↗](https://yapi.sharing8.cn/project/521/interface/api/cat_4408)
 * @请求头 `POST /sys/menu`
 * @更新时间 `2023-10-24 15:16:51`
 */
export interface PostSysMenuRequest {
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
}

/**
 * 接口 [新增菜单信息↗](https://yapi.sharing8.cn/project/521/interface/api/29362) 的 **返回类型**
 *
 * @分类 [菜单管理↗](https://yapi.sharing8.cn/project/521/interface/api/cat_4408)
 * @请求头 `POST /sys/menu`
 * @更新时间 `2023-10-24 15:16:51`
 */
export interface PostSysMenuResponse {
  /**
   * 响应信息
   */
  msg: string;
  /**
   * 响应码
   */
  code: string;
}

/**
 * 接口 [删除菜单信息↗](https://yapi.sharing8.cn/project/521/interface/api/29368) 的 **请求类型**
 *
 * @分类 [菜单管理↗](https://yapi.sharing8.cn/project/521/interface/api/cat_4408)
 * @请求头 `DELETE /sys/menu/{id}`
 * @更新时间 `2023-10-24 10:25:01`
 */
export interface DeleteSysMenuIdRequest {
  /**
   * 菜单id
   */
  id: string;
}

/**
 * 接口 [删除菜单信息↗](https://yapi.sharing8.cn/project/521/interface/api/29368) 的 **返回类型**
 *
 * @分类 [菜单管理↗](https://yapi.sharing8.cn/project/521/interface/api/cat_4408)
 * @请求头 `DELETE /sys/menu/{id}`
 * @更新时间 `2023-10-24 10:25:01`
 */
export interface DeleteSysMenuIdResponse {
  /**
   * 响应信息
   */
  msg: string;
  /**
   * 响应码
   */
  code: string;
}

/**
 * 接口 [编辑菜单信息↗](https://yapi.sharing8.cn/project/521/interface/api/29374) 的 **请求类型**
 *
 * @分类 [菜单管理↗](https://yapi.sharing8.cn/project/521/interface/api/cat_4408)
 * @请求头 `PUT /sys/menu`
 * @更新时间 `2023-10-24 15:17:21`
 */
export interface PutSysMenuRequest {
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
}

/**
 * 接口 [编辑菜单信息↗](https://yapi.sharing8.cn/project/521/interface/api/29374) 的 **返回类型**
 *
 * @分类 [菜单管理↗](https://yapi.sharing8.cn/project/521/interface/api/cat_4408)
 * @请求头 `PUT /sys/menu`
 * @更新时间 `2023-10-24 15:17:21`
 */
export interface PutSysMenuResponse {
  /**
   * 响应信息
   */
  msg: string;
  /**
   * 响应码
   */
  code: string;
}

/**
 * 接口 [查询菜单树↗](https://yapi.sharing8.cn/project/521/interface/api/29410) 的 **请求类型**
 *
 * @分类 [菜单管理↗](https://yapi.sharing8.cn/project/521/interface/api/cat_4408)
 * @请求头 `POST /sys/menu/tree`
 * @更新时间 `2023-10-24 15:06:26`
 */
export interface PostSysMenuTreeRequest {
  /**
   * 角色Id
   */
  角色Id?: string;
}

/**
 * 接口 [查询菜单树↗](https://yapi.sharing8.cn/project/521/interface/api/29410) 的 **返回类型**
 *
 * @分类 [菜单管理↗](https://yapi.sharing8.cn/project/521/interface/api/cat_4408)
 * @请求头 `POST /sys/menu/tree`
 * @更新时间 `2023-10-24 15:06:26`
 */
export type PostSysMenuTreeResponse = {
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
   * 父菜单id
   */
  parentId?: string;
  /**
   * 子节点
   */
  child: {
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
     * 父菜单id
     */
    parentId?: string;
    /**
     * 子节点
     */
    child?: {}[];
  }[];
}[];

/* prettier-ignore-end */
