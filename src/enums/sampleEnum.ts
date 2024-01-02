export enum sampleDictionary {
  SampleType = 'sampleType',
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
