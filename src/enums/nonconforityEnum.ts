export enum HoseType {
  HoseTypeLike = 'F',
  Nonconformity = 'FSA',
  Stage = 'VRT',
}

export enum NonconformityPlasmaStatusEnum {
  REG = '登记',
  PIK = '挑选',
  EXA = '审计',
  INS = '入库',
  REV = '撤回',
}

export enum NonconformityPlasmaStatusValueEnum {
  REG = 'REG',
  PIK = 'PIK',
  EXA = 'EXA',
  INS = 'INS',
  REV = 'REV',
}

export const nonconformityPlasmaMap = new Map<NonconformityPlasmaStatusValueEnum, string>();

nonconformityPlasmaMap.set(
  NonconformityPlasmaStatusValueEnum.REG,
  NonconformityPlasmaStatusEnum.REG,
);
nonconformityPlasmaMap.set(
  NonconformityPlasmaStatusValueEnum.PIK,
  NonconformityPlasmaStatusEnum.PIK,
);
nonconformityPlasmaMap.set(
  NonconformityPlasmaStatusValueEnum.EXA,
  NonconformityPlasmaStatusEnum.EXA,
);
nonconformityPlasmaMap.set(
  NonconformityPlasmaStatusValueEnum.INS,
  NonconformityPlasmaStatusEnum.INS,
);
nonconformityPlasmaMap.set(
  NonconformityPlasmaStatusValueEnum.REV,
  NonconformityPlasmaStatusEnum.REV,
);
