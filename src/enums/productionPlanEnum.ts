/*
 * @Descripttion:
 * @version:
 * @Author: zcc
 * @Date: 2024-01-18 17:58:08
 * @LastEditors: zcc
 * @LastEditTime: 2024-01-29 17:11:48
 */
import { COMPANY } from '@/enums/company';

export enum STATUS {
  TBP = 'TBP',
  PLI = 'PLI',
  PBR = 'PBR',
  PLD = 'PLD',
  OUI = 'OUI',
  PVD = 'PVD',
  OTD = 'OTD',
  ACT = 'ACT',
  ACD = 'ACD',
  TBS = 'TBS',
  IST = 'IST',
  SDN = 'SDN',
}
export const STATUS_TEXT: Map<string, { text: string; company?: string }> = new Map([
  [STATUS.TBP, { text: '未计划' }],
  [STATUS.PLI, { text: '计划中' }],
  [STATUS.PBR, { text: '待复核' }],
  [STATUS.PLD, { text: '待审核' }],
  [STATUS.PVD, { text: '已审核' }],
  [STATUS.TBS, { text: '待组垛', company: COMPANY.KM }],
  [STATUS.IST, { text: '组垛中', company: COMPANY.KM }],
  [STATUS.SDN, { text: '组垛完成', company: COMPANY.KM }],
  [STATUS.OUI, { text: '出库中' }],
  [STATUS.OTD, { text: '已出库' }],
  [STATUS.ACT, { text: '接收中' }],
  [STATUS.ACD, { text: '已接收' }],
]);
export const statusList = (company: string) => {
  const list: Recordable = [];
  for (const [value, label] of STATUS_TEXT) {
    if (label.company && label.company !== company) {
      continue;
    }
    list.push({ label: label.text, value });
  }
  return list;
};

export enum EXPIRATION {
  AY = 'AY',
  TY = 'TY',
}
export const EXPIRATION_TEXT: Map<string, string> = new Map([
  [EXPIRATION.AY, '一年'],
  [EXPIRATION.TY, '三年'],
]);

export const expirationList = Object.keys(EXPIRATION).map((_) => ({
  label: EXPIRATION_TEXT.get(_),
  value: _,
}));

export enum PLASMA_STATUS {
  WAIT = 'WAIT',
  PASS = 'PASS',
  FAIL = 'FAIL',
}
export const PLASMA_STATUS_TEXT: Map<string, string> = new Map([
  [PLASMA_STATUS.WAIT, '待验收'],
  [PLASMA_STATUS.PASS, '验收合格'],
  [PLASMA_STATUS.FAIL, '验收不合格'],
]);

export const plasmaStatusList = Object.keys(PLASMA_STATUS).map((_) => ({
  label: PLASMA_STATUS_TEXT.get(_),
  value: _,
}));
