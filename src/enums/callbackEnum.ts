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
