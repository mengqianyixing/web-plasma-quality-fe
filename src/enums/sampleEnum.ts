export enum sampleTypeEnum {
  CallbackSample = 'CAB',
  PlasmaSample = 'NOR',
}

export enum nonconformityReasonEnum {
  DonorNonConformance = '献血浆者不符合',
}

export enum sampleDictionary {
  SampleType = 'sampleType',
  NonconformityReason = 'sampleUnqualifiedReason',
}

export enum sampleReceiveStatusEnum {
  W = '未接收',
  R = '接收中',
  S = '已接收',
}

export enum sampleReceiveStatusValueEnum {
  W = 'W',
  R = 'R',
  S = 'S',
}

export const sampleReceiveStatusMap = new Map<sampleReceiveStatusValueEnum, string>();

sampleReceiveStatusMap.set(sampleReceiveStatusValueEnum.W, sampleReceiveStatusEnum.W);
sampleReceiveStatusMap.set(sampleReceiveStatusValueEnum.R, sampleReceiveStatusEnum.R);
sampleReceiveStatusMap.set(sampleReceiveStatusValueEnum.S, sampleReceiveStatusEnum.S);

export enum sampleVerifyStatusEnum {
  W = '未验收',
  R = '验收中',
  S = '已验收',
}

export enum sampleVerifyStatusValueEnum {
  W = 'W',
  R = 'R',
  S = 'S',
}

export const sampleVerifyStatusMap = new Map<sampleVerifyStatusValueEnum, string>();

sampleVerifyStatusMap.set(sampleVerifyStatusValueEnum.W, sampleVerifyStatusEnum.W);
sampleVerifyStatusMap.set(sampleVerifyStatusValueEnum.R, sampleVerifyStatusEnum.R);
sampleVerifyStatusMap.set(sampleVerifyStatusValueEnum.S, sampleVerifyStatusEnum.S);

export enum sampleVerifyResultEnum {
  Unqualified = '不合格',
  Qualified = '合格',
}

export enum sampleVerifyResultValueEnum {
  Unqualified = 0,
  Qualified = 1,
}

export const sampleVerifyResultMap = new Map<sampleVerifyResultValueEnum, string>();

sampleVerifyResultMap.set(
  sampleVerifyResultValueEnum.Unqualified,
  sampleVerifyResultEnum.Unqualified,
);
sampleVerifyResultMap.set(sampleVerifyResultValueEnum.Qualified, sampleVerifyResultEnum.Qualified);
