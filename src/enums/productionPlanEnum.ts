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
export const STATUS_TEXT: Map<string, { text: string; company?: string; order: number }> = new Map([
  [STATUS.TBP, { text: '未计划', order: 0 }],
  [STATUS.PLI, { text: '计划中', order: 1 }],
  [STATUS.PBR, { text: '待复核', order: 2 }],
  [STATUS.PLD, { text: '待审核', order: 3 }],
  [STATUS.TBS, { text: '待组垛', order: 4, company: COMPANY.KM }],
  [STATUS.IST, { text: '组垛中', order: 5, company: COMPANY.KM }],
  [STATUS.PVD, { text: '已审核', order: 6 }],
  [STATUS.OUI, { text: '出库中', order: 7 }],
  [STATUS.OTD, { text: '已出库', order: 8 }],
  [STATUS.ACT, { text: '接收中', order: 9, company: COMPANY.RS }],
  [STATUS.ACD, { text: '已接收', order: 10 }],
]);
export const statusList = (company: string) => {
  const list: Recordable = [];
  for (const [value, label] of STATUS_TEXT) {
    if (label.company && label.company !== company) {
      continue;
    }
    list.push({ label: label.text, value, order: label.order });
  }
  return list.sort((a, b) => a.order - b.order);
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
