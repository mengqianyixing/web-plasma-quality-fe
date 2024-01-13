export enum operationEnum {
  N = '普通',
  B = '乙免',
  R = '狂免',
  A = '炭疽',
  T = '破免',
  C = '巨细胞',
}

export enum operationValueEnum {
  N = 'N',
  B = 'B',
  R = 'R',
  A = 'A',
  T = 'T',
  C = 'C',
}

export const operationMap = new Map<operationValueEnum, string>();

operationMap.set(operationValueEnum.N, operationEnum.N);
operationMap.set(operationValueEnum.B, operationEnum.B);
operationMap.set(operationValueEnum.R, operationEnum.R);
operationMap.set(operationValueEnum.A, operationEnum.A);
operationMap.set(operationValueEnum.T, operationEnum.T);
operationMap.set(operationValueEnum.C, operationEnum.C);

export enum statusEnum {
  TBR = '待复核',
  RVD = '待审核',
  TBP = '待计划',
  PLD = '已计划',
  OTD = '已出库',
  ROD = '已撤销',
}

export enum statusValueEnum {
  TBR = 'TBR',
  RVD = 'RVD',
  TBP = 'TBP',
  PLD = 'PLD',
  OTD = 'OTD',
  ROD = 'ROD',
}

export const statusMap = new Map<statusValueEnum, string>();

statusMap.set(statusValueEnum.TBR, statusEnum.TBR);
statusMap.set(statusValueEnum.RVD, statusEnum.RVD);
statusMap.set(statusValueEnum.TBP, statusEnum.TBP);
statusMap.set(statusValueEnum.PLD, statusEnum.PLD);
statusMap.set(statusValueEnum.OTD, statusEnum.OTD);
statusMap.set(statusValueEnum.ROD, statusEnum.ROD);

//审核结果
export enum auditResultEnum {
  PA = '通过',
  NA = '不通过',
}

export enum auditResultValueEnum {
  PA = 'PA',
  NA = 'NA',
}

export const auditResultMap = new Map<auditResultValueEnum, string>();

auditResultMap.set(auditResultValueEnum.PA, auditResultEnum.PA);
auditResultMap.set(auditResultValueEnum.NA, auditResultEnum.NA);

export enum expirationEnum {
  AY = '一年',
  TY = '三年',
}

export enum expirationValueEnum {
  AY = 'AY',
  TY = 'TY',
}

export const expirationMap = new Map<expirationValueEnum, string>();

expirationMap.set(expirationValueEnum.AY, expirationEnum.AY);
expirationMap.set(expirationValueEnum.TY, expirationEnum.TY);
