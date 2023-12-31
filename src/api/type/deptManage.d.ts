/* prettier-ignore-start */
/* tslint:disable */
/* eslint-disable */

/* 该文件由 yapi-to-typescript 自动生成，请勿直接修改！！！ */

// @ts-ignore
type FileData = File;

/**
 * 接口 [查询部门列表↗](https://yapi.sharing8.cn/project/521/interface/api/29224) 的 **请求类型**
 *
 * @分类 [部门管理↗](https://yapi.sharing8.cn/project/521/interface/api/cat_4368)
 * @请求头 `POST /sys/depts`
 * @更新时间 `2023-11-01 17:40:54`
 */
export interface PostSysDeptsRequest {
  /**
   * 部门名称，模糊查询
   */
  deptName?: string;
}

/**
 * 接口 [查询部门列表↗](https://yapi.sharing8.cn/project/521/interface/api/29224) 的 **返回类型**
 *
 * @分类 [部门管理↗](https://yapi.sharing8.cn/project/521/interface/api/cat_4368)
 * @请求头 `POST /sys/depts`
 * @更新时间 `2023-11-01 17:40:54`
 */
export type PostSysDeptsResponse = {
  /**
   * 部门id
   */
  deptId?: string;
  /**
   * 部门名称
   */
  deptName?: string;
  /**
   * 部门排序
   */
  deptOrder?: number;
  /**
   * 上级部门id
   */
  parentId?: string;
  /**
   * 备注
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
   * 叶子节点
   */
  children?: {
    /**
     * 部门id
     */
    deptId?: string;
    /**
     * 部门名称
     */
    deptName?: string;
    /**
     * 部门排序
     */
    deptOrder?: number;
    /**
     * 上级部门id
     */
    parentId?: string;
    /**
     * 备注
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
     * 叶子节点
     */
    children?: {}[];
  }[];
}[];

/**
 * 接口 [新增部门信息↗](https://yapi.sharing8.cn/project/521/interface/api/29236) 的 **请求类型**
 *
 * @分类 [部门管理↗](https://yapi.sharing8.cn/project/521/interface/api/cat_4368)
 * @请求头 `POST /sys/dept`
 * @更新时间 `2023-10-27 15:43:26`
 */
export interface PostSysDeptRequest {
  /**
   * 部门名称
   */
  deptName: string;
  /**
   * 上级部门Id
   */
  parentId?: string;
  /**
   * 排序
   */
  deptOrder: number;
  /**
   * 备注
   */
  remark?: string;
}

/**
 * 接口 [新增部门信息↗](https://yapi.sharing8.cn/project/521/interface/api/29236) 的 **返回类型**
 *
 * @分类 [部门管理↗](https://yapi.sharing8.cn/project/521/interface/api/cat_4368)
 * @请求头 `POST /sys/dept`
 * @更新时间 `2023-10-27 15:43:26`
 */
export interface PostSysDeptResponse {}

/**
 * 接口 [删除部门信息↗](https://yapi.sharing8.cn/project/521/interface/api/29242) 的 **请求类型**
 *
 * @分类 [部门管理↗](https://yapi.sharing8.cn/project/521/interface/api/cat_4368)
 * @请求头 `DELETE /sys/dept/{id}`
 * @更新时间 `2023-10-27 15:43:33`
 */
export interface DeleteSysDeptIdRequest {
  /**
   * 部门id
   */
  id: string;
}

/**
 * 接口 [删除部门信息↗](https://yapi.sharing8.cn/project/521/interface/api/29242) 的 **返回类型**
 *
 * @分类 [部门管理↗](https://yapi.sharing8.cn/project/521/interface/api/cat_4368)
 * @请求头 `DELETE /sys/dept/{id}`
 * @更新时间 `2023-10-27 15:43:33`
 */
export interface DeleteSysDeptIdResponse {}

/**
 * 接口 [编辑部门信息↗](https://yapi.sharing8.cn/project/521/interface/api/29248) 的 **请求类型**
 *
 * @分类 [部门管理↗](https://yapi.sharing8.cn/project/521/interface/api/cat_4368)
 * @请求头 `PUT /sys/dept`
 * @更新时间 `2023-10-27 15:41:57`
 */
export interface PutSysDeptRequest {
  /**
   * 部门编号
   */
  deptId: string;
  /**
   * 部门名称
   */
  deptName?: string;
  /**
   * 上级部门编号
   */
  parentId?: string;
  /**
   * 排序
   */
  deptOrder?: number;
  /**
   * 备注
   */
  remark?: string;
}

/**
 * 接口 [编辑部门信息↗](https://yapi.sharing8.cn/project/521/interface/api/29248) 的 **返回类型**
 *
 * @分类 [部门管理↗](https://yapi.sharing8.cn/project/521/interface/api/cat_4368)
 * @请求头 `PUT /sys/dept`
 * @更新时间 `2023-10-27 15:41:57`
 */
export interface PutSysDeptResponse {}

/* prettier-ignore-end */
