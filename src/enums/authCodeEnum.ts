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
  UnqualifiedStage = 'E_98003001',
  WeightRegister = 'E_98003002',
  VerifyRelease = 'E_98003003',
  VerifyList = 'E_98003004',
  VisualInspectionList = 'E_98003005',
}

export enum BaseSettingButtonEnum {
  StationEnable = 'E_100070',
  StationDisable = 'E_100080',

  TiterTypeAdd = 'E_1000101',
  TiterTypeUpdate = 'E_1000102',
  TiterTypeDelete = 'E_1000103',
  TiterTypeDisable = 'E_1000104',
  TiterTypeEnable = 'E_1000105',

  InspectMethodAdd = 'E_1000201',
  InspectMethodUpdate = 'E_1000202',
  InspectMethodDelete = 'E_1000203',
  InspectMethodDisable = 'E_1000204',
  InspectMethodEnable = 'E_1000205',

  ItemSettingAdd = 'E_1000301',
  ItemSettingUpdate = 'E_1000302',
  ItemSettingDelete = 'E_1000303',
  ItemSettingDisable = 'E_1000304',
  ItemSettingEnable = 'E_1000305',

  DictionaryAdd = 'E_1000401',
  DictionaryUpdate = 'E_1000402',
  DictionaryDelete = 'E_1000403',
  DictionaryItemAdd = 'E_1000404',

  ReportAdd = 'E_1000501',
  ReportUpdate = 'E_1000502',

  RequiredItemAdd = 'E_1000801',
  RequiredItemUpdate = 'E_1000802',
  RequiredItemDelete = 'E_1000803',
}

export enum StoreButtonEnum {
  StoreSettingAdd = 'E_99001001',
  StoreSettingUpdate = 'E_99001002',
  StoreSettingDisable = 'E_99001004',
  StoreSettingEnable = 'E_99001005',

  TrayListPrint = 'E_99002001',
  TrayListRePrint = 'E_99002002',
  TrayListDisable = 'E_99002004',

  TrayInStore = 'E_99004001',
  TrayOutStore = 'E_99004002',

  PlasmaSiteAdd = 'E_99005001',
  PlasmaSiteUpdate = 'E_99005002',
  PlasmaSiteDisable = 'E_99005004',
  PlasmaSiteEnable = 'E_99005005',
}

export enum InspectButtonEnum {
  ResultRegistrationSelect = 'E_96001001',
  ResultRegistrationItemAdd = 'E_96001002',
  ResultRegistrationRegist = 'E_96001003',
  ResultRegistrationReRegist = 'E_96001004',

  ResultRegistrationItemDelete = 'E_96001005',
  ResultRegistrationItemNotCheck = 'E_96001006',
  ResultRegistrationItemUnq = 'E_96001007',

  ResultRegistrationTiterImport = 'E_96001008',
  ResultRegistrationTiterRegist = 'E_96001009',
  ResultRegistrationTiterNotCheck = 'E_960010010',

  ResultRegistrationMaterialRegist = 'E_960010011',
  ResultRegistrationMaterialReRegist = 'E_960010012',
  ResultRegistrationSqImport = 'E_960010013',

  ReportReleaseCreate = 'E_96002001',
  ReportReleaseUnCreate = 'E_96002002',
  ReportReleaseProcess = 'E_96002003',
  ReportReleaseUnProcess = 'E_96002004',
  ReportReleaseRelease = 'E_96002005',
  ReportReleasePrint = 'E_96002006',

  MaterialPreRegistrationAdd = 'E_96003001',
  MaterialPreRegistrationUpdate = 'E_96003002',
  MaterialPreRegistrationReview = 'E_96003003',
  MaterialPreRegistrationUnReview = 'E_96003004',
  MaterialPreRegistrationDisable = 'E_96003005',
  MaterialPreRegistrationEnable = 'E_96003006',
  MaterialPreRegistrationUpdateDate = 'E_96003007',
}

export enum QuarantineButtonEnum {
  OverdueConfirmationConfim = 'E_95001001',
  CreateQuarantine = 'E_95003001',
  ResetQuarantine = 'E_95003002',
  ReCheckQuarantine = 'E_95003003',
  PrintQuarantine = 'E_95003004',

  NonconformityTrackingReport = 'E_95004001',
}

export enum QualityButtonEnum {
  PlasmaRestrictionAdd = 'E_94001001',
  PlasmaRestrictionRemove = 'E_94001002',
  PlasmaRestrictionReview = 'E_94001003',

