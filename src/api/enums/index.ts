/*
 * @Author: HxB
 * @Date: 2024-02-20 10:11:25
 * @LastEditors: DoubleAm
 * @LastEditTime: 2024-02-20 16:34:42
 * @Description: 枚举
 * @FilePath: \psms-fe\src\api\enums\index.ts
 */

// @TODO: [API TYPE] 稳定版后再使用 ytt 统一生成类型声明
import { defHttp } from '@/utils/http/axios';

/**
 * 获取枚举值
 * @param enumName
 * @returns
 */
export const getEnumsItems = (enumName: string) =>
  defHttp.get({ url: '/api/sys/enums/' + enumName }, { isTransformResponse: false });
