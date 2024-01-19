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