  PlasmaCheckAdd = 'E_94002001',
  PlasmaCheckEdit = 'E_94002002',
  PlasmaCheckDelete = 'E_94002003',
  PlasmaCheckReCheck = 'E_94002004',
  PlasmaCheckCancelReCheck = 'E_94002005',
  PlasmaCheckPrint = 'E_94002006',
  PlasmaCheckApproval = 'E_94002007',

  BatchReleaseAdd = 'E_94003001',
  BatchReleaseUpdate = 'E_94003002',
  BatchReleaseReview = 'E_94003003',
  BatchReleaseRelease = 'E_94003004',
  BatchReleaseUnRelease = 'E_94003005',
  BatchReleasePrint = 'E_94003006',
  BatchReleaseCancelAdd = 'E_94003007',
  BatchReleaseCancelReview = 'E_94003008',
}

export enum NonconformityButtonEnum {
  PlasmaOutAdd = 'E_92003001',
  PlasmaOutUpdate = 'E_92003002',
  PlasmaOutRemove = 'E_92003003',
  PlasmaOutProcess = 'E_92003004',
  PlasmaOutUnProcess = 'E_92003005',
  PlasmaOutScan = 'E_92003006',
  PlasmaOutTransferPrint = 'E_92003007',
  PlasmaOutPlasmaPrint = 'E_92003008',
  PlasmaOutDestructionPrint = 'E_92003009',
}

export enum StockOutButtonEnum {
  ProductionPreparationAdd = 'E_91001001',
  ProductionPreparationEdit = 'E_91001002',
  ProductionPreparationDelete = 'E_91001003',
  ProductionPreparationSelect = 'E_91001004',
  ProductionPreparationFinish = 'E_91001005',
  ProductionPreparationReset = 'E_91001006',
  ProductionPreparationReCheck = 'E_91001007',
  ProductionPreparationResetReCheck = 'E_91001008',

  ProductionOrderAdd = 'E_91003001',
  ProductionOrderEdit = 'E_91003002',
  ProductionOrderDelete = 'E_91003003',
  ProductionOrderRecheck = 'E_91003004',
  ProductionOrderCancelRecheck = 'E_91003005',
  ProductionOrderExamine = 'E_91003006',
  ProductionOrderCancelExamine = 'E_91003007',
  ProductionOrderPrint = 'E_91003008',

  ProductionPlanPick = 'E_91004001',
  ProductionPlanComplate = 'E_91004002',
  ProductionPlanReComplate = 'E_91004003',
  ProductionPlanReview = 'E_91004004',
  ProductionPlanReReview = 'E_91004005',
  ProductionPlanCheck = 'E_91004006',
  ProductionPlanReCheck = 'E_91004007',
  ProductionPlanCheckListReport = 'E_91004008',
  ProductionPlanTransferReport = 'E_91004009',
  ProductionPlanMaterialReport = 'E_910040010',
  ProductionPlanPlasmaReport = 'E_910040011',

  PutIntoTrayStockOut = 'E_91005001',
  PutIntoBoxStockOut = 'E_91005002',
  PutIntoBatchStockOut = 'E_91005003',
  PutIntoPickPlasmaSystem = 'E_91005004',
  PutIntoCancelStockOut = 'E_91005005',
  PutIntoBoxReceive = 'E_91005006',
  PutIntoBatchReceive = 'E_91005007',
  PutIntoCancelExamine = 'E_91005008',

  NonPutIntoAdd = 'E_91006001',
  NonPutIntoEdit = 'E_91006002',
  NonPutIntoCancel = 'E_91006003',
  NonPutIntoCompletePrepare = 'E_91006004',
  NonPutIntoCancelPrepare = 'E_91006005',
  NonPutIntoReCheck = 'E_91006006',
  NonPutIntoCancelReCheck = 'E_91006007',
  NonPutIntoCheck = 'E_91006008',
  NonPutIntoCancelCheck = 'E_91006009',
  NonPutIntoScan = 'E_91006010',

  PlasmaSummaryPlasmaSummaryReport = 'E_91007001',
  PlasmaSummaryPlasmaTrackUnqReport = 'E_91007002',
}

export enum SampleManageButtonEnum {
  SampleRelease = 'E_97003001',
}

export enum CallbackButtonEnum {
  ListGeneAdd = 'E_93001001',
  ListGeneEdit = 'E_93001002',
  ListGeneDelete = 'E_93001003',
  ListGeneEnter = 'E_93001004',
  ListGeneExport = 'E_93001005',
}

export enum SearchManager {
  InventoryExport = 'E_90003101',

  LocationExport = 'E_900017001',

  PlasmaBatchExport = 'E_90003001',

  ERPReportExport = 'E_90002401',

  DonorStateExport = 'E_90001401',

  CallbackExport = 'E_90002501',

  CallbackBatchExport = 'E_90002601',
}
