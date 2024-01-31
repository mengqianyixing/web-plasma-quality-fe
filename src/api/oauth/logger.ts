/*
 * @Author: HxB
 * @Date: 2024-01-31 10:01:13
 * @LastEditors: DoubleAm
 * @LastEditTime: 2024-01-31 10:47:33
 * @Description: 日志管理-审计使用
 * @FilePath: \psms-fe\src\api\oauth\logger.ts
 */
// @TODO: [API TYPE] 稳定版后再使用 ytt 统一生成类型声明
import { defHttp } from '@/utils/http/axios';

/**
 * 推送 casdoor 相关审计日志
 * @param data
 * @returns
 */
export const pushLog = (data) => defHttp.post({ url: '/api/sys/log', data }).catch(() => {});
