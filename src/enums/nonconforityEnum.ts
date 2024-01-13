export enum HoseType {
  HoseTypeLike = 'F',
  Nonconformity = 'FSA',
  Stage = 'VRT',
}

export enum NonconformityPlasmaStatusEnum {
  REG = '不合格未挑浆',
  PIK = '不合格已挑浆',
  INS = '已入不合格库',
  EXA = '入库已审核',
  OTD = '已出不合格库',
}

export enum NonconformityPlasmaStatusValueEnum {
  REG = 'REG',
  PIK = 'PIK',
  INS = 'INS',
  EXA = 'EXA',
  OTD = 'OTD',
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
  NonconformityPlasmaStatusValueEnum.INS,
  NonconformityPlasmaStatusEnum.INS,
);
nonconformityPlasmaMap.set(
  NonconformityPlasmaStatusValueEnum.EXA,
  NonconformityPlasmaStatusEnum.EXA,
);
nonconformityPlasmaMap.set(
  NonconformityPlasmaStatusValueEnum.OTD,
  NonconformityPlasmaStatusEnum.OTD,
);
