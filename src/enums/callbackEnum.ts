export enum CallbackStateEnum {
  WIT = '待确认',
  COF = '已确认',
  REK = '已撤销',
}
export enum CallbackStateValueEnum {
  WIT = 'WIT',
  COF = 'COF',
  REK = 'REK',
}

export const CallbackStateMap = new Map<CallbackStateValueEnum, string>();

CallbackStateMap.set(CallbackStateValueEnum.WIT, CallbackStateEnum.WIT);
CallbackStateMap.set(CallbackStateValueEnum.COF, CallbackStateEnum.COF);
CallbackStateMap.set(CallbackStateValueEnum.REK, CallbackStateEnum.REK);

export enum donorStatusEnum {
  RFF = '永拒',
  RFT = '暂拒',
  NOR = '正常',
}

export enum donorStatusValueEnum {
  RFF = 'RFF',
  RFT = 'RFT',
  NOR = 'NOR',
}

export const donorStatusMap = new Map<donorStatusValueEnum, string>();

donorStatusMap.set(donorStatusValueEnum.RFF, donorStatusEnum.RFF);
donorStatusMap.set(donorStatusValueEnum.RFT, donorStatusEnum.RFT);
donorStatusMap.set(donorStatusValueEnum.NOR, donorStatusEnum.NOR);
