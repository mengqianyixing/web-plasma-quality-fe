export enum STATUS {
  TBP = 'TBP',
  PLI = 'PLI',
  PBR = 'PBR',
  PLD = 'PLD',
  PVD = 'PVD',
  OTD = 'OTD',
}
export const STATUS_TEXT: Map<string, string> = new Map([
  [STATUS.TBP, '未计划'],
  [STATUS.PLI, '计划中'],
  [STATUS.PBR, '待复核'],
  [STATUS.PLD, '待审核'],
  [STATUS.PVD, '已审核'],
  [STATUS.OTD, '已出库'],
]);
export const statusList = Object.keys(STATUS).map((_) => ({ label: STATUS_TEXT.get(_), value: _ }));

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
