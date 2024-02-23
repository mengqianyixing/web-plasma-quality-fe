// 之前统一设置的审核按钮权限enum，不够通用因为有的场景不一定是单一的审核场景，可能是某个操作需要审核人登录，后续添加还是以模块划分比较合理

export enum ReCheckButtonEnum {
  ResultRegistrationCheck = 'E_960010',
  ResultRegistrationTiter = 'E_960020',
  TrayManageCheck = 'E_990020',
  NonconformityRegistrationCheck = 'E_920020',
  NonconformityPickCheck = 'E_920040',
  NonconformityInStoreCheck = 'E_920050',
  NonconformitySampleCheck = 'E_970020',
  NonconformitySampleRevokeRegisterCheck = 'E_970030',
  MissNumCheck = 'E_980020',
  UnqualifiedPlasmaCheck = 'E_980030',
  UnqualifiedSampleCheck = 'E_980040',
  RevokeVerifyCheck = 'E_980050',
  PlasmaVerifyReCheckLogin = 'E_980060',
  PlasmaSuspendCheck = 'E_980070',
  PlasmaReceiveSuspendCheck = 'E_980010',
  PlasmaInboundRecordCheck = 'E_980080',
  RegisterWeightCheck = 'E_980090',
  ProductionSortingReCheck = 'E_910020',
  RequiredItemCheck = 'E_10008010',
}

export enum BaseSettingButtonEnum {
  StationEnable = 'E_100070',
  StationDisable = 'E_100080',
}
