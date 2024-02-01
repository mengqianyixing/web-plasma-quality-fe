export enum PlasmaStateEnum {
  W = '未验收',
  R = '验收中',
  S = '已验收',
  P = '暂停验收中',
  F = '验收失败',
  H = '已发布',
}

export enum PlasmaStateValueEnum {
  W = 'W',
  R = 'R',
  S = 'S',
  P = 'P',
  F = 'F',
  H = 'H',
}

export const PlasmaStateMap = new Map<PlasmaStateValueEnum, string>();

PlasmaStateMap.set(PlasmaStateValueEnum.W, PlasmaStateEnum.W);
PlasmaStateMap.set(PlasmaStateValueEnum.R, PlasmaStateEnum.R);
PlasmaStateMap.set(PlasmaStateValueEnum.S, PlasmaStateEnum.S);
PlasmaStateMap.set(PlasmaStateValueEnum.P, PlasmaStateEnum.P);
PlasmaStateMap.set(PlasmaStateValueEnum.F, PlasmaStateEnum.F);
PlasmaStateMap.set(PlasmaStateValueEnum.H, PlasmaStateEnum.H);

/**
 * 审核状态，WC-待审核，WV-待复核，WA-待批准，AD-已批准
 */
export enum PlasmaCheckStateEnum {
  WC = '待审核',
  WV = '待复核',
  WA = '待批准',
  AD = '已批准',
}

export enum PlasmaCheckStateValueEnum {
  WC = 'WC',
  WV = 'WV',
  WA = 'WA',
  AD = 'AD',
}

export const PlasmaCheckStateMap = new Map<PlasmaCheckStateValueEnum, string>();

PlasmaCheckStateMap.set(PlasmaCheckStateValueEnum.WC, PlasmaCheckStateEnum.WC);
PlasmaCheckStateMap.set(PlasmaCheckStateValueEnum.WV, PlasmaCheckStateEnum.WV);
PlasmaCheckStateMap.set(PlasmaCheckStateValueEnum.WA, PlasmaCheckStateEnum.WA);
PlasmaCheckStateMap.set(PlasmaCheckStateValueEnum.AD, PlasmaCheckStateEnum.AD);

export enum PlasmaUnqualifiedTypeEnum {
  USP = '不合格样本登记',
  UPR = '不合格血浆登记',
  TRS = '检测结果',
  QPR = '检疫期',
  FUP = '续追踪',
  PCP = '血浆验收',
  SAP = '样本验收',
}

export enum PlasmaUnqualifiedTypeValueEnum {
  USP = 'USP',
  UPR = 'UPR',
  TRS = 'TRS',
  QPR = 'QPR',
  FUP = 'FUP',
  PCP = 'PCP',
  SAP = 'SAP',
}

export const PlasmaUnqualifiedTypeMap = new Map<PlasmaUnqualifiedTypeValueEnum, string>();

PlasmaUnqualifiedTypeMap.set(PlasmaUnqualifiedTypeValueEnum.USP, PlasmaUnqualifiedTypeEnum.USP);
PlasmaUnqualifiedTypeMap.set(PlasmaUnqualifiedTypeValueEnum.UPR, PlasmaUnqualifiedTypeEnum.UPR);
PlasmaUnqualifiedTypeMap.set(PlasmaUnqualifiedTypeValueEnum.TRS, PlasmaUnqualifiedTypeEnum.TRS);
PlasmaUnqualifiedTypeMap.set(PlasmaUnqualifiedTypeValueEnum.QPR, PlasmaUnqualifiedTypeEnum.QPR);
PlasmaUnqualifiedTypeMap.set(PlasmaUnqualifiedTypeValueEnum.FUP, PlasmaUnqualifiedTypeEnum.FUP);
PlasmaUnqualifiedTypeMap.set(PlasmaUnqualifiedTypeValueEnum.PCP, PlasmaUnqualifiedTypeEnum.PCP);
PlasmaUnqualifiedTypeMap.set(PlasmaUnqualifiedTypeValueEnum.SAP, PlasmaUnqualifiedTypeEnum.SAP);
