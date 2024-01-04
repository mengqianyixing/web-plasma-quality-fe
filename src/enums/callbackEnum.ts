export enum CallbackStateEnum {
  WIT = '待复核',
  COF = '已确认',
  ISU = '已下发',
  END = '已结束',
}
export enum CallbackStateValueEnum {
  WIT = 'WIT',
  COF = 'COF',
  ISU = 'ISU',
  END = 'END',
}

export const CallbackStateMap = new Map<CallbackStateValueEnum, string>();

CallbackStateMap.set(CallbackStateValueEnum.WIT, CallbackStateEnum.WIT);
CallbackStateMap.set(CallbackStateValueEnum.COF, CallbackStateEnum.COF);
CallbackStateMap.set(CallbackStateValueEnum.ISU, CallbackStateEnum.ISU);
CallbackStateMap.set(CallbackStateValueEnum.END, CallbackStateEnum.END);

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
