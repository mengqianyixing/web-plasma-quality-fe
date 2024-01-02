export enum sampleTypeEnum {
  CallbackSample = 'CBK',
  PlasmaSample = 'PLA',
}

export enum nonconformityReasonEnum {
  DonorNonConformance = 'donorNonConformance',
}

export enum sampleDictionary {
  SampleType = 'sampleType',
  NonconformityReason = 'sampleUnqualifiedReason',
}

export enum sampleReceiveStatusEnum {
  W = '未接收',
  R = '接收中',
  F = '已接收',
}

export enum sampleReceiveStatusValueEnum {
  W = 'W',
  R = 'R',
  F = 'S',
}

export const sampleReceiveStatusMap = new Map<sampleReceiveStatusValueEnum, string>();

sampleReceiveStatusMap.set(sampleReceiveStatusValueEnum.W, sampleReceiveStatusEnum.W);
sampleReceiveStatusMap.set(sampleReceiveStatusValueEnum.R, sampleReceiveStatusEnum.R);
sampleReceiveStatusMap.set(sampleReceiveStatusValueEnum.F, sampleReceiveStatusEnum.F);

export enum sampleVerifyStatusEnum {
  W = '未验收',
  R = '验收中',
  F = '已验收',
}

export enum sampleVerifyStatusValueEnum {
  W = 'W',
  R = 'R',
  F = 'S',
}

export const sampleVerifyStatusMap = new Map<sampleVerifyStatusValueEnum, string>();

sampleVerifyStatusMap.set(sampleVerifyStatusValueEnum.W, sampleVerifyStatusEnum.W);
sampleVerifyStatusMap.set(sampleVerifyStatusValueEnum.R, sampleVerifyStatusEnum.R);
sampleVerifyStatusMap.set(sampleVerifyStatusValueEnum.F, sampleVerifyStatusEnum.F);
