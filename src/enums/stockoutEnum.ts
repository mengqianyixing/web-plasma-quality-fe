export enum operationEnum {
  N = '普通',
  B = '乙免',
  R = '狂免',
  T = '破免',
  C = '巨细胞',
}

export enum operationValueEnum {
  N = 'N',
  B = 'B',
  R = 'R',
  T = 'T',
  C = 'C',
}

export const operationMap = new Map<operationValueEnum, string>();

operationMap.set(operationValueEnum.N, operationEnum.N);
operationMap.set(operationValueEnum.B, operationEnum.B);
operationMap.set(operationValueEnum.R, operationEnum.R);
operationMap.set(operationValueEnum.T, operationEnum.T);
operationMap.set(operationValueEnum.C, operationEnum.C);

export enum statusEnum {
  TBR = '待复核',
  RVD = '已复核',
  AED = '已审核',
  ROD = '已撤销',
  FED = '不通过',
}

export enum statusValueEnum {
  TBR = 'TBR',
  RVD = 'RVD',
  AED = 'AED',
  ROD = 'ROD',
  FED = 'FED',
}

export const statusMap = new Map<statusValueEnum, string>();

statusMap.set(statusValueEnum.TBR, statusEnum.TBR);
statusMap.set(statusValueEnum.RVD, statusEnum.RVD);
statusMap.set(statusValueEnum.AED, statusEnum.AED);
statusMap.set(statusValueEnum.ROD, statusEnum.ROD);
statusMap.set(statusValueEnum.FED, statusEnum.FED);

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
